import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { adminAuth } from "@/lib/firebase/admin"
import AdminSidebar from "@/components/AdminSidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("__session")?.value
  const uid = cookieStore.get("__session-uid")?.value

  if (!session || !uid) {
    redirect("/admin/login")
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true)

    if (decoded.role !== "admin") {
      redirect("/admin/login")
    }
  } catch {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-background p-8">{children}</div>
    </div>
  )
}
