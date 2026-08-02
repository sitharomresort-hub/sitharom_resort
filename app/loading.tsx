'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream dark:bg-[#120E0A] transition-colors duration-500">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant pulsing logo or ring */}
        <motion.div 
          className="w-16 h-16 rounded-full border border-clay/20 dark:border-gold/20 border-t-clay dark:border-t-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className="text-xs tracking-[0.3em] uppercase text-clay/70 dark:text-gold/70 font-display"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Curating Your Experience
        </motion.p>
      </div>
    </div>
  );
}
