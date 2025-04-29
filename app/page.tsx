import { Suspense } from "react"
import { EventsGrid } from "@/components/events-grid"
import { EventsFilter } from "@/components/events-filter"
import { HeroSection } from "@/components/hero-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const date = typeof searchParams.date === "string" ? searchParams.date : undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <EventsFilter />
        <Suspense fallback={<EventsSkeleton />}>
          <EventsGrid category={category} search={search} date={date} />
        </Suspense>
      </div>
    </div>
  )
}

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
