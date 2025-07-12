// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuLcSwAlUnuRm-4ytfl9QhIzjYoTwp2Hw",
  authDomain: "stackit-fe1de.firebaseapp.com",
  projectId: "stackit-fe1de",
  storageBucket: "stackit-fe1de.firebasestorage.app",
  messagingSenderId: "629572135490",
  appId: "1:629572135490:web:9c786104178123781b9bdb",
  measurementId: "G-WR2WDQZNPR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
