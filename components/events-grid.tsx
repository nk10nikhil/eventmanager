import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { formatDate, getInitials, truncateText } from "@/lib/utils"
import { getEvents } from "@/lib/supabase-server"

interface EventsGridProps {
  category?: string
  search?: string
  date?: string
  limit?: number
  userId?: string
}

export async function EventsGrid({ category, search, date, limit, userId }: EventsGridProps) {
  const events = await getEvents({ category, search, date, limit, userId })

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-2xl font-semibold">No events found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {events.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <Image
                src={event.image_url || `/placeholder.svg?height=300&width=600`}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{event.category_name}</Badge>
              </div>
            </div>
            <CardHeader className="p-4 pb-0">
              <h3 className="text-xl font-semibold">{event.title}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-muted-foreground text-sm mb-4">{truncateText(event.description, 100)}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(event.start_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <UsersIcon className="h-4 w-4" />
                <span>
                  {event.registration_count} / {event.capacity} registered
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={event.organizer_avatar || "/placeholder.svg"} alt={event.organizer_name} />
                <AvatarFallback>{getInitials(event.organizer_name)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{event.organizer_name}</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
