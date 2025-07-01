"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type Collection } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";

export function CollectionsSection() {
  const { language } = useLanguage();
  const { country } = useLocation();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const collectionsData = await apiService.getActiveCollections();
        setCollections(collectionsData);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setCollections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [country]);

  // Don't render the section if there are no collections
  if (!isLoading && collections.length === 0) {
    return null;
  }

  const getCollectionName = (collection: Collection) => {
    return language === "ar" ? collection.nameAr : collection.nameEn;
  };

  const getCollectionDescription = (collection: Collection) => {
    return language === "ar"
      ? collection.descriptionAr
      : collection.descriptionEn;
  };

  const content = {
    en: {
      title: "Our Collections",
      subtitle:
        "Discover our curated selection of exquisite jewelry collections",
      viewAll: "View All Collections",
      explore: "Explore Collection",
    },
    ar: {
      title: "مجموعاتنا",
      subtitle: "اكتشف مجموعاتنا المختارة من المجوهرات الرائعة",
      viewAll: "عرض جميع المجموعات",
      explore: "استكشف المجموعة",
    },
  };

  const t = content[language];

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <StaggerContainer>
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-playfair">
                {t.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </FadeIn>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {collections.slice(0, 6).map((collection, index) => (
              <FadeIn key={collection._id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/collections/${collection._id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={
                          collection.thumbnailImage ||
                          "/placeholder.svg?height=400&width=600"
                        }
                        alt={getCollectionName(collection)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full"
                        >
                          {t.explore}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                        {getCollectionName(collection)}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {getCollectionDescription(collection)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* View All Button */}
          {collections.length > 6 && (
            <FadeIn delay={0.6}>
              <div className="text-center">
                <Link href="/collections">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group bg-transparent"
                  >
                    {t.viewAll}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
