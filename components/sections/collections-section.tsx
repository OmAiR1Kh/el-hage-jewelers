"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { apiService, type Collection } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";

export function CollectionsSection() {
  const { language, t } = useLanguage();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await apiService.getActiveCollections();
        setCollections(data.slice(0, 6)); // Show first 6 collections
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <section className="spacing-section bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-64 sm:w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid-responsive-cards">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {collections.length > 0 ? (
        <section className="spacing-section bg-gray-50">
          <div className="container-responsive">
            <FadeIn className="text-center mb-12 sm:mb-16">
              <h2 className="text-responsive-xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
                {t("collections.title")}
              </h2>
              <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t("collections.subtitle")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid-responsive-cards">
              {collections.map((collection, index) => (
                <StaggerItem key={collection._id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <Link
                      href={`/collections/${collection._id}`}
                      className="block focus-visible"
                    >
                      <div className="aspect-square overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={collection.bannerImage || "/placeholder.svg"}
                            alt={
                              language == "en"
                                ? collection.nameEn
                                : collection.nameAr
                            }
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </motion.div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-playfair font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                          {language == "en"
                            ? collection.nameEn
                            : collection.nameAr}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
                          {language == "en"
                            ? collection.descriptionEn
                            : collection.descriptionAr}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
