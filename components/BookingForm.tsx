'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MessageCircle } from 'lucide-react';

type FormData = {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  villaType: string;
  message: string;
};

export default function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    // Format dates for a more professional look
    const formatDate = (dateStr: string) => {
      if (!dateStr) return 'Not specified';
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (e) {
        return dateStr;
      }
    };

    const phoneNumber = "919000000000"; // Placeholder: User should replace with actual number
    const message = `✨ *SITHAROM POOL VILLA - RESERVATION INQUIRY* ✨\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📞 *Phone / WhatsApp:* ${data.phone}\n` +
      `📅 *Check-in / Check-out:* ${formatDate(data.checkIn)} to ${formatDate(data.checkOut)}\n` +
      `👥 *Guests:* ${data.guests}\n` +
      `🏡 *Room Type:* ${data.villaType}\n\n` +
      `💬 *Message:* \n${data.message || 'No additional message.'}`;
    
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section 
      className="relative py-28 md:py-36 text-warm-white dark:text-sand overflow-hidden transition-colors duration-500 bg-transparent" 
      id="book"
    >
      {/* Luxury Vignette and Color Blend Overlays */}
      <div className="absolute inset-0 bg-clay/10 dark:bg-[#120E0A]/45 mix-blend-multiply dark:mix-blend-multiply z-[1] transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-villa-dark/60 z-[2]" />
      
      {/* Warm Golden Glow Behind Form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12)_0%,transparent_70%)] blur-[60px] pointer-events-none z-[2]" />

      {/* SVG Grain Noise Filter for realistic luxury texture */}
      <svg className="hidden">
        <filter id="luxury-noise-booking">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.04 0" />
        </filter>
      </svg>
      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] z-[3]" style={{ filter: 'url(#luxury-noise-booking)' }} />

      {/* Dynamic fireflies CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes booking-firefly-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(0.6); opacity: 0.1; }
          40% { transform: translate(20px, -35px) scale(1.1); opacity: 0.5; }
          70% { transform: translate(8px, -55px) scale(0.8); opacity: 0.2; }
        }
        @keyframes booking-firefly-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0.15; }
          50% { transform: translate(-25px, -45px) scale(1.2); opacity: 0.6; }
          80% { transform: translate(-10px, -20px) scale(0.7); opacity: 0.1; }
        }
        @keyframes booking-firefly-glow-3 {
          0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0.05; }
          45% { transform: translate(15px, -30px) scale(1.0); opacity: 0.4; }
          75% { transform: translate(-5px, -45px) scale(0.7); opacity: 0.15; }
        }
        .booking-firefly {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #FAF7F2;
          box-shadow: 0 0 8px 2px rgba(250, 247, 242, 0.5), 0 0 3px 1px rgba(255, 255, 255, 0.7);
          pointer-events: none;
          z-index: 5;
        }
      `}} />

      {/* Floating Fireflies Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10 opacity-20 dark:opacity-60 transition-opacity duration-500">
        <div className="booking-firefly" style={{ left: '10%', top: '25%', animation: 'booking-firefly-glow-1 12s infinite ease-in-out', animationDelay: '0s' }} />
        <div className="booking-firefly" style={{ left: '85%', top: '15%', animation: 'booking-firefly-glow-2 15s infinite ease-in-out', animationDelay: '2s' }} />
        <div className="booking-firefly" style={{ left: '75%', top: '75%', animation: 'booking-firefly-glow-3 11s infinite ease-in-out', animationDelay: '1s' }} />
        <div className="booking-firefly" style={{ left: '20%', top: '80%', animation: 'booking-firefly-glow-1 14s infinite ease-in-out', animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-gold/90 mb-4 block font-light">Secure Your Stay</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-warm-white dark:text-sand transition-colors duration-500">
            Reservation Inquiry
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-6" />
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-villa-dark/45 dark:bg-[#120E0A]/55 p-6 md:p-12 backdrop-blur-md border border-warm-white/10 dark:border-gold/15 rounded-3xl flex flex-col gap-6 text-left shadow-2xl transition-all duration-500 hover:border-gold/30 hover:shadow-glow-gold">
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Name</label>
                <input 
                  type="text"
                  placeholder="Your full name"
                  {...register('name', { required: true })}
                  className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-warm-white/30 dark:placeholder:text-sand/30 text-sm hover:bg-warm-white/10 dark:hover:bg-black/30 focus:bg-warm-white/10 dark:focus:bg-black/40 focus:ring-1 focus:ring-gold/20"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Phone / WhatsApp</label>
                <input 
                  type="tel"
                  placeholder="Your contact number"
                  {...register('phone', { required: true })}
                  className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-warm-white/30 dark:placeholder:text-sand/30 text-sm hover:bg-warm-white/10 dark:hover:bg-black/30 focus:bg-warm-white/10 dark:focus:bg-black/40 focus:ring-1 focus:ring-gold/20"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Check-in</label>
                <input 
                  type="date"
                  {...register('checkIn', { required: true })}
                  className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-warm-white/30 dark:placeholder:text-sand/30 text-sm hover:bg-warm-white/10 dark:hover:bg-black/30 focus:bg-warm-white/10 dark:focus:bg-black/40 focus:ring-1 focus:ring-gold/20"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Check-out</label>
                <input 
                  type="date"
                  {...register('checkOut', { required: true })}
                  className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-warm-white/30 dark:placeholder:text-sand/30 text-sm hover:bg-warm-white/10 dark:hover:bg-black/30 focus:bg-warm-white/10 dark:focus:bg-black/40 focus:ring-1 focus:ring-gold/20"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Guests</label>
                <div className="relative">
                  <select 
                    {...register('guests')}
                    className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 appearance-none text-sm pr-10"
                  >
                    <option value="1" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">1 Guest</option>
                    <option value="2" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">2 Guests</option>
                    <option value="3" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">3 Guests</option>
                    <option value="4" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">4+ Guests</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-warm-white/50 dark:text-sand/50">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Room Type</label>
                <div className="relative">
                  <select 
                    {...register('villaType')}
                    className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 appearance-none text-sm pr-10"
                  >
                    <option value="Ithal Villa" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">Ithal Villa</option>
                    <option value="Harsham Villa" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">Harsham Villa</option>
                    <option value="Any Available" className="text-villa-dark bg-cream dark:bg-[#1C1610] dark:text-sand">Any Available</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-warm-white/50 dark:text-sand/50">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase opacity-85 px-1">Message</label>
              <textarea 
                rows={3}
                placeholder="Any special requests or inquiries?"
                {...register('message')}
                className="w-full bg-warm-white/5 dark:bg-black/20 border border-warm-white/10 dark:border-gold/15 hover:border-gold/40 focus:border-gold text-warm-white dark:text-sand px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 placeholder:text-warm-white/30 dark:placeholder:text-sand/30 text-sm resize-none hover:bg-warm-white/10 dark:hover:bg-black/30 focus:bg-warm-white/10 dark:focus:bg-black/40 focus:ring-1 focus:ring-gold/20"
              />
            </div>

            <div className="mt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#25D366] to-[#1ebd5c] text-white h-[52px] text-xs tracking-[0.2em] uppercase font-semibold rounded-xl hover:shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="animate-pulse" />
                Send via WhatsApp
              </button>
            </div>

          </div>
        </motion.form>

      </div>
    </section>

  );
}
