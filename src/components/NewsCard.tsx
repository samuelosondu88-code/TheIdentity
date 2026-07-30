import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { NewsArticle } from "@/types/database"
import { formatDate } from "@/lib/utils"

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/news/${article.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {article.featured_image_url ? (
            <Image
              src={article.featured_image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Calendar className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant={article.status === "published" ? "default" : "secondary"}>
              {article.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {article.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
