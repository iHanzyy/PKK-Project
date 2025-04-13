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

const firebaseConfig = {
  apiKey: 'AIzaSyCnzBKqNMWk26ta0j4F6yLAtwoM1FTKthw',
  authDomain: 'clazzsite.firebaseapp.com',
  projectId: 'clazzsite',
  storageBucket: 'clazzsite.firebasestorage.app',
  messagingSenderId: '776418035889',
  appId: '1:776418035889:web:2b9d510be1bc0a6d30ba90',
  measurementId: 'G-GZF4J2HEM6',
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
