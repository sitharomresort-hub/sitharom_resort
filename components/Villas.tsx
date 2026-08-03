'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import room1Img from '@/app/gallery/room1.jpeg';
import room2Img from '@/app/gallery/room2.jpeg';

const villas = [
  {
    id: 'ithal',
    name: 'Ithal Villa',
    price: 'Premium',
    tag: '4 Bedrooms',
    image: room1Img
  },
  {
    id: 'harsham',
    name: 'Harsham Villa',
    price: 'Premium',
    tag: '4 Bedrooms',
    image: room2Img
  }
];

export default function Villas() {
  return (
    <section className="py-24 bg-transparent relative transition-colors duration-500" id="villas">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-lg font-semibold tracking-widest uppercase text-clay dark:text-gold mb-4 block transition-colors duration-500">Our Accommodations</span>
          <h2 className="text-2xl md:text-3xl font-display text-villa-dark dark:text-sand transition-colors duration-500">
            Your Private <em className="text-clay dark:text-gold italic transition-colors duration-500">Sanctuary</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {villas.map((villa, idx) => (
            <motion.div 
              key={villa.id} 
              className="group relative bg-cream dark:bg-[#120E0A] border border-transparent dark:border-gold/10 overflow-hidden flex flex-col h-[500px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(181,69,27,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(201,169,110,0.1)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              {/* Image Container */}
              <div className="relative h-3/4 w-full overflow-hidden">
                <Image 
                  src={villa.image} 
                  alt={villa.name}
                  fill
                  placeholder="blur"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4 bg-cream/90 dark:bg-[#120E0A]/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-clay dark:text-gold shadow-sm z-10 transition-colors duration-500">
                  {villa.tag}
                </div>
              </div>

              {/* Info Container */}
              <div className="absolute bottom-0 left-0 w-full bg-cream dark:bg-[#120E0A] transform transition-transform duration-500 ease-in-out p-6 pt-5">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-display text-2xl text-villa-dark dark:text-sand transition-colors duration-500">{villa.name}</h3>
                  <div className="text-right">
                    <span className="block text-sm text-text-muted dark:text-sand/60 mb-1 transition-colors duration-500">From</span>
                    <span className="font-display text-xl text-clay dark:text-gold transition-colors duration-500">{villa.price}</span>
                  </div>
                </div>
                
                {/* Hidden content that slides up */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden mt-4">
                  <Link 
                    href={`/villas#${villa.id}`}
                    className="block w-full bg-villa-dark dark:bg-gold text-warm-white dark:text-villa-dark text-center py-3 text-xs tracking-widest uppercase hover:bg-clay dark:hover:bg-gold/80 transition-colors duration-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link 
            href="/villas" 
            className="inline-block border border-clay dark:border-gold text-clay dark:text-gold px-8 py-4 text-sm tracking-widest uppercase hover:bg-clay dark:hover:bg-gold hover:text-warm-white dark:hover:text-villa-dark transition-colors duration-500"
          >
            View All Villas
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
