import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdnmOoiiPjtbB0r4x3BRDu7LHphylRzKU',
  authDomain: 'chathub-4774.firebaseapp.com',
  projectId: 'chathub-4774',
  storageBucket: 'chathub-4774.appspot.com',
  messagingSenderId: '446958734163',
  appId: '1:446958734163:web:f21232a4b876bb8a66afa6',
  measurementId: 'G-JW6Z27L132',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
