import { adminStorage } from "./admin"
import { storage } from "./client"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

export async function uploadFile(path: string, file: File) {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

export async function deleteFile(path: string) {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

export function getPublicUrl(path: string) {
  return `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${path}`
}
