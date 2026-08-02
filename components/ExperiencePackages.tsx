'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';
import img7 from '@/app/gallery/img7.jpeg'; // Pool Side
import img8 from '@/app/gallery/img8.jpeg'; // Dining Space
import img5 from '@/app/gallery/img5.jpeg'; // Bedroom
import img9 from '@/app/gallery/img9.jpeg'; // Exterior

const packages = [
  {
    name: "Romantic Escape",
    image: img7,
    bullets: [
      "Private pool with floral decorations",
      "Candlelight dinner served by the pool",
      "Couple Ayurvedic massage session",
      "In-villa floating breakfast"
    ],
    price: "₹14,999 / night",
    message: "✨ Hello Sitharom Resort! I'm interested in booking the Romantic Escape package. Please provide availability and details."
  },
  {
    name: "Family Retreat",
    image: img8,
    bullets: [
      "BBQ night prepared by personal chef",
      "Private plantation guide tour",
      "Campfire setup with wood logs",
      "Vintage board game selections"
    ],
    price: "₹16,999 / night",
    message: "✨ Hello Sitharom Resort! I'm interested in booking the Family Retreat package. Please provide availability and details."
  },
  {
    name: "Wellness Weekend",
    image: img5,
    bullets: [
      "Yoga session at misty sunrise",
      "Personalized Ayurvedic consults",
      "Guided forest meditation walks",
      "Custom organic detox meals"
    ],
    price: "₹13,999 / night",
    message: "✨ Hello Sitharom Resort! I'm interested in booking the Wellness Weekend package. Please provide availability and details."
  },
  {
    name: "Corporate Offsite",
    image: img9,
    bullets: [
      "Full resort exclusivity (both villas)",
      "Private meeting / gathering deck",
      "Guided estate team treks",
      "Custom caterings & host supports"
    ],
    price: "Custom Pricing",
    message: "✨ Hello Sitharom Resort! I'm interested in booking a Corporate Offsite event. Please provide pricing and details."
  }
];

export default function ExperiencePackages() {
  const phoneNumber = "917306197613";

  return (
    <section className="py-24 bg-cream dark:bg-[#120E0A] text-villa-dark dark:text-sand transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span 
            className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3 block font-bold"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Curated Experiences
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-display leading-tight mb-4 font-light text-villa-dark dark:text-sand transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Don't Book a Room. <br />
            <em className="text-gold italic font-light font-display">Book a Memory.</em>
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {/* Package Grid (Floating Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, idx) => {
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(pkg.message)}`;
            
            return (
              <motion.div
                key={idx}
                className="relative group h-[500px] overflow-hidden rounded-2xl border border-gold/15 hover:border-gold/35 shadow-[0_12px_40px_rgba(20,15,10,0.25)] flex flex-col justify-end p-8 text-warm-white bg-villa-dark transition-luxury"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              >
                {/* Background Image */}
                <Image 
                  src={pkg.image} 
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105 z-0 brightness-[0.7] contrast-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                />
                
                {/* Layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-villa-dark via-villa-dark/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                {/* Content */}
                <div className="relative z-20 w-full text-left">
                  <span className="block text-[8px] uppercase tracking-widest text-gold mb-2 font-semibold">Special Package</span>
                  <h3 className="font-display text-3xl mb-4 text-warm-white tracking-wide font-light">{pkg.name}</h3>
                  
                  {/* Bullets */}
                  <ul className="space-y-2 mb-6">
                    {pkg.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs font-light text-warm-white/90">
                        <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex justify-end items-center border-t border-warm-white/10 pt-5 mt-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-gold hover:bg-[#D4B780] active:scale-[0.98] text-villa-dark px-6 py-3 rounded-full text-[10px] tracking-widest uppercase font-bold transition-all shadow-md group/btn"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer-sweep pointer-events-none" />
                      Inquire
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
