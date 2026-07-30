import type { Metadata } from "next"
import VideoCard from "@/components/VideoCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { Video } from "@/types/database"

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch videos from The Identity — music videos, performances, behind the scenes, and more.",
}

async function getVideos() {
  return listDocuments<Video>("videos", [Query.orderDesc("created_at")])
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Videos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch our latest music videos, performances, and behind the scenes content.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {videos.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No videos yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video.id} title={video.title} video_url={video.video_url} description={video.description} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
