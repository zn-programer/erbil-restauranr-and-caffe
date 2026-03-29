import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Star, } from 'lucide-react';

export default function ManagementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const gold = "#D4AF37";

  const managers = [
    {
      id: 1,
      name: "كرم محمد",
      role: "المدير التنفيذي",
      image: "/karam.webp",
      bio: "خبرة في إدارة المطاعم ."
    },
    {
      id: 2,
      name: "ياسر",
      role: "مدير العمليات",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "مسؤول عن جودة الخدمة وتطوير تجربة الزبائن."
    }
  ];

  return (
    <AnimatePresence>
      <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 3500, backdropFilter: 'blur(12px)' }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-black rounded-4 shadow-lg border border-secondary overflow-hidden"
          style={{ width: '95%', maxWidth: '600px' }}
        >
          {/* Header */}
          <div className="p-4 text-center border-bottom border-secondary position-relative bg-dark">
            <h4 className="m-0 fw-bold text-white">
               كادر <span style={{ color: gold }}>الإدارة</span>
            </h4>
            <button 
              onClick={onClose} 
              className="btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
              style={{ width: '35px', height: '35px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 d-flex flex-column flex-md-row gap-4 justify-content-center align-items-center">
            {managers.map((manager, index) => (
              <motion.div
                key={manager.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-4 rounded-4 flex-grow-1"
                style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.03)', width: '100%' }}
              >
                <div className="position-relative d-inline-block mb-3">
                  <img 
                    src={manager.image} 
                    alt={manager.name} 
                    className="rounded-circle border border-2 border-warning shadow-lg"
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderColor: `${gold} !important` }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow" style={{ backgroundColor: gold }}>
                    <Award size={16} color="black" />
                  </div>
                </div>
                
                <h5 className="fw-bold text-white mb-1">{manager.name}</h5>
                <div className="badge mb-3 py-2 px-3" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: gold, border: `1px solid ${gold}30` }}>
                  {manager.role}
                </div>
                <p className="text-white-50 small mb-0 px-2" style={{ lineHeight: '1.5' }}>
                  {manager.bio}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 text-center border-top border-secondary bg-black">
            <div className="d-flex justify-content-center gap-2 align-items-center">
               <Star size={14} fill={gold} color={gold} />
               <span className="text-white fw-bold small">فريق متميز لخدمتكم دائماً</span>
               <Star size={14} fill={gold} color={gold} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}