import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import men from '../assets/images/men.jpg';
import women from '../assets/images/women.jpg';
import advert from '../assets/images/advert.jpg';
import '../styles/index.css';

const images = [men, women, advert];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="slider-container">
        <AnimatePresence exitBeforeEnter={false}>
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`Advert ${currentImage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="slider-image"
          />
        </AnimatePresence>
      </div>
  );
};

export default ImageSlider;
