// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKg3EuJiyZS3tTGC9MWT_VJiwB922IyPg",
  authDomain: "netflix-clone-32da1.firebaseapp.com",
  projectId: "netflix-clone-32da1",
  storageBucket: "netflix-clone-32da1.appspot.com",
  messagingSenderId: "505448470684",
  appId: "1:505448470684:web:9214157e627d9cc2523559",
  measurementId: "G-V8961DCMS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);