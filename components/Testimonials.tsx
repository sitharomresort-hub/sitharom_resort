'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "We visited with family and the experience was truly exceptional. The peaceful ambiance, coupled with their amazing hospitality, made us feel right at home. The local Kerala cuisine served was simply out of this world.",
    name: "Rajesh Nair",
    location: "Thiruvananthapuram, Kerala"
  },
  {
    quote: "Needed a quiet break from the Bangalore traffic and this villa was the perfect escape! The private pool is incredibly well-maintained. We loved sitting by the balcony with our morning filter coffee.",
    name: "Anjali & Vikram",
    location: "Bengaluru, Karnataka"
  },
  {
    quote: "The property is breathtaking. We drove down from Mysore and the journey was totally worth it. The 2-bedroom villa gave us ample space, and the staff's attention to detail was top-notch. Highly recommend for a staycation.",
    name: "Darshan Gowda",
    location: "Mysuru, Karnataka"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-cream dark:bg-[#120E0A] overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-lg font-semibold tracking-widest uppercase text-clay dark:text-gold mb-4 block transition-colors duration-500">Guest Memories</span>
          <h2 className="text-4xl md:text-5xl font-display text-villa-dark dark:text-sand transition-colors duration-500">
            Words of <em className="text-clay dark:text-gold italic transition-colors duration-500">Elegance</em>
          </h2>
        </motion.div>

        {/* Modern Slider */}
        <div 
          className="relative max-w-5xl mx-auto mt-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative bg-warm-white dark:bg-[#1C1610] border border-sand dark:border-gold/10 p-10 md:p-16 rounded-sm shadow-sm dark:shadow-none min-h-[400px] md:min-h-[350px] flex items-center justify-center mx-4 md:mx-12 transition-colors duration-500">
            <Quote className="absolute top-8 left-8 text-sand-dark dark:text-gold/10 opacity-30 w-24 h-24 rotate-180 pointer-events-none transition-colors duration-500" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 w-full flex flex-col items-center text-center"
              >
                <div className="flex gap-1 text-gold mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                
                <p className="font-display italic text-2xl md:text-3xl text-text-mid dark:text-sand/90 leading-relaxed mb-10 max-w-3xl transition-colors duration-500">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                
                <div className="flex flex-col items-center">
                  <span className="block font-display text-xl text-villa-dark dark:text-sand transition-colors duration-500">{testimonials[currentIndex].name}</span>
                  <span className="block text-xs uppercase tracking-widest text-text-muted dark:text-sand/60 mt-2 transition-colors duration-500">{testimonials[currentIndex].location}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 w-12 h-12 bg-white dark:bg-[#1C1610] rounded-full shadow-md flex items-center justify-center text-text-muted dark:text-sand hover:text-clay dark:hover:text-gold hover:border-clay dark:hover:border-gold border border-transparent dark:border-gold/20 transition-all z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-4 w-12 h-12 bg-white dark:bg-[#1C1610] rounded-full shadow-md flex items-center justify-center text-text-muted dark:text-sand hover:text-clay dark:hover:text-gold hover:border-clay dark:hover:border-gold border border-transparent dark:border-gold/20 transition-all z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentIndex ? "w-8 bg-clay dark:bg-gold" : "w-2 bg-clay/30 dark:bg-gold/30"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
