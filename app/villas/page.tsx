import Villas from '@/components/Villas';
import VillaDetailSection from '@/components/VillaDetailSection';
import Amenities from '@/components/Amenities';

export const metadata = {
  title: "Ithal & Harsham Villas | Sitharom Resort Wayanad",
  description: "Discover Ithal Villa and Harsham Villa — two exclusive private pool villas in the heart of Wayanad, Kerala. Each villa has 2 bedrooms, a private pool, and nestled in lush Western Ghats rainforest.",
};

export default function VillasPage() {
  return (
    <main className="pt-32 bg-cream dark:bg-[#120E0A] transition-colors duration-500">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-villa-dark dark:text-sand mb-6 transition-colors duration-500">
          Our <em className="text-clay dark:text-gold italic transition-colors duration-500">Accommodations</em>
        </h1>
        <p className="text-text-muted dark:text-sand/70 font-light max-w-2xl mx-auto transition-colors duration-500">
          Two exclusive private pool villas nestled deep in the Western Ghats rainforest of Wayanad. 
          Ithal Villa and Harsham Villa each offer 2 bedrooms, a private pool, and complete seclusion — 
          just you, nature, and the mist.
        </p>
      </div>

      <VillaDetailSection />
      <Amenities />
    </main>
  );
}
