import type { Metadata } from "next"
import MusicCard from "@/components/MusicCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { MusicRelease } from "@/types/database"

export const metadata: Metadata = {
  title: "Music",
  description: "Discover the music of The Identity. Listen to our latest releases on Spotify, Apple Music, and more.",
}

async function getMusicReleases() {
  return listDocuments<MusicRelease>("music_releases", [Query.orderDesc("release_date")])
}

export default async function MusicPage() {
  const releases = await getMusicReleases()

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Our Music</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our latest releases and timeless tracks.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {releases.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No music releases yet. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {releases.map((release) => (
                <MusicCard key={release.id} release={release} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Streaming Platforms</h2>
          <p className="mt-4 text-muted-foreground">
            Find our music on your favorite platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Spotify", "Apple Music", "YouTube", "Audiomack", "Boomplay", "SoundCloud"].map(
              (platform) => (
                <span
                  key={platform}
                  className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50"
                >
                  {platform}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
