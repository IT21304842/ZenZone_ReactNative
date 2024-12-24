import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCinMqvRIhKdLwioLBa7gWbn-I7dmMGMzs",
  authDomain: "zenzonern.firebaseapp.com",
  projectId: "zenzonern",
  storageBucket: "zenzonern.firebasestorage.app",
  messagingSenderId: "404181647106",
  appId: "1:404181647106:web:f4f10b81799b379a010c1b",
  measurementId: "G-E7HNL6G9S3"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
