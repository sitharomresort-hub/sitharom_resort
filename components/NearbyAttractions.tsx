'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                    */
/* ─────────────────────────────────────────────────────────────────────── */
const attractions = [
  {
    name: 'Soochipara Waterfalls',
    type: 'Waterfall',
    km: '14 km',
    drive: '30 min',
    image: '/images/Soochipara Waterfalls.jpeg',
    icon: (
      /* Droplets / waterfall */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </svg>
    ),
  },
  {
    name: 'Edakkal Caves',
    type: 'Heritage Site',
    km: '19 km',
    drive: '40 min',
    image: '/images/dakkal Caves.webp',
    icon: (
      /* Landmark */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22V12L12 2l9 10v10"/>
        <path d="M9 22v-4a3 3 0 0 1 6 0v4"/>
        <path d="M3 12h18"/>
      </svg>
    ),
  },
  {
    name: 'Meenmutty Falls',
    type: 'Waterfall',
    km: '12 km',
    drive: '25 min',
    image: '/images/Meenmutty Falls.jpg',
    icon: (
      /* Waves */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.4 1C7 7 7 5 9.6 5c2.4 0 2.4 2 4.8 2 2.4 0 2.4-2 4.8-2 1.2 0 1.8.5 2.4 1"/>
        <path d="M2 12c.6.5 1.2 1 2.4 1C7 13 7 11 9.6 11c2.4 0 2.4 2 4.8 2 2.4 0 2.4-2 4.8-2 1.2 0 1.8.5 2.4 1"/>
        <path d="M2 18c.6.5 1.2 1 2.4 1C7 19 7 17 9.6 17c2.4 0 2.4 2 4.8 2 2.4 0 2.4-2 4.8-2 1.2 0 1.8.5 2.4 1"/>
      </svg>
    ),
  },
  {
    name: 'Banasura Sagar Dam',
    type: 'Scenic Viewpoint',
    km: '28 km',
    drive: '50 min',
    image: '/images/Banasura Sagar Dam.jpg',
    icon: (
      /* Mountain / dam */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 22 10-10 10 10"/>
        <path d="m7 17 5-5 5 5"/>
        <line x1="2" y1="22" x2="22" y2="22"/>
      </svg>
    ),
  },
  {
    name: 'Chembra Peak Trek',
    type: 'Adventure Trek',
    km: '22 km',
    drive: '45 min',
    image: '/images/Chembra Peak Trek.jpg',
    icon: (
      /* Compass */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    name: '900 Kandi Plantation',
    type: 'Plantation Walk',
    km: '6 km',
    drive: '15 min',
    image: '/images/900 Kandi Plantation.avif',
    icon: (
      /* Leaf / plant */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
  {
    name: 'Muthanga Wildlife',
    type: 'Wildlife Sanctuary',
    km: '42 km',
    drive: '1 hr',
    image: '/images/Muthanga Wildlife.jpg',
    icon: (
      /* Paw / wildlife */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2"/>
        <circle cx="18" cy="8" r="2"/>
        <circle cx="20" cy="16" r="2"/>
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
      </svg>
    ),
  },
  {
    name: 'Kalpetta Town',
    type: 'Local Market',
    km: '18 km',
    drive: '35 min',
    image: '/images/Kalpetta Town.jpg',
    icon: (
      /* Storefront */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <path d="M15 22v-4a3 3 0 0 0-6 0v4"/>
        <path d="M2 7h20"/>
        <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────────── */
/*  CARD                                                                    */
/* ─────────────────────────────────────────────────────────────────────── */
function AttractionCard({
  name, type, km, drive, image, icon, idx,
}: (typeof attractions)[0] & { idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: 'easeOut' } }}
      className="group relative overflow-hidden cursor-pointer"
      style={{ borderRadius: 20, height: 400 }}
    >
      {/* ── Photo with zoom ──────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 20 }}>
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={90}
          />
        </div>
      </div>

      {/* ── Base gradient — image always readable ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 20,
          background:
            'linear-gradient(to top, rgba(8,5,2,0.95) 0%, rgba(8,5,2,0.55) 38%, rgba(8,5,2,0.08) 62%, transparent 100%)',
        }}
      />

      {/* ── Hover gold shimmer border ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 20 }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: 20,
            boxShadow: 'inset 0 0 0 1.5px rgba(193,124,69,0.7)',
          }}
        />
        {/* soft gold inner glow at bottom */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', borderRadius: '0 0 20px 20px',
            background: 'linear-gradient(to top, rgba(193,124,69,0.12) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Top row ──────────────────────────────────────────────── */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-20">

        {/* Category icon — circular glass */}
        <div
          style={{
            width: 46, height: 46,
            borderRadius: '50%',
            background: 'rgba(10,6,3,0.60)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(193,124,69,0.40)',
            color: '#c9a96e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(193,124,69,0.15)',
          }}
        >
          {icon}
        </div>

        {/* Distance pill */}
        <div
          style={{
            padding: '5px 13px',
            borderRadius: 999,
            background: 'rgba(10,6,3,0.60)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(193,124,69,0.35)',
            color: '#c9a96e',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            fontFamily: 'var(--font-jost), sans-serif',
          }}
        >
          {km}
        </div>
      </div>

      {/* ── Bottom content panel ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <div
          style={{
            borderRadius: 14,
            padding: '16px 18px 18px',
            background: 'rgba(10,6,3,0.60)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(193,124,69,0.35)',
            borderTop: '1px solid rgba(193,124,69,0.45)',
            transition: 'background-color 0.5s ease, border-color 0.5s ease',
          }}
        >
          {/* Type */}
          <p
            style={{
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c17c45',
              marginBottom: 7,
              fontFamily: 'var(--font-jost), Manrope, sans-serif',
              fontWeight: 500,
            }}
          >
            {type}
          </p>

          {/* Attraction name — large luxury serif */}
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", "Playfair Display", Georgia, serif',
              fontSize: 22,
              fontWeight: 400,
              lineHeight: 1.25,
              color: '#FAF7F2',
              letterSpacing: '0.015em',
              marginBottom: 12,
              transition: 'color 0.5s ease',
            }}
          >
            {name}
          </h3>

          {/* Thin gold divider */}
          <div
            style={{
              height: 1,
              background: 'linear-gradient(to right, rgba(193,124,69,0.50), transparent)',
              marginBottom: 11,
            }}
          />

          {/* Drive time row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {/* clock icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c17c45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span
                style={{
                  fontSize: 11.5,
                  color: 'rgba(250,247,242,0.7)',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-jost), sans-serif',
                  fontWeight: 400,
                  transition: 'color 0.5s ease',
                }}
              >
                {drive} from resort
              </span>
            </div>

            {/* Arrow — slides in on hover */}
            <motion.span
              style={{ color: '#c17c45', fontSize: 16, lineHeight: 1 }}
              initial={{ opacity: 0, x: -6 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="group-hover:opacity-100 opacity-0 transition-all duration-300 translate-x-0 group-hover:translate-x-0 -translate-x-2"
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/*  SECTION                                                                 */
/* ─────────────────────────────────────────────────────────────────────── */
export default function NearbyAttractions() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden transition-colors duration-500 bg-villa-dark dark:bg-black"
    >
      {/* ── Parallax background ──────────────────────────────────── */}
      <motion.div className="absolute inset-0 scale-125" style={{ y: bgY }}>
        <Image
          src="/images/wayanad image2.jpg"
          alt="Wayanad misty highlands"
          fill
          className="object-cover transition-all duration-500 brightness-[0.8] dark:brightness-[1.0]"
          quality={85}
          sizes="100vw"
          priority
        />
        {/* Dark overlay to give a lightly dark feel */}
        <div className="absolute inset-0 bg-villa-dark/40 dark:bg-black/50 transition-colors duration-500" />
        {/* Warm centre bloom */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 35%, var(--color-bloom) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Ambient glows ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position:'absolute', top:'15%', left:'10%',
          width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle, var(--color-glow-1) 0%, transparent 70%)',
          filter:'blur(50px)',
          transition: 'background 0.5s ease',
        }}/>
        <div style={{
          position:'absolute', bottom:'20%', right:'12%',
          width:400, height:400, borderRadius:'50%',
          background:'radial-gradient(circle, var(--color-glow-2) 0%, transparent 70%)',
          filter:'blur(50px)',
          transition: 'background 0.5s ease',
        }}/>
      </div>

      {/* ── Page content ─────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: 1380, padding: '100px 5% 110px' }}
      >

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 items-end">

          {/* Left — Title block */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
              <div style={{ width:32, height:1, background:'rgba(193,124,69,0.6)' }}/>
              <p style={{
                fontSize:10.5, letterSpacing:'0.28em', textTransform:'uppercase',
                color:'#c17c45', fontFamily:'var(--font-jost), sans-serif', fontWeight:500,
              }}>
                Local Sightseeing
              </p>
            </div>

            {/* Main heading */}
            <h2 style={{
              fontFamily:'var(--font-cormorant),"Cormorant Garamond","Playfair Display",Georgia,serif',
              fontSize:'clamp(44px,5.5vw,72px)',
              fontWeight:300,
              lineHeight:1.06,
              color:'#FAF7F2',
              margin:0,
              letterSpacing:'-0.01em',
              transition: 'color 0.5s ease',
            }}>
              Explore Wayanad
            </h2>

            {/* Italic gold accent line */}
            <p style={{
              fontFamily:'var(--font-cormorant),"Cormorant Garamond",Georgia,serif',
              fontSize:'clamp(38px,4.8vw,62px)',
              fontWeight:300,
              fontStyle:'italic',
              lineHeight:1.1,
              color:'#c17c45',
              margin:'6px 0 28px',
              letterSpacing:'-0.005em',
            }}>
              Everything Within Reach
            </p>

            {/* Animated gold rule */}
            <motion.div
              initial={{ scaleX:0 }}
              whileInView={{ scaleX:1 }}
              viewport={{ once:true }}
              transition={{ duration:1.1, delay:0.3, ease:[0.22,1,0.36,1] }}
              style={{ transformOrigin:'left' }}
            >
              <div style={{
                height:1, width:80,
                background:'linear-gradient(to right, #c17c45, rgba(193,124,69,0.15))',
              }}/>
            </motion.div>
          </motion.div>

          {/* Right — Pull quote */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.9, delay:0.18, ease:[0.22,1,0.36,1] }}
            style={{
              borderLeft:'1px solid rgba(193,124,69,0.22)',
              paddingLeft:36,
            }}
          >
            {/* Large decorative quote mark */}
            <p style={{
              fontFamily:'var(--font-cormorant),"Cormorant Garamond",Georgia,serif',
              fontSize:'clamp(17px,1.6vw,21px)',
              fontWeight:300,
              fontStyle:'italic',
              lineHeight:1.8,
              color:'rgba(250,247,242,0.85)',
              marginBottom:20,
              transition: 'color 0.5s ease',
            }}>
              &ldquo;Sitharom sits at the heart of Wayanad &mdash; Soochipara Falls, Edakkal Caves, and misty plantation trails are all within an easy morning&rsquo;s drive from your private villa.&rdquo;
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:20, height:1, background:'rgba(193,124,69,0.45)' }}/>
              <p style={{
                fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
                color:'rgba(193,124,69,0.55)',
                fontFamily:'var(--font-jost), sans-serif', fontWeight:500,
              }}>
                Vythiri &middot; Wayanad &middot; Kerala
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 20 }}
        >
          {attractions.map((a, idx) => (
            <AttractionCard key={idx} {...a} idx={idx} />
          ))}
        </div>

        {/* ── Footer rule ──────────────────────────────────────────── */}
        <motion.div
          className="flex items-center justify-center mt-16 gap-6"
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.5 }}
        >
          <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(193,124,69,0.22))' }}/>
          <p style={{
            fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(184,168,152,0.38)',
            fontFamily:'var(--font-jost), sans-serif',
            whiteSpace:'nowrap',
          }}>
            All distances from Sitharom Resort, Old Vythiri
          </p>
          <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, rgba(193,124,69,0.22))' }}/>
        </motion.div>

      </div>
    </section>
  );
}
