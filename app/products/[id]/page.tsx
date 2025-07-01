"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart, Expand } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { apiService, type Product } from "@/lib/api";
import { PageTransition } from "@/components/ui/page-transition";
import { FadeIn } from "@/components/ui/fade-in";
import { ImageGallery } from "@/components/ui/image-gallery";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function ProductPageContent() {
  const params = useParams();
  const router = useRouter();
  const { t, language, isRTL } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const metalTypes = [
    { value: "gold", labelEn: "Gold", labelAr: "ذهب" },
    { value: "silver", labelEn: "Silver", labelAr: "فضة" },
    { value: "platinum", labelEn: "Platinum", labelAr: "بلاتين" },
    { value: "other", labelEn: "Other", labelAr: "أخرى" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productId = params.id as string;

        if (!productId) {
          router.push("/products");
          return;
        }

        const productData = await apiService.getProduct(productId);

        if (!productData) {
          router.push("/products");
          return;
        }

        setProduct(productData);

        // Fetch related products from the same category
        if (typeof productData.categoryId === "string") {
          const related = await apiService.getProductsByCategory(
            productData.categoryId
          );
          setRelatedProducts(
            related.filter((p) => p._id !== productData._id).slice(0, 5)
          );
        } else if (
          productData.categoryId &&
          typeof productData.categoryId === "object"
        ) {
          const related = await apiService.getProductsByCategory(
            productData.categoryId._id
          );
          setRelatedProducts(
            related.filter((p) => p._id !== productData._id).slice(0, 5)
          );
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        router.push("/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const getProductName = (product: Product) => {
    return language === "ar" ? product.nameAr : product.nameEn;
  };

  const getProductDescription = (product: Product) => {
    return language === "ar" ? product.descriptionAr : product.descriptionEn;
  };

  const getCategoryName = (categoryId: Product["categoryId"]) => {
    if (typeof categoryId === "object") {
      return language === "ar" ? categoryId.nameAr : categoryId.nameEn;
    }
    return "";
  };

  const getCollectionName = (collectionId: Product["collectionId"]) => {
    if (collectionId && typeof collectionId === "object") {
      return language === "ar" ? collectionId.nameAr : collectionId.nameEn;
    }
    return "";
  };

  const getMetalTypeName = (metalType: string) => {
    const metal = metalTypes.find((m) => m.value === metalType);
    return metal
      ? language === "ar"
        ? metal.labelAr
        : metal.labelEn
      : metalType;
  };

  const copyProductUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy URL:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const allImages = product
    ? [product.mainImg, ...product.images].filter(Boolean)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "المنتج غير موجود" : "Product not found"}
            </h1>
            <Button onClick={() => router.push("/products")}>
              {language === "ar" ? "العودة للمنتجات" : "Back to Products"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        <div className="pt-16 lg:pt-20">
          {/* Breadcrumb */}
          <div className="container-responsive py-4 border-b border-gray-200">
            <FadeIn>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {language === "ar" ? "رجوع" : "Back"}
                </button>
                <span>/</span>
                <span>{language === "ar" ? "المنتجات" : "Products"}</span>
                <span>/</span>
                <span className="text-gray-900">{getProductName(product)}</span>
              </div>
            </FadeIn>
          </div>

          {/* Product Details */}
          <section className="container-responsive spacing-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images */}
              <FadeIn direction="left">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                    <Image
                      src={allImages[selectedImageIndex] || "/placeholder.svg"}
                      alt={getProductName(product)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Expand className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Thumbnail Images */}
                  {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            index === selectedImageIndex
                              ? "border-black"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${getProductName(product)} - ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Product Info */}
              <FadeIn direction="right">
                <div className="space-y-6">
                  {/* Category & Collection */}
                  <div className="space-y-1">
                    {getCategoryName(product.categoryId) && (
                      <span className="text-sm text-gray-500 uppercase tracking-wide">
                        {getCategoryName(product.categoryId)}
                      </span>
                    )}
                    {getCollectionName(product.collectionId) && (
                      <div className="text-xs text-gray-400">
                        {language === "ar" ? "من مجموعة" : "From"}{" "}
                        {getCollectionName(product.collectionId)}
                      </div>
                    )}
                  </div>

                  {/* Product Name */}
                  <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
                    {getProductName(product)}
                  </h1>

                  {/* Price */}
                  {product.showPrice && (
                    <div className="text-3xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </div>
                  )}

                  {/* Description */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {getProductDescription(product)}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {language === "ar" ? "تفاصيل المنتج" : "Product Details"}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar" ? "نوع المعدن:" : "Metal Type:"}
                        </span>
                        <span className="font-medium">
                          {getMetalTypeName(product.metalType)}
                        </span>
                      </li>
                      {product.caratSize && (
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            {language === "ar" ? "القيراط:" : "Carat Size:"}
                          </span>
                          <span className="font-medium">
                            {product.caratSize}
                          </span>
                        </li>
                      )}
                      <li className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar" ? "الوزن:" : "Weight:"}
                        </span>
                        <span className="font-medium">{product.weight}g</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <Button variant="outline" size="lg">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={copyProductUrl}
                        className={`transition-all duration-300 ${
                          copySuccess
                            ? "bg-green-100 border-green-300 text-green-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <Share2 className="h-5 w-5" />
                        {copySuccess && (
                          <span className="ml-2 text-sm">Copied!</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Category Products Carousel */}
          {relatedProducts.length > 0 && (
            <section className="container-responsive spacing-section border-t border-gray-200">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-8">
                  {language === "ar"
                    ? "منتجات من نفس الفئة"
                    : "More from this Category"}
                </h2>
              </FadeIn>

              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-shrink-0 w-64 snap-start"
                    >
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      >
                        <a
                          href={`/products/${relatedProduct._id}`}
                          className="block"
                        >
                          <div className="aspect-square overflow-hidden">
                            <Image
                              src={relatedProduct.mainImg || "/placeholder.svg"}
                              alt={getProductName(relatedProduct)}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="256px"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {getProductName(relatedProduct)}
                            </h3>
                            {relatedProduct.showPrice && (
                              <p className="text-lg font-bold text-gray-900">
                                ${relatedProduct.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </a>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Image Gallery Modal */}
        <ImageGallery
          images={allImages}
          alt={getProductName(product)}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          initialIndex={selectedImageIndex}
        />
      </div>
    </PageTransition>
  );
}

export default function ProductPage() {
  return (
    <ErrorBoundary>
      <ProductPageContent />
    </ErrorBoundary>
  );
}
