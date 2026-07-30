import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ExternalLink, Ticket } from "lucide-react"
import type { Event } from "@/types/database"
import { formatDate } from "@/lib/utils"

interface EventCardProps {
  event: Event
  past?: boolean
}

export default function EventCard({ event, past }: EventCardProps) {
  return (
    <Card
      className={`transition-all duration-300 hover:border-primary/50 ${
        past ? "opacity-70" : ""
      }`}
    >
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
        <div className="flex-shrink-0 text-center">
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-border bg-muted">
            <span className="text-2xl font-bold text-primary">
              {new Date(event.event_date).getDate()}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
          <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(event.event_date)}
            </span>
            {event.event_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.event_time}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.venue}, {event.location}
            </span>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.ticket_url && (
              <Button variant="default" size="sm" asChild>
                <a
                  href={event.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Ticket className="h-4 w-4" />
                  Get Tickets
                </a>
              </Button>
            )}
            {event.registration_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Register
                </a>
              </Button>
            )}
            {past && <Badge variant="secondary">Past Event</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
