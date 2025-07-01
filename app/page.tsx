import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { CollectionsSection } from "@/components/sections/collections-section";
import { ProductsSection } from "@/components/sections/products-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { VideoSection } from "@/components/sections/video-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { CampaignDisplay } from "@/components/campaigns/campaign-display";
import { PageTransition } from "@/components/ui/page-transition";
import { apiService } from "@/lib/api";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await apiService.getSEOData("home");
    return generateSEOMetadata(seoData, "https://elhagejewelers.com");
  } catch (error) {
    console.error("Failed to fetch SEO data:", error);
    return {
      title: "El Hage Jewelers - Luxury Jewelry Since 1953",
      description:
        "Discover exquisite jewelry collections from El Hage Jewelers. Luxury craftsmanship since 1953.",
    };
  }
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-16 lg:h-20 bg-gray-100 animate-pulse" />
      <div className="h-screen bg-gray-100 animate-pulse" />
    </div>
  );
}

export default function HomePage() {
  const breadcrumbStructuredData = generateStructuredData("BreadcrumbList", {
    items: [{ name: "Home", url: "https://elhagejewelers.com" }],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <PageTransition>
        <main className="min-h-screen">
          <Navbar />

          <Suspense fallback={<LoadingSkeleton />}>
            <CampaignDisplay position="top" />
            <HeroSection />
            <CampaignDisplay position="home" />
            <FeaturedSection />
            <CollectionsSection />
            <ProductsSection />
            <AboutSection />
            <TestimonialsSection />
            <VideoSection />
            <CampaignDisplay position="bottom" />
          </Suspense>
        </main>
      </PageTransition>
    </>
  );
}
