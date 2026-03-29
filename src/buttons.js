/** @format */

import React from "react";
import { motion } from "framer-motion";
import { MapPin, PhoneCall, ShieldCheck, Briefcase } from "lucide-react";

const ActionButtons = ({
  setIsOpenContact,
  setIsOpenJobs,
  setIsOpenManagement,
}) => {
  const actions = [
    {
      id: 1,
      title: "عرض موقعنا",
      icon: <MapPin size={32} />,
      color: "#d4af37",
      desc: "هيت - قرب الجسر",
    },
    {
      id: 2,
      title: "تواصل معنا",
      icon: <PhoneCall size={32} />,
      color: "#d4af37",
      desc: "اتصال مباشر أو انستغرام",
    },
    {
      id: 3,
      title: "كادر الادارة",
      icon: <ShieldCheck size={32} />,
      color: "#d4af37",
      desc: "مدراء المطعم و المقهى",
    },
    {
      id: 4,
      title: "فرص العمل",
      icon: <Briefcase size={32} />,
      color: "#d4af37",
      desc: "انضم إلى فريق أربيل",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className='py-5' style={{ backgroundColor: "#050505" }}>
      <div className='container'>
        <motion.div
          className='row g-4'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}>
          {actions.map((action) => (
            <div
              onClick={() => {
                if (action.title === "تواصل معنا") {
                  setIsOpenContact(true);
                }
                if (action.title === "فرص العمل") {
                  setIsOpenJobs(true);
                }
                if (action.title === "عرض موقعنا") {
                  window.open(
                    "https://www.google.com/maps/place//@33.643857,42.8260638,19.2z?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
                  );
                }
                if (action.title === "كادر الادارة") {
                  setIsOpenManagement(true);
                }
              }}
              key={action.id}
              className='col-6 col-md-3'>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#151515",
                  borderColor: "#d4af37",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: "20px",
                  padding: "30px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  height: "100%",
                  transition: "border-color 0.3s ease",
                }}>
                {/* الأيقونة مع توهج خفيف */}
                <div
                  style={{
                    color: action.color,
                    marginBottom: "15px",
                    filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))",
                  }}>
                  {action.icon}
                </div>

                {/* النصوص */}
                <h6
                  className='fw-bold mb-1'
                  style={{ color: "#fff", fontSize: "1rem" }}>
                  {action.title}
                </h6>
                <p className='mb-0' style={{ fontSize: "0.75rem" }}>
                  {action.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActionButtons;
