"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";

export function AboutSection() {
  const { t, language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content = await apiService.getHomeContent(country);
        setHomeContent(content);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (country) {
      fetchHomeContent();
    }
  }, [country]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get about content with fallbacks
  const getAboutTitle = () => {
    if (homeContent?.aboutSection) {
      return language === "ar"
        ? homeContent.aboutSection.titleAr
        : homeContent.aboutSection.titleEn;
    }
    return t("about.title");
  };

  const getAboutContent = () => {
    if (homeContent?.aboutSection) {
      return language === "ar"
        ? homeContent.aboutSection.contentAr
        : homeContent.aboutSection.contentEn;
    }
    return "El Hage Jewelers has been crafting exquisite jewelry since 1953, combining traditional craftsmanship with contemporary design to create timeless pieces that celebrate life's most precious moments.";
  };

  const aboutImage =
    homeContent?.aboutSection?.image || "/placeholder.svg?height=600&width=600";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src={aboutImage || "/placeholder.svg"}
              alt="About El Hage Jewelers"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              {getAboutTitle()}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{getAboutContent()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
