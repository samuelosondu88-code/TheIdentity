import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import { config } from "./config"

const apps = getApps()

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey,
    }),
    storageBucket: config.storageBucket,
  })
}

export const adminAuth = getAuth()
export const adminDb = getFirestore()
export const adminStorage = getStorage()
