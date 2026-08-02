'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedCounter({ value, suffix = '' }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  const display = useTransform(spring, (current) => {
    // Determine decimal places based on original value
    const hasDecimals = value % 1 !== 0;
    const formatted = hasDecimals ? current.toFixed(1) : Math.round(current).toString();
    return formatted + suffix;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function StatsRibbon() {
  const stats = [
    { value: 2, suffix: "", label: "Private Villas" },
    { value: 2, suffix: "", label: "Bedrooms Each" },
    { value: 100, suffix: "%", label: "Private Pools" },
    { value: 5.0, suffix: "", label: "Google Rated" },
  ];
  
  return (
    <section className="bg-warm-white dark:bg-[#130D08] border-y border-sand-dark dark:border-gold/10 py-8 md:py-10 relative z-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-dark dark:divide-gold/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center justify-center p-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="font-display text-4xl text-clay dark:text-gold mb-2 transition-colors duration-500">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <span className="font-body text-xs tracking-widest uppercase text-text-muted dark:text-sand/60 transition-colors duration-500 text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
