"use client"

import { useEffect, useState } from "react"
import { Ticket, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Ticket as TicketType, Event } from "@/types/database"

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([loadTickets(), loadEvents()])
  }, [])

  const loadTickets = async () => {
    const res = await fetch("/api/data/tickets")
    const data = await res.json()
    setTickets(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const loadEvents = async () => {
    const res = await fetch("/api/data/events")
    const data = await res.json()
    setEvents(Array.isArray(data) ? data : [])
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking?")) return
    await fetch(`/api/data/tickets?id=${id}`, { method: "DELETE" })
    loadTickets()
  }

  const toggleStatus = async (ticket: TicketType) => {
    const next = ticket.status === "confirmed" ? "pending" : "confirmed"
    await fetch(`/api/data/tickets?id=${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    })
    loadTickets()
  }

  const totalBookings = tickets.reduce((sum, t) => sum + t.quantity, 0)
  const totalAmount = tickets.reduce((sum, t) => sum + (t.amount || 0), 0)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tickets</h1>
      </div>

      {!loading && tickets.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="mt-1 text-2xl font-bold">{tickets.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Tickets Reserved</p>
            <p className="mt-1 text-2xl font-bold">{totalBookings}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Amount (NGN)</p>
            <p className="mt-1 text-2xl font-bold">{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : tickets.length === 0 ? (
        <div className="py-16 text-center">
          <Ticket className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No ticket bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const event = events.find((e) => e.id === ticket.event_id)
            return (
              <div key={ticket.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{ticket.name}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ticket.status === "confirmed"
                            ? "bg-primary/15 text-primary"
                            : ticket.status === "cancelled"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {ticket.email}
                      {ticket.phone && ` · ${ticket.phone}`}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-primary">{event?.title || ticket.event_title}</span>
                      {" · "}
                      {ticket.quantity} ticket{ticket.quantity > 1 ? "s" : ""}
                      {ticket.amount > 0 && ` · NGN ${ticket.amount.toLocaleString()}`}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Booked {new Date(ticket.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(ticket)}>
                      {ticket.status === "confirmed" ? "Mark Pending" : "Confirm"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(ticket.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
