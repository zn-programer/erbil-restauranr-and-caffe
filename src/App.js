/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { CartCotextAPI } from "./cartContext";
import Menu from "./menu";
import Cart from "./cart";
import PhotoGallery from "./images";
import ActionButtons from "./buttons";
import ContactModal from "./contact";
import JobsModal from "./jobs";
import ManagementModal from "./management";
import { Instagram, Send, MessageCircle, Linkedin, Facebook } from "lucide-react";
// 1. روابط صور احترافية وشغالة من Unsplash
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap');

  body {
    background-color: #050505;
    color: #fff;
    font-family: 'Cairo', sans-serif;
    overflow-x: hidden;
  }

  /* واجهة الترحيب */
  .hero-section {
    height: 70vh;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(5,5,5,1)), 
                url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1500');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .hero-title {
    font-weight: 900;
    font-size: 3.5rem;
    color: #d4af37; /* لون ذهبي ملكي */
    text-shadow: 2px 2px 10px rgba(0,0,0,0.8);
  }

  /* أزرار التصنيفات */
  .category-nav {
    position: sticky;
    top: 70px;
    z-index: 1000;
    background: rgba(5, 5, 5, 0.8);
    backdrop-filter: blur(15px);
    padding: 15px 0;
  }

  .btn-cat {
    background: transparent;
    color: #aaa;
    border: 1px solid #222;
    padding: 10px 25px;
    margin: 0 5px;
    border-radius: 12px;
    transition: 0.3s;
    white-space: nowrap;
  }

  .btn-cat.active {
    background: #d4af37;
    color: #000;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
  }

  /* بطاقة الطعام */
  .food-card {
    background: #111;
    border-radius: 20px;
    border: 1px solid #1a1a1a;
    transition: 0.4s;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .food-card:hover {
    transform: translateY(-10px);
    border-color: #d4af37;
  }

  .img-container {
    height: 220px;
    overflow: hidden;
  }

  .food-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
  }

  .food-card:hover .food-img {
    transform: scale(1.1);
  }

  .price-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0,0,0,0.7);
    color: #d4af37;
    padding: 5px 15px;
    border-radius: 50px;
    backdrop-filter: blur(5px);
    font-weight: bold;
    border: 1px solid #d4af37;
  }

  /* الأقسام الإضافية */
  .info-box {
    background: linear-gradient(145deg, #111, #080808);
    border-radius: 25px;
    padding: 40px;
    border-left: 5px solid #d4af37;
  }

  /* تخصيص السكرول بار */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }
