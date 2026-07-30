"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, ImageIcon, Upload, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { uploadFile } from "@/lib/firebase/storage"
import { compressImage } from "@/lib/compress"
import type { GalleryImage } from "@/types/database"

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploads, setUploads] = useState<{ file: string; progress: number; status: "uploading" | "done" | "error" }[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

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

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setUploads(files.map((f) => ({ file: f.name, progress: 0, status: "uploading" as const })))

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const compressed = await compressImage(file)
        const path = `gallery/${Date.now()}-${file.name}`
        const url = await uploadFile(path, compressed)
        setUploads((prev) => prev.map((u, j) => j === i ? { ...u, progress: 100, status: "done" } : u))
        await fetch("/api/data/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: url, title: file.name.replace(/\.[^/.]+$/, ""), caption: "", category: "" }),
        })
      } catch {
        setUploads((prev) => prev.map((u, j) => j === i ? { ...u, status: "error" } : u))
      }
    }

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
    loadImages()
  }

  const clearDone = () => {
    setUploads([])
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gallery</h1>
      </div>

      <div className="mb-8 rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
        <p className="mb-2 text-lg font-medium">Upload multiple images</p>
        <p className="mb-4 text-sm text-muted-foreground">Select several pictures at once — they&apos;ll upload and save automatically</p>
        <Button disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Choose Images
        </Button>

        {uploads.length > 0 && (
          <div className="mt-6 space-y-2">
            {uploads.map((u, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-left">
                {u.status === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {u.status === "done" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {u.status === "error" && <XCircle className="h-4 w-4 text-destructive" />}
                <span className="flex-1 truncate text-sm">{u.file}</span>
                {u.status === "uploading" && <span className="text-xs text-muted-foreground">Uploading...</span>}
                {u.status === "done" && <span className="text-xs text-green-500">Done</span>}
                {u.status === "error" && <span className="text-xs text-destructive">Failed</span>}
              </div>
            ))}
            {!uploading && (
              <Button variant="outline" size="sm" onClick={clearDone} className="mt-2">Clear</Button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : images.length === 0 ? (
        <div className="py-16 text-center">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No images in the gallery yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              <img src={image.image_url} alt={image.title || "Gallery"} className="h-full w-full object-cover" />
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
