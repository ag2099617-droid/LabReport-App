import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxXIzlJGuYCxOR91C9XYxsu0dcKJhuc54",
  authDomain: "ai-lab-report-47531.firebaseapp.com",
  projectId: "ai-lab-report-47531",
  storageBucket: "ai-lab-report-47531.firebasestorage.app",
  messagingSenderId: "467871104651",
  appId: "1:467871104651:web:5e96d5808dd37c29ff5e8e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();