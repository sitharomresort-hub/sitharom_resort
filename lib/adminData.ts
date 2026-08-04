export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  villaType: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Booked' | 'Cancelled';
  createdAt: string;
}

export interface VillaRate {
  id: string;
  name: string;
  basePrice: number;
}

export interface BlockedDate {
  date: string; // YYYY-MM-DD
  villaId: 'ithal' | 'harsham';
  reason: string;
}

export interface ExperiencePackage {
  id: string;
  name: string;
  bullets: string[];
  price: string;
  message: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface AttractionItem {
  id: string;
  name: string;
  type: string;
  km: string;
  drive: string;
}

export interface ImageItem {
  id: string;
  name: string;
  url: string; // The path like /images/uploads/filename.jpg
  category: string;
  size: string; // e.g., '1.2 MB'
  usage: string; // e.g., 'Hero Section, Ithal Villa'
  uploadDate: string;
}

export interface SiteImageSlot {
  id: string; // e.g. 'hero_bg'
  name: string; // e.g. 'Homepage Hero Background'
  description: string;
  url: string; // default or uploaded URL
}

// Seed Data
const initialInquiries: Inquiry[] = [
  {
    id: 'inq_1',
    name: 'Anjali Sharma',
    phone: '+91 98765 43210',
    checkIn: '2026-06-10',
    checkOut: '2026-06-13',
    guests: '2',
    villaType: 'Ithal Villa',
    message: 'We are planning our honeymoon stay and would love to request the flower decoration package for the private pool.',
    status: 'Pending',
    createdAt: '2026-05-25T14:32:00.000Z'
  },
  {
    id: 'inq_2',
    name: 'Rohan Mathews',
    phone: '+91 81290 12345',
    checkIn: '2026-06-15',
    checkOut: '2026-06-17',
    guests: '4+',
    villaType: 'Harsham Villa',
    message: 'Family weekend getaway. We need vegetarian dining and would like to arrange the guided plantation walk.',
    status: 'Contacted',
    createdAt: '2026-05-24T09:15:00.000Z'
  },
  {
    id: 'inq_3',
    name: 'Dr. Priya Nair',
    phone: '+91 70123 45678',
    checkIn: '2026-06-01',
    checkOut: '2026-06-03',
    guests: '2',
    villaType: 'Ithal Villa',
    message: 'Booking a Wellness Weekend packages for me and my mother. Need details about the yoga therapist.',
    status: 'Booked',
    createdAt: '2026-05-23T18:45:00.000Z'
  },
  {
    id: 'inq_4',
    name: 'Siddharth Roy',
    phone: '+91 99000 88888',
    checkIn: '2026-05-28',
    checkOut: '2026-05-30',
    guests: '3',
    villaType: 'Harsham Villa',
    message: 'Is early check-in available at 9:00 AM?',
    status: 'Cancelled',
    createdAt: '2026-05-22T11:20:00.000Z'
  },
  {
    id: 'inq_5',
    name: 'Vikram & Meghna',
    phone: '+91 94470 11223',
    checkIn: '2026-06-20',
    checkOut: '2026-06-24',
    guests: '2',
    villaType: 'Any Available',
    message: 'Honeymoon couple. Requesting romantic candlelit dinner setups.',
    status: 'Pending',
    createdAt: '2026-05-26T08:10:00.000Z'
  }
];

const initialVillaRates: VillaRate[] = [
  { id: 'ithal', name: 'Ithal Villa', basePrice: 12999 },
  { id: 'harsham', name: 'Harsham Villa', basePrice: 14999 }
];

const initialBlockedDates: BlockedDate[] = [
  { date: '2026-06-01', villaId: 'ithal', reason: 'Dr. Priya Booking' },
  { date: '2026-06-02', villaId: 'ithal', reason: 'Dr. Priya Booking' },
  { date: '2026-06-15', villaId: 'harsham', reason: 'Rohan Mathews Booking' },
  { date: '2026-06-16', villaId: 'harsham', reason: 'Rohan Mathews Booking' }
];

const initialPackages: ExperiencePackage[] = [
  {
    id: 'pkg_romantic',
    name: 'Romantic Escape',
    bullets: [
      'Private pool with flower decoration',
      'Candlelight dinner by the pool',
      'Couple spa / Ayurvedic massage',
      'Breakfast in bed'
    ],
    price: '₹14,999/night',
    message: '✨ Hello Sitharom Resort! I\'m interested in booking the Romantic Escape package. Please provide availability and details.'
  },
  {
    id: 'pkg_family',
    name: 'Family Retreat',
    bullets: [
      'BBQ night under the stars',
      'Campfire storytelling',
      'Plantation walk with guide',
      'Indoor board games'
    ],
    price: '₹16,999/night',
    message: '✨ Hello Sitharom Resort! I\'m interested in booking the Family Retreat package. Please provide availability and details.'
  },
  {
    id: 'pkg_wellness',
    name: 'Wellness Weekend',
    bullets: [
      'Yoga sessions at sunrise',
      'Ayurveda consultation',
      'Forest meditation walk',
      'Detox Kerala meals'
    ],
    price: '₹13,999/night',
    message: '✨ Hello Sitharom Resort! I\'m interested in booking the Wellness Weekend package. Please provide availability and details.'
  },
  {
    id: 'pkg_corporate',
    name: 'Corporate Offsite',
    bullets: [
      'Full villa exclusivity',
      'Private gathering space',
      'Team bonding activities',
      'Customized catering'
    ],
    price: 'Custom Pricing',
    message: '✨ Hello Sitharom Resort! I\'m interested in booking a Corporate Offsite event. Please provide pricing and details.'
  }
];

const initialFAQs: FAQItem[] = [
  {
    id: 'faq_1',
    q: 'Where exactly is Sitharom Resort located?',
    a: 'We\'re located in Old Vythiri, Wayanad, Kerala — about 30 minutes from Kalpetta and close to Soochipara Falls and Edakkal Caves.'
  },
  {
    id: 'faq_2',
    q: 'Is the swimming pool private?',
    a: 'Yes. Each villa has its own completely private pool. You won\'t share it with any other guests.'
  },
  {
    id: 'faq_3',
    q: 'Is Sitharom couple-friendly?',
    a: 'Absolutely. We welcome couples, honeymooners, and families equally. Unmarried couples are welcome.'
  },
  {
    id: 'faq_4',
    q: 'Is food available at the resort?',
    a: 'Yes, we offer in-villa dining with authentic Kerala cuisine. Please inform us of dietary preferences in advance.'
  },
  {
    id: 'faq_5',
    q: 'How far is Sitharom from Bangalore?',
    a: 'Approximately 270 km — around 5–6 hours by road via NH275.'
  },
  {
    id: 'faq_6',
    q: 'What is the best time to visit Wayanad?',
    a: 'October to February for clear skies and trekking. June to September for lush green monsoon magic.'
  },
  {
    id: 'faq_7',
    q: 'How many villas are available?',
    a: 'Only 2 villas — Ithal Villa and Harsham Villa. Each has 2 bedrooms and a private pool.'
  },
  {
    id: 'faq_8',
    q: 'Can I book for a group/corporate event?',
    a: 'Yes. We can accommodate private group bookings for both villas together. Contact us for pricing.'
  }
];

const initialAttractions: AttractionItem[] = [
  { id: 'attr_1', name: 'Soochipara Waterfalls', type: 'Waterfall', km: '14 km', drive: '30 min' },
  { id: 'attr_2', name: 'Edakkal Caves', type: 'Heritage Site', km: '19 km', drive: '40 min' },
  { id: 'attr_3', name: 'Meenmutty Falls', type: 'Waterfall', km: '12 km', drive: '25 min' },
  { id: 'attr_4', name: 'Banasura Sagar Dam', type: 'Scenic Viewpoint', km: '28 km', drive: '50 min' },
  { id: 'attr_5', name: 'Chembra Peak Trek', type: 'Adventure Trek', km: '22 km', drive: '45 min' },
  { id: 'attr_6', name: '900 Kandi Plantation', type: 'Plantation Walk', km: '6 km', drive: '15 min' },
  { id: 'attr_7', name: 'Muthanga Wildlife', type: 'Wildlife Sanctuary', km: '42 km', drive: '1 hr' },
  { id: 'attr_8', name: 'Kalpetta Town', type: 'Local Market', km: '18 km', drive: '35 min' }
];

const initialImages: ImageItem[] = [
  {
    id: 'img_1',
    name: 'Wayanad Misty Hills',
    url: '/images/wayanad-mist-hills.jpg',
    category: 'Villas',
    size: '1.4 MB',
    usage: 'Hero Section, Amenities',
    uploadDate: '2026-05-10T10:00:00.000Z'
  },
  {
    id: 'img_2',
    name: 'Harsham Villa Exterior',
    url: '/images/harsham-villa-1.jpg',
    category: 'Villas',
    size: '2.1 MB',
    usage: 'Harsham Villa Detail',
    uploadDate: '2026-05-12T14:30:00.000Z'
  },
  {
    id: 'img_3',
    name: 'Ithal Villa Pool',
    url: '/images/ithal-pool-sunset.jpg',
    category: 'Villas',
    size: '1.8 MB',
    usage: 'Ithal Villa Detail',
    uploadDate: '2026-05-15T09:15:00.000Z'
  },
  {
    id: 'img_4',
    name: 'Luxury Dining Setup',
    url: '/images/luxury-dining.jpg',
    category: 'Dining',
    size: '1.5 MB',
    usage: 'Experience Packages',
    uploadDate: '2026-05-20T16:45:00.000Z'
  }
];

const initialSiteImageSlots: SiteImageSlot[] = [
  {
    id: 'hero_bg',
    name: 'Homepage Hero Background',
    description: 'The large main image at the top of the homepage.',
    url: ''
  },
  {
    id: 'about_main',
    name: 'About Section Image',
    description: 'Image displayed next to the About text on the homepage.',
    url: ''
  },
  {
    id: 'ithal_main',
    name: 'Ithal Villa Cover',
    description: 'Main image for Ithal Villa in the Villas section.',
    url: ''
  },
  {
    id: 'harsham_main',
    name: 'Harsham Villa Cover',
    description: 'Main image for Harsham Villa in the Villas section.',
    url: ''
  },
  {
    id: 'exp_pool',
    name: 'Experience: Private Pool',
    description: 'Image for Private Pool & Relaxation experience.',
    url: ''
  },
  {
    id: 'experience_campfire',
    name: 'Experience: Campfire Nights',
    description: 'Image for the Campfire Nights experience.',
    url: ''
  },
  {
    id: 'exp_games',
    name: 'Experience: Indoor Games',
    description: 'Image for the Indoor Games experience.',
    url: ''
  },
  {
    id: 'exp_couple',
    name: 'Experience: Couple Package',
    description: 'Image for the Couple Package experience.',
    url: ''
  },
  {
    id: 'exp_family',
    name: 'Experience: Family',
    description: 'Image for the Family experience.',
    url: ''
  }
];

// Helper to access window localStorage safely with SSR
const isClient = () => typeof window !== 'undefined';

function getStoredData<T>(key: string, defaultValue: T): T {
  if (!isClient()) return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultValue;
  }
}

