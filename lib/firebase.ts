import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQbgVOlpX48HysT1gBh0-Fli_SBZIZWlc",
  authDomain: "purchasing-lanka.firebaseapp.com",
  projectId: "purchasing-lanka",
  storageBucket: "purchasing-lanka.firebasestorage.app",
  messagingSenderId: "1889322398",
  appId: "1:1889322398:web:e251bc08a13810565e428f",
  measurementId: "G-9GBBLJ1WKS"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;