import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL04vghAstDwO_Yckhe8cuAcbQ58iO6so",
  authDomain: "notion-clone-8f865.firebaseapp.com",
  projectId: "notion-clone-8f865",
  storageBucket: "notion-clone-8f865.firebasestorage.app",
  messagingSenderId: "155354012709",
  appId: "1:155354012709:web:65df8d8859534cadf473cc",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
