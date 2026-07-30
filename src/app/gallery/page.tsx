import type { Metadata } from "next"
import GalleryGrid from "@/components/GalleryGrid"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { GalleryImage } from "@/types/database"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the gallery of The Identity - performance photos, behind-the-scenes, and more.",
}

async function getGalleryImages() {
  return listDocuments<GalleryImage>("gallery", [Query.orderDesc("created_at")])
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  const categories = [...new Set(images.map((img) => img.category).filter(Boolean))]

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Gallery</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Moments captured from our journey.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  )
}
