"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Music,
  Users,
  Calendar,
  Ticket,
  ImageIcon,
  Newspaper,
  Share2,
  MessageSquare,
  Video,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/music", icon: Music, label: "Music" },
  { href: "/admin/members", icon: Users, label: "Members" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/tickets", icon: Ticket, label: "Tickets" },
  { href: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
  { href: "/admin/videos", icon: Video, label: "Videos" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { href: "/admin/social", icon: Share2, label: "Social Media" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      await fetch("/api/auth", { method: "DELETE" })
    } catch {}
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/admin">
          <span className="text-lg font-bold">
            <span className="text-primary">THE</span> IDENTITY
          </span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
