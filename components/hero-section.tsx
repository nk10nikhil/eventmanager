import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarCheck } from "lucide-react"

export function HeroSection() {
  return (
    <div className="py-12 md:py-24 lg:py-32 xl:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create, Manage, and Attend Events with Ease
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your all-in-one platform for event management. Create events, generate tickets, and issue certificates
                all in one place.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/events">
                <Button size="lg">Explore Events</Button>
              </Link>
              <Link href="/dashboard/events/create">
                <Button size="lg" variant="outline">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg opacity-20 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                      <div className="h-4 w-3/4 rounded-md bg-muted" />
                      <div className="h-12 rounded-md bg-muted" />
                      <div className="h-4 w-1/2 rounded-md bg-muted" />
                      <div className="h-4 w-full rounded-md bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
