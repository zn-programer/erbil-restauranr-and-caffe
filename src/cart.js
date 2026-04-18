/** @format */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react"; // أيقونات بسيطة
import { CartCotextAPI } from "./cartContext";
import { useContext } from "react";
import axios, { all } from "axios";
import OrderInputs from "./finishOrderInfoDialog";
import Swal from "sweetalert2";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { databaseOrders } from "./orders";

const Cart = ({ isOpen, onClose }) => {
  const [finishInputs, setFinishInputs] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isOpenFinishDialog, setIsOpenFinishDialog] = useState(false);
  const onCloseFinishDialog = () => {
    setIsOpenFinishDialog(false);
  };
  const { cart, setCart } = useContext(CartCotextAPI);
  const total = cart.reduce((acc, currentOBJ) => {
    return acc + +currentOBJ.price * currentOBJ.count;
  }, 0);

  //   const sendOrderToTelegram = async (orderData) => {
  //     const BOT_TOKEN = "8712507869:AAE5KCCzHCm4UqZmDId2F4tWbPpiwpZE7qk"; // التوكن الذي حصلت عليه من BotFather
  //     const CHAT_IDs = ["1573741391", "7446937158"]; // الآيدي الخاص بك أو بالمجموعة
  //     let allSuccess = false; // نفترض النجاح في البداية
  //     // تنسيق الرسالة بشكل مرتب ليظهر في تلجرام
  //     const message = `
  // 🌟 *طلب جديد - ARBIL PRO* 🌟
  // --------------------------
  // 👤 *الاسم:* ${finishInputs.name}
  // 📞 *الهاتف:* ${finishInputs.phone}
  // 📍 *العنوان:* ${finishInputs.address}
  // --------------------------
  // 🍲 *الطلبات:*
  // ${orderData.map((item) => `• ${item.name}$السعر:${item.price} (العدد: ${item.count})`).join("\n")}
  // --------------------------
  // 💰 *المجموع الكلي:* ${total} دينار
  // --------------------------
  // 🕒 *الوقت:* ${new Date().toLocaleTimeString("ar-IQ")}
  //   `;

  //     const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  //     for (let i = 0; i < CHAT_IDs.length; i++) {
  //       try {
  //         const response = await axios.post(url, {
  //           chat_id: CHAT_IDs[i],
  //           text: message,
  //           parse_mode: "Markdown", // لجعل الخطوط عريضة ومنسقة
  //         });

  //         if (response.data.ok) {
  //           allSuccess = true;
  //           console.log(allSuccess);
  //         }
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //     return allSuccess;
  //   };
  const onConfirm = async (item) => {
    // المرجع لقاعدة البيانات
    const ordersRef = ref(databaseOrders, "orders");

    // إنشاء مفتاح فريد للطلب
    const newOrderRef = push(ordersRef);

    // الهيكلية التي حددتها أنت بالضبط مع إضافة التوقيت للترتيب
    const data = {
      name: finishInputs.name,
      phone: finishInputs.phone,
      address: finishInputs.address,
      order: [...cart],
      timestamp: serverTimestamp(), // مضافة فقط لضمان ظهور الأحدث أولاً في الداشبورد
      status: "pending",
    };

    try {
      await set(newOrderRef, data);
      console.log("تم رفع الطلب  بنجاح");
    } catch (error) {
      console.error("خطأ أثناء الرفع:", error);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية المظلمة عند فتح السلة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 1040,
            }}
          />

          {/* القائمة الجانبية (Slider) */}
          <motion.div
            initial={{ x: "100%" }} // تبدأ من خارج الشاشة يميناً
            animate={{ x: 0 }} // تدخل للشاشة
            exit={{ x: "100%" }} // تخرج عند الإغلاق
            // transition={{
            //   type: "spring",
            //   damping: 15,
            //   stiffness: 400,
            //   mass: 0.8,
            // }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#0a0a0a",
              borderLeft: "1px solid #1a1a1a",
              zIndex: 1050,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
            }}>
            {/* الهيدر الخاص بالسلة */}
            <div className='p-4 d-flex justify-content-between align-items-center border-bottom border-secondary'>
              <button onClick={onClose} className='btn text-white p-0'>
                <X size={28} />
              </button>
              <h4
                className='m-0 fw-bold'
                style={{
                  color: "#d4af37",
                  fontFamily: "'Tajawal', sans-serif",
                }}>
                طلباتك
              </h4>
            </div>

            {/* قائمة الأطعمة المضافة */}
            <div className='flex-grow-1 overflow-auto p-3'>
              {cart.length > 0 ?
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className='d-flex align-items-center mb-3 p-2'
                    style={{
                      background: "#111",
                      borderRadius: "15px",
                      border: "1px solid #1a1a1a",
                    }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <div className='ms-3 flex-grow-1'>
                      <h6 className='mb-0 fw-bold text-white small'>
                        {item.name}
                      </h6>
                      <span style={{ color: "#d4af37", fontSize: "0.9rem" }}>
                        {item.price} x {item.count} د.ع
                      </span>
                      <div className='d-flex align-items-center mt-2'>
                        <button
                          onClick={() => {
                            const newCart = cart.map((element) => {
                              if (element.id === item.id) {
                                return {
                                  ...element,
                                  count:
                                    element.count !== 1 ? element.count - 1 : 1,
                                };
                              }
                              return element;
                            });
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(newCart),
                            );
                            setCart(newCart);
                          }}
                          className='btn btn-sm btn-outline-secondary py-0 px-2 text-white'>
                          <Minus size={14} />
                        </button>
                        <span className='mx-2 small'>{item.count}</span>
                        <button
                          onClick={() => {
                            const newCart = cart.map((element) => {
                              if (element.id === item.id) {
                                return {
                                  ...element,
                                  count: element.count + 1,
                                };
                              }
                              return element;
                            });
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(newCart),
                            );
                            setCart(newCart);
                          }}
                          className='btn btn-sm btn-outline-warning py-0 px-2'>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newCart = cart.filter((element) => {
                          return element.id !== item.id;
                        });
                        localStorage.setItem("cart", JSON.stringify(newCart));
                        setCart(newCart);
                      }}
                      className='btn text-danger ms-2'>
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              : <div className='text-center mt-5'>
                  <p>القائمة فارغة حالياً..</p>
                </div>
              }
            </div>

            {/* منطقة إتمام الطلب */}
            <div className='p-4 border-top border-secondary bg-black'>
              <div className='d-flex justify-content-between mb-3'>
                <span
                  className='fw-bold'
                  style={{ color: "#d4af37", fontSize: "1.2rem" }}>
                  د.ع {total}
                </span>
                <span>:المجموع الإجمالي</span>
              </div>
              {/* دايالوج اتمام الطلب */}
              <OrderInputs
                formData={finishInputs}
                setFormData={setFinishInputs}
                isOpen={isOpenFinishDialog}
                onClose={onCloseFinishDialog}
                onConfirm={onConfirm}
              />
              <button
                onClick={() => {
                  if (cart.length === 0) {
                    Swal.fire({
                      title: "السلة فارغة!",
                      text: "يرجى إضافة وجبة اواكثر أولاً قبل إتمام الطلب",
                      icon: "warning",
                      background: "#111", // متناسق مع الدارك مود
                      color: "#fff",
                      confirmButtonText: "حسناً، سأختار الآن",
                      confirmButtonColor: "#d4af37", // اللون الذهبي الخاص بك
                      iconColor: "#d4af37",
                      customClass: {
                        popup: "border border-secondary rounded-4 shadow-lg",
                        confirmButton: "rounded-pill px-4 fw-bold",
                      },
                    });
                  } else {
                    setIsOpenFinishDialog(true);
                  }
                }}
                className='btn btn-warning w-100 py-3 fw-bold rounded-pill shadow-lg'
                style={{
                  background: "linear-gradient(90deg, #d4af37, #b08d2b)",
                  border: "none",
                  color: "#000",
                }}>
                إتمام الطلب
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
