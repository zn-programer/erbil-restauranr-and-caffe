import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. روابط صور احترافية وشغالة من الويب (Unsplash)
// اخترت صوراً بأسلوب "Dark Mood" لتتناسب مع DNA المطعم
const galleryImages = [
  { id: 1, src: '/1.webp', alt: 'outside' },
  { id: 2, src: '/2.webp', alt: 'outside' },
  { id: 3, src: '/3.webp', alt: 'inside' },
  { id: 4, src: '/4.webp', alt: 'outside' },
  { id: 5, src: '/5.webp', alt: 'inside' },
  { id: 6, src: '/6.webp', alt: 'inside' },
  { id: 7, src: '/7.webp', alt: 'inside' },
  { id: 8, src: '/8.webp', alt: 'inside' },
];

const PhotoGallery = () => {
  
  // إعدادات حركة الحاوية الرئيسية (ظهور تدريجي للعناصر)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // فرق زمني بسيط بين ظهور كل صورة
      },
    },
  };

  // إعدادات حركة كل صورة عند النزول (تأثير الانزلاق والظهور)
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="gallery" className="py-5" style={{ backgroundColor: '#050505', color: '#fff' }}>
      <div className="container">
        
        {/* عنوان القسم بتصميم ذهبي وفخم */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-uppercase fw-bold" style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '0.8rem' }}>
            Vision of Taste
          </span>
          <h2 className="display-4 fw-bolder mt-2 mb-3" style={{
            fontFamily: "'Reem Kufi', sans-serif",
            background: 'linear-gradient(180deg, #FFFFFF 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            معرض الصور
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '3px', background: '#d4af37', margin: '0 auto' }}
          ></motion.div>
        </motion.div>

        {/* شبكة الصور العصرية (Masonry Grid) */}
        {/* استخدمت CSS Grid مخصص لتحقيق تأثير الشبكة المتداخلة */}
        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // يبدأ الأنيميشن عند ظهور 10% من القسم
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // استجابة ذكية للموبايل
            gridGap: '15px',
            gridAutoRows: '200px', // ارتفاع افتراضي للصفوف
            gridAutoFlow: 'dense', // يملأ الفراغات تلقائياً
          }}
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              key={image.id} 
              className={`gallery-item ${index % 3 === 0 ? 'grid-col-2 grid-row-2' : ''} ${index % 5 === 0 ? 'grid-row-2' : ''}`}
              variants={imageVariants}
              whileHover={{ scale: 1.03, zIndex: 1 }} // تأثير تكبير عند الوقوف بالماوس
              whileTap={{ scale: 0.98 }}   // تأثير ضغط عند اللمس
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '15px',
                border: '1px solid #1a1a1a',
                cursor: 'pointer',
                // تنسيق الـ Grid Items لتغيير الحجم
                gridColumn: index % 3 === 0 ? 'span 2' : 'span 1',
                gridRow: index % 5 === 0 ? 'span 2' : 'span 1',
              }}
            >
              {/* الصورة */}
              <img 
                src={image.src} 
                alt={image.alt} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: '0.5s',
                }} 
              />
              
              {/* تأثير تظليل عند الهوفر مع النص */}
              <motion.div 
                className="image-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  display: 'flex', alignItems: 'flex-end', padding: '20px',
                }}
              >
                <p className="m-0 small fw-bold" style={{ color: '#d4af37' }}>{image.alt}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* تنسيقات CSS مدمجة لتحسين Masonry Grid على الموبايل */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-grid {
            gridTemplateColumns: repeat(auto-fill, minmax(150px, 1fr)) !important;
            gridAutoRows: 150px !important;
          }
          .gallery-item {
            gridColumn: span 1 !important;
            gridRow: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;