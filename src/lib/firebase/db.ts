import { adminDb } from "./admin"
import { collections, type CollectionName } from "./config"

type WhereFilterOp = "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "not-in" | "array-contains-any"

type WhereConstraint = { type: "where"; field: string; op: WhereFilterOp; value: unknown }
type OrderByConstraint = { type: "orderBy"; field: string; direction: "asc" | "desc" }
type LimitConstraint = { type: "limit"; n: number }
export type QueryConstraint = WhereConstraint | OrderByConstraint | LimitConstraint

function coll(name: CollectionName) {
  return collections[name]
}

function applyConstraints(ref: FirebaseFirestore.CollectionReference | FirebaseFirestore.Query, constraints: QueryConstraint[]) {
  let q: FirebaseFirestore.CollectionReference | FirebaseFirestore.Query = ref
  for (const c of constraints) {
    if (c.type === "where") q = q.where(c.field, c.op, c.value)
    else if (c.type === "orderBy") q = q.orderBy(c.field, c.direction)
    else if (c.type === "limit") q = q.limit(c.n)
  }
  return q
}

function mapDoc(doc: FirebaseFirestore.QueryDocumentSnapshot) {
  const data = doc.data()
  return { id: doc.id, ...data } as Record<string, unknown>
}

export async function listDocuments<T = Record<string, unknown>>(
  collection: CollectionName,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    let ref = adminDb.collection(coll(collection))
    ref = applyConstraints(ref, constraints) as FirebaseFirestore.CollectionReference
    const snapshot = await ref.get()
    return snapshot.docs.map((doc) => mapDoc(doc)) as T[]
  } catch {
    return []
  }
}

export async function getDocument<T = Record<string, unknown>>(
  collection: CollectionName,
  id: string
): Promise<T | null> {
  try {
    const doc = await adminDb.collection(coll(collection)).doc(id).get()
    if (!doc.exists) return null
    return { id: doc.id, ...doc.data() } as T
  } catch {
    return null
  }
}

export async function createDocument<T = Record<string, unknown>>(
  collection: CollectionName,
  data: Record<string, unknown>
): Promise<T> {
  const docRef = await adminDb.collection(coll(collection)).add({
    ...data,
    created_at: new Date().toISOString(),
  })
  const doc = await docRef.get()
  return { id: doc.id, ...doc.data() } as T
}

export async function updateDocument<T = Record<string, unknown>>(
  collection: CollectionName,
  id: string,
  data: Record<string, unknown>
): Promise<T> {
  await adminDb.collection(coll(collection)).doc(id).update(data)
  const doc = await adminDb.collection(coll(collection)).doc(id).get()
  return { id: doc.id, ...doc.data() } as T
}

export async function deleteDocument(collection: CollectionName, id: string) {
  await adminDb.collection(coll(collection)).doc(id).delete()
}

export const Query = {
  equal: (field: string, value: unknown): QueryConstraint => ({ type: "where", field, op: "==", value }),
  greaterThanEqual: (field: string, value: unknown): QueryConstraint => ({ type: "where", field, op: ">=", value }),
  orderAsc: (field: string): QueryConstraint => ({ type: "orderBy", field, direction: "asc" }),
  orderDesc: (field: string): QueryConstraint => ({ type: "orderBy", field, direction: "desc" }),
  limit: (n: number): QueryConstraint => ({ type: "limit", n }),
}
