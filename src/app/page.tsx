import Hero from "@/components/Hero"
import MusicCard from "@/components/MusicCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowRight, Music, Users, Calendar } from "lucide-react"
import VideoCard from "@/components/VideoCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { MusicRelease, Event, Member, GalleryImage, Video } from "@/types/database"

async function getFeaturedRelease() {
  const releases = await listDocuments<MusicRelease>("music_releases", [Query.equal("featured", true), Query.limit(1)])
  return releases[0] || null
}

async function getUpcomingEvent() {
  const today = new Date().toISOString().split("T")[0]
  const events = await listDocuments<Event>("events", [Query.greaterThanEqual("event_date", today), Query.orderAsc("event_date"), Query.limit(1)])
  return events[0] || null
}

async function getFeaturedMembers() {
  return listDocuments<Member>("members", [Query.limit(3)])
}

async function getRecentGallery() {
  return listDocuments<GalleryImage>("gallery", [Query.orderDesc("created_at"), Query.limit(4)])
}

async function getRecentVideos() {
  return listDocuments<Video>("videos", [Query.orderDesc("created_at"), Query.limit(3)])
}

export default async function HomePage() {
  const [featuredRelease, upcomingEvent, members, galleryImages, recentVideos] =
    await Promise.all([
      getFeaturedRelease(),
      getUpcomingEvent(),
      getFeaturedMembers(),
      getRecentGallery(),
      getRecentVideos(),
    ])

  return (
    <>
      <Hero />

      {featuredRelease && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Latest Release</h2>
                <p className="mt-2 text-muted-foreground">
                  Check out our newest music
                </p>
              </div>
              <Link href="/music">
                <Button variant="outline">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mx-auto max-w-sm">
              <MusicCard release={featuredRelease} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Who We Are</h2>
              <p className="mt-4 text-muted-foreground">
                <strong>The Identity</strong> is a Kingdom-centered creative hub
                dedicated to raising creatives who understand their identity in
                Christ and use their gifts to influence culture with excellence,
                truth, and purpose.
              </p>
              <p className="mt-4 text-muted-foreground">
                We exist to disciple, develop, and deploy creatives who see their
                craft as a calling -- not merely a profession. Through spiritual
                formation, creative excellence, and collaborative innovation, we
                empower artists and creators to communicate biblical truth and
                shape society through their work.
              </p>
              <Link href="/about">
                <Button variant="outline" className="mt-6">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="flex h-full items-center justify-center">
                <Music className="h-24 w-24 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {upcomingEvent && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Upcoming Event
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                {upcomingEvent.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {new Date(upcomingEvent.event_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {upcomingEvent.event_time && ` at ${upcomingEvent.event_time}`}
              </p>
              <p className="mt-1 text-muted-foreground">
                {upcomingEvent.venue}, {upcomingEvent.location}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {upcomingEvent.ticket_url && (
                  <Link href={upcomingEvent.ticket_url}>
                    <Button>Get Tickets</Button>
                  </Link>
                )}
                <Link href="/events">
                  <Button variant="outline">
                    All Events <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Featured Members</h2>
                <p className="mt-2 text-muted-foreground">Meet the team</p>
              </div>
              <Link href="/members">
                <Button variant="outline">
                  All Members <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                    <Users className="h-full w-full p-3 text-muted-foreground/30" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {galleryImages.length > 0 && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Latest Moments</h2>
                <p className="mt-2 text-muted-foreground">
                  Behind the scenes and performances
                </p>
              </div>
              <Link href="/gallery">
                <Button variant="outline">
                  View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square overflow-hidden rounded-xl bg-muted"
                >
                  <div className="flex h-full items-center justify-center">
                    <Music className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {recentVideos.length > 0 && (
        <section className="border-t border-border/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Latest Videos</h2>
                <p className="mt-2 text-muted-foreground">Watch our latest videos</p>
              </div>
              <Link href="/videos">
                <Button variant="outline">
                  All Videos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentVideos.map((video) => (
                <VideoCard key={video.id} title={video.title} video_url={video.video_url} description={video.description} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Stay Connected</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Follow The Identity on social media for the latest music, events,
            and behind-the-scenes content.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/music">
              <Button size="lg">
                <Music className="mr-2 h-5 w-5" />
                Listen to Our Music
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
