import { Music, Instagram, Youtube, Twitter, Film, Headphones } from "lucide-react"

const platformConfig: Record<string, { icon: typeof Music; label: string; color: string }> = {
  spotify: { icon: Music, label: "Spotify", color: "hover:text-[#1DB954]" },
  apple: { icon: Music, label: "Apple Music", color: "hover:text-[#fa243c]" },
  youtube: { icon: Youtube, label: "YouTube", color: "hover:text-[#FF0000]" },
  instagram: { icon: Instagram, label: "Instagram", color: "hover:text-[#E4405F]" },
  facebook: { icon: Film, label: "Facebook", color: "hover:text-[#1877F2]" },
  twitter: { icon: Twitter, label: "Twitter", color: "hover:text-[#1DA1F2]" },
  tiktok: { icon: Music, label: "TikTok", color: "hover:text-[#000000]" },
  audiomack: { icon: Headphones, label: "Audiomack", color: "hover:text-[#FFA200]" },
  boomplay: { icon: Music, label: "Boomplay", color: "hover:text-[#3F8CFF]" },
  soundcloud: { icon: Headphones, label: "SoundCloud", color: "hover:text-[#FF3300]" },
}

interface SocialLink {
  platform: string
  url: string
}

interface SocialLinksProps {
  links: SocialLink[]
  size?: "sm" | "md" | "lg"
}

export default function SocialLinks({ links, size = "md" }: SocialLinksProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const config = platformConfig[link.platform.toLowerCase()]
        if (!config) return null
        const Icon = config.icon
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[size]} inline-flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-all duration-200 ${config.color} hover:border-primary/30 hover:bg-background`}
            aria-label={`Follow us on ${config.label}`}
          >
            <Icon className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"}`} />
          </a>
        )
      })}
    </div>
  )
}
