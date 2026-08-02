'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>
    ),
    title: "Monsoon Mist",
    desc: "Wayanad transforms into a green paradise during rains. Perfect for couples who love misty mornings and rain on the canopy roof.",
    bgImage: "/images/Monsoon Mist.webp"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    ),
    title: "Canopy Plantations",
    desc: "Aromatic tea, coffee, and pepper plantations stretch for miles. Explore private plantation walks steps from your veranda.",
    bgImage: "/images/Canopy Plantations.webp"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    title: "Western Ghats Horizon",
    desc: "Wake up to mist-covered peaks on the horizon, with wild valleys below shifting dynamically in the breeze.",
    bgImage: "/images/Western Ghats Horizon.jpg"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    title: "Wildlife Sanctuary",
    desc: "Home to exotic birds, elephants, and some of India's richest rainforest biodiversity, offering absolute natural wonder.",
    bgImage: "/images/Wildlife Sanctuary wayand.jpg"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    title: "Ancient Heritage",
    desc: "Explore prehistoric caves, tribal history, and rich cultural legacies of the Kerala mountain tribes.",
    bgImage: "/images/Ancient Heritage.jpg"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
    ),
    title: "Effortless Access",
    desc: "~4.5 hrs from Bangalore · ~3 hrs from Kozhikode Airport · ~4 hrs from Cochin.",
    bgImage: "/images/Effortless Access.jpg"
  }
];

export default function WhyWayanad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={containerRef} className="py-28 md:py-36 bg-villa-dark dark:bg-[#161917] text-warm-white border-t border-gold/10 relative overflow-hidden transition-colors duration-500">
      {/* Cinematic Parallax Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 h-[124%] -top-[12%] w-full"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/wayanad image1.avif"
            alt="Cinematic Wayanad landscape featuring mist-covered Western Ghats mountains"
            fill
            className="object-cover object-center pointer-events-none select-none brightness-[0.85] dark:brightness-[0.4] contrast-[0.9] dark:contrast-[0.95] saturate-[1.1] dark:saturate-[0.75] transition-all duration-500"
            sizes="100vw"
            priority
          />
        </motion.div>
        {/* Dark Overlay to give a lightly dark feel */}
        <div className="absolute inset-0 bg-villa-dark/40 dark:bg-black/50 transition-colors duration-500" />
      </div>

      {/* Background Cinematic Rainforest Mist */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-gold/5 to-transparent blur-[140px] rounded-full pointer-events-none animate-mist-slow opacity-40 z-[3]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-gradient-to-bl from-[#2E3A31]/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-mist-slow-reverse opacity-45 z-[3]" />
      
      {/* Subtle Mist Overlay directly behind cards — reduced opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(240,235,225,0.35)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(22,25,23,0.7)_90%)] pointer-events-none z-[3] transition-colors duration-500" />

      {/* Dynamic fireflies CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes firefly-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(0.6); opacity: 0.1; }
          40% { transform: translate(25px, -45px) scale(1.1); opacity: 0.6; }
          70% { transform: translate(10px, -70px) scale(0.8); opacity: 0.3; }
        }
        @keyframes firefly-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0.2; }
          50% { transform: translate(-35px, -55px) scale(1.2); opacity: 0.7; }
          80% { transform: translate(-15px, -25px) scale(0.7); opacity: 0.1; }
        }
        @keyframes firefly-glow-3 {
          0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0.05; }
          45% { transform: translate(20px, -35px) scale(1.0); opacity: 0.5; }
          75% { transform: translate(-8px, -60px) scale(0.7); opacity: 0.2; }
        }
        .firefly {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #FAF7F2;
          box-shadow: 0 0 8px 2px rgba(250, 247, 242, 0.6), 0 0 3px 1px rgba(255, 255, 255, 0.8);
          pointer-events: none;
          z-index: 5;
        }
      `}} />

      {/* Floating Fireflies Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10 opacity-10 dark:opacity-70 transition-opacity duration-500">
        <div className="firefly" style={{ left: '12%', top: '30%', animation: 'firefly-glow-1 12s infinite ease-in-out', animationDelay: '0s' }} />
        <div className="firefly" style={{ left: '28%', top: '60%', animation: 'firefly-glow-2 15s infinite ease-in-out', animationDelay: '2s' }} />
        <div className="firefly" style={{ left: '45%', top: '15%', animation: 'firefly-glow-3 10s infinite ease-in-out', animationDelay: '1s' }} />
        <div className="firefly" style={{ left: '58%', top: '70%', animation: 'firefly-glow-1 14s infinite ease-in-out', animationDelay: '3s' }} />
        <div className="firefly" style={{ left: '72%', top: '40%', animation: 'firefly-glow-2 11s infinite ease-in-out', animationDelay: '0.5s' }} />
        <div className="firefly" style={{ left: '88%', top: '25%', animation: 'firefly-glow-3 13s infinite ease-in-out', animationDelay: '4s' }} />
        <div className="firefly" style={{ left: '18%', top: '75%', animation: 'firefly-glow-3 12s infinite ease-in-out', animationDelay: '1.5s' }} />
        <div className="firefly" style={{ left: '94%', top: '65%', animation: 'firefly-glow-1 16s infinite ease-in-out', animationDelay: '5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto relative">
          {/* Mountain Silhouette behind heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[280px] opacity-[0.04] pointer-events-none select-none z-0">
            <svg viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
              <path d="M0 300 Q150 140 300 220 T600 130 T900 200 T1000 300 Z" fill="currentColor" />
              <path d="M0 300 Q200 190 400 240 T800 170 T1000 300 Z" fill="currentColor" opacity="0.6" />
              <path d="M0 300 Q100 250 250 210 T550 260 T850 220 T1000 300 Z" fill="currentColor" opacity="0.4" />
            </svg>
          </div>

          {/* Warm Golden Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08)_0%,transparent_70%)] blur-[50px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }} />

          <motion.span 
            className="text-[11px] tracking-[0.4em] uppercase text-gold/80 mb-4 block font-light relative z-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Romantic Escape
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-4 font-light text-warm-white relative z-10 transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why Wayanad? <br />
            <em className="text-gold italic font-light font-display">Kerala's Romantic Sanctuary</em>
          </motion.h2>
          <div className="w-20 h-[1px] bg-gold/20 mx-auto mt-8 relative z-10" />
        </div>

        {/* Visual Grid of Light-Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((item, idx) => (
            <motion.div 
              key={idx}
              className="group relative bg-transparent border border-white/20 dark:border-warm-white/10 p-8 md:p-10 min-h-[380px] rounded-2xl transition-all duration-700 flex flex-col justify-end overflow-hidden hover:border-gold/40 dark:hover:border-gold/30 hover:shadow-luxury dark:hover:shadow-[0_8px_32px_rgba(22,25,23,0.15)] cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={item.bgImage} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 brightness-[0.82] dark:brightness-[0.45] contrast-[1.05] saturate-[1.05] dark:saturate-[0.85]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Dark gradient at bottom so text is readable — no white wash at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-villa-dark/85 via-villa-dark/30 to-transparent z-10" />
              </div>

              {/* Content sits on top */}
              <div className="relative z-20 w-full text-left">
                {/* Soft glow outline icon container */}
                <div className="mb-6 text-gold p-3 border border-warm-white/20 rounded-full inline-block bg-black/20 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:bg-gold/20 group-hover:border-gold/50">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl mb-3 text-warm-white tracking-wide font-normal">{item.title}</h3>
                <p className="text-xs md:text-sm font-light text-warm-white/80 leading-relaxed tracking-wide">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
