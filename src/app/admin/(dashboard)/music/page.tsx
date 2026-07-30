"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Music } from "lucide-react"
import type { MusicRelease } from "@/types/database"

export default function AdminMusicPage() {
  const [releases, setReleases] = useState<MusicRelease[]>([])
  const [editing, setEditing] = useState<MusicRelease | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReleases()
  }, [])

  const loadReleases = async () => {
    setLoading(true)
    const res = await fetch("/api/data/music_releases")
    const data = await res.json()
    setReleases(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this release?")) return
    await fetch(`/api/data/music_releases?id=${id}`, { method: "DELETE" })
    loadReleases()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: formData.get("title") as string,
      artist: formData.get("artist") as string,
      description: formData.get("description") as string,
      cover_image_url: formData.get("cover_image_url") as string,
      release_date: formData.get("release_date") as string,
      featured: formData.get("featured") === "on",
    }

    if (editing) {
      await fetch(`/api/data/music_releases?id=${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } else {
      await fetch("/api/data/music_releases", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }

    setShowForm(false)
    setEditing(null)
    loadReleases()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Music Releases</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Release
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "Edit Release" : "New Release"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editing?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist</Label>
                <Input id="artist" name="artist" defaultValue={editing?.artist || "The Identity"} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={editing?.description} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">Cover Image URL</Label>
                <Input id="cover_image_url" name="cover_image_url" defaultValue={editing?.cover_image_url} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="release_date">Release Date</Label>
                <Input id="release_date" name="release_date" type="date" defaultValue={editing?.release_date?.split("T")[0]} required />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" name="featured" defaultChecked={editing?.featured} className="h-4 w-4" />
              <Label htmlFor="featured">Featured Release</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null) }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : releases.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <Music className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          No music releases yet.
        </div>
      ) : (
        <div className="space-y-3">
          {releases.map((release) => (
            <div key={release.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-semibold">{release.title}</h3>
                <p className="text-sm text-muted-foreground">{release.artist}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(release); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(release.id)}>
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