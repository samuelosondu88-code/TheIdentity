"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"
import type { NewsArticle } from "@/types/database"

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [editing, setEditing] = useState<NewsArticle | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadArticles() }, [])

  const loadArticles = async () => {
    setLoading(true)
    const res = await fetch("/api/data/news")
    const data = await res.json()
    setArticles(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return
    await fetch(`/api/data/news?id=${id}`, { method: "DELETE" })
    loadArticles()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const slug = (formData.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    const data = {
      title: formData.get("title") as string,
      slug: editing?.slug || slug,
      content: formData.get("content") as string,
      featured_image_url: formData.get("featured_image_url") as string,
      status: formData.get("status") as "published" | "draft",
      published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
    }

    if (editing) {
      await fetch(`/api/data/news?id=${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } else {
      await fetch("/api/data/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }

    setShowForm(false)
    setEditing(null)
    loadArticles()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">News</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">{editing ? "Edit Article" : "New Article"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={editing?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (HTML)</Label>
              <Textarea id="content" name="content" rows={10} defaultValue={editing?.content} required />
            </div>
            <div className="space-y-2">
              <Label>Featured Image</Label>
              <ImageUpload name="featured_image_url" defaultValue={editing?.featured_image_url} folder="news_images" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" name="status" defaultValue={editing?.status || "draft"} className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : articles.length === 0 ? (
        <div className="py-16 text-center">
          <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No articles yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {article.status} &middot; {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(article); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}