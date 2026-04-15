/** @format */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Info, MapPin } from "lucide-react";
import { ref, get, child } from "firebase/database";
import { db } from "./firebaseConfig"; // تأكد من إعداد ملف الكونفيج
export default function JobsModal({ isOpen, onClose }) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobs("jobs");
  }, []);
  if (!isOpen) return null;
  async function fetchJobs(path) {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        setJobs(Object.values(snapshot.val()));
      } else {
        console.log("لا توجد بيانات في هذا المسار");
        return null;
      }
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  }
  // الخيار الأول: جلب البيانات مرة واحدة فقط (مثلاً عند تشغيل التطبيق)

  const gold = "#D4AF37"; // لون الذهب الخاص بهوية المطعم

  return (
    <AnimatePresence>
      <div
        className='modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center'
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 3000,
          backdropFilter: "blur(10px)",
        }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className='bg-black rounded-4 shadow-lg border border-secondary p-0'
          style={{
            width: "95%",
            maxWidth: "500px",
            border: "1px solid rgba(212, 175, 55, 0.2) !important",
          }}>
          {/* Header */}
          <div className='p-4 text-center border-bottom border-secondary position-relative'>
            <h4 className='m-0 fw-bold text-white'>
              فرص العمل <span style={{ color: gold }}>المتاحة</span>
            </h4>
            <button
              onClick={onClose}
              className='btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center'
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "8px",
                color: "white",
              }}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className='p-4' style={{ maxHeight: "60vh", overflowY: "auto" }}>
            {jobs.length === 0 ?
              <div className='text-center py-5'>
                <Briefcase size={48} className='mb-3 text-white-50' />
                <h5 className='fw-bold text-white'>لا توجد فرص عمل حالياً</h5>
                <p style={{ color: "#aaa" }}>يرجى معاودة التحقق في وقت لاحق</p>
              </div>
            : jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className='p-4 mb-3 rounded-3'
                  style={{
                    backgroundColor: "#111",
                    borderRight: `4px solid ${gold}`,
                    direction:"rtl"
                  }}>
                  <h5 className='fw-bold mb-2' style={{ color: gold }}>
                    {job.title}
                  </h5>
                  <p
                    className='mb-3 text-white'
                    style={{ lineHeight: "1.6", fontSize: "14px" }}>
                    {job.description}
                  </p>
                  <div
                    className='d-flex align-items-center gap-2'
                    style={{ color: "#00d1ff", fontSize: "13px" }}>
                    <Info size={14} />
                    <span>للتقديم: يرجى مراجعة إدارة المطعم </span>
                  </div>
                </motion.div>
              ))
            }
          </div>

          {/* Footer */}
          <div className='p-4 bg-dark rounded-bottom-4 border-top border-secondary'>
            <div
              className='d-flex align-items-center justify-content-center gap-2'
              style={{ color: "white" }}>
              <MapPin size={16} style={{ color: gold }} />
              <span className='small'>العنوان: هيت - قرب الجسر </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
