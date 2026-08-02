'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BedDouble, 
  CarFront, 
  Tv, 
  Wifi, 
  Refrigerator, 
  Coffee 
} from 'lucide-react';

const amenitiesList = [
  { icon: BedDouble, name: '4 Bedrooms', desc: 'Spacious bedrooms with private balconies.', image: '/images/amenity-bedroom.png' },
  { icon: CarFront, name: 'Parking', desc: 'Secure on-site parking facilities.', image: '/images/amenity-parking.png' },
  { icon: Tv, name: 'Smart TV', desc: 'Entertainment at your fingertips.', image: '/images/amenity-tv.png' },
  { icon: Wifi, name: 'Free Wi-Fi', desc: 'High-speed internet connectivity.', image: '/images/amenity-wifi.png' },
  { icon: Refrigerator, name: 'Mini Refrigerator', desc: 'Keep your beverages and snacks cool.', image: '/images/amenity-fridge.png' },
  { icon: Coffee, name: 'Kettle', desc: 'In-room tea and coffee making facilities.', image: '/images/amenity-kettle.png' },
];

export default function Amenities() {
  return (
    <section className="bg-transparent pt-28 pb-20 relative transition-colors duration-500" id="amenities">
      
      {/* Soft background light-luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-clay/10 dark:bg-gold/5 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4 block">Signature Amenities</span>
          <h2 className="text-4xl md:text-5xl font-display text-villa-dark dark:text-warm-white transition-colors duration-500">
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
      className="p-6 md:p-8 group bg-warm-white/75 dark:bg-[#1C1610]/60 backdrop-blur-md transition-all duration-500 flex flex-col items-start rounded-2xl border border-white/60 dark:border-warm-white/10 hover:border-gold/40 dark:hover:border-gold/35 hover:bg-warm-white/95 dark:hover:bg-[#1C1610]/85 hover:shadow-[0_20px_40px_-15px_rgba(201,169,110,0.2)] dark:hover:shadow-[0_15px_35px_-10px_rgba(201,169,110,0.1)] hover:-translate-y-2 cursor-pointer relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
    >
      {/* Premium Amenity Image Display */}
      <div className="relative aspect-[16/10] w-full mb-6 overflow-hidden rounded-xl bg-[#161917]/20 border border-warm-white/5">
        <Image
          src={amenity.image}
          alt={amenity.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.8] contrast-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Soft elegant vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 pointer-events-none" />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 border border-gold/30 rounded-xl text-gold group-hover:bg-gold group-hover:text-villa-dark dark:group-hover:text-villa-dark transition-all duration-500 bg-warm-white/5 backdrop-blur-sm">
          <Icon strokeWidth={1.5} size={22} />
        </div>
        <h3 className="font-display text-xl text-villa-dark dark:text-warm-white tracking-wide transition-colors duration-500">{amenity.name}</h3>
      </div>
      <p className="text-sm font-light text-text-mid dark:text-text-muted leading-relaxed pl-1 transition-colors duration-500">
        {amenity.desc}
      </p>
    </motion.div>
  );
}
