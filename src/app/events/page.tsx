import type { Metadata } from "next"
import EventCard from "@/components/EventCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { Event } from "@/types/database"

export const metadata: Metadata = {
  title: "Events",
  description: "See upcoming and past events for The Identity music group.",
}

async function getEvents() {
  return listDocuments<Event>("events", [Query.orderAsc("event_date")])
}

export default async function EventsPage() {
  const events = await getEvents()
  const today = new Date().toISOString().split("T")[0]
  const upcoming = events.filter((e) => e.event_date >= today)
  const past = events.filter((e) => e.event_date < today)

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Events</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Join us at our next show or relive past performances.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No upcoming events at the moment. Stay connected for future
                updates.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold">Past Events</h2>
            <div className="space-y-4">
              {past.reverse().map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
