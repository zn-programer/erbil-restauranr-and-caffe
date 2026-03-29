/** @format */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
export default function SingleItemModal({ isOpen, item, onClose }) {
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const onConfirm = async (orderData) => {
    const BOT_TOKEN = "8712507869:AAE5KCCzHCm4UqZmDId2F4tWbPpiwpZE7qk"; // التوكن الذي حصلت عليه من BotFather
    const CHAT_ID = "1573741391"; // الآيدي الخاص بك أو بالمجموعة

    // تنسيق الرسالة بشكل مرتب ليظهر في تلجرام
    const message = `
🌟 *طلب جديد - ARBIL PRO* 🌟
--------------------------
👤 *الاسم:* ${customerData.name}
📞 *الهاتف:* ${customerData.phone}
📍 *العنوان:* ${customerData.address}
--------------------------
🍲 *الطلبات:*
${`• ${orderData.name}$السعر:${orderData.price} (العدد: ${orderData.count})`}
--------------------------
💰 *المجموع الكلي:* ${orderData.price} دينار
--------------------------
🕒 *الوقت:* ${new Date().toLocaleTimeString("ar-IQ")}
  `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown", // لجعل الخطوط عريضة ومنسقة
      });

      if (response.data.ok) {
        console.log("تم إرسال الطلب بنجاح إلى تلجرام");
        return true;
      }
    } catch (error) {
      console.error("خطأ في إرسال الطلب لتلجرام:", error);
      return false;
    }
  };
  const showSuccessAlert = () => {
    Swal.fire({
      title: "تم إرسال طلبك بنجاح!",
      text: "سيصلك طلبك خلال وقت قصير، شكراً لاختيارك مطعم و مقهى اربيل ",
      icon: "success",
      background: "#111", // خلفية داكنة
      color: "#fff", // لون النص
      confirmButtonText: "حسناً",
      confirmButtonColor: "#d4af37", // لون ذهبي للزر
      iconColor: "#d4af37",
      customClass: {
        popup: "border border-secondary rounded-4 shadow-lg",
        confirmButton: "rounded-pill px-5 fw-bold",
      },
    });
  };
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      <div
        className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3'
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 99999,
          backdropFilter: "blur(8px)",
        }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className='bg-black rounded-4 overflow-hidden border border-secondary shadow-lg'
          style={{ width: "100%", maxWidth: "380px" }} // تقليل العرض الأقصى أيضاً
        >
          {/* صورة مصغرة جداً مع تداخل السعر */}
          <div className='position-relative' style={{ height: "140px" }}>
            {" "}
            {/* تقليل ارتفاع الصورة */}
            <img
              src={item.image_url}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={onClose}
              className='position-absolute top-0 end-0 m-2 btn btn-dark btn-sm rounded-circle p-1 border border-secondary opacity-75'>
              <X size={18} color='#fff' />
            </button>
            <div className='position-absolute bottom-0 start-0 m-2 bg-black px-2 py-0 rounded-pill border border-warning'>
              <span
                style={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}>
                {item.price} د.ع
              </span>
            </div>
          </div>

          <div className='p-3 text-end'>
            {" "}
            {/* تقليل الـ padding من 4 إلى 3 */}
            <h5
              className='fw-bold text-white mb-2'
              style={{ fontSize: "1.1rem" }}>
              {item.name}
            </h5>
            {/* حقول الإدخال بهوامش أقل */}
            <div className='mb-2'>
              <div className='position-relative'>
                <input
                  name='name'
                  value={customerData.name}
                  onChange={handleChange}
                  type='text'
                  className='form-control text-black border-secondary py-1 pe-5 shadow-none text-end small'
                  placeholder='الاسم'
                  style={{
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.9rem",
                  }}
                />
                <User
                  size={14}
                  className='position-absolute top-50 translate-middle-y me-3 text-warning'
                  style={{ right: 0 }}
                />
              </div>
            </div>
            <div className='mb-2'>
              <div className='position-relative'>
                <input
                  name='phone'
                  value={customerData.phone}
                  onChange={handleChange}
                  type='tel'
                  className='form-control text-black border-secondary py-1 pe-5 shadow-none text-end small'
                  placeholder='رقم الهاتف'
                  style={{
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.9rem",
                  }}
                />
                <Phone
                  size={14}
                  className='position-absolute top-50 translate-middle-y me-3 text-warning'
                  style={{ right: 0 }}
                />
              </div>
            </div>
            <div className='mb-2'>
              <div className='position-relative'>
                <input
                  name='address'
                  value={customerData.address}
                  onChange={handleChange}
                  type='text'
                  className='form-control text-black border-secondary py-1 pe-5 shadow-none text-end small'
                  placeholder='العنوان'
                  style={{
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.9rem",
                  }}
                />
                <MapPin
                  size={14}
                  className='position-absolute top-50 translate-middle-y me-3 text-warning'
                  style={{ right: 0 }}
                />
              </div>
            </div>
            <p
              style={{ color: "#d4af37", fontSize: "0.7rem" }}
              className='mb-3 mt-1 text-center'>
              أجور التوصيل داخل هيت 1000 دينار فقط
            </p>
            <button
              disabled={
                !customerData.name ||
                !customerData.phone ||
                !customerData.address
              }
              onClick={() => {
                onConfirm(item);
                onClose();
                showSuccessAlert();
              }}
              className='btn w-100 py-2 fw-bold rounded-pill'
              style={{
                background:
                  (
                    !customerData.name ||
                    !customerData.phone ||
                    !customerData.address
                  ) ?
                    "#222"
                  : "linear-gradient(90deg, #d4af37, #b08d2b)",
                border: "none",
                color: "#000",
                fontSize: "1rem",
              }}>
              إرسال الطلب
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
