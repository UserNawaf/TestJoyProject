// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (get this from Firebase Console > Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyByT4A26ibE-L35_yBXPqQcJAAycsHfs1A",
    authDomain: "testjoy-2958c.firebaseapp.com",
    projectId: "testjoy-2958c",
    storageBucket: "testjoy-2958c.appspot.com",
    messagingSenderId: "1013945106894",
    appId: "1:1013945106894:web:75b21f6534c21786786b9f",
    measurementId: "G-QM2Y6ZN8SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);