`;

function App() {
  const [scrolled, setScrolled] = useState(false);
  const cartStartValue =
    localStorage.getItem("cart") ?
      JSON.parse(localStorage.getItem("cart"))
    : [];
  const [cart, setCart] = useState(cartStartValue);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isOpenJobs, setIsOpenJobs] = useState(false);
  const [isOpenManagemenet, setIsOpenManagement] = useState(false);
  const onCloseCart = () => {
    setIsOpenCart(false);
  };
  const onCloseContact = () => {
    setIsOpenContact(false);
  };
  const onCloseJobs = () => {
    setIsOpenJobs(false);
  };
  const onCloseManagement = () => {
    setIsOpenManagement(false);
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CartCotextAPI.Provider value={{ cart, setCart }}>
      <>
        <style>{customStyles}</style>

        {/*  الشريط العلوي  */}
        <nav
          className={`navbar fixed-top transition-all ${scrolled ? "bg-black shadow-lg py-2" : "bg-transparent py-4"}`}
          style={{ transition: "0.4s" }}>
          <div className='container justify-content-center'>
            <span
              className='navbar-brand m-0'
              style={{
                color: "#d4af37",
                fontWeight: 900,
                letterSpacing: "2px",
              }}>
              ERBIL RESTAURANT AND COFFEE
            </span>
            <button
              className={`btn btn-cat`}
              onClick={() => setIsOpenCart(true)}>
              القائمة
            </button>
          </div>
        </nav>

        {/* واجهة الهيرو */}
        <section className='hero-section'>
          <div className='container'>
            {/* أنيميشن للعنوان الرئيسي */}
            <motion.h1
              className='hero-title'
              initial={{ opacity: 0, y: -30 }} // يبدأ من الأعلى ويكون مخفي
              animate={{ opacity: 1, y: 0 }} // ينزل لمكانه الطبيعي ويظهر
              transition={{ duration: 0.5, ease: "easeOut" }} // مدة الحركة ثانية واحدة بسلاسة
            >
              مطعم و مقهى أربيل
            </motion.h1>

            {/* أنيميشن للنص الوصفي (يظهر بعد العنوان بقليل) */}
            <motion.p
              className='lead text-light opacity-75'
              initial={{ opacity: 0, y: 20 }} // يبدأ من الأسفل قليلاً
              animate={{ opacity: 0.5, y: 0 }} // يصعد لمكانه
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} // تأخير 0.5 ثانية ليعطي تراتبية بالظهور
            >
              أسرار اللحم بعجين الأصيل ونكهات أربيل المميزة
            </motion.p>

            {/* إيماءة بسيطة (اختياري): خط ذهبي ينمو تحت العنوان */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                height: "3px",
                background: "#d4af37",
                margin: "20px auto",
                borderRadius: "2px",
              }}
            />
          </div>
        </section>

        <div className='container'>
          {/* المنيو */}
          <Menu setIsOpenCart={setIsOpenCart}/>
          {/* الصور */}
          <PhotoGallery />
          {/* خيارات */}
          <ActionButtons
            setIsOpenContact={setIsOpenContact}
            setIsOpenJobs={setIsOpenJobs}
            setIsOpenManagement={setIsOpenManagement}
          />
          {/* تواصل */}
          <ContactModal isOpen={isOpenContact} onClose={onCloseContact} />
          {/* الوضائف */}
          <JobsModal isOpen={isOpenJobs} onClose={onCloseJobs} />
          {/* الادارة */}
          <ManagementModal
            isOpen={isOpenManagemenet}
            onClose={onCloseManagement}
          />
          {/* قسم المعلومات */}
          <div className='row my-5 pt-5'>
            <div className='col-12'>
              <div className='info-box shadow'>
                <div className='row'>
                  <div className='col-md-7 mb-4'>
                    <h2 style={{ color: "#d4af37" }} className='mb-4'>
                      قصتنا
                    </h2>
                    <p className='opacity-75' style={{ lineHeight: "2" }}>
                      من جبال أربيل إلى ضفاف الفرات، نقلنا لكم أسرار الطبخ
                       الأصيل. نستخدم اللحوم العراقية الطازجة يومياً ونحضر
                      خبزنا في فرننا الخاص لضمان أعلى جودة.
                    </p>
                  </div>
                  <div className='col-md-5'>
                    <h4 className='text-warning mb-3'>ساعات العمل</h4>
                    <ul className='list-unstyled opacity-75'>
                      <li>يومياً: 8:00 صباحا - 3:00 بعد منتصف الليل</li>
                      <li className='mt-3'>📍 هيت -  قرب الجسر</li>
                      <li>📞 للحجز: 07817061806</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الفوتر */}
          <footer className='py-5 text-center'>
            <div className='small'>
              © 2026 مطعم أربيل - جميع الحقوق محفوظة <br />
              تمت البرمجة بواسطة{" "}
              <span className='text-warning'>زيد حازم الطائي</span>
                            <div className='d-flex gap-3 justify-content-center'>
                <a
                  href='https://www.facebook.com/share/1Cxf95fEtq/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Facebook size={20} />
                </a>
                <a
                  href='https://www.instagram.com/zaidaltai5?igsh=ZGoxZ3ExY3hkY3Z0'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Instagram size={20} />
                </a>
                <a
                  href='https://www.linkedin.com/in/zaid-altai-563972381/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Linkedin size={20} />
                </a>
                <a
                  href='https://wa.me/96407870020515'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <MessageCircle size={20} />
                </a>
                <a
                  href='https://t.me/zaid_5z'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Send size={20} />
                </a>
              </div>
            </div>
          </footer>
        </div>
        {/* cart */}
        <Cart isOpen={isOpenCart} onClose={onCloseCart} />
      </>
    </CartCotextAPI.Provider>
  );
}

export default App;
