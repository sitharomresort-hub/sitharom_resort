import type { Metadata } from 'next';

const defaultMetadata = {
  title: "Sitharom Resort | Luxury Private Pool Villa in Wayanad, Kerala",
  description: "Stay at Sitharom — one of Wayanad's most exclusive private pool villa resorts near Vythiri. Only 2 villas. Perfect for couples, honeymoons & families. Book direct.",
  keywords: "luxury pool villa wayanad, private pool villa vythiri, honeymoon resort wayanad, resort near vythiri wayanad, family pool villa kerala, romantic stay wayanad, sitharom resort",
}

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.sitharompoolvilla.com'),
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  openGraph: {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    type: 'website',
    images: ['https://www.sitharompoolvilla.com/gallery/img9.jpeg'], // Using a real photo path of the property exterior
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    images: ['https://www.sitharompoolvilla.com/gallery/img9.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.sitharompoolvilla.com',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
}
