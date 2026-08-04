'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { adminData, SiteImageSlot } from '@/lib/adminData';

export default function SiteContentManager() {
  const [slots, setSlots] = useState<SiteImageSlot[]>([]);
  const [isUploading, setIsUploading] = useState<string | null>(null); // store the ID of the slot being uploaded
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  useEffect(() => {
    setSlots(adminData.getSiteImageSlots());
  }, []);

  const handleReplaceClick = (slotId: string) => {
    setActiveSlotId(slotId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlotId) return;

    setIsUploading(activeSlotId);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // Update the site image slot in local storage
        adminData.updateSiteImageSlot(activeSlotId, data.url);
        
        // Refresh slots
        setSlots(adminData.getSiteImageSlots());
        setSuccessMessage('Image updated successfully!');
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(null);
      setActiveSlotId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Info */}
      <div className="bg-[#1b1410] p-6 md:p-8 rounded-2xl border border-[#c17c45]/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-xl md:text-2xl font-display text-warm-white mb-2">Site Images Manager</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Manage the specific images used across your live website. Simply find the section you want to update and click <strong>Replace Image</strong> to upload a new one. Changes are reflected instantly.
          </p>
        </div>
        <ImageIcon size={120} className="absolute -right-6 -bottom-6 text-white/[0.02] pointer-events-none" />
      </div>

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={18} />
          {successMessage}
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Slots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-[#1b1410] border border-[#c17c45]/15 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-[#c17c45]/30 hover:shadow-lg">
            
            {/* Image Preview */}
            <div className="relative w-full aspect-[4/3] bg-black border-b border-[#c17c45]/10">
              <Image 
                src={slot.url} 
                alt={slot.name} 
                fill 
                className="object-cover"
                unoptimized // So external URLs or newly uploaded ones load smoothly without complex Next Image caching issues locally
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              {/* Replace Button */}
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  onClick={() => handleReplaceClick(slot.id)}
                  disabled={isUploading === slot.id}
                  className="flex items-center gap-2 bg-clay/90 hover:bg-clay text-warm-white px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all backdrop-blur-md shadow-lg disabled:opacity-50"
                >
                  {isUploading === slot.id ? (
                    <div className="w-4 h-4 border-2 border-warm-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  <span>{isUploading === slot.id ? 'Uploading...' : 'Replace Image'}</span>
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <h3 className="text-warm-white font-medium text-base mb-1">{slot.name}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{slot.description}</p>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}
