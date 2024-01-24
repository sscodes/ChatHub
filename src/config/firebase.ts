import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdnmOoiiPjtbB0r4x3BRDu7LHphylRzKU',
  authDomain: 'chathub-4774.firebaseapp.com',
  projectId: 'chathub-4774',
  storageBucket: 'chathub-4774.appspot.com',
  messagingSenderId: '446958734163',
  appId: '1:446958734163:web:f21232a4b876bb8a66afa6',
  measurementId: 'G-JW6Z27L132',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth();
export const storage: FirebaseStorage = getStorage();
export const db: Firestore = getFirestore();