function setStoredData<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage', e);
  }
}

// Exportable CRUD helpers
export const adminData = {
  // Inquiries
  getInquiries: (): Inquiry[] => getStoredData('sitharom_inquiries', initialInquiries),
  saveInquiries: (data: Inquiry[]) => setStoredData('sitharom_inquiries', data),
  addInquiry: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const list = adminData.getInquiries();
    const newInq: Inquiry = {
      ...inq,
      id: 'inq_' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    list.unshift(newInq);
    adminData.saveInquiries(list);
    return newInq;
  },
  updateInquiryStatus: (id: string, status: Inquiry['status']) => {
    const list = adminData.getInquiries();
    const index = list.findIndex(i => i.id === id);
    if (index !== -1) {
      list[index].status = status;
      adminData.saveInquiries(list);
    }
  },

  // Villa Rates
  getVillaRates: (): VillaRate[] => getStoredData('sitharom_villa_rates', initialVillaRates),
  saveVillaRates: (data: VillaRate[]) => setStoredData('sitharom_villa_rates', data),
  updateVillaRate: (id: string, price: number) => {
    const list = adminData.getVillaRates();
    const index = list.findIndex(v => v.id === id);
    if (index !== -1) {
      list[index].basePrice = price;
      adminData.saveVillaRates(list);
    }
  },

  // Blocked Dates
  getBlockedDates: (): BlockedDate[] => getStoredData('sitharom_blocked_dates', initialBlockedDates),
  saveBlockedDates: (data: BlockedDate[]) => setStoredData('sitharom_blocked_dates', data),
  toggleBlockedDate: (date: string, villaId: 'ithal' | 'harsham', reason: string = 'Manual Block') => {
    const list = adminData.getBlockedDates();
    const index = list.findIndex(d => d.date === date && d.villaId === villaId);
    if (index !== -1) {
      // Remove block
      list.splice(index, 1);
    } else {
      // Add block
      list.push({ date, villaId, reason });
    }
    adminData.saveBlockedDates(list);
  },

  // Packages
  getPackages: (): ExperiencePackage[] => getStoredData('sitharom_packages', initialPackages),
  savePackages: (data: ExperiencePackage[]) => setStoredData('sitharom_packages', data),
  updatePackage: (id: string, bullets: string[], price: string) => {
    const list = adminData.getPackages();
    const index = list.findIndex(p => p.id === id);
    if (index !== -1) {
      list[index].bullets = bullets;
      list[index].price = price;
      adminData.savePackages(list);
    }
  },

  // FAQs
  getFAQs: (): FAQItem[] => getStoredData('sitharom_faqs', initialFAQs),
  saveFAQs: (data: FAQItem[]) => setStoredData('sitharom_faqs', data),
  updateFAQ: (id: string, q: string, a: string) => {
    const list = adminData.getFAQs();
    const index = list.findIndex(f => f.id === id);
    if (index !== -1) {
      list[index].q = q;
      list[index].a = a;
      adminData.saveFAQs(list);
    }
  },

  // Attractions
  getAttractions: (): AttractionItem[] => getStoredData('sitharom_attractions', initialAttractions),
  saveAttractions: (data: AttractionItem[]) => setStoredData('sitharom_attractions', data),
  updateAttraction: (id: string, km: string, drive: string) => {
    const list = adminData.getAttractions();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].km = km;
      list[index].drive = drive;
      adminData.saveAttractions(list);
    }
  },

  // Images
  getImages: (): ImageItem[] => getStoredData('sitharom_images', initialImages),
  saveImages: (data: ImageItem[]) => setStoredData('sitharom_images', data),
  addImage: (img: Omit<ImageItem, 'id' | 'uploadDate'>) => {
    const list = adminData.getImages();
    const newImg: ImageItem = {
      ...img,
      id: 'img_' + Date.now(),
      uploadDate: new Date().toISOString()
    };
    list.unshift(newImg);
    adminData.saveImages(list);
    return newImg;
  },
  deleteImage: (id: string) => {
    const list = adminData.getImages();
    const filtered = list.filter(i => i.id !== id);
    adminData.saveImages(filtered);
  },
  updateImageMetadata: (id: string, category: string, usage: string) => {
    const list = adminData.getImages();
    const index = list.findIndex(i => i.id === id);
    if (index !== -1) {
      list[index].category = category;
      list[index].usage = usage;
      adminData.saveImages(list);
    }
  },

  // Site Image Slots
  getSiteImageSlots: (): SiteImageSlot[] => getStoredData('sitharom_site_images_v2', initialSiteImageSlots),
  saveSiteImageSlots: (data: SiteImageSlot[]) => setStoredData('sitharom_site_images_v2', data),
  updateSiteImageSlot: (id: string, newUrl: string) => {
    const list = adminData.getSiteImageSlots();
    const index = list.findIndex(s => s.id === id);
    if (index !== -1) {
      list[index].url = newUrl;
      adminData.saveSiteImageSlots(list);
    }
  },
  getSiteImageUrl: (id: string, fallbackUrl: string): string => {
    const list = adminData.getSiteImageSlots();
    const slot = list.find(s => s.id === id);
    return slot?.url || fallbackUrl;
  }
};
