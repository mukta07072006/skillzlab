import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat with your number
    window.open("https://wa.me/8801877538505", "_blank");
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="text-white" size={24} />
      </button>
    </motion.div>
  );
};

export default WhatsAppFloat;
