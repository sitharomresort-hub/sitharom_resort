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

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
              "url": "https://poolvilla-resort.vercel.app",
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
