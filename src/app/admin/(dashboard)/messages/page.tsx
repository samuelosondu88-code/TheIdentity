"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContactMessage } from "@/types/database"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => { loadMessages() }, [])

  const loadMessages = async () => {
    setLoading(true)
    const res = await fetch("/api/data/contact_messages")
    const data = await res.json()
    setMessages(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    await fetch(`/api/data/contact_messages?id=${id}`, { method: "DELETE" })
    if (selected?.id === id) setSelected(null)
    loadMessages()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-1">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  selected?.id === msg.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-muted-foreground">{msg.subject}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selected.subject}</h2>
                    <p className="text-sm text-muted-foreground">
                      From: {selected.name} ({selected.email})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selected.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(selected.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {selected.message}
                </p>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card py-16">
                <p className="text-muted-foreground">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}