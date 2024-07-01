import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sentences = [
  "Free shipping on orders over $80!",
  "Easy returns within 30 days of purchase",
  "Discover our best-selling products",
  "Subscribe to our newsletter for exclusive offers"
];

const variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
};

const AnimatedSentences = () => {
  const [visibleSentence, setVisibleSentence] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isPageVisible) return;

    const interval = setInterval(() => {
      setVisibleSentence(prev => (prev + 1) % sentences.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [isPageVisible]);

  return (
    <div className="relative overflow-hidden h-4 flex justify-center items-center"> 
      <AnimatePresence initial={false}>
        <motion.div
          key={visibleSentence}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center text-xs font-semibold"
        >
          {sentences[visibleSentence]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSentences;
