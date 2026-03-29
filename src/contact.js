import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Phone, ExternalLink } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contactLinks = [
    {
      id: 1,
      label: "إنستغرام",
      value: "@erbilcafee",
      icon: <Instagram size={24} />,
      color: "#E1306C",
      link: "https://www.instagram.com/erbilcafee?igsh=MWtmd2doY21jMWo2bg=="
    },
    {
      id: 2,
      label: "رقم الهاتف",
      value: "07817061806",
      icon: <Phone size={24} />,
      color: "#25D366",
      link: "tel:07817061806",
    }
  ];

  return (
    <AnimatePresence>
      <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2500, backdropFilter: 'blur(8px)' }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          className="bg-dark rounded-4 shadow-lg border border-secondary p-0"
          style={{ width: '90%', maxWidth: '400px', backgroundColor: '#111 !important' }}
        >
          {/* Header */}
          <div className="p-4 text-center border-bottom border-secondary position-relative">
            <h5 className="m-0 fw-bold text-white">تواصل معنا</h5>
          <button 
  onClick={onClose} 
  className="btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
  style={{
    width: '35px',
    height: '35px',
    borderRadius: '10px', // حواف دائرية ناعمة
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // خلفية فاتحة جداً
    border: '1px solid rgba(255, 255, 255, 0.1)', // حدود شبه شفافة
    color: '#888', // لون الأيقونة الافتراضي
    transition: 'all 0.3s ease',
    zIndex: 10
  }}
>
  <X size={18} strokeWidth={3} /> {/* خط الأيقونة أعرض قليلاً ليكون أوضح */}
</button>
          </div>

          {/* Body */}
          <div className="p-4">
            {contactLinks.map((item) => (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: -5 }}
                whileTap={{ scale: 0.98 }}
                className="d-flex align-items-center gap-3 p-3 mb-3 rounded-3 text-decoration-none transition-all"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: 'white'
                }}
              >
                <div className="p-2 rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="flex-grow-1 text-end">
                  <div className="small mb-1">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
                <ExternalLink size={16} />
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-black-50 text-center rounded-bottom-4">
            <p className="small text-muted m-0">نحن متواجدون لخدمتكم يومياً من الساعة 10 صباحاً</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}