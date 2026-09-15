'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';

type LoginFormData = {
  username: string;
  password: string;
};

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Clear old local auth state since we now use HttpOnly cookies
        localStorage.removeItem('sitharom_admin_auth');
        
        // Hard navigation is best to trigger full middleware re-check and clean layouts
        window.location.href = '/admin/dashboard';
      } else {
        setError(result.error || 'Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    } catch (e) {
      setError('A connection error occurred. Please verify your network and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120d0a] text-warm-white flex items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* ── AMBIENT SUNSET GLOWS ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(193, 124, 69, 0.15) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(142, 58, 23, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* ── LOGIN BOX CONTAINER ──────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glassmorphic Panel */}
        <div 
          style={{
            background: 'rgba(27, 20, 16, 0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(193, 124, 69, 0.2)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255,255,255,0.05)',
            borderRadius: '24px',
          }}
          className="p-8 md:p-10 relative overflow-hidden"
        >
          {/* Top Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-clay mb-2 block font-body font-semibold">
              Sitharom Resort Vythiri
            </span>
            <h1 className="font-display text-4xl text-warm-white tracking-wide">
              Admin <em className="text-gold italic font-light">Login</em>
            </h1>
            <p className="text-[11px] font-body text-text-muted mt-2 font-light">
              Enter your credentials to access the console
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Error Alert */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2.5 p-4 bg-red-950/40 border border-red-500/20 text-red-200 text-xs rounded-xl"
              >
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c17c45]">
                  <User size={15} />
                </div>
                <input 
                  type="text"
                  placeholder="admin"
                  {...register('username', { required: 'Username is required' })}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl text-[#f5efe8] pl-11 pr-4 py-3.5 focus:border-[#d39a63] focus:ring-0 focus:outline-none transition-all duration-300 placeholder:text-white/20 text-sm font-body"
                />
              </div>
              {errors.username && (
                <span className="text-red-400 text-[10px] px-1">{errors.username.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c17c45]">
                  <Lock size={15} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl text-[#f5efe8] pl-11 pr-11 py-3.5 focus:border-[#d39a63] focus:ring-0 focus:outline-none transition-all duration-300 placeholder:text-white/20 text-sm font-body"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-warm-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-[10px] px-1">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button 
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { y: -2, boxShadow: '0 8px 24px rgba(181, 69, 27, 0.35)' } : {}}
                whileTap={{ y: 0 }}
                style={{
                  background: 'linear-gradient(135deg, #c17c45 0%, #a86432 100%)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                className={`w-full h-[52px] text-xs font-semibold tracking-[0.25em] uppercase text-[#f5efe8] transition-all flex items-center justify-center gap-2 relative overflow-hidden font-body shadow-lg ${
                  isLoading ? 'opacity-80 cursor-wait' : ''
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-warm-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Verify Credentials</span>
                  </>
                )}
              </motion.button>
            </div>



          </form>
        </div>
      </motion.div>
    </div>
  );
}
