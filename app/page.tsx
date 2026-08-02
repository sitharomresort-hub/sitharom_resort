import dynamic from 'next/dynamic';
import Image from 'next/image';
import Hero from '@/components/Hero';
import StatsRibbon from '@/components/StatsRibbon';

const About = dynamic(() => import('@/components/About'), { ssr: true });
const Villas = dynamic(() => import('@/components/Villas'), { ssr: true });
const Amenities = dynamic(() => import('@/components/Amenities'), { ssr: true });
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const WhyWayanad = dynamic(() => import('@/components/WhyWayanad'), { ssr: true });
const NearbyAttractions = dynamic(() => import('@/components/NearbyAttractions'), { ssr: true });
const ExperiencePackages = dynamic(() => import('@/components/ExperiencePackages'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const BookingForm = dynamic(() => import('@/components/BookingForm'), { ssr: true });

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsRibbon />
      {/* Seamless background for About and Villas */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-cream to-sand dark:from-[#120E0A] dark:to-[#18130E] transition-colors duration-500">
        {/* Misty Rainforest Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-[0.25] dark:opacity-[0.12] transition-opacity duration-500 mix-blend-multiply dark:mix-blend-lighten">
          <Image 
            src="/images/misty_rainforest_bg.png" 
            alt="Misty Rainforest Background" 
            fill
            className="object-cover grayscale-[20%]"
            quality={80}
            priority
          />
        </div>
        
        {/* Soft Mist Gradients Background */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-clay/10 dark:from-gold/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-[#4A5D4E]/10 dark:from-[#2E3A31]/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-clay/10 dark:from-gold/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <About />
          <Villas />
        </div>
      </div>

      {/* Seamless background for Amenities and Gallery */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-cream dark:from-[#0F0A06] dark:to-[#120E0A] transition-colors duration-500">
        {/* Tropical Leaf Shadows Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-[0.35] dark:opacity-[0.12] transition-opacity duration-500 mix-blend-multiply dark:mix-blend-lighten">
          <Image 
            src="/images/tropical_shadows_bg.png" 
            alt="Tropical Leaf Shadows Background" 
            fill
            className="object-cover grayscale-[10%]"
            quality={80}
            priority
          />
        </div>
        
        {/* Soft glowing orbs */}
        <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-clay/10 dark:from-gold/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-[#4A5D4E]/10 dark:from-[#2E3A31]/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10">
          <Amenities />
          <Gallery />
        </div>
      </div>

      <Experience />
      <WhyWayanad />
      <NearbyAttractions />
      <ExperiencePackages />
      <Testimonials />
      
      {/* Seamless background for FAQ and Booking */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* We use standard img to avoid next/image layout issues in this specific wrapper context if needed, or stick to Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/wayanad-landscape.png)' }}
          />
          <div className="absolute inset-0 bg-villa-dark/40 dark:bg-black/50 transition-colors duration-500" />
        </div>
        <div className="relative z-10">
          <FAQ />
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
