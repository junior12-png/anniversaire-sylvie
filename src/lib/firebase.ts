// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkUpa5bE3d3WkCC2LsHnt6RF5w6FqeE2s",
  authDomain: "celebration-50-ans-b919f.firebaseapp.com",
  projectId: "celebration-50-ans-b919f",
  storageBucket: "celebration-50-ans-b919f.firebasestorage.app",
  messagingSenderId: "903931026437",
  appId: "1:903931026437:web:bf0d535b9e3646b621d06c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);