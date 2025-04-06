// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOufGR6eZd3LfeQ7KUtPDGvubf8QPcGWE",
  authDomain: "posapp-5d135.firebaseapp.com",
  projectId: "posapp-5d135",
  storageBucket: "posapp-5d135.appspot.com",
  messagingSenderId: "620759746938",
  appId: "1:620759746938:web:8e2387f736a7edce18eec3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
