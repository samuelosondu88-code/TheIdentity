"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2, VideoIcon, Upload, Loader2, CheckCircle2, XCircle, Plus } from "lucide-react"
import { uploadFile } from "@/lib/firebase/storage"
import type { Video } from "@/types/database"

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploads, setUploads] = useState<{ file: string; progress: number; status: "uploading" | "done" | "error" }[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadVideos() }, [])

  const loadVideos = async () => {
    setLoading(true)
    const res = await fetch("/api/data/videos")
    const data = await res.json()
    setVideos(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return
    await fetch(`/api/data/videos?id=${id}`, { method: "DELETE" })
    loadVideos()
  }

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setUploads(files.map((f) => ({ file: f.name, progress: 0, status: "uploading" as const })))

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const path = `videos/${Date.now()}-${file.name}`
        const url = await uploadFile(path, file)
        setUploads((prev) => prev.map((u, j) => j === i ? { ...u, progress: 100, status: "done" } : u))
        await fetch("/api/data/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            video_url: url,
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            thumbnail_url: "",
            category: "",
          }),
        })
      } catch {
        setUploads((prev) => prev.map((u, j) => j === i ? { ...u, status: "error" } : u))
      }
    }

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
    loadVideos()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Videos</h1>
      </div>

      <div className="mb-8 rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
        <input ref={fileRef} type="file" accept="video/*" multiple onChange={handleFiles} className="hidden" />
        <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
        <p className="mb-2 text-lg font-medium">Upload videos</p>
        <p className="mb-4 text-sm text-muted-foreground">Select video files to upload — they&apos;ll save automatically</p>
        <Button disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Choose Videos
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
              <Button variant="outline" size="sm" onClick={() => setUploads([])} className="mt-2">Clear</Button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="py-16 text-center">
          <VideoIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No videos yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
              <video src={video.video_url} className="aspect-video w-full object-cover" controls preload="metadata" />
              <div className="p-3">
                <p className="truncate font-medium">{video.title}</p>
                <div className="mt-2 flex gap-2">
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(video.id)}>
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
