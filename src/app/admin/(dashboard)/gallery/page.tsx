"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, ImageIcon } from "lucide-react"
import type { GalleryImage } from "@/types/database"

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { loadImages() }, [])

  const loadImages = async () => {
    setLoading(true)
    const res = await fetch("/api/data/gallery")
    const data = await res.json()
    setImages(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return
    await fetch(`/api/data/gallery?id=${id}`, { method: "DELETE" })
    loadImages()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    await fetch("/api/data/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      image_url: formData.get("image_url") as string,
      title: formData.get("title") as string,
      caption: formData.get("caption") as string,
      category: formData.get("category") as string,
    }) })
    setShowForm(false)
    loadImages()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input id="image_url" name="image_url" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Performance, Behind the Scenes, etc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input id="caption" name="caption" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Image</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : images.length === 0 ? (
        <div className="py-16 text-center">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No images in the gallery.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex h-full items-center justify-center bg-muted">
                <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex w-full items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{image.title || "Untitled"}</p>
                    {image.category && <p className="text-xs text-white/60">{image.category}</p>}
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:text-destructive" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}