'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BedDouble, 
  CarFront, 
  Tv, 
  Wifi, 
  Refrigerator, 
  Coffee,
  Utensils,
  Waves,
  Snowflake
} from 'lucide-react';

const amenitiesList = [
  { icon: BedDouble, name: '4 Luxury Bedrooms', desc: 'Spacious bedrooms with private balconies and elegant furnishings.' },
  { icon: CarFront, name: 'Private Parking', desc: 'Secure on-site private parking facilities for your vehicles.' },
  { icon: Tv, name: 'Smart TV', desc: 'Premium entertainment at your fingertips.' },
  { icon: Wifi, name: 'High-Speed WiFi', desc: 'Seamless high-speed internet connectivity throughout the villa.' },
  { icon: Refrigerator, name: 'Mini Refrigerator', desc: 'Keep your beverages and snacks perfectly chilled.' },
  { icon: Utensils, name: 'Fully Equipped Kitchen', desc: 'Complete kitchen setup for your culinary needs.' },
  { icon: Waves, name: 'Infinity Pool', desc: 'Relax and rejuvenate in our private pristine infinity pool.' },
  { icon: Snowflake, name: 'Air Conditioning', desc: 'Climate-controlled comfort in every room.' },
  { icon: Coffee, name: 'Welcome Coffee', desc: 'Begin your stay with our signature complimentary brew.' },
];

export default function Amenities() {
  return (
    <section className="bg-transparent pt-28 pb-20 relative overflow-hidden transition-colors duration-500" id="amenities">
      
      {/* Wayanad Nature Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image 
          src="/images/wayanad-mist-hills.jpg" 
          alt="Wayanad Misty Hills Background" 
          fill 
          className="object-cover opacity-[0.06] dark:opacity-[0.04] mix-blend-multiply dark:mix-blend-screen sepia-[0.3]"
          quality={80}
          sizes="100vw"
        />
        {/* Soft elegant vignette overlay to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EE] via-transparent to-[#F8F4EE] dark:from-[#1C1610] dark:to-[#1C1610] opacity-80" />
      </div>

      {/* Subtle Mist/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#B9925B]/5 dark:bg-gold/5 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-lg font-semibold tracking-widest uppercase text-gold mb-4 block">Signature Amenities</span>
          <h2 className="text-2xl md:text-3xl font-display text-villa-dark dark:text-warm-white transition-colors duration-500">
            Uncompromising <em className="text-gold italic">Luxury</em>
          </h2>
          <div className="w-16 h-[1px] bg-gold/20 mx-auto mt-6" />
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl relative z-10 mb-16">
          {amenitiesList.map((amenity, idx) => (
            <AmenityCard key={idx} amenity={amenity} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

function AmenityCard({ amenity, idx }: { amenity: any, idx: number }) {
  const Icon = amenity.icon;
  
  return (
    <motion.div 
      className="p-8 group bg-[#F8F4EE] dark:bg-[#1C1610]/60 backdrop-blur-md transition-all duration-500 flex flex-col items-center text-center rounded-[24px] border border-[#B9925B]/20 dark:border-warm-white/10 hover:border-[#B9925B]/60 hover:bg-white dark:hover:bg-[#1C1610]/85 hover:shadow-[0_20px_40px_-15px_rgba(185,146,91,0.15)] dark:hover:shadow-[0_15px_35px_-10px_rgba(201,169,110,0.1)] hover:-translate-y-2 cursor-pointer relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
    >
      {/* Premium Icon Display */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-8 rounded-3xl bg-[#F8F4EE] border border-[#B9925B]/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-[0_0_25px_rgba(185,146,91,0.2)] group-hover:border-[#B9925B]/40 dark:bg-[#1C1610]">
        <Icon strokeWidth={1} size={64} className="text-[#B9925B] transition-transform duration-500 group-hover:scale-105" />
      </div>

      <h3 className="font-display text-2xl text-villa-dark dark:text-warm-white tracking-wide transition-colors duration-500 mb-4">{amenity.name}</h3>
      
      <p className="text-base font-light text-text-mid dark:text-text-muted leading-relaxed transition-colors duration-500">
        {amenity.desc}
      </p>
    </motion.div>
  );
}
