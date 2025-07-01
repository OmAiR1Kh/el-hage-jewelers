"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";

export function ProductsSection() {
  const { language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setIsLoading(true);
        const content = await apiService.getHomeContent(country || "lebanon");
        setHomeContent(content);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
        setHomeContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeContent();
  }, [country]);

  // Don't render if no featured products
  if (
    !isLoading &&
    (!homeContent?.featuredProducts ||
      homeContent.featuredProducts.length === 0)
  ) {
    return null;
  }

  const getProductName = (product: any) => {
    return language === "ar"
      ? product.productId.nameAr
      : product.productId.nameEn;
  };

  const getProductDescription = (product: any) => {
    return language === "ar"
      ? product.productId.descriptionAr
      : product.productId.descriptionEn;
  };

  const content = {
    en: {
      title: "Featured Products",
      subtitle: "Discover our handpicked selection of exquisite jewelry pieces",
      viewAll: "View All Products",
      addToFavorites: "Add to Favorites",
    },
    ar: {
      title: "المنتجات المميزة",
      subtitle: "اكتشف مجموعتنا المختارة من قطع المجوهرات الرائعة",
      viewAll: "عرض جميع المنتجات",
      addToFavorites: "أضف للمفضلة",
    },
  };

  const t = content[language];

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredProducts = homeContent?.featuredProducts?.slice(0, 8) || [];

  return (
    <section className="py-16 lg:py-24">
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product._id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={
                        product.productId.mainImg ||
                        "/placeholder.svg?height=300&width=300"
                      }
                      alt={getProductName(product)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <button
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                      aria-label={t.addToFavorites}
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-playfair line-clamp-1">
                      {getProductName(product)}
                    </h3>
                    {/* Description hidden by default, shown on hover */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {getProductDescription(product)}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      {product.productId.showPrice && (
                        <span className="text-lg font-bold text-gold-600">
                          ${product.productId.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Link href={`/products/${product.productId._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group bg-transparent"
                      >
                        {language === "ar" ? "عرض المنتج" : "View Product"}
                        <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* View All Button */}
          <FadeIn delay={0.8}>
            <div className="text-center">
              <Link href="/products">
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
        </StaggerContainer>
      </div>
    </section>
  );
}
