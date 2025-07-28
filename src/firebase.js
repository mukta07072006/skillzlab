// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvPt_WH-TH8TROCmo_hsLsSefMmB8nQHw",
  authDomain: "skillzlab-2fb01.firebaseapp.com",
  projectId: "skillzlab-2fb01",
  storageBucket: "skillzlab-2fb01.firebasestorage.app",
  messagingSenderId: "590106105425",
  appId: "1:590106105425:web:3efcfc4494bc3d448e0a70",
  measurementId: "G-FGSDQBS820"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
