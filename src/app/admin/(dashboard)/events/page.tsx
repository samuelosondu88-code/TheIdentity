"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Calendar } from "lucide-react"
import type { Event } from "@/types/database"

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [editing, setEditing] = useState<Event | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadEvents() }, [])

  const loadEvents = async () => {
    setLoading(true)
    const res = await fetch("/api/data/events")
    const data = await res.json()
    setEvents(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return
    await fetch(`/api/data/events?id=${id}`, { method: "DELETE" })
    loadEvents()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      event_date: formData.get("event_date") as string,
      event_time: formData.get("event_time") as string,
      venue: formData.get("venue") as string,
      location: formData.get("location") as string,
      registration_url: formData.get("registration_url") as string,
      ticket_url: formData.get("ticket_url") as string,
    }

    if (editing) {
      await fetch(`/api/data/events?id=${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } else {
      await fetch("/api/data/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }

    setShowForm(false)
    setEditing(null)
    loadEvents()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">{editing ? "Edit Event" : "New Event"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editing?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={editing?.description} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event_date">Date</Label>
                <Input id="event_date" name="event_date" type="date" defaultValue={editing?.event_date?.split("T")[0]} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_time">Time</Label>
                <Input id="event_time" name="event_time" type="time" defaultValue={editing?.event_time} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" defaultValue={editing?.venue} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={editing?.location} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ticket_url">Ticket URL</Label>
                <Input id="ticket_url" name="ticket_url" defaultValue={editing?.ticket_url} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration_url">Registration URL</Label>
                <Input id="registration_url" name="registration_url" defaultValue={editing?.registration_url} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : events.length === 0 ? (
        <div className="py-16 text-center">
          <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No events yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{new Date(event.event_date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(event); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}