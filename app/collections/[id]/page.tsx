"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Star, Expand, Grid, List } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { apiService, type Collection, type Product } from "@/lib/api"
import { PageTransition } from "@/components/ui/page-transition"
import { FadeIn } from "@/components/ui/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container"
import { ImageGallery } from "@/components/ui/image-gallery"
import { ErrorBoundary } from "@/components/ui/error-boundary"

function CollectionPageContent() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const metalTypes = [
    { value: "gold", labelEn: "Gold", labelAr: "ذهب" },
    { value: "silver", labelEn: "Silver", labelAr: "فضة" },
    { value: "platinum", labelEn: "Platinum", labelAr: "بلاتين" },
    { value: "other", labelEn: "Other", labelAr: "أخرى" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const collectionId = params.id as string

        if (!collectionId) {
          router.push("/collections")
          return
        }

        const [collectionData, productsData] = await Promise.all([
          apiService.getCollection(collectionId),
          apiService.getProductsByCollection(collectionId),
        ])

        if (!collectionData) {
          router.push("/collections")
          return
        }

        setCollection(collectionData)
        setProducts(productsData || [])
      } catch (error) {
        console.error("Failed to fetch collection data:", error)
        router.push("/collections")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, router])

  const getCollectionName = (collection: Collection) => {
    return language === "ar" ? collection.nameAr : collection.nameEn
  }

  const getCollectionDescription = (collection: Collection) => {
    return language === "ar" ? collection.descriptionAr : collection.descriptionEn
  }

  const getPageTitle = (collection: Collection) => {
    if (collection.pageContent) {
      return language === "ar" ? collection.pageContent.titleAr : collection.pageContent.titleEn
    }
    return getCollectionName(collection)
  }

  const getPageContent = (collection: Collection) => {
    if (collection.pageContent) {
      return language === "ar" ? collection.pageContent.contentAr : collection.pageContent.contentEn
    }
    return getCollectionDescription(collection)
  }

  const getProductName = (product: Product) => {
    return language === "ar" ? product.nameAr : product.nameEn
  }

  const getProductDescription = (product: Product) => {
    return language === "ar" ? product.descriptionAr : product.descriptionEn
  }

  const getMetalTypeName = (metalType: string) => {
    const metal = metalTypes.find((m) => m.value === metalType)
    return metal ? (language === "ar" ? metal.labelAr : metal.labelEn) : metalType
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const allImages = collection ? [collection.bannerImage, ...collection.galleryImages].filter(Boolean) : []

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "المجموعة غير موجودة" : "Collection not found"}
            </h1>
            <Button onClick={() => router.push("/collections")}>
              {language === "ar" ? "العودة للمجموعات" : "Back to Collections"}
            </Button>
          </div>
        </div>
      </div>
    )
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
                <Link href="/collections" className="hover:text-gray-900 transition-colors">
                  {language === "ar" ? "المجموعات" : "Collections"}
                </Link>
                <span>/</span>
                <span className="text-gray-900">{getCollectionName(collection)}</span>
              </div>
            </FadeIn>
          </div>

          {/* Collection Hero */}
          <section className="relative">
            <FadeIn>
              <div className="aspect-video sm:aspect-[21/9] bg-gray-100 overflow-hidden relative group">
                <Image
                  src={collection.bannerImage || "/placeholder.svg"}
                  alt={getCollectionName(collection)}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />

                {allImages.length > 1 && (
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Expand className="h-5 w-5" />
                  </button>
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white container-responsive">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {collection.isFeatured && (
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                          <Star className="h-4 w-4" />
                          {language === "ar" ? "مجموعة مميزة" : "Featured Collection"}
                        </div>
                      )}

                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 text-shadow">
                        {getPageTitle(collection) || getCollectionName(collection)}
                      </h1>

                      <div className="flex items-center justify-center gap-4 text-sm sm:text-base mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(collection.releaseDate)}</span>
                        </div>
                        {products.length > 0 && (
                          <>
                            <span>•</span>
                            <span>
                              {language === "ar"
                                ? `${products.length} منتج`
                                : `${products.length} ${products.length === 1 ? "piece" : "pieces"}`}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-lg sm:text-xl max-w-3xl mx-auto text-shadow">
                        {getCollectionDescription(collection)}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Collection Content */}
          {getPageContent(collection) && getPageContent(collection) !== getCollectionDescription(collection) && (
            <section className="container-responsive spacing-section">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg text-gray-600 max-w-none">
                    <p className="leading-relaxed text-center">{getPageContent(collection)}</p>
                  </div>
                </div>
              </FadeIn>
            </section>
          )}

          {/* Gallery Images */}
          {collection.galleryImages.length > 0 && (
            <section className="container-responsive spacing-section">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-8 text-center">
                  {language === "ar" ? "معرض الصور" : "Gallery"}
                </h2>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.galleryImages.map((image, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => {
                        setSelectedImageIndex(index + 1) // +1 because banner is first
                        setIsGalleryOpen(true)
                      }}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${getCollectionName(collection)} gallery ${index + 1}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* Products Section */}
          {products.length > 0 && (
            <section className="container-responsive spacing-section border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <FadeIn>
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                    {language === "ar" ? "المنتجات في هذه المجموعة" : "Products in this Collection"}
                  </h2>
                </FadeIn>

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

              <StaggerContainer
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {products.map((product) => (
                  <StaggerItem key={product._id}>
                    {viewMode === "grid" ? (
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                      >
                        <Link href={`/products/${product._id}`} className="block">
                          <div className="aspect-square overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.5 }}
                              className="w-full h-full"
                            >
                              <Image
                                src={product.mainImg || "/placeholder.svg"}
                                alt={getProductName(product)}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />
                            </motion.div>
                          </div>

                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                              {getProductName(product)}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{getProductDescription(product)}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {getMetalTypeName(product.metalType)}
                              </span>

                              {product.showPrice && (
                                <span className="font-bold text-gray-900">${product.price.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
                      >
                        <Link href={`/products/${product._id}`} className="flex items-center">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden">
                            <Image
                              src={product.mainImg || "/placeholder.svg"}
                              alt={getProductName(product)}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                              sizes="128px"
                            />
                          </div>

                          <div className="flex-1 p-4 sm:p-6">
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                              {getProductName(product)}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{getProductDescription(product)}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {getMetalTypeName(product.metalType)}
                              </span>

                              {product.showPrice && (
                                <span className="font-bold text-gray-900">${product.price.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* Empty State */}
          {products.length === 0 && (
            <section className="container-responsive spacing-section text-center border-t border-gray-200">
              <FadeIn>
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar" ? "لا توجد منتجات في هذه المجموعة" : "No products in this collection"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === "ar"
                      ? "تحقق مرة أخرى قريباً للحصول على منتجات جديدة"
                      : "Check back soon for new products"}
                  </p>
                  <Button asChild>
                    <Link href="/products">{language === "ar" ? "تصفح جميع المنتجات" : "Browse All Products"}</Link>
                  </Button>
                </div>
              </FadeIn>
            </section>
          )}
        </div>

        {/* Image Gallery Modal */}
        <ImageGallery
          images={allImages}
          alt={getCollectionName(collection)}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          initialIndex={selectedImageIndex}
        />
      </div>
    </PageTransition>
  )
}

export default function CollectionPage() {
  return (
    <ErrorBoundary>
      <CollectionPageContent />
    </ErrorBoundary>
  )
}
