import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAMY9ZbsGh8q72pQL7dhmlLGsu3PjrNsww",
  authDomain: "chalo-mile.firebaseapp.com",
  projectId: "chalo-mile",
  storageBucket: "chalo-mile.appspot.com",
  messagingSenderId: "811465882337",
  appId: "1:811465882337:web:35e1d3975ee5625111d5a0",
  measurementId: "G-HVSGQYKHRK"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
