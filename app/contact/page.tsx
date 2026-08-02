import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: "Contact & Reservations | Sitharom Resort Wayanad",
  description: "Contact Sitharom Resort in Wayanad, Kerala for direct villa bookings and inquiries. Call us or send a message on WhatsApp for instant assistance.",
};

export default function ContactPage() {
  return (
    <main className="pt-32 bg-cream dark:bg-[#120E0A] transition-colors duration-500">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-villa-dark dark:text-sand mb-6 transition-colors duration-500">
          Contact <em className="text-clay dark:text-gold italic transition-colors duration-500">Us</em>
        </h1>
        <p className="text-text-muted dark:text-sand/70 font-light max-w-2xl mx-auto transition-colors duration-500">
          Whether you are ready to book your escape or have a specialized request, our dedicated team is at your service 24/7.
        </p>
      </div>

      <div className="container mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center p-8 bg-cream dark:bg-[#1C1610] border border-sand dark:border-gold/10 transition-colors duration-500">
          <span className="font-display text-2xl mb-4 text-clay dark:text-gold transition-colors duration-500">Address</span>
          <p className="font-light text-text-muted dark:text-sand/70 text-sm leading-relaxed transition-colors duration-500">
            <a href="https://share.google/10tYNsVAAc5jS2pAT" target="_blank" rel="noopener noreferrer" className="hover:text-clay dark:hover:text-gold transition-colors">Charity, Old Vythiri, Kunnathidavaka,<br />Vythiri, Kerala 673576</a>
          </p>
        </div>
        <div className="flex flex-col items-center p-8 bg-cream dark:bg-[#1C1610] border border-sand dark:border-gold/10 transition-colors duration-500">
          <span className="font-display text-2xl mb-4 text-clay dark:text-gold transition-colors duration-500">Direct Contact</span>
          <p className="font-light text-text-muted dark:text-sand/70 text-sm flex flex-col gap-2 transition-colors duration-500">
            <a href="tel:+917306197613" className="hover:text-clay dark:hover:text-gold transition-colors font-medium">+91 73061 97613</a>
            <a href="mailto:sitharomresort@gmail.com" className="hover:text-clay dark:hover:text-gold transition-colors">sitharomresort@gmail.com</a>
            <a href="https://wa.me/917306197613" target="_blank" rel="noopener noreferrer" className="hover:text-clay dark:hover:text-gold transition-colors font-medium text-xs text-clay-deep dark:text-gold mt-2">💬 Chat on WhatsApp</a>
          </p>
        </div>
        <div className="flex flex-col items-center p-8 bg-cream dark:bg-[#1C1610] border border-sand dark:border-gold/10 transition-colors duration-500">
          <span className="font-display text-2xl mb-4 text-clay dark:text-gold transition-colors duration-500">Social Media</span>
          <p className="font-light text-text-muted dark:text-sand/70 text-sm flex flex-col gap-2 transition-colors duration-500">
            <a href="https://instagram.com/sitharomresort" target="_blank" rel="noopener noreferrer" className="hover:text-clay dark:hover:text-gold transition-colors">Instagram</a>
            <a href="https://youtube.com/@sitharomresort" target="_blank" rel="noopener noreferrer" className="hover:text-clay dark:hover:text-gold transition-colors">YouTube</a>
          </p>
        </div>
      </div>

      <BookingForm />
    </main>
  );
}
