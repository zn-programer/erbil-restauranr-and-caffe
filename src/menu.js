/** @format */
import "./App.css"
import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartCotextAPI } from "./cartContext";
import Swal from "sweetalert2";
import OrderNowDialog from "./orderNow";
import { fetchProducts } from "./dataBaseConnection";
export default function Menu({ setIsOpenCart }) {
  const [activeCat, setActiveCat] = useState("كريب وافل");
  const [visibleCount, setVisibleCount] = useState(6); // الحالة للتحكم في عدد العناصر الظاهرة
  const categories = [
    "كريب وافل",
    "مشروبات ساخنة",
    "مشروبات باردة",
    "كص",
    "بيتزا",
  ];
  const [isOpenOrderNow, setIsOpenOrderNow] = useState(false);
  const onCloseOrderNow = () => {
    setIsOpenOrderNow(false);
  };
  const [itemToOrderNow, setItemToOrderNow] = useState({});
  const { setCart } = useContext(CartCotextAPI);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts(setLoading, setProducts);
  }, []);
  const handleAddClick = (item) => {
    const nowCartItems =
      localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart"))
      : [];
    let newCart = [];
    if (nowCartItems.some((element) => element.id === item.id)) {
      newCart = nowCartItems.map((element) =>
        element.id === item.id ?
          { ...element, count: element.count + 1 }
        : element,
      );
    } else {
      newCart = [...nowCartItems, { ...item, count: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    background: "#111",
    color: "#fff",
    iconColor: "#d4af37", // لون الأيقونة ذهبي متناسق
    didOpen: (toastEl) => {
      // غيرت الاسم لـ toastEl لتجنب التعارض
      toastEl.addEventListener("mouseenter", Swal.stopTimer);
      toastEl.addEventListener("mouseleave", Swal.resumeTimer);
      toastEl.style.zIndex = "10000"; // رقم عالٍ جداً لضمان الظهور فوق المودال
    },
  });
  // تصفية العناصر بناءً على الفئة المختارة
  const filteredItems = products.filter((i) => i.category === activeCat);

  return (
    <>
      <div className='category-nav shadow-sm mb-5'>
        <div
          className='container d-flex flex-nowrap overflow-auto no-scrollbar py-2'
          style={{
            display: "flex",
            direction: "rtl", // يجعل نقطة البداية من اليمين للحاسوب والموبايل
            gap: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            WebkitOverflowScrolling: "touch",
            justifyContent: "start", // سيبدأ من اليمين بسبب وجود direction: rtl
          }}>
          {categories.map((c) => (
            <button
              key={c}
              className={`btn btn-cat ${activeCat === c ? "active" : ""}`}
              onClick={() => {
                setActiveCat(c);
                setVisibleCount(6); // إعادة التصفير عند تغيير الفئة
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className='row g-4 text-end' dir='rtl'> {/* زيادة المسافة بين الكروت g-4 */}
  <AnimatePresence>
    {filteredItems.slice(0, visibleCount).map((item) => (
      <div key={item.id} className='col-12 col-xl-6'> {/* col-xl-6 ليكون صفين في الشاشات الكبيرة جداً */}
        
        {/* الأنيميشن القديم بالضبط */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className='premium-food-card-horizontal d-flex align-items-center'
        >
          {/* قسم الصورة الدائرية الحقيقية مع البادج */}
          <div className='img-section position-relative'>
            <span className='static-price-badge-v4'>{item.price} د.ع</span>
            
            {/* هنا يتم قص الصورة لتصبح دائرية تماماً */}
            <div className='true-circle-img-wrapper'>
              <img
                src={item.image_url}
                className='food-img-v4'
                alt={item.name}
              />
            </div>
            
            {/* تأثير إضاءة خلفي خفيف للصورة */}
            <div className='img-glow-effect'></div>
          </div>

          {/* تفاصيل الوجبة مع مساحات داخلية محسنة */}
          <div className='details-section flex-grow-1 d-flex flex-column justify-content-between text-end'>
            <div>
              <h5 className='food-title-v4 mb-2 fw-bold text-truncate'>
                {item.name}
              </h5>
              <p className='text-secondary small mb-0 food-desc-v4'>
                {item.description}
              </p>
            </div>

            {/* الأزرار مع مسافة مريحة mt-3 */}
            <div className='d-flex gap-3 mt-3'>
              <button
                onClick={() => {
                  handleAddClick(item);
                  toast.fire({ icon: "success", title: "تمت إضافة الوجبة للقائمة" });
                }}
                className='btn btn-outline-warning w-100 rounded-pill py-2 border-2 fw-bold action-btn'
              >
                + القائمة
              </button>
              <button
                onClick={() => {
                  setItemToOrderNow(item);
                  setIsOpenOrderNow(true);
                }}
                className='btn btn-warning w-100 rounded-pill py-2 fw-bold text-dark action-btn order-now-btn'
              >
                اطلب الآن
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    ))}
  </AnimatePresence>
</div>      {/* اطلب الان */}
      <OrderNowDialog
        isOpen={isOpenOrderNow}
        onClose={onCloseOrderNow}
        item={itemToOrderNow}
      />
      {/* زر عرض المزيد بتصميم جذاب */}
      {visibleCount < filteredItems.length && (
        <div className='text-center mt-5 mb-5'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setVisibleCount(visibleCount + 6)}
            className='btn py-3 px-5 rounded-pill'
            style={{
              border: "1px solid #d4af37",
              color: "#d4af37",
              background: "transparent",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}>
            عرض المزيد من الأطباق
          </motion.button>
        </div>
      )}
    </>
  );
}
