import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { config } from "./config"

const apps = getApps()

if (!apps.length) {
  initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  })
}

export const auth = getAuth()
export const storage = getStorage()
