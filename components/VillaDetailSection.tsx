'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, Users, BedDouble, Droplets, Waves, Utensils, Wifi, Tv, Coffee, Refrigerator, Flame, TreePine, Wind, CarFront } from 'lucide-react';
import room1Img from '@/app/gallery/room1.jpeg';
import room2Img from '@/app/gallery/room2.jpeg';
import { useBooking } from '@/lib/BookingContext';

const villas = [
  {
    id: 'full-property',
    name: 'Sitharom Full Property',
    tagline: 'Exclusive access to both Ithal and Harsham villas for large groups',
    price: '₹27,999',
    priceNote: 'per night · 4 Bedrooms',
    image: room1Img,
    imageAlt: 'Sitharom Full Property — Private Pool Villas in Wayanad',
    features: [
      { icon: Waves, label: '2 Infinity Pools' },
      { icon: BedDouble, label: '4 Bedrooms' },
      { icon: Wind, label: '8 Private Balconies' },
      { icon: Coffee, label: '2 Kitchens' },
      { icon: Utensils, label: 'Food Dining Facilities' },
      { icon: Wifi, label: 'High-Speed Wi-Fi' },
      { icon: Tv, label: 'Smart TVs' },
      { icon: Droplets, label: 'Outdoor Showers' },
      { icon: Flame, label: 'Private Campfire Areas' },
      { icon: Refrigerator, label: 'Mini Refrigerators' },
      { icon: TreePine, label: 'Forest & Plantation Access' },
      { icon: CarFront, label: 'Secure Parking' },
    ],
    waMsg: '✨ Hello Sitharom! I\'d like to book the Full Property (Both Villas). Please share availability and pricing.',
  },
  {
    id: 'ithal',
    name: 'Ithal Villa',
    tagline: 'Nestled in the forest canopy with panoramic valley views',
    price: '₹12,999',
    priceNote: 'per night · 2 Bedrooms',
    image: room1Img,
    imageAlt: 'Ithal Villa — Private Pool Villa in Wayanad',
    features: [
      { icon: Waves, label: 'Infinity Pool' },
      { icon: BedDouble, label: '2 Bedrooms' },
      { icon: Wind, label: '4 Private Balconies' },
      { icon: Coffee, label: 'Kitchen' },
      { icon: Utensils, label: 'Food Dining Facilities' },
      { icon: Wifi, label: 'High-Speed Wi-Fi' },
      { icon: Tv, label: 'Smart TV' },
      { icon: Droplets, label: 'Outdoor Shower' },
      { icon: Flame, label: 'Private Campfire Area' },
      { icon: Refrigerator, label: 'Mini Refrigerator' },
      { icon: TreePine, label: 'Forest Trekking Access' },
      { icon: CarFront, label: 'Secure Parking' },
    ],
    waMsg: '✨ Hello Sitharom! I\'d like to book the Ithal Villa. Please share availability and pricing.',
  },
  {
    id: 'harsham',
    name: 'Harsham Villa',
    tagline: 'A breezy highland retreat with open-sky pool and plantation views',
    price: '₹14,999',
    priceNote: 'per night · 2 Bedrooms',
    image: room2Img,
    imageAlt: 'Harsham Villa — Luxury Pool Villa in Vythiri',
    features: [
      { icon: Waves, label: 'Infinity Pool' },
      { icon: BedDouble, label: '2 Bedrooms' },
      { icon: Wind, label: '4 Private Balconies' },
      { icon: Coffee, label: 'Kitchen' },
      { icon: Utensils, label: 'Food Dining Facilities' },
      { icon: Wifi, label: 'High-Speed Wi-Fi' },
      { icon: Tv, label: 'Smart TV' },
      { icon: Flame, label: 'Private Campfire Area' },
      { icon: Refrigerator, label: 'Mini Refrigerator' },
      { icon: TreePine, label: 'Plantation Walk Access' },
      { icon: CarFront, label: 'Secure Parking' },
    ],
    waMsg: '✨ Hello Sitharom! I\'d like to book the Harsham Villa. Please share availability and pricing.',
  },
];

const PHONE = '917306197613';

export default function VillaDetailSection() {
  const { openBooking } = useBooking();

  return (
    <div className="bg-cream">
      {villas.map((villa, idx) => {
        const isEven = idx % 2 === 0;
        const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(villa.waMsg)}`;

        return (
          <section
            key={villa.id}
            id={villa.id}
            className="border-t border-sand-dark scroll-mt-28"
          >
            <div className="container mx-auto px-6 py-20 md:py-28">
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-start`}>

                {/* Image */}
                <motion.div
                  className="w-full lg:w-1/2 relative"
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={villa.image}
                      alt={villa.imageAlt}
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Price badge overlaid */}
                  <div className="absolute bottom-6 left-6 bg-villa-dark/90 backdrop-blur-sm text-warm-white px-5 py-3">
                    <span className="block text-[9px] uppercase tracking-widest text-gold mb-1">Starting From</span>
                    <span className="font-display text-2xl">{villa.price}</span>
                    <span className="text-warm-white/60 text-xs ml-1">/night</span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="w-full lg:w-1/2 flex flex-col text-left"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                  {/* Eyebrow */}
                  <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-3 block">
                    Exclusive Villa
                  </span>

                  {/* Name */}
                  <h2 className="font-display text-4xl md:text-5xl text-villa-dark mb-3">
                    {villa.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-text-muted font-light text-sm leading-relaxed mb-2 italic font-display text-base">
                    {villa.tagline}
                  </p>

                  {/* Spec pill */}
                  <div className="flex flex-wrap items-center gap-3 mb-8 mt-4">
                    {[
                      { icon: BedDouble, label: villa.id === 'full-property' ? '4 Bedrooms' : '2 Bedrooms' },
                      { icon: Users, label: villa.id === 'full-property' ? 'Up to 16 Guests' : '8 Guests' },
                      { icon: Waves, label: villa.id === 'full-property' ? '2 Infinity Pools' : 'Infinity Pool' },
                    ].map(({ icon: Icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 border border-sand-dark px-3 py-1.5 text-xs tracking-wider text-text-mid font-light rounded-full">
                        <Icon size={13} className="text-clay" strokeWidth={1.8} />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 pt-6 border-t border-sand-dark">
                    {villa.features.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 text-sm text-text-mid font-light">
                        <span className="text-clay bg-clay/8 p-1.5 rounded-md flex-shrink-0">
                          <Icon size={14} strokeWidth={1.8} />
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#1ebd5c] transition-colors"
                    >
                      <MessageCircle size={16} />
                      Book This Villa
                    </a>
                    
                    <button
                      onClick={() => openBooking(villa.id)}
                      className="flex-1 flex items-center justify-center gap-2 border border-clay text-clay py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-clay hover:text-warm-white transition-colors"
                    >
                      Check Availability
                    </button>
                  </div>

                  {/* Reassurance */}
                  <p className="text-[10px] text-text-muted tracking-wider mt-4 font-light">
                    ✓ Best price guaranteed &nbsp;·&nbsp; ✓ Free cancellation (48 hrs) &nbsp;·&nbsp; ✓ Instant WhatsApp confirm
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
