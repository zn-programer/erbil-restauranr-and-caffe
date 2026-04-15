/** @format */

// استيراد الوظائف المطلوبة من SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// إعدادات تطبيق الويب الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyAOPoHBMH9sdQwyT6SXEmGVv2wG3C_O_Bw",
  authDomain: "orders-f39bb.firebaseapp.com",
  databaseURL: "https://orders-f39bb-default-rtdb.firebaseio.com",
  projectId: "orders-f39bb",
  storageBucket: "orders-f39bb.firebasestorage.app",
  messagingSenderId: "1080783935281",
  appId: "1:1080783935281:web:861335900d80f222ecc210",
  measurementId: "G-JWV5CFZV4Z"
};

// فحص إذا كان التطبيق مفعل مسبقاً لمنع خطأ (Duplicate App)
// هذا السطر مهم جداً لبيئة تطوير React (Fast Refresh)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// تصدير قاعدة البيانات لاستخدامها في الدايالوج وباقي أجزاء المشروع
export const databaseOrders = getDatabase(app);