"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Grid, List, Star, Calendar } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { apiService, type Collection } from "@/lib/api";
import { PageTransition } from "@/components/ui/page-transition";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function CollectionsPageContent() {
  const { language } = useLanguage();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterBy, setFilterBy] = useState<"all" | "featured">("all");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getActiveCollections();
        setCollections(data || []);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const filteredCollections = collections.filter((collection) => {
    // Filter by featured status
    if (filterBy === "featured" && !collection.isFeatured) return false;

    // Filter by search query
    if (!searchQuery) return true;

    const name = language === "ar" ? collection.nameAr : collection.nameEn;
    const description =
      language === "ar" ? collection.descriptionAr : collection.descriptionEn;

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getCollectionName = (collection: Collection) => {
    return language === "ar" ? collection.nameAr : collection.nameEn;
  };

  const getCollectionDescription = (collection: Collection) => {
    return language === "ar"
      ? collection.descriptionAr
      : collection.descriptionEn;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="pt-16 lg:pt-20">
          {/* Header */}
          <section className="bg-white border-b border-gray-200">
            <div className="container-responsive py-8 sm:py-12">
              <FadeIn>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                  {language === "ar" ? "مجموعاتنا" : "Our Collections"}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {language === "ar"
                    ? "اكتشف مجموعاتنا المنسقة بعناية من المجوهرات الفاخرة، كل منها تحكي قصة فريدة"
                    : "Discover our carefully curated collections of luxury jewelry, each telling a unique story"}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="bg-white border-b border-gray-200">
            <div className="container-responsive py-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={
                      language === "ar"
                        ? "البحث في المجموعات..."
                        : "Search collections..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Filter Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={filterBy === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterBy("all")}
                    >
                      {language === "ar" ? "الكل" : "All"}
                    </Button>
                    <Button
                      variant={filterBy === "featured" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterBy("featured")}
                      className="flex items-center gap-2"
                    >
                      <Star className="h-4 w-4" />
                      {language === "ar" ? "المميزة" : "Featured"}
                    </Button>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Collections */}
          <section className="container-responsive spacing-section">
            {filteredCollections.length === 0 ? (
              <FadeIn className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar"
                      ? "لم يتم العثور على مجموعات"
                      : "No collections found"}
                  </h3>
                  <p className="text-gray-600">
                    {language === "ar"
                      ? "جرب البحث عن شيء آخر أو تصفح جميع المجموعات"
                      : "Try searching for something else or browse all collections"}
                  </p>
                </div>
              </FadeIn>
            ) : (
              <>
                <FadeIn className="mb-8">
                  <p className="text-gray-600">
                    {language === "ar"
                      ? `عرض ${filteredCollections.length} مجموعة`
                      : `Showing ${filteredCollections.length} collections`}
                  </p>
                </FadeIn>

                <StaggerContainer
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                >
                  {filteredCollections.map((collection) => (
                    <StaggerItem key={collection._id}>
                      {viewMode === "grid" ? (
                        <motion.div
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          <Link
                            href={`/collections/${collection._id}`}
                            className="block"
                          >
                            <div className="aspect-video overflow-hidden relative">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full"
                              >
                                <Image
                                  src={
                                    collection.bannerImage || "/placeholder.svg"
                                  }
                                  alt={getCollectionName(collection)}
                                  width={600}
                                  height={400}
                                  className="w-full h-full object-cover"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                              </motion.div>

                              {collection.isFeatured && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {language === "ar" ? "مميزة" : "Featured"}
                                </div>
                              )}
                            </div>

                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  {formatDate(collection.releaseDate)}
                                </span>
                              </div>

                              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                {getCollectionName(collection)}
                              </h3>

                              <p className="text-gray-600 line-clamp-3">
                                {getCollectionDescription(collection)}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                          <Link
                            href={`/collections/${collection._id}`}
                            className="flex items-center"
                          >
                            <div className="w-32 h-24 sm:w-40 sm:h-28 flex-shrink-0 overflow-hidden relative">
                              <Image
                                src={
                                  collection.thumbnailImage ||
                                  "/placeholder.svg"
                                }
                                alt={getCollectionName(collection)}
                                width={160}
                                height={112}
                                className="w-full h-full object-cover"
                                sizes="160px"
                              />
                              {collection.isFeatured && (
                                <div className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-full">
                                  <Star className="h-3 w-3" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  {formatDate(collection.releaseDate)}
                                </span>
                              </div>

                              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                {getCollectionName(collection)}
                              </h3>

                              <p className="text-gray-600">
                                {getCollectionDescription(collection)}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      )}
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default function CollectionsPage() {
  return (
    <ErrorBoundary>
      <CollectionsPageContent />
    </ErrorBoundary>
  );
}
