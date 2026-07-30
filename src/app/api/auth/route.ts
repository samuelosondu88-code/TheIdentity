import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase/admin"

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()

    const decoded = await adminAuth.verifyIdToken(idToken)

    const isAdmin = decoded.role === "admin"

    if (!isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const expiresIn = 60 * 60 * 24 * 7 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({ success: true, userId: decoded.uid })

    response.cookies.set("__session", sessionCookie, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    response.cookies.set("__session-uid", decoded.uid, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set("__session", "", { maxAge: 0 })
  response.cookies.set("__session-uid", "", { maxAge: 0 })
  return response
}
