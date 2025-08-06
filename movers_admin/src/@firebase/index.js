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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
