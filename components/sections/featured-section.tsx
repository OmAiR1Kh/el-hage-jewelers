"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";

export function FeaturedSection() {
  const { language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content = await apiService.getHomeContent(country || "LEB");
        setHomeContent(content);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeContent();
  }, [country]);

  if (isLoading) {
    return null;
  }

  // Check if featured section exists and should be shown
  const featuredSection = homeContent?.featuredSection;
  if (
    !featuredSection ||
    !featuredSection.showOnHomepage ||
    !featuredSection.items?.length
  ) {
    return null;
  }

  const getFeaturedTitle = () => {
    return language === "ar"
      ? featuredSection.titleAr
      : featuredSection.titleEn;
  };

  const getFeaturedContent = () => {
    return language === "ar"
      ? featuredSection.contentAr
      : featuredSection.contentEn;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(getFeaturedTitle() || getFeaturedContent()) && (
          <FadeIn className="text-center mb-16">
            {getFeaturedTitle() && (
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
                {getFeaturedTitle()}
              </h2>
            )}
            {getFeaturedContent() && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {getFeaturedContent()}
              </p>
            )}
          </FadeIn>
        )}

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredSection.items.map((item: any, index: number) => (
            <StaggerItem key={item._id || index}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Render different types of featured items */}
                {item.type === "product" && item.productId && (
                  <Link
                    href={`/products/${item.productId._id}`}
                    className="block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={item.productId.mainImg || "/placeholder.svg"}
                        alt={
                          language === "ar"
                            ? item.productId.nameAr
                            : item.productId.nameEn
                        }
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                        {language === "ar"
                          ? item.productId.nameAr
                          : item.productId.nameEn}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {language === "ar"
                          ? item.productId.descriptionAr
                          : item.productId.descriptionEn}
                      </p>
                    </div>
                  </Link>
                )}

                {item.type === "collection" && item.collectionId && (
                  <Link
                    href={`/collections/${item.collectionId._id}`}
                    className="block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={
                          item.collectionId.thumbnailImage || "/placeholder.svg"
                        }
                        alt={
                          language === "ar"
                            ? item.collectionId.nameAr
                            : item.collectionId.nameEn
                        }
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                        {language === "ar"
                          ? item.collectionId.nameAr
                          : item.collectionId.nameEn}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {language === "ar"
                          ? item.collectionId.descriptionAr
                          : item.collectionId.descriptionEn}
                      </p>
                    </div>
                  </Link>
                )}

                {/* Generic item rendering for other types */}
                {!item.type && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {language === "ar"
                        ? item.titleAr || item.nameAr
                        : item.titleEn || item.nameEn}
                    </h3>
                    {(item.descriptionAr ||
                      item.descriptionEn ||
                      item.contentAr ||
                      item.contentEn) && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {language === "ar"
                          ? item.descriptionAr || item.contentAr
                          : item.descriptionEn || item.contentEn}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
