"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"

interface RegisterButtonProps {
  eventId: string
  isRegistered: boolean
  isFull: boolean
  isLoggedIn: boolean
}

export function RegisterButton({ 
  eventId, 
  isRegistered, 
  isFull,
  isLoggedIn
}: RegisterButtonProps) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    if (!isLoggedIn) {
      router
