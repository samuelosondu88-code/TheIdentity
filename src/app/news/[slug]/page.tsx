import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { NewsArticle } from "@/types/database"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const articles = await listDocuments<NewsArticle>("news", [Query.equal("slug", slug), Query.equal("status", "published")])
  return articles[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: "Article Not Found" }
  return {
    title: article.title,
    description: article.content.replace(/<[^>]*>/g, "").slice(0, 160),
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(article.published_at || article.created_at)}
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
          <div
            className="prose prose-invert prose-violet mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>
    </>
  )
}
