'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { adminData } from '@/lib/adminData';
import { useEffect } from 'react';

const experiences = [
  {
    num: "01",
    title: "Private Pool & Relaxation",
    desc: "Unwind in your own private infinity plunge pool with misty forest views as your backdrop. A sanctuary of pure seclusion and calm.",
    image: "/images/experiences/poolvilla.jpeg",
    glow: "rgba(184, 138, 68, 0.25)" // Subtle Bronze Glow
  },
  {
    num: "02",
    title: "Campfire Nights",
    desc: "Gather around a crackling campfire under an open Wayanad sky. Roast marshmallows, sip warm spiced tea, and let the quiet night speak.",
    image: "/images/campfire.jpg",
    glow: "rgba(184, 138, 68, 0.22)" // Subtle Gold Glow
  },
  {
    num: "03",
    title: "Indoor Games",
    desc: "Relax in our luxury indoor lounge with classic games like Carrom, Chess, and cards. Perfect for cozy, rain-swept afternoons.",
    image: "/images/indoor-games.jpg",
    glow: "rgba(184, 138, 68, 0.2)" // Warm Candlelight Bronze Glow
  },
  {
    num: "04",
    title: "Couple Package",
    desc: "A romantic getaway curated exclusively for couples. Includes intimate dining and special arrangements.",
    image: "/images/experiences/couple-new.png",
    glow: "rgba(184, 138, 68, 0.2)"
  },
  {
    num: "05",
    title: "Family",
    desc: "Create lasting memories with your loved ones. Activities and spaces designed for all age groups.",
    image: "/images/experiences/family-new.png",
    glow: "rgba(184, 138, 68, 0.22)"
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [localExperiences, setLocalExperiences] = useState(experiences);

  useEffect(() => {
    const poolUrl = adminData.getSiteImageUrl('exp_pool', '/images/experiences/poolvilla.jpeg');
    const campfireUrl = adminData.getSiteImageUrl('experience_campfire', '/images/campfire.jpg');
    const gamesUrl = adminData.getSiteImageUrl('exp_games', '/images/indoor-games.jpg');
    const coupleUrl = adminData.getSiteImageUrl('exp_couple', '/images/experiences/couple-new.png');
    const familyUrl = adminData.getSiteImageUrl('exp_family', '/images/experiences/family-new.png');
    
    setLocalExperiences(prev => prev.map(exp => {
      if (exp.num === "01") return { ...exp, image: poolUrl };
      if (exp.num === "02") return { ...exp, image: campfireUrl };
      if (exp.num === "03") return { ...exp, image: gamesUrl };
      if (exp.num === "04") return { ...exp, image: coupleUrl };
      if (exp.num === "05") return { ...exp, image: familyUrl };
      return exp;
    }));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  return (
    <section 
      className="relative bg-[#232323] overflow-hidden select-none" 
      id="experience"
      onMouseMove={handleMouseMove}
    >
      {/* SVG Grain Noise Filter for realistic luxury texture */}
      <svg className="hidden">
        <filter id="luxury-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.045 0" />
        </filter>
      </svg>
      {/* Grain Overlay across the entire section */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] z-30" style={{ filter: 'url(#luxury-noise)' }} />

      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen">
        
        {/* LEFT SIDE: Immersive Visual Area (65% width on desktop) */}
        <div className="relative w-full lg:w-[65%] lg:h-full overflow-hidden bg-[#232323] border-b lg:border-b-0 lg:border-r border-[#B8945B]/15 flex flex-col">
          
          {/* Images Stack with crossfade & parallax drift */}
          {localExperiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeIndex === idx ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: activeIndex === idx ? 1.03 : 1.08,
                  y: activeIndex === idx ? [0, -6, 0] : 0,
                }}
                transition={{ 
                  scale: { duration: 12, ease: "linear" },
                  y: { duration: 24, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  unoptimized={exp.image.startsWith('/')}
                  className="object-cover object-center filter brightness-[0.95] contrast-[1.02] saturate-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority={idx === 0}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Subtle Dark Gradient Overlays (20-35%) for rich contrast & text legibility */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#232323]/50 via-[#232323]/10 to-transparent"
          />
          <div 
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#232323]/80 via-transparent to-[#232323]/25"
          />

          {/* Left Content Overlay */}
          <div className="relative lg:absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 lg:p-16 text-[#F7F3EE] min-h-[60vh] lg:min-h-0">
            
            {/* Top Label */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[11px] tracking-[0.35em] text-[#B8945B] font-semibold uppercase font-sans mb-3"
            >
              LIFE AT SITHAROM
            </motion.div>
            
            {/* Main Editorial Text */}
            <div className="max-w-md my-auto py-12 lg:py-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[0.95] text-[#F7F3EE] font-light">
                  Your Days,
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-[#B8945B] mt-2 mb-4 font-light">
                  Perfectly Unplanned
                </h3>
              </motion.div>

              {/* Elegant Gold Divider Line */}
              <motion.div 
                className="w-20 h-[1px] bg-[#B8945B]/40 my-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-sans font-light text-sm md:text-base text-[#F7F3EE]/85 leading-relaxed tracking-wide"
              >
                Your stay at Sitharom extends beyond the confines of your suite. Allow us to orchestrate unforgettable moments in the heart of Vythiri.
              </motion.p>
            </div>
            
            {/* Bottom Branding / Details */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="flex items-center gap-4 text-[10px] tracking-widest text-[#F7F3EE]/40 uppercase font-light font-sans"
            >
              <span>EXPERIENCE LUXURY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8945B]/60" />
              <span>SITHAROM WAYANAD</span>
            </motion.div>
          </div>

        </div>

        {/* RIGHT SIDE: Forest Green Accordion List (35% width on desktop) */}
        <div 
          className="relative w-full lg:w-[35%] h-auto lg:h-full flex flex-col justify-center py-8 lg:py-16 px-6 md:px-12 lg:px-8 overflow-y-visible lg:overflow-y-auto scrollbar-thin scrollbar-thumb-[#B8945B]/30 z-20 bg-[#1F3A32] dark:bg-[#152722] transition-colors duration-500"
        >
          {/* Hand-drawn style floating leaves for luxury boutique forest resort vibe */}
          <div className="absolute right-4 bottom-4 pointer-events-none opacity-[0.06] text-[#B8945B] z-0">
            <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2" />
              <path d="M12 12C14 9 17 7 20 6" />
              <path d="M12 12C9 14 7 17 6 20" />
              <path d="M8 16C10 14 13 13 16 12" />
              <path d="M8 16C7 17 5 19 4 21" />
              <path d="M16 8C14 10 13 13 12 16" />
              <path d="M16 8C17 7 19 5 21 4" />
            </svg>
          </div>
          <div className="absolute left-4 top-4 pointer-events-none opacity-[0.04] text-[#B8945B] z-0 rotate-180">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2" />
              <path d="M12 12C14 9 17 7 20 6" />
              <path d="M12 12C9 14 7 17 6 20" />
            </svg>
          </div>

          <div className="relative w-full max-w-xl mx-auto space-y-4 py-4 z-10">
            {localExperiences.map((exp, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`group relative p-6 lg:p-7 cursor-pointer overflow-hidden transition-all duration-500 rounded-[22px] border text-left ${
                    isActive 
                      ? "bg-[#F7F3EE] border-[#B8945B] shadow-[0_16px_35px_rgba(15,10,5,0.15)] scale-[1.02]" 
                      : "bg-[#F7F3EE]/95 hover:bg-[#F7F3EE] border-transparent hover:border-[#B8945B]/40 shadow-sm hover:shadow-md hover:scale-[1.01]"
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Subtle hover background slide effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B8945B]/3 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
                  
                  {/* Active backdrop glow tracking selection */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-[#B8945B]/5 to-transparent pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active left indicator bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B8945B]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  <div className="relative z-10 flex items-start gap-4 lg:gap-5">
                    {/* Number with active state transition */}
                    <span className={`font-display text-base lg:text-lg transition-all duration-500 ${
                      isActive ? 'text-[#B8945B] scale-110 font-semibold' : 'text-[#232323]/40 group-hover:text-[#B8945B]'
                    }`}>
                      {exp.num}
                    </span>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        {/* Title with hover slide/color transition */}
                        <h3 className={`font-display text-lg lg:text-[21px] transition-all duration-500 transform ${
                          isActive ? 'text-[#232323] translate-x-1 font-normal' : 'text-[#232323]/70 group-hover:text-[#232323] group-hover:translate-x-1'
                        }`}>
                          {exp.title}
                        </h3>
                        {/* Subtle right chevron indicator */}
                        <span className={`text-[#B8945B] transition-all duration-500 transform ${
                          isActive ? 'opacity-100 translate-x-0 rotate-90 scale-110' : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                        }`}>
                          →
                        </span>
                      </div>
                      
                      {/* Accordion description smooth height expansion */}
                      <div 
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
                          isActive ? 'grid-rows-[1fr] opacity-100 mt-2 lg:mt-3' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-sans font-light text-xs lg:text-[13px] text-[#232323]/80 leading-relaxed max-w-sm">
                            {exp.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
