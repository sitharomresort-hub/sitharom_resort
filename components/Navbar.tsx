'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logoImg from '@/app/gallery/logo.png';
import { useBooking } from '@/lib/BookingContext';
import MagneticButton from '@/components/MagneticButton';

export default function Navbar() {
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const hasHero = pathname === '/' || pathname === '/gallery';
  const isSolid = isScrolled || !hasHero;

  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Villas', href: '/villas' },
    { name: 'Amenities', href: '/#amenities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-colors duration-500',
        isSolid 
          ? 'bg-cream/95 dark:bg-[#120E0A]/95 backdrop-blur-md shadow-sm dark:shadow-none border-b border-transparent dark:border-gold/10 py-4 text-villa-dark dark:text-sand' 
          : 'bg-transparent py-6 text-warm-white'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center relative z-50">
          <Image 
            src={logoImg} 
            alt="Sitharom Pool Villa" 
            width={240} 
            height={90} 
            className="h-[90px] w-auto object-contain dark:brightness-[1.15]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton key={link.name} stiffness={200} damping={15}>
              <Link 
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest hover:text-clay dark:hover:text-gold transition-colors px-2 py-1"
              >
                {link.name}
              </Link>
            </MagneticButton>
          ))}

          {/* Desktop Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors focus:outline-none flex items-center justify-center relative overflow-hidden"
              aria-label="Toggle Theme"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                key={theme}
                initial={{ y: 15, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -15, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
              </motion.div>
            </motion.button>
          )}

          <MagneticButton stiffness={150} damping={10}>
            <button 
              onClick={() => openBooking()}
              className="relative overflow-hidden bg-clay text-warm-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-clay-light transition-all duration-300 hover:shadow-[0_4px_15px_rgba(181,69,27,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] group flex items-center justify-center"
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
            </button>
          </MagneticButton>
        </nav>

        {/* Mobile Menu & Theme Controls */}
        <div className="flex items-center gap-4 lg:hidden relative z-50">
          {/* Mobile Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors focus:outline-none flex items-center justify-center relative overflow-hidden"
              aria-label="Toggle Theme"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                key={theme}
                initial={{ y: 15, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -15, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
              </motion.div>
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-villa-dark dark:text-sand" />
            ) : (
              <Menu size={28} className={isSolid ? 'text-villa-dark dark:text-sand' : 'text-warm-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-sand dark:bg-[#120E0A] z-40 flex flex-col justify-center items-center px-6 transition-colors duration-500"
          >
            <nav className="flex flex-col items-center gap-8 text-center text-villa-dark dark:text-sand">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-display text-3xl tracking-widest uppercase hover:text-clay dark:hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBooking();
                }}
                className="relative overflow-hidden bg-clay text-warm-white px-8 py-4 mt-4 text-sm tracking-widest uppercase hover:bg-clay-light transition-all duration-300 hover:shadow-[0_4px_15px_rgba(181,69,27,0.25)] active:scale-[0.98] group flex items-center justify-center"
              >
                <span className="relative z-10">Book Now</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
