// ** Firebase Configuration
// import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDYGv1iXoLkmXJVLnpNErivj3Vo7p9RarM',
  authDomain: 'lynx-admin-dashboard.firebaseapp.com',
  projectId: 'lynx-admin-dashboard',
  storageBucket: 'lynx-admin-dashboard.appspot.com',
  messagingSenderId: '275417098231',
  appId: '1:275417098231:web:55866bcc63bcf80ff570f2',
  measurementId: 'G-6RFX5Z99ZQ',
}

// ** Initialize Firebase
const app = initializeApp(firebaseConfig)

// ** Authentication
export const auth = getAuth(app)

// ** Firebase database
export const db = getFirestore(app)

// ** Storage
export const storage = getStorage(app)

// ** Google Authentication
export const googleProvider = new GoogleAuthProvider()

// const analytics = getAnalytics(app)
