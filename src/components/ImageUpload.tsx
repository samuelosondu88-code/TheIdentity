"use client"

import { useState, useRef } from "react"
import { X, Loader2, AlertCircle } from "lucide-react"
import { uploadToCloudinary } from "@/lib/cloudinary"

interface ImageUploadProps {
  name: string
  defaultValue?: string
  folder?: string
}

export default function ImageUpload({ name, defaultValue }: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue || "")
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(defaultValue || "")
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const localUrl = URL.createObjectURL(file)
      setPreview(localUrl)
      const downloadUrl = await uploadToCloudinary(file, "image")
      setUrl(downloadUrl)
      setPreview(downloadUrl)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed"
      setError(msg)
      setPreview("")
    }
    setUploading(false)
  }

  const clear = () => {
    setUrl("")
    setPreview("")
    setError("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50" />
          <input type="hidden" name={name} value={url} />
          {error && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" /> {error}
            </p>
          )}
          {url && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate max-w-[200px]">Uploaded</span>
              <button type="button" onClick={clear} className="text-destructive hover:text-destructive/80">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
