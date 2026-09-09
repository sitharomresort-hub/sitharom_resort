import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/app/gallery/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#161917] text-sand pt-20 pb-8 border-t border-gold/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Block */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <Image 
                src={logoImg} 
                alt="Sitharom Pool Villa Logo" 
                width={240} 
                height={90} 
                className="h-[90px] w-auto object-contain dark:brightness-[1.15]"
                priority
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              Experience the pinnacle of tropical luxury at our exclusive private pool villas. 24/7 personalized service, lush gardens, and ultimate privacy await.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Explore</h4>
            <nav className="flex flex-col gap-3 text-base text-text-muted font-light">
              <Link href="/villas" className="hover:text-gold transition-colors inline-block">Our Villas</Link>
              <Link href="/gallery" className="hover:text-gold transition-colors inline-block">Gallery</Link>
              <Link href="/#experience" className="hover:text-gold transition-colors inline-block">Experiences</Link>
              <Link href="/#amenities" className="hover:text-gold transition-colors inline-block">Amenities</Link>
              <Link href="/contact" className="hover:text-gold transition-colors inline-block">Contact Us</Link>
            </nav>
          </div>

          {/* Villas List */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Accommodations</h4>
            <nav className="flex flex-col gap-3 text-base text-text-muted font-light">
              <Link href="/villas#ithal" className="hover:text-gold transition-colors inline-block">Ithal Villa (Full Property)</Link>
              <Link href="/villas#harsham" className="hover:text-gold transition-colors inline-block">Harsham Villa</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Connect</h4>
            <div className="flex flex-col gap-3 text-base text-text-muted font-light">
              <p><a href="https://share.google/10tYNsVAAc5jS2pAT" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Charity, Old Vythiri, Kunnathidavaka,<br/>Vythiri, Kerala 673576</a></p>
              <a href="tel:+917306197613" className="hover:text-gold transition-colors">+91 73061 97613</a>
              <a href="mailto:sitharomresort@gmail.com" className="hover:text-gold transition-colors">sitharomresort@gmail.com</a>
              <a href="https://wa.me/917306197613" className="text-clay-light hover:text-clay transition-colors mt-2 uppercase tracking-wider font-medium text-xs">
                Chat on WhatsApp
              </a>
            </div>
            
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://wa.me/917306197613" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="tel:+917306197613" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-text-muted/20 dark:border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-text-muted">
          <p>&copy; {new Date().getFullYear()} Sitharom Pool Villa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warm-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-warm-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
