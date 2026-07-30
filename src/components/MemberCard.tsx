import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Member } from "@/types/database"
import { Instagram, Twitter, Music } from "lucide-react"

interface MemberCardProps {
  member: Member
}

export default function MemberCard({ member }: MemberCardProps) {
  const socialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
      case "x":
        return <Twitter className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {member.image_url ? (
          <Image
            src={member.image_url}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Music className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="mb-2 text-sm text-primary">{member.role}</p>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {member.bio}
        </p>
        {member.social_links && Object.keys(member.social_links).length > 0 && (
          <div className="flex gap-2">
            {Object.entries(member.social_links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                aria-label={`${member.name}'s ${platform}`}
              >
                {socialIcon(platform)}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
