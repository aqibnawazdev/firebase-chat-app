// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7CIg7d0F0QKCI1vdcvI-RYhNcTkVU2Dg",
    authDomain: "react-chat-app-1fbfa.firebaseapp.com",
    projectId: "react-chat-app-1fbfa",
    storageBucket: "react-chat-app-1fbfa.appspot.com",
    messagingSenderId: "810310439002",
    appId: "1:810310439002:web:e32aba85b99dac5ad3c863"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);