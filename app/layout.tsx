import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import { LocationProvider } from "@/components/providers/location-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "El Hage Jewelers - Luxury Jewelry Since 1953",
  description:
    "Discover exquisite jewelry crafted with precision and passion. El Hage Jewelers has been creating timeless pieces since 1953.",
  keywords: [
    "jewelry",
    "luxury jewelry",
    "diamonds",
    "gold",
    "custom jewelry",
    "El Hage Jewelers",
  ],
  authors: [{ name: "El Hage Jewelers" }],
  creator: "El Hage Jewelers",
  publisher: "El Hage Jewelers",
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
      "Discover exquisite jewelry crafted with precision and passion.",
    siteName: "El Hage Jewelers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "El Hage Jewelers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Hage Jewelers - Luxury Jewelry Since 1953",
    description:
      "Discover exquisite jewelry crafted with precision and passion.",
    images: ["/logo.png"],
    creator: "@elhagejewelers",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ErrorBoundary>
          <LanguageProvider>
            <LocationProvider>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </LocationProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
