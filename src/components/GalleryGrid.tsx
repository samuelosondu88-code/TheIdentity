"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { GalleryImage } from "@/types/database"
import { X } from "lucide-react"

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  if (images.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">No images in the gallery yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-muted text-left transition-all duration-300 hover:ring-2 hover:ring-primary/50"
          >
            <Image
              src={image.image_url}
              alt={image.caption || image.title || "Gallery image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {(image.title || image.caption) && (
                <div className="p-4">
                  {image.title && (
                    <p className="text-sm font-medium text-white">
                      {image.title}
                    </p>
                  )}
                  {image.caption && (
                    <p className="text-xs text-white/70">{image.caption}</p>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -right-2 -top-2 z-10 rounded-full bg-background p-1.5 shadow-lg"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-auto max-h-[80vh] overflow-hidden rounded-xl">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.caption || selectedImage.title || "Gallery image"}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                />
              </div>
              {selectedImage.title && (
                <p className="mt-3 text-center text-lg font-medium text-white">
                  {selectedImage.title}
                </p>
              )}
              {selectedImage.caption && (
                <p className="mt-1 text-center text-sm text-white/70">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
