// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDatabase, ref, push, onValue, serverTimestamp as realtimeTimestamp } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtOo1aUDRn7bQ5hVXJ62ivJY4yHY0VUZA',
  authDomain: 'chat-app-de536.firebaseapp.com',
  databaseURL: 'https://chat-app-de536-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-de536',
  storageBucket: 'chat-app-de536.appspot.com',
  messagingSenderId: '1041528717244',
  appId: '1:1041528717244:web:206c9c88a1d0ee8627f5b9',
  measurementId: 'G-80N8FH0P97',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const realtimeDatabase = getDatabase(app);
// Export Firebase services
export {
  analytics,
  auth,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  signOut,
  getAdditionalUserInfo,
  db,
  addDoc,
  collection,
  serverTimestamp,
  realtimeDatabase,
  ref,
  push,
  onValue,
  realtimeTimestamp,
};
