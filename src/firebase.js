import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

// Use environment variables instead of hardcoded values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const galleryCollection = collection(db, 'gallery')

// Gallery CRUD operations
export const getGalleryImages = async () => {
  const snapshot = await getDocs(galleryCollection)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const addGalleryImage = async (imageData) => {
  return await addDoc(galleryCollection, imageData)
}

export const updateGalleryImage = async (id, imageData) => {
  const docRef = doc(db, 'gallery', id)
  return await updateDoc(docRef, imageData)
}

export const deleteGalleryImage = async (id) => {
  const docRef = doc(db, 'gallery', id)
  return await deleteDoc(docRef)
}
