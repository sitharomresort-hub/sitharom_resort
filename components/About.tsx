'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import aboutImg from '@/app/gallery/img2.jpeg';

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-transparent text-villa-dark dark:text-sand relative transition-colors duration-500">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Column */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto z-10">
              <Image 
                src={aboutImg} 
                alt="Luxury Villa Interior"
                fill
                placeholder="blur"
                className="object-cover rounded-t-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -inset-4 border border-clay/30 dark:border-gold/30 rounded-t-full -z-10 transition-colors duration-500" />
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:right-10 bg-clay dark:bg-gold text-warm-white dark:text-villa-dark rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl z-20 transition-colors duration-500"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            >
              <span className="font-display text-3xl mb-1">5.0★</span>
              <span className="text-[10px] tracking-widest uppercase font-light px-4 leading-tight">Google Rated</span>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-lg font-medium tracking-widest uppercase text-clay dark:text-gold mb-6 transition-colors duration-500">Welcome to Sitharom, Wayanad</span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
              A Private Rainforest <br />
              Sanctuary in <em className="text-clay dark:text-gold italic transition-colors duration-500">Wayanad</em>
            </h2>
            
            <div className="space-y-6 text-text-mid dark:text-sand/70 font-light leading-relaxed mb-10 transition-colors duration-500">
              <p>
                Tucked away in the misty Western Ghats of Old Vythiri, Sitharom offers two exclusive private pool villas — Ithal Villa and Harsham Villa — where ancient rainforest meets modern luxury. Wake up to birdsong, sip chai on your private deck, and watch the Wayanad mist roll in.
              </p>
              <p>
                With only two villas and the entire property to yourselves, Sitharom offers something rare: complete seclusion, warm Kerala hospitality, and a genuine connection with nature that stays with you long after you leave.
              </p>
            </div>

            <Link 
              href="/#experience" 
              className="text-clay dark:text-gold border-b border-clay dark:border-gold pb-1 text-sm uppercase tracking-widest hover:text-clay-deep dark:hover:text-gold/80 hover:border-clay-deep dark:hover:border-gold/80 transition-colors duration-500"
            >
              Discover The Experience
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
