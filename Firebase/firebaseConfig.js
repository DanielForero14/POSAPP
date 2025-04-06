// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOufGR6eZd3LfeQ7KUtPDGvubf8QPcGWE",
  authDomain: "posapp-5d135.firebaseapp.com",
  projectId: "posapp-5d135",
  storageBucket: "posapp-5d135.firebasestorage.app",
  messagingSenderId: "620759746938",
  appId: "1:620759746938:web:8e2387f736a7edce18eec3",
  measurementId: "G-TJX08QTTPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
