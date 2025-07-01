"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Grid, List } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { apiService, type Category, type Product } from "@/lib/api"
import { PageTransition } from "@/components/ui/page-transition"
import { FadeIn } from "@/components/ui/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container"
import { ErrorBoundary } from "@/components/ui/error-boundary"

function CategoryPageContent() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

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
        const categoryId = params.id as string

        if (!categoryId) {
          router.push("/categories")
          return
        }

        const [categoryData, productsData] = await Promise.all([
          apiService.getCategory(categoryId),
          apiService.getProductsByCategory(categoryId),
        ])

        if (!categoryData) {
          router.push("/categories")
          return
        }

        setCategory(categoryData)
        setProducts(productsData || [])
      } catch (error) {
        console.error("Failed to fetch category data:", error)
        router.push("/categories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, router])

  const getCategoryName = (category: Category) => {
    return language === "ar" ? category.nameAr : category.nameEn
  }

  const getCategoryDescription = (category: Category) => {
    return language === "ar" ? category.descriptionAr : category.descriptionEn
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

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return getProductName(a).localeCompare(getProductName(b))
      case "price":
        return a.price - b.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
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

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "الفئة غير موجودة" : "Category not found"}
            </h1>
            <Button onClick={() => router.push("/categories")}>
              {language === "ar" ? "العودة للفئات" : "Back to Categories"}
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
                <Link href="/categories" className="hover:text-gray-900 transition-colors">
                  {language === "ar" ? "الفئات" : "Categories"}
                </Link>
                <span>/</span>
                <span className="text-gray-900">{getCategoryName(category)}</span>
              </div>
            </FadeIn>
          </div>

          {/* Category Hero */}
          <section className="container-responsive py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <FadeIn direction="left">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={getCategoryName(category)}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-gray-900">
                    {getCategoryName(category)}
                  </h1>

                  {getCategoryDescription(category) && (
                    <div className="prose prose-lg text-gray-600 max-w-none">
                      <p className="leading-relaxed">{getCategoryDescription(category)}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {language === "ar"
                        ? `${products.length} منتج`
                        : `${products.length} ${products.length === 1 ? "product" : "products"}`}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Products Section */}
          {products.length > 0 && (
            <section className="container-responsive spacing-section border-t border-gray-200">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <FadeIn>
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                    {language === "ar" ? "المنتجات في هذه الفئة" : "Products in this Category"}
                  </h2>
                </FadeIn>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="name">{language === "ar" ? "الاسم" : "Name"}</option>
                    <option value="price">{language === "ar" ? "السعر" : "Price"}</option>
                    <option value="newest">{language === "ar" ? "الأحدث" : "Newest"}</option>
                  </select>

                  {/* View Mode */}
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

              {/* Products Grid */}
              <StaggerContainer
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {sortedProducts.map((product) => (
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
            <section className="container-responsive spacing-section text-center">
              <FadeIn>
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar" ? "لا توجد منتجات في هذه الفئة" : "No products in this category"}
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
      </div>
    </PageTransition>
  )
}

export default function CategoryPage() {
  return (
    <ErrorBoundary>
      <CategoryPageContent />
    </ErrorBoundary>
  )
}
