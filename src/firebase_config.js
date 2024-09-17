// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ebVoo4cI5zOcAekGzAzHxuWMpv0iMAo",
  authDomain: "girl-scout-cookies-app.firebaseapp.com",
  projectId: "girl-scout-cookies-app",
  storageBucket: "girl-scout-cookies-app.appspot.com",
  messagingSenderId: "1064101303313",
  appId: "1:1064101303313:web:5f09c397328124f9da4db0",
  measurementId: "G-Q2629JEKY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
