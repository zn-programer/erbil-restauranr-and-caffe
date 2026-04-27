/** @format */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDT2YQQZjUBrE0LPVA08ZKh3KgEAFOTJNU",
  authDomain: "jobs-d4bd9.firebaseapp.com",
  databaseURL: "https://jobs-d4bd9-default-rtdb.firebaseio.com",
  projectId: "jobs-d4bd9",
  storageBucket: "jobs-d4bd9.firebasestorage.app",
  messagingSenderId: "612067822945",
  appId: "1:612067822945:web:9cc5388d0b480ac1c64920",
  measurementId: "G-E69X22F69W"
};

// 1. إعطاء اسم فريد جداً لهذا التطبيق (مثلاً "jobs_app") 
// لتمييزه عن "erbil_app" الخاص بالطلبات
const app = !getApps().find(a => a.name === "jobs_app") 
  ? initializeApp(firebaseConfig, "jobs_app") 
  : getApp("jobs_app");

// 2. تمرير رابط قاعدة البيانات الخاص بالوظائف يدوياً لقطع الشك باليقين
export const db = getDatabase(app, "https://jobs-d4bd9-default-rtdb.firebaseio.com");