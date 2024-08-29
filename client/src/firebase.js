// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fe479.firebaseapp.com",
  projectId: "mern-estate-fe479",
  storageBucket: "mern-estate-fe479.appspot.com",
  messagingSenderId: "820556312191",
  appId: "1:820556312191:web:bd13110a7b7a6b76bb994a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
