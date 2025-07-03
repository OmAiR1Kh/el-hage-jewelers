"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";
import { useRouter } from "next/navigation";

export function ProductsSection() {
  const { t, language } = useLanguage();
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
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Get featured products from home content
  const featuredProducts = homeContent?.featuredProducts || [];

  if (featuredProducts.length === 0) {
    return null; // Don't render if no featured products
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

  const router = useRouter();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            {t("products.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="group cursor-pointer"
              onClick={() => {
                router.push(`/products/${product.productId}`);
              }}
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={
                    product.productId.mainImg ||
                    "/placeholder.svg?height=300&width=300"
                  }
                  alt={getProductName(product)}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                {getProductName(product)}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {getProductDescription(product)}
              </p>
              {product.productId.showPrice && (
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${product.productId.price.toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
