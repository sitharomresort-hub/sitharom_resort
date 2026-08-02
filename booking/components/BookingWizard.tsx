'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  ChevronRight, 
  ChevronDown,
  Check, 
  Loader2, 
  Sparkles, 
  ArrowLeft, 
  Info,
  Gift,
  Tag,
  Bed,
  CheckCircle2
} from 'lucide-react';
import { RoomAvailability, ReservationResult } from '../types';
import { useBooking } from '@/lib/BookingContext';

type BookingFormData = {
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

export default function BookingWizard() {
  const { selectedRoomType, closeBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // API State
  const [availableRooms, setAvailableRooms] = useState<RoomAvailability[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailability | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [reservationResult, setReservationResult] = useState<ReservationResult | null>(null);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0); // discount rate e.g., 0.1 for 10%
  const [promoError, setPromoError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
      adults: 2,
      children: 0,
      specialRequests: ''
    }
  });

  const watchDates = watch(['startDate', 'endDate', 'adults', 'children']);

  // Fetch real-time room availability
  const checkAvailability = async (data: BookingFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          adults: Number(data.adults),
          children: Number(data.children)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availability. Please select other dates.');
      }

      const rooms: RoomAvailability[] = await response.json();
      setAvailableRooms(rooms);
      
      // Auto-select room if context specifies selectedRoomType
      if (selectedRoomType) {
        const matchingRoom = rooms.find(r => 
          r.roomName.toLowerCase().includes(selectedRoomType.toLowerCase())
        );
        if (matchingRoom) {
          setSelectedRoom(matchingRoom);
          setStep(3); // Skip straight to Guest Details if room is pre-selected and available!
          setLoading(false);
          return;
        }
      }

      setStep(2); // Proceed to Room Selection
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Submit secure reservation
  const confirmReservation = async (data: BookingFormData) => {
    if (!selectedRoom) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/booking/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedRoom.roomId,
          dates: {
            startDate: data.startDate,
            endDate: data.endDate
          },
          occupancy: {
            adults: Number(data.adults),
            children: Number(data.children)
          },
          guest: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            specialRequests: data.specialRequests
          },
          promoCode: appliedPromo || undefined,
          addons: selectedAddons
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Reservation could not be processed.');
      }

      const result = await response.json();
      setReservationResult(result);
      setStep(4); // Go to success page
    } catch (err: any) {
      setError(err.message || 'Failed to confirm reservation.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = (room: RoomAvailability) => {
    setSelectedRoom(room);
    setStep(3); // Go to Guest Details
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleApplyPromo = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      setPromoDiscount(0.10);
    } else if (code === 'SITHAROM') {
      setAppliedPromo('SITHAROM');
      setPromoDiscount(0.15);
    } else if (code === '') {
      setAppliedPromo(null);
      setPromoDiscount(0);
    } else {
      setPromoError('Invalid promotional code');
      setAppliedPromo(null);
      setPromoDiscount(0);
    }
  };

  // Pricing helper calculations
  const calculateNights = () => {
    const start = new Date(watchDates[0]);
    const end = new Date(watchDates[1]);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const getRoomTotalBeforeDiscount = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.basePrice * calculateNights();
  };

  const getDiscountAmount = () => {
    return getRoomTotalBeforeDiscount() * promoDiscount;
  };

  const getAddonsPrice = () => {
    let price = 0;
    if (selectedAddons.includes('pkg-wellness')) price += 5000;
    if (selectedAddons.includes('pkg-honeymoon')) price += 3500;
    return price;
  };

  const getTaxAmount = () => {
    const discountedRoomTotal = getRoomTotalBeforeDiscount() - getDiscountAmount();
    // 18% GST on room charges
    return discountedRoomTotal * 0.18;
  };

  const getTotalPrice = () => {
    const roomTotal = getRoomTotalBeforeDiscount() - getDiscountAmount();
    const taxTotal = getTaxAmount();
    return roomTotal + taxTotal + getAddonsPrice();
  };

  return (
    <div className="w-full bg-villa-dark text-warm-white p-6 md:p-10 relative overflow-hidden font-body">
      {/* Soft Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-clay/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Cinematic Step Indicator Header */}
      <div className="mb-8 text-center relative z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-gold/80 block mb-1 font-light">Sitharom Pool Villa</span>
        <h2 className="text-2xl md:text-3xl font-display font-light mb-6 tracking-wide">
          {step === 4 ? 'Reservation Secured' : 'Secure Reservation Engine'}
        </h2>
        
        {step < 4 && (
          <div className="flex justify-center items-center gap-1.5 max-w-sm mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div 
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-medium transition-all duration-500 ${
                    step >= s ? 'border-gold text-gold bg-gold/10' : 'border-warm-white/10 text-warm-white/30'
                  } ${step === s ? 'ring-2 ring-gold/30 scale-110 font-bold' : ''}`}
                >
                  {step > s ? <Check size={11} className="text-gold" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-[1px] w-8 md:w-12 transition-colors duration-500 ${
                    step > s ? 'bg-gold/60' : 'bg-warm-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-6 bg-red-950/20 border border-red-500/20 p-4 text-xs text-red-300 flex items-center gap-3 backdrop-blur-md"
        >
          <Info size={14} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DATES, GUESTS & PROMO */}
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(checkAvailability)}
              className="max-w-3xl mx-auto w-full flex flex-col gap-6"
            >
              {/* CSS hack to completely hide native Chrome calendar icons */}
              <style dangerouslySetInnerHTML={{ __html: `
                input[type="date"]::-webkit-calendar-picker-indicator {
                  opacity: 0 !important;
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                  width: 100% !important;
                  height: 100% !important;
                  cursor: pointer !important;
                }
              ` }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-villa-dark/60 border border-gold/15 p-6 backdrop-blur-md shadow-xl rounded-xl">
                
                {/* Check-In Date */}
                <div className="flex flex-col gap-2 p-4 border border-warm-white/5 bg-warm-white/[0.01] hover:bg-warm-white/[0.03] transition-colors relative group rounded-lg">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-gold font-medium block">
                    Check-In Date
                  </label>
                  <div className="flex items-center gap-3 relative">
                    <Calendar className="text-gold w-4 h-4 shrink-0 group-hover:scale-105 transition-transform duration-300" />
                    <input 
                      type="date"
                      {...register('startDate', { required: true })}
                      style={{ colorScheme: 'dark', backgroundColor: 'transparent', color: '#FFFDF9' }}
                      className="w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer py-1"
                    />
                  </div>
                </div>

                {/* Check-Out Date */}
                <div className="flex flex-col gap-2 p-4 border border-warm-white/5 bg-warm-white/[0.01] hover:bg-warm-white/[0.03] transition-colors relative group rounded-lg">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-gold font-medium block">
                    Check-Out Date
                  </label>
                  <div className="flex items-center gap-3 relative">
                    <Calendar className="text-gold w-4 h-4 shrink-0 group-hover:scale-105 transition-transform duration-300" />
                    <input 
                      type="date"
                      {...register('endDate', { required: true })}
                      style={{ colorScheme: 'dark', backgroundColor: 'transparent', color: '#FFFDF9' }}
                      className="w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer py-1"
                    />
                  </div>
                </div>

                {/* Guests Selector */}
                <div className="flex flex-col gap-2 p-4 border border-warm-white/5 bg-warm-white/[0.01] hover:bg-warm-white/[0.03] transition-colors relative group rounded-lg">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-gold font-medium block">
                    Guests (Adults)
                  </label>
                  <div className="flex items-center gap-3 relative">
                    <Users className="text-gold w-4 h-4 shrink-0 group-hover:scale-105 transition-transform duration-300" />
                    <div className="w-full relative flex items-center">
                      <select 
                        {...register('adults')}
                        style={{ colorScheme: 'dark', backgroundColor: 'transparent', color: '#FFFDF9' }}
                        className="w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer appearance-none pr-8 py-1"
                      >
                        <option value="1" className="bg-villa-dark text-warm-white">1 Guest</option>
                        <option value="2" className="bg-villa-dark text-warm-white">2 Guests</option>
                        <option value="3" className="bg-villa-dark text-warm-white">3 Guests</option>
                        <option value="4" className="bg-villa-dark text-warm-white">4+ Guests</option>
                      </select>
                      <div className="absolute right-0 pointer-events-none text-gold/80">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="flex flex-col gap-2 p-4 border border-warm-white/5 bg-warm-white/[0.01] hover:bg-warm-white/[0.03] transition-colors relative group rounded-lg">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-gold font-medium block">
                    Promotional Code
                  </label>
                  <div className="flex items-center gap-3 relative">
                    <Gift className="text-gold w-4 h-4 shrink-0" />
                    <input 
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-warm-white/30 text-warm-white uppercase py-1"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="text-[10px] tracking-wider text-gold hover:text-white font-semibold uppercase shrink-0 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

              </div>

              {/* Promo validation response feedback */}
              {appliedPromo && (
                <div className="max-w-xl mx-auto flex items-center gap-2 text-xs text-green-400 bg-green-950/20 border border-green-500/20 px-4 py-2 rounded">
                  <CheckCircle2 size={14} />
                  <span>Promo code <strong>{appliedPromo}</strong> applied successfully! ({promoDiscount * 100}% Discount)</span>
                </div>
              )}
              {promoError && (
                <div className="max-w-xl mx-auto flex items-center gap-2 text-xs text-red-400 bg-red-950/20 border border-red-500/20 px-4 py-2 rounded">
                  <Info size={14} />
                  <span>{promoError} (Try <strong>WELCOME10</strong> or <strong>SITHAROM</strong>)</span>
                </div>
              )}

              {/* Submit Button with Shimmer & Glow */}
              <div className="mt-4 max-w-sm mx-auto w-full">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gold hover:bg-[#D4B780] active:scale-[0.98] text-villa-dark font-medium tracking-[0.25em] uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 py-4 shadow-[0_4px_20px_rgba(201,169,110,0.25)] rounded-full hover:shadow-[0_4px_30px_rgba(201,169,110,0.4)] group"
                >
                  {/* Subtle Shimmer Sweeping Overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Check Availability
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-warm-white/40 mt-2 font-light">
                ✓ Exclusivity guaranteed. Direct bookings save up to 15% in fees.
              </div>
            </motion.form>
          )}

          {/* STEP 2: ROOM SELECTION */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="flex flex-col gap-6 max-w-4xl mx-auto"
            >
              <div className="flex justify-between items-center border-b border-warm-white/10 pb-4">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs text-gold hover:text-white transition-colors">
                  <ArrowLeft size={14} /> Back to Search
                </button>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-warm-white/50 block">Selected Dates</span>
                  <span className="text-xs font-medium text-gold">{watchDates[0]} to {watchDates[1]}</span>
                </div>
              </div>

              {availableRooms.length === 0 ? (
                <div className="text-center py-12 border border-warm-white/10 rounded-xl bg-warm-white/[0.02]">
                  <p className="text-sm text-warm-white/60 mb-4 font-light">No rooms available for the selected dates.</p>
                  <button 
                    onClick={() => setStep(1)}
                    className="border border-gold/40 text-gold hover:bg-gold hover:text-villa-dark px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all"
                  >
                    Select New Dates
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableRooms.map((room) => {
                    const isPreselected = selectedRoomType && room.roomName.toLowerCase().includes(selectedRoomType.toLowerCase());
                    return (
                      <div 
                        key={room.roomId} 
                        className={`bg-villa-dark/40 border rounded-xl overflow-hidden flex flex-col group transition-all duration-300 relative ${
                          isPreselected ? 'border-gold shadow-[0_0_15px_rgba(201,169,110,0.15)]' : 'border-warm-white/10 hover:border-gold/30'
                        }`}
                      >
                        {isPreselected && (
                          <div className="absolute top-4 right-4 bg-gold text-villa-dark text-[8px] font-bold tracking-widest uppercase px-2 py-1 z-10 rounded">
                            Your Selection
                          </div>
                        )}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={room.images[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'} 
                            alt={room.roomName} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute bottom-3 left-3 bg-villa-dark/80 backdrop-blur-sm text-gold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded border border-gold/10">
                            ₹{room.basePrice.toLocaleString()} / Night
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1 justify-between gap-5 text-left">
                          <div>
                            <h3 className="text-lg font-display tracking-wide mb-1 text-warm-white">{room.roomName}</h3>
                            <p className="text-[11px] text-warm-white/60 font-light mb-4 line-clamp-2 leading-relaxed">{room.description}</p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {room.amenities.slice(0, 3).map((amenity, idx) => (
                                <span key={idx} className="text-[9px] bg-warm-white/5 border border-warm-white/10 text-warm-white/80 px-2 py-0.5 rounded">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button 
                            onClick={() => handleSelectRoom(room)}
                            className="w-full bg-gold hover:bg-[#D4B780] text-villa-dark text-[10px] font-semibold tracking-widest uppercase py-3 transition-colors flex items-center justify-center gap-1.5 rounded-lg"
                          >
                            Reserve Villa
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: GUEST DETAILS & PRICE REVIEW */}
          {step === 3 && selectedRoom && (
            <motion.form 
              key="step4"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              onSubmit={handleSubmit(confirmReservation)}
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
            >
              {/* Form Side */}
              <div className="lg:col-span-3 flex flex-col gap-5 text-left bg-villa-dark/40 border border-warm-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-display text-gold border-b border-warm-white/10 pb-2">Guest Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium tracking-wider uppercase text-warm-white/90">First Name</label>
                    <input 
                      type="text"
                      placeholder="John"
                      {...register('firstName', { required: true })}
                      style={{ backgroundColor: 'rgba(44, 31, 20, 0.4)', color: '#FFFDF9' }}
                      className="border border-warm-white/15 focus:border-gold focus:outline-none px-4 py-2.5 text-sm rounded transition-colors placeholder:text-warm-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium tracking-wider uppercase text-warm-white/90">Last Name</label>
                    <input 
                      type="text"
                      placeholder="Doe"
                      {...register('lastName', { required: true })}
                      style={{ backgroundColor: 'rgba(44, 31, 20, 0.4)', color: '#FFFDF9' }}
                      className="border border-warm-white/15 focus:border-gold focus:outline-none px-4 py-2.5 text-sm rounded transition-colors placeholder:text-warm-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium tracking-wider uppercase text-warm-white/90">Email Address</label>
                    <input 
                      type="email"
                      placeholder="john.doe@gmail.com"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      style={{ backgroundColor: 'rgba(44, 31, 20, 0.4)', color: '#FFFDF9' }}
                      className="border border-warm-white/15 focus:border-gold focus:outline-none px-4 py-2.5 text-sm rounded transition-colors placeholder:text-warm-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium tracking-wider uppercase text-warm-white/90">Phone / WhatsApp</label>
                    <input 
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register('phone', { required: true })}
                      style={{ backgroundColor: 'rgba(44, 31, 20, 0.4)', color: '#FFFDF9' }}
                      className="border border-warm-white/15 focus:border-gold focus:outline-none px-4 py-2.5 text-sm rounded transition-colors placeholder:text-warm-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium tracking-wider uppercase text-warm-white/90">Special Requests (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Dietary preferences, plantation tour requests, etc."
                    {...register('specialRequests')}
                    style={{ backgroundColor: 'rgba(44, 31, 20, 0.4)', color: '#FFFDF9' }}
                    className="border border-warm-white/15 focus:border-gold focus:outline-none px-4 py-2.5 text-sm rounded transition-colors placeholder:text-warm-white/20 resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1.5 text-xs text-gold hover:text-white transition-colors">
                    <ArrowLeft size={13} /> Back
                  </button>
                </div>
              </div>

              {/* Summary Side */}
              <div className="lg:col-span-2 bg-villa-dark border border-gold/15 p-5 flex flex-col justify-between gap-6 rounded-xl shadow-xl text-left">
                <div>
                  <h4 className="font-display text-base text-gold border-b border-warm-white/10 pb-2 mb-3 tracking-wide">Stay Summary</h4>
                  
                  <div className="flex flex-col gap-3 text-sm leading-relaxed">
                    <div className="flex justify-between">
                      <span className="opacity-60">Villa Type:</span>
                      <span className="font-medium text-warm-white">{selectedRoom.roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Duration:</span>
                      <span className="text-warm-white">{calculateNights()} {calculateNights() > 1 ? 'Nights' : 'Night'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Check-In:</span>
                      <span className="text-warm-white">{watchDates[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Check-Out:</span>
                      <span className="text-warm-white">{watchDates[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Guests:</span>
                      <span className="text-warm-white">{watchDates[2]} Adults</span>
                    </div>

                    <div className="flex justify-between border-t border-warm-white/5 pt-2.5">
                      <span className="opacity-60">Base Rent:</span>
                      <span className="text-warm-white">₹{getRoomTotalBeforeDiscount().toLocaleString()}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-green-400">
                        <span>Promo Code ({appliedPromo}):</span>
                        <span>- ₹{getDiscountAmount().toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="opacity-60">GST (18%):</span>
                      <span className="text-warm-white">₹{getTaxAmount().toLocaleString()}</span>
                    </div>
                    
                    {selectedAddons.length > 0 && (
                      <div className="flex flex-col gap-1 border-t border-warm-white/5 pt-2.5">
                        <span className="opacity-60 block mb-0.5">Exclusive Customizations:</span>
                        {selectedAddons.includes('pkg-wellness') && (
                          <div className="flex justify-between pl-2 opacity-95">
                            <span>• Forest Spa Experience</span>
                            <span>₹5,000</span>
                          </div>
                        )}
                        {selectedAddons.includes('pkg-honeymoon') && (
                          <div className="flex justify-between pl-2 opacity-95">
                            <span>• Romantic Setup</span>
                            <span>₹3,500</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-warm-white/10 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs uppercase tracking-wider text-gold font-medium">Grand Total</span>
                    <span className="text-2xl font-display font-semibold text-gold">₹{getTotalPrice().toLocaleString()}</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full relative overflow-hidden bg-gold hover:bg-[#D4B780] active:scale-[0.98] text-villa-dark py-3.5 text-[10px] font-bold tracking-widest uppercase transition-all rounded-full flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(201,169,110,0.2)] hover:shadow-[0_4px_25px_rgba(201,169,110,0.3)] group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    {loading ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <>
                        Book Your Stay
                        <Check size={14} />
                      </>
                    )}
                  </button>
                  
                  <p className="text-[9px] opacity-40 text-center flex items-center justify-center gap-1 mt-1 font-light">
                    <Info size={9} /> Direct rates encrypted and backed by secure room allotments.
                  </p>
                </div>
              </div>
            </motion.form>
          )}

          {/* STEP 4: SUCCESSFlow */}
          {step === 4 && reservationResult && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center py-6 max-w-md mx-auto flex flex-col items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold mb-1">
                <Check size={26} />
              </div>
              
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">Reservation Confirmed</span>
              <h3 className="text-2xl font-display font-light text-warm-white">Your Sanctuary Awaits</h3>
              
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Thank you for selecting Sitharom. A secure confirmation email along with check-in instructions and plantation guide has been sent to your email.
              </p>

              <div className="bg-villa-dark/60 border border-gold/15 p-5 w-full text-left flex flex-col gap-3 rounded-lg my-2 text-xs">
                <div className="flex justify-between">
                  <span className="opacity-60">Confirmation Code:</span>
                  <span className="font-mono text-gold font-bold">{reservationResult.confirmationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Dates:</span>
                  <span className="text-warm-white">{reservationResult.checkIn} to {reservationResult.checkOut}</span>
                </div>
                <div className="flex justify-between border-t border-warm-white/10 pt-2.5 mt-1">
                  <span className="opacity-60 font-medium">Amount Secured:</span>
                  <span className="font-bold text-gold">₹{reservationResult.totalPrice.toLocaleString()} {reservationResult.currency}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setStep(1);
                  setSelectedRoom(null);
                  setSelectedAddons([]);
                  setReservationResult(null);
                  setPromoCode('');
                  setAppliedPromo(null);
                  setPromoDiscount(0);
                  closeBooking(); // Close the modal!
                }}
                className="bg-gold text-villa-dark text-[10px] font-semibold tracking-widest uppercase px-8 py-3.5 hover:bg-[#D4B780] rounded-full transition-all mt-2"
              >
                Close Booking Engine
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
