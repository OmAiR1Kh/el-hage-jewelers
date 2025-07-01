"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { Navbar } from "@/components/ui/navbar";
import { ImageGallery } from "@/components/ui/image-gallery";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { Button } from "@/components/ui/button";
import { Share2, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/validation";

interface ProductClientPageProps {
  product: Product;
  relatedProducts: Product[];
}

const content = {
  en: {
    share: "Share",
    addToFavorites: "Add to Favorites",
    specifications: "Specifications",
    description: "Description",
    relatedProducts: "You May Also Like",
    viewProduct: "View Product",
    shareSuccess: "Product link copied to clipboard!",
    shareError: "Failed to copy link",
  },
  ar: {
    share: "مشاركة",
    addToFavorites: "أضف للمفضلة",
    specifications: "المواصفات",
    description: "الوصف",
    relatedProducts: "قد يعجبك أيضاً",
    viewProduct: "عرض المنتج",
    shareSuccess: "تم نسخ رابط المنتج!",
    shareError: "فشل في نسخ الرابط",
  },
};

export function ProductClientPage({
  product,
  relatedProducts,
}: ProductClientPageProps) {
  const { language } = useLanguage();
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const t = content[language];

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShareMessage(t.shareSuccess);
      setTimeout(() => setShareMessage(null), 3000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setShareMessage(t.shareSuccess);
      } catch {
        setShareMessage(t.shareError);
      }
      document.body.removeChild(textArea);
      setTimeout(() => setShareMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Product Images */}
              <FadeIn>
                <ImageGallery
                  images={product.images || []}
                  isOpen={false}
                  onClose={() => {}}
                  alt={language == "en" ? product.nameEn : product.nameAr}
                />
              </FadeIn>

              {/* Product Details */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
                      {product.name}
                    </h1>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-gold-600">
                        {product.price
                          ? `$${product.price.toLocaleString()}`
                          : "Price on request"}
                      </span>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                          className="flex items-center space-x-2 bg-transparent"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>{t.share}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2 bg-transparent"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{t.addToFavorites}</span>
                        </Button>
                      </div>
                    </div>
                    {shareMessage && (
                      <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">
                        {shareMessage}
                      </div>
                    )}
                  </div>

                  {product.description && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 font-playfair">
                        {t.description}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {product.specifications &&
                    Object.keys(product.specifications).length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 font-playfair">
                          {t.specifications}
                        </h2>
                        <div className="space-y-2">
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b border-gray-100"
                              >
                                <span className="text-gray-600 capitalize">
                                  {key}:
                                </span>
                                <span className="text-gray-900 font-medium">
                                  {value && typeof value == "string"
                                    ? value
                                    : ""}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </FadeIn>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="border-t border-gray-200 pt-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
                    {t.relatedProducts}
                  </h2>
                  <div className="overflow-x-auto">
                    <div
                      className="flex space-x-6 pb-4"
                      style={{ width: "max-content" }}
                    >
                      {relatedProducts.map((relatedProduct, index) => (
                        <FadeIn key={relatedProduct.id} delay={index * 0.1}>
                          <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-64 flex-shrink-0">
                            <div className="relative aspect-square overflow-hidden">
                              <Image
                                src={
                                  relatedProduct.images?.[0] ||
                                  "/placeholder.svg?height=300&width=300"
                                }
                                alt={
                                  language == "en"
                                    ? relatedProduct.nameEn
                                    : relatedProduct.nameAr
                                }
                                width={300}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                                {relatedProduct.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {relatedProduct.description}
                              </p>
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-bold text-gold-600">
                                  {relatedProduct.price
                                    ? `$${relatedProduct.price.toLocaleString()}`
                                    : "Price on request"}
                                </span>
                              </div>
                              <Link href={`/products/${relatedProduct.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full group bg-transparent"
                                >
                                  {t.viewProduct}
                                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </StaggerContainer>
        </div>
      </main>
    </div>
  );
}
