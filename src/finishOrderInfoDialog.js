/** @format */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, User, Truck } from "lucide-react";
import { address } from "framer-motion/client";
import { CartCotextAPI } from "./cartContext";
import { useContext } from "react";
import Swal from "sweetalert2";
export default function CheckoutModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onConfirm,
}) {
  const { cart } = useContext(CartCotextAPI);
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
  const showWarningAlert = (element, war) => {
    Swal.fire({
      title: war,
      text: `يرجى ادخال ${element} قبل اتمام الطلب`,
      icon: "warning",
      background: "#111", // متناسق مع الدارك مود
      color: "#fff",
      confirmButtonText: "حسناً",
      confirmButtonColor: "#d4af37", // اللون الذهبي الخاص بك
      iconColor: "#d4af37",
      customClass: {
        popup: "border border-secondary rounded-4 shadow-lg",
        confirmButton: "rounded-pill px-4 fw-bold",
      },
    });
  };
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className='modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center'
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 4000,
          backdropFilter: "blur(10px)",
        }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className='bg-black rounded-4 shadow-lg border border-secondary overflow-hidden'
          style={{ width: "95%", maxWidth: "450px" }}>
          {/* Header */}
          <div className='p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark'>
            <button onClick={onClose} className='btn text-white p-1'>
              <X size={20} />
            </button>
            <h5 className='m-0 fw-bold text-white'>تأكيد الطلب</h5>
          </div>

          {/* Body */}
          <div className='p-4'>
            {/* الحقول */}
            <div className='mb-3 text-end'>
              <label className='fw-bold text-white mb-2 d-block small'>
                الاسم الكامل
              </label>
              <input
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                type='text'
                className='form-control bg-black text-white border-secondary py-2 shadow-none text-end'
                placeholder='أدخل اسمك هنا'
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <div className='mb-3 text-end'>
              <label className='fw-bold text-white mb-2 d-block small'>
                رقم الهاتف
              </label>
              <input
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                type='tel'
                className='form-control bg-black text-white border-secondary py-2 shadow-none text-end'
                placeholder='07xxxxxxxx'
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <div className='mb-3 text-end'>
              <label className='fw-bold text-white mb-2 d-block small'>
                العنوان بالتفصيل
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                }}
                className='form-control bg-black text-white border-secondary py-2 shadow-none text-end'
                placeholder='المنطقة / القرب من معلم معروف'
                rows='2'
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            {/* ملاحظة التوصيل */}
            <div className='d-flex align-items-center justify-content-end gap-2 mt-2 px-1'>
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}>
                أجور التوصيل داخل هيت 1000 دينار فقط
              </span>
              <Truck size={16} color='#d4af37' />
            </div>
          </div>

          {/* Footer */}
          <div className='p-4 bg-dark border-top border-secondary'>
            <button
              onClick={() => {
                if (
                  formData.name === "" &&
                  formData.phone !== "" &&
                  formData.address !== ""
                ) {
                  showWarningAlert("الاسم", "لا يوجد اسم");
                } else if (
                  formData.phone === "" &&
                  formData.name !== "" &&
                  formData.address !== ""
                ) {
                  showWarningAlert("رقم الهاتف", "لا يوجد رقم هاتف");
                } else if (
                  formData.phone !== "" &&
                  formData.name !== "" &&
                  formData.address === ""
                ) {
                  showWarningAlert("العنوان", "لا يوجد عنوان");
                } else if (
                  formData.name === "" ||
                  formData.phone === "" ||
                  formData.address === ""
                ) {
                  showWarningAlert("كافة البيانات", "قم بادخال كافة البيانات");
                } else {
                  onConfirm(cart);
                  onClose();
                  showSuccessAlert();
                  setFormData({
                    name: "",
                    phone: "",
                    address: "",
                  });
                }
              }}
              className='btn w-100 py-3 fw-bold rounded-pill shadow-lg'
              style={{
                background: "linear-gradient(90deg, #d4af37, #b08d2b)",
                border: "none",
                color: "#000",
                fontSize: "1.1rem",
              }}>
              إرسال الطلب
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
