/** @format */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

// 1. إعطاء اسم فريد جداً لهذا التطبيق (مثلاً "jobs_app") 
// لتمييزه عن "erbil_app" الخاص بالطلبات
const app = !getApps().find(a => a.name === "jobs_app") 
  ? initializeApp(firebaseConfig, "jobs_app") 
  : getApp("jobs_app");

// 2. تمرير رابط قاعدة البيانات الخاص بالوظائف يدوياً لقطع الشك باليقين
export const db = getDatabase(app, "https://erbil-jobs-default-rtdb.firebaseio.com");