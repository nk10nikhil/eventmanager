import { notFound } from "next/navigation"
import Image from "next/image"
import { getEventById, getSession, isUserRegistered } from "@/lib/supabase-server"
import { formatDateTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { RegisterButton } from "./register-button"

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)
  const session = await getSession()

  if (!event) {
    notFound()
  }

  const isRegistered = session?.user ? await isUserRegistered(event.id, session.user.id) : false

  const registrationCount = event.registrations?.length || 0
  const isFull = registrationCount >= event.capacity

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={event.image_url || `/placeholder.svg?height=600&width=1200`}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{event.category_name}</Badge>
              {isFull && <Badge variant="destructive">Sold Out</Badge>}
            </div>
            <h1 className="mt-2 text-3xl font-bold">{event.title}</h1>
            <div className="mt-4 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.organizer_avatar || "/placeholder.svg"} alt={event.organizer_name} />
                <AvatarFallback>{event.organizer_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>Organized by {event.organizer_name}</span>
            </div>
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">About this event</h2>
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="sticky top-6 rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date and Time</p>
                  <p className="text-sm text-muted-foreground">{formatDateTime(event.start_date)}</p>
                  <p className="text-sm text-muted-foreground">to {formatDateTime(event.end_date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    {registrationCount} / {event.capacity} registered
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <RegisterButton
                  eventId={event.id}
                  isRegistered={isRegistered}
                  isFull={isFull}
                  isLoggedIn={!!session?.user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
