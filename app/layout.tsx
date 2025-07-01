import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import { LocationProvider } from "@/components/providers/location-provider";
import { generateStructuredData } from "@/lib/seo";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elhagejewelers.com"),
  title: {
    default: "El Hage Jewelers - Luxury Jewelry Since 1953",
    template: "%s | El Hage Jewelers",
  },
  description:
    "Discover exquisite jewelry collections from El Hage Jewelers. Luxury craftsmanship since 1953. Custom jewelry, engagement rings, and fine jewelry in Lebanon, UAE, and KSA.",
  keywords: [
    "luxury jewelry",
    "custom jewelry",
    "engagement rings",
    "fine jewelry",
    "Lebanon jewelry",
    "UAE jewelry",
    "KSA jewelry",
    "El Hage Jewelers",
  ],
  authors: [{ name: "El Hage Jewelers" }],
  creator: "El Hage Jewelers",
  publisher: "El Hage Jewelers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elhagejewelers.com",
    title: "El Hage Jewelers - Luxury Jewelry Since 1953",
    description:
      "Discover exquisite jewelry collections from El Hage Jewelers. Luxury craftsmanship since 1953.",
    siteName: "El Hage Jewelers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "El Hage Jewelers - Luxury Jewelry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Hage Jewelers - Luxury Jewelry Since 1953",
    description:
      "Discover exquisite jewelry collections from El Hage Jewelers. Luxury craftsmanship since 1953.",
    images: ["/og-image.jpg"],
    creator: "@elhagejewelers",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://elhagejewelers.com",
    languages: {
      "en-US": "https://elhagejewelers.com",
      "ar-SA": "https://elhagejewelers.com/ar",
    },
  },
};

const organizationStructuredData = generateStructuredData("Organization", {});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <link rel="preconnect" href="https://api.elhagejewelers.com" />
        <link rel="dns-prefetch" href="https://api.elhagejewelers.com" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LocationProvider>
          <LanguageProvider>
            {children}
            <Footer />
          </LanguageProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
