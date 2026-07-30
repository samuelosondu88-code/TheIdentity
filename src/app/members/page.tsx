import type { Metadata } from "next"
import MemberCard from "@/components/MemberCard"
import { listDocuments, Query } from "@/lib/firebase/db"
import type { Member } from "@/types/database"

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the talented members of The Identity music group.",
}

async function getMembers() {
  return listDocuments<Member>("members", [Query.orderAsc("created_at")])
}

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Our Members</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The talented individuals behind The Identity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {members.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No members listed yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
