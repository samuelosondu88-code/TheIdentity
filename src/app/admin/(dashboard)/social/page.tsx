"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Share2 } from "lucide-react"
import type { SocialLink } from "@/types/database"

export default function AdminSocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [editing, setEditing] = useState<SocialLink | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadLinks() }, [])

  const loadLinks = async () => {
    setLoading(true)
    const res = await fetch("/api/data/social_links")
    const data = await res.json()
    setLinks(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return
    await fetch(`/api/data/social_links?id=${id}`, { method: "DELETE" })
    loadLinks()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      platform: formData.get("platform") as string,
      url: formData.get("url") as string,
      display_order: parseInt(formData.get("display_order") as string) || 0,
      active: formData.get("active") === "on",
    }

    if (editing) {
      await fetch(`/api/data/social_links?id=${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } else {
      await fetch("/api/data/social_links", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }

    setShowForm(false)
    setEditing(null)
    loadLinks()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Social Media Links</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">{editing ? "Edit Link" : "New Link"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input id="platform" name="platform" defaultValue={editing?.platform} placeholder="Spotify, Instagram, etc." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" name="display_order" type="number" defaultValue={editing?.display_order || 0} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" defaultValue={editing?.url} required />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" name="active" defaultChecked={editing?.active ?? true} className="h-4 w-4" />
              <Label htmlFor="active">Active</Label>
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
      ) : links.length === 0 ? (
        <div className="py-16 text-center">
          <Share2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No social links yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-semibold">{link.platform}</h3>
                <p className="text-sm text-muted-foreground">{link.url}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${link.active ? "text-green-500" : "text-muted-foreground"}`}>
                  {link.active ? "Active" : "Inactive"}
                </span>
                <Button variant="ghost" size="sm" onClick={() => { setEditing(link); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(link.id)}>
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