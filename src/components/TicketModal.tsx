"use client"

import { useState } from "react"
import { Calendar, MapPin, Loader2, CheckCircle2, Ticket as TicketIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Event } from "@/types/database"
import { formatDate } from "@/lib/utils"

interface TicketModalProps {
  event: Event
  trigger?: React.ReactNode
}

export default function TicketModal({ event, trigger }: TicketModalProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const isFree = !event.ticket_price || event.ticket_price === "0" || event.ticket_price.toLowerCase() === "free"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      event_id: event.id,
      event_title: event.title,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      quantity: Number(formData.get("quantity")) || 1,
      amount: isFree ? 0 : Number(event.ticket_price) * (Number(formData.get("quantity")) || 1),
      status: "pending",
    }
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/data/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Booking failed")
      setDone(true)
    } catch {
      setError("Something went wrong. Please try again.")
    }
    setSubmitting(false)
  }

  const close = () => {
    setOpen(false)
    setTimeout(() => setDone(false), 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button onClick={() => setOpen(true)} className="cursor-pointer">
          <TicketIcon className="h-4 w-4" />
          Get Tickets
        </Button>
      )}
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Booking Received!</h3>
            <p className="text-sm text-muted-foreground">
              Your ticket request for {event.title} has been submitted.
              {isFree ? " We look forward to seeing you there!" : " You will receive payment details shortly."}
            </p>
            <Button className="mt-6" onClick={close}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Get Tickets</DialogTitle>
            </DialogHeader>
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <h3 className="font-semibold">{event.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.event_date)}
                  {event.event_time && ` at ${event.event_time}`}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.venue}, {event.location}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-lg font-bold text-primary">
                  {isFree ? "FREE" : `NGN ${Number(event.ticket_price).toLocaleString()}`}
                </span>
                {!isFree && <span className="text-sm text-muted-foreground"> / ticket</span>}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="Phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Number of Tickets</Label>
                <Input id="quantity" name="quantity" type="number" min={1} max={10} defaultValue={1} required />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {submitting ? "Booking..." : isFree ? "Reserve Tickets" : "Continue to Payment"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
