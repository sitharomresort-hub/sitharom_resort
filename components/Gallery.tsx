'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

import img3 from '@/app/gallery/img3.jpeg';

import img5 from '@/app/gallery/img5.jpeg';
import img6 from '@/app/gallery/img6.jpeg';
import img7 from '@/app/gallery/img7.jpeg';
import img8 from '@/app/gallery/img8.jpeg';
import img9 from '@/app/gallery/img9.jpeg';

const images = [
  { id: 'img-3', src: img3, label: 'Dining Space' },

  { id: 'img-5', src: img5, label: 'Living Area' },
  { id: 'img-6', src: img6, label: 'Bedroom' },
  { id: 'img-7', src: img7, label: 'Exterior' },
  { id: 'img-8', src: img8, label: 'Pool Side' },
  { id: 'img-9', src: img9, label: 'Balcony View' },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85; // Roughly the width of a card on mobile
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeIndex && index >= 0 && index < images.length) {
        setActiveIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <section className="py-24 bg-transparent relative transition-colors duration-500" id="gallery">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-clay dark:text-gold mb-4 block transition-colors duration-500">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-display text-villa-dark dark:text-sand transition-colors duration-500">
              Glimpse of <em className="text-clay dark:text-gold italic transition-colors duration-500">Paradise</em>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <div className="hidden md:flex gap-4">
              <button onClick={() => scroll('left')} className="p-3 rounded-full border border-clay dark:border-gold text-clay dark:text-gold hover:bg-clay dark:hover:bg-gold hover:text-white dark:hover:text-villa-dark transition-colors duration-500" aria-label="Previous image">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full border border-clay dark:border-gold text-clay dark:text-gold hover:bg-clay dark:hover:bg-gold hover:text-white dark:hover:text-villa-dark transition-colors duration-500" aria-label="Next image">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link 
              href="/gallery" 
              className="text-xs tracking-widest uppercase border-b border-text-muted dark:border-sand/40 pb-1 text-text-muted dark:text-sand/70 hover:text-clay dark:hover:text-gold hover:border-clay dark:hover:border-gold transition-colors duration-500"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </div>

        {/* Slider Setup */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => (
              <motion.div 
                key={img.id}
                className="relative group overflow-hidden bg-sand dark:bg-[#18130E] flex-none w-[85vw] md:w-[400px] lg:w-[500px] h-[400px] md:h-[500px] snap-center cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedImage(idx)}
              >
                <Image 
                  src={img.src} 
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 85vw, 500px"
                  placeholder="blur"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-villa-dark/20 group-hover:bg-villa-dark/40 transition-colors duration-500 flex flex-col items-start justify-end p-8">
                  <div className="flex justify-between w-full items-end">
                    <span className="block font-display text-2xl text-warm-white tracking-widest whitespace-nowrap pl-1 transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                      {img.label}
                    </span>
                    <Maximize2 className="text-warm-white w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex ? "bg-clay dark:bg-gold w-4" : "bg-clay/30 dark:bg-gold/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-villa-dark/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-warm-white hover:text-gold transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center px-4">
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-8 text-warm-white hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl h-full"
              >
                <Image 
                  src={images[selectedImage].src}
                  alt={images[selectedImage].label}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-8 text-warm-white hover:text-gold transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </div>

            <div className="mt-8 text-center">
              <span className="text-gold uppercase tracking-[0.3em] text-xs mb-2 block">
                {selectedImage + 1} / {images.length}
              </span>
              <h3 className="text-warm-white font-display text-2xl tracking-widest">
                {images[selectedImage].label}
              </h3>
            </div>

            {/* Lightbox Thumbnails or Dots */}
            <div className="flex gap-2 mt-8">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    idx === selectedImage ? "bg-gold scale-125" : "bg-warm-white/30"
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
