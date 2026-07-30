"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Users } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"
import type { Member } from "@/types/database"

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [editing, setEditing] = useState<Member | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadMembers() }, [])

  const loadMembers = async () => {
    setLoading(true)
    const res = await fetch("/api/data/members")
    const data = await res.json()
    setMembers(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this member?")) return
    await fetch(`/api/data/members?id=${id}`, { method: "DELETE" })
    loadMembers()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let socialLinks: Record<string, string> = {}
    try {
      socialLinks = JSON.parse(formData.get("social_links") as string || "{}")
    } catch {}

    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      image_url: formData.get("image_url") as string,
      social_links: socialLinks,
    }

    if (editing) {
      await fetch(`/api/data/members?id=${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    } else {
      await fetch("/api/data/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    }

    setShowForm(false)
    setEditing(null)
    loadMembers()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Button onClick={() => { setShowForm(true); setEditing(null) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">{editing ? "Edit Member" : "New Member"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editing?.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" defaultValue={editing?.role} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" name="bio" defaultValue={editing?.bio} />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              <ImageUpload name="image_url" defaultValue={editing?.image_url} folder="member_photos" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_links">Social Links (JSON)</Label>
              <Textarea id="social_links" name="social_links" defaultValue={editing?.social_links ? JSON.stringify(editing.social_links, null, 2) : ""} />
              <p className="text-xs text-muted-foreground">Example: {`{"instagram": "https://instagram.com/...", "twitter": "https://twitter.com/..."}`}</p>
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
      ) : members.length === 0 ? (
        <div className="py-16 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No members yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(member); setShowForm(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
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