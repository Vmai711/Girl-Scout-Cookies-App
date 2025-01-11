import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB7ebVoo4cI5zOcAekGzAzHxuWMpv0iMAo",
  authDomain: "girl-scout-cookies-app.firebaseapp.com",
  databaseURL: "https://girl-scout-cookies-app-default-rtdb.firebaseio.com",
  projectId: "girl-scout-cookies-app",
  storageBucket: "girl-scout-cookies-app.appspot.com",
  messagingSenderId: "1064101303313",
  appId: "1:1064101303313:web:5f09c397328124f9da4db0",
  measurementId: "G-Q2629JEKY4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);


export { app, auth, db };