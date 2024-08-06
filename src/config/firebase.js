// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtOo1aUDRn7bQ5hVXJ62ivJY4yHY0VUZA',
  authDomain: 'chat-app-de536.firebaseapp.com',
  projectId: 'chat-app-de536',
  storageBucket: 'chat-app-de536.appspot.com',
  messagingSenderId: '1041528717244',
  appId: '1:1041528717244:web:206c9c88a1d0ee8627f5b9',
  measurementId: 'G-80N8FH0P97',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// Export Firebase services
export { app, analytics, auth, firestore, storage, messaging };
