'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Where exactly is Sitharom Resort located?",
    a: "We're located in Old Vythiri, Wayanad, Kerala — about 30 minutes from Kalpetta and close to Soochipara Falls and Edakkal Caves."
  },
  {
    q: "Is the swimming pool private?",
    a: "Yes. Each villa has its own completely private pool. You won't share it with any other guests."
  },
  {
    q: "Is Sitharom couple-friendly?",
    a: "Absolutely. We welcome couples, honeymooners, and families equally. Unmarried couples are welcome."
  },
  {
    q: "Is food available at the resort?",
    a: "Yes, we offer in-villa dining with authentic Kerala cuisine. Please inform us of dietary preferences in advance."
  },
  {
    q: "How far is Sitharom from Bangalore?",
    a: "Approximately 270 km — around 5–6 hours by road via NH275."
  },
  {
    q: "What is the best time to visit Wayanad?",
    a: "October to February for clear skies and trekking. June to September for lush green monsoon magic."
  },
  {
    q: "How many villas are available?",
    a: "Only 2 villas — Ithal Villa and Harsham Villa. Each has 2 bedrooms and a private pool."
  },
  {
    q: "Can I book for a group/corporate event?",
    a: "Yes. We can accommodate private group bookings for both villas together. Contact us for pricing."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section 
      className="relative overflow-hidden py-24 text-villa-dark dark:text-sand border-t border-sand-dark dark:border-gold/10 transition-colors duration-500 bg-transparent" 
      id="faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Ambient glows ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
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

      <div className="relative z-10 container mx-auto px-6 max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span 
            className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3 block font-bold"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Got Questions?
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-display leading-tight mb-4 font-light text-villa-dark dark:text-sand transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                className="bg-warm-white/80 dark:bg-[#1C1610]/80 backdrop-blur-md border border-sand-dark/50 dark:border-gold/20 rounded-2xl overflow-hidden hover:border-gold/40 dark:hover:border-gold/40 shadow-sm hover:shadow-lg transition-all duration-500"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-display text-lg md:text-xl text-villa-dark dark:text-sand tracking-wide font-light transition-colors duration-500">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.8}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-sand-dark/50 dark:border-gold/10 text-xs md:text-sm font-light text-text-muted dark:text-sand/70 leading-relaxed text-left transition-colors duration-500">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

