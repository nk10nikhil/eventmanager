import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: userDetails } = await supabase.from("profiles").select("*").single()
    return userDetails
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getEvents({
  category,
  search,
  date,
  limit = 100,
  userId,
}: {
  category?: string
  search?: string
  date?: string
  limit?: number
  userId?: string
} = {}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("events")
    .select(`
      *,
      categories(name),
      profiles(full_name, avatar_url),
      registrations(id)
    `)
    .eq("is_approved", true)
    .order("start_date", { ascending: true })
    .limit(limit)

  if (category) {
    const { data: categoryData } = await supabase.from("categories").select("id").eq("name", category).single()

    if (categoryData) {
      query = query.eq("category_id", categoryData.id)
    }
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  if (date) {
    const selectedDate = new Date(date)
    const nextDay = new Date(selectedDate)
    nextDay.setDate(selectedDate.getDate() + 1)

    query = query.gte("start_date", selectedDate.toISOString()).lt("start_date", nextDay.toISOString())
  }

  if (userId) {
    query = query.eq("organizer_id", userId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data.map((event) => ({
    ...event,
    category_name: event.categories?.name,
    organizer_name: event.profiles?.full_name,
    organizer_avatar: event.profiles?.avatar_url,
    registration_count: event.registrations?.length || 0,
  }))
}

export async function getEventById(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      categories(name),
      profiles(full_name, avatar_url),
      registrations(id, user_id)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return {
    ...data,
    category_name: data.categories?.name,
    organizer_name: data.profiles?.full_name,
    organizer_avatar: data.profiles?.avatar_url,
    registration_count: data.registrations?.length || 0,
    registrations: data.registrations,
  }
}

export async function getUserRegistrations(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("registrations")
    .select(`
      *,
      events(
        id,
        title,
        description,
        start_date,
        end_date,
        location,
        image_url,
        categories(name)
      )
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching registrations:", error)
    return []
  }

  return data
}

export async function getUserCertificates(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("certificates")
    .select(`
      *,
      registrations(
        id,
        events(
          id,
          title,
          start_date
        )
      )
    `)
    .eq("registrations.user_id", userId)

  if (error) {
    console.error("Error fetching certificates:", error)
    return []
  }

  return data
}

export async function isUserRegistered(eventId: string, userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("registrations")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle()

  if (error) {
    console.error("Error checking registration:", error)
    return false
  }

  return !!data
}

export async function isUserAdmin(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", userId).single()

  if (error || !data) {
    return false
  }

  return data.is_admin
}
