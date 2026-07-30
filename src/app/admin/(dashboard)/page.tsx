import { listDocuments } from "@/lib/firebase/db"
import type { CollectionName } from "@/lib/firebase/config"
import { Music, Users, Calendar, ImageIcon, Newspaper, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const tables = ["music_releases", "members", "events", "gallery", "news", "contact_messages", "social_links"]
  const stats: Record<string, number> = {}

  for (const table of tables) {
    stats[table] = (await listDocuments(table as CollectionName)).length
  }

  return stats
}

const cards = [
  { key: "music_releases", label: "Music Releases", icon: Music, href: "/admin/music", color: "text-primary" },
  { key: "members", label: "Members", icon: Users, href: "/admin/members", color: "text-accent" },
  { key: "events", label: "Events", icon: Calendar, href: "/admin/events", color: "text-green-500" },
  { key: "gallery", label: "Gallery Images", icon: ImageIcon, href: "/admin/gallery", color: "text-pink-500" },
  { key: "news", label: "News Articles", icon: Newspaper, href: "/admin/news", color: "text-yellow-500" },
  { key: "contact_messages", label: "Messages", icon: MessageSquare, href: "/admin/messages", color: "text-blue-500" },
  { key: "social_links", label: "Social Links", icon: Share2, href: "/admin/social", color: "text-purple-500" },
]

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.key} href={card.href}>
            <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg">
              <card.icon className={`mb-4 h-8 w-8 ${card.color}`} />
              <p className="text-3xl font-bold">{stats[card.key]}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
