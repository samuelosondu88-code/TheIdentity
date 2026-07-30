import { NextRequest, NextResponse } from "next/server"
import { listDocuments, createDocument, updateDocument, deleteDocument, getDocument, Query } from "@/lib/firebase/db"
import { collections, type CollectionName } from "@/lib/firebase/config"

const validCollections = Object.keys(collections) as CollectionName[]

type Params = Promise<{ collection: string }>

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { collection } = await params
  if (!validCollections.includes(collection as CollectionName)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
  }
  const { searchParams } = new URL(_req.url)
  const id = searchParams.get("id")
  if (id) {
    const doc = await getDocument(collection as CollectionName, id)
    return NextResponse.json(doc || { error: "Not found" }, { status: doc ? 200 : 404 })
  }
  const data = await listDocuments(collection as CollectionName, [Query.orderDesc("created_at")])
  return NextResponse.json(data)
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { collection } = await params
  if (!validCollections.includes(collection as CollectionName)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
  }
  const body = await req.json()
  const doc = await createDocument(collection as CollectionName, body)
  return NextResponse.json(doc, { status: 201 })
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { collection } = await params
  if (!validCollections.includes(collection as CollectionName)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const body = await req.json()
  delete body.id
  const doc = await updateDocument(collection as CollectionName, id, body)
  return NextResponse.json(doc || { error: "Not found" }, { status: doc ? 200 : 404 })
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { collection } = await params
  if (!validCollections.includes(collection as CollectionName)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  await deleteDocument(collection as CollectionName, id)
  return NextResponse.json({ success: true })
}
