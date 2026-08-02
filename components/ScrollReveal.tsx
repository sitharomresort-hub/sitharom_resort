'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  scale?: number;
}

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.95, // 0.9s - 1.2s luxury pacing
  y = 35, // Subtle translation
  blur = 4, // Soft blur reveal
  scale = 0.99 // Extremely gentle scaling
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: y,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        scale: scale,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1], // Premium Apple/Aman cubic-bezier easing
        type: 'tween'
      }}
      style={{ willChange: 'transform, opacity, filter' }} // Enforces GPU acceleration
    >
      {children}
    </motion.div>
  );
};

export default memo(ScrollReveal);
