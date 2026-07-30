import type { Metadata } from "next"
import NewsCard from "@/components/NewsCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { NewsArticle } from "@/types/database"

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from The Identity music group.",
}

async function getNews() {
  return listDocuments<NewsArticle>("news", [Query.equal("status", "published"), Query.orderDesc("published_at")])
}

export default async function NewsPage() {
  const articles = await getNews()

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">News & Updates</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Stay up to date with the latest from The Identity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No news articles yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
