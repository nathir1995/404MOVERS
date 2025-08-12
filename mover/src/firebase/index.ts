import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrt3pufqoeYZlipaTBmYPvpBMSRwwdg9s",
  authDomain: "mover-404.firebaseapp.com",
  projectId: "mover-404",
  storageBucket: "mover-404.appspot.com",
  messagingSenderId: "1098510248875",
  appId: "1:1098510248875:web:61093dd3471a0da50880ee",
  measurementId: "G-XSBF71H3WX",
};

// ✅ FIXED: Initialize with error handling
let app;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.info("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Initialize with null values to prevent app crashes
  app = null;
  auth = null;
  db = null;
  storage = null;
}

export { app, auth, db, storage };
