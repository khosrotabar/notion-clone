import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQZIsSfEfpAbvBKCn9sYXKTz8_r6qyjHA",
  authDomain: "notion-clone-58b2a.firebaseapp.com",
  projectId: "notion-clone-58b2a",
  storageBucket: "notion-clone-58b2a.firebasestorage.app",
  messagingSenderId: "665844666252",
  appId: "1:665844666252:web:ca44ec2df19123409510a9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
