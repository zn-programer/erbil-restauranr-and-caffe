// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC99FcUVRcG-zUlh4LsEMTN4RgWwunp5U",
  authDomain: "erbil-jobs.firebaseapp.com",
  databaseURL: "https://erbil-jobs-default-rtdb.firebaseio.com",
  projectId: "erbil-jobs",
  storageBucket: "erbil-jobs.firebasestorage.app",
  messagingSenderId: "709783001048",
  appId: "1:709783001048:web:87bb2636999cdc32a2c4ad",
  measurementId: "G-MXBH4KLLQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);