import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Inter } from "next/font/google";
// @ts-expect-error Typescript might fail due to manual nextjs init
import "./globals.css";
import { siteMetadata } from "@/lib/metadata";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"], 
  style: ["normal", "italic"],
  variable: '--font-cormorant'
});

const jost = Jost({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: '--font-jost'
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  ...siteMetadata,
  verification: {
    ...siteMetadata.verification,
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || siteMetadata.verification?.google || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon & Icons — explicit link tags for Google Search */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#B5451B" />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Sitharom Pool Villa Resort",
              "description": "Two exclusive private pool villas in the heart of Wayanad. Ithal Villa & Harsham Villa — each with 2 bedrooms and a private pool, nestled in the Western Ghats rainforest.",
              "url": "https://www.sitharompoolvilla.com",
              "telephone": "+917306197613",
              "email": "sitharomresort@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Charity, Old Vythiri, Kunnathidavaka",
                "addressLocality": "Vythiri",
                "addressRegion": "Kerala",
                "postalCode": "673576",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.6234,
                "longitude": 76.0134
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "2"
              },
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Private Pool", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true }
              ]
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${jost.variable} ${inter.variable} font-body relative text-villa-dark`}>
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  );
}
