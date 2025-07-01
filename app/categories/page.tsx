"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Grid, List } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { apiService, type Category } from "@/lib/api"
import { PageTransition } from "@/components/ui/page-transition"
import { FadeIn } from "@/components/ui/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container"
import { ErrorBoundary } from "@/components/ui/error-boundary"

function CategoriesPageContent() {
  const { language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const data = await apiService.getActiveCategories()
        setCategories(data || [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true

    const name = language === "ar" ? category.nameAr : category.nameEn
    const description = language === "ar" ? category.descriptionAr : category.descriptionEn

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (description && description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const getCategoryName = (category: Category) => {
    return language === "ar" ? category.nameAr : category.nameEn
  }

  const getCategoryDescription = (category: Category) => {
    return language === "ar" ? category.descriptionAr : category.descriptionEn
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                  {language === "ar" ? "فئات المجوهرات" : "Jewelry Categories"}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {language === "ar"
                    ? "استكشف فئاتنا المتنوعة من المجوهرات الفاخرة المصممة لكل مناسبة"
                    : "Explore our diverse categories of luxury jewelry designed for every occasion"}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Search and View Controls */}
          <section className="bg-white border-b border-gray-200">
            <div className="container-responsive py-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={language === "ar" ? "البحث في الفئات..." : "Search categories..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex items-center gap-2"
                  >
                    <Grid className="h-4 w-4" />
                    {language === "ar" ? "شبكة" : "Grid"}
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    {language === "ar" ? "قائمة" : "List"}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="container-responsive spacing-section">
            {filteredCategories.length === 0 ? (
              <FadeIn className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar" ? "لم يتم العثور على فئات" : "No categories found"}
                  </h3>
                  <p className="text-gray-600">
                    {language === "ar"
                      ? "جرب البحث عن شيء آخر أو تصفح جميع الفئات"
                      : "Try searching for something else or browse all categories"}
                  </p>
                </div>
              </FadeIn>
            ) : (
              <>
                <FadeIn className="mb-8">
                  <p className="text-gray-600">
                    {language === "ar"
                      ? `عرض ${filteredCategories.length} فئة`
                      : `Showing ${filteredCategories.length} categories`}
                  </p>
                </FadeIn>

                <StaggerContainer
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-6"
                  }
                >
                  {filteredCategories.map((category) => (
                    <StaggerItem key={category._id}>
                      {viewMode === "grid" ? (
                        <motion.div
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          <Link href={`/categories/${category._id}`} className="block">
                            <div className="aspect-square overflow-hidden">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full"
                              >
                                <Image
                                  src={category.image || "/placeholder.svg"}
                                  alt={getCategoryName(category)}
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-cover"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                              </motion.div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                {getCategoryName(category)}
                              </h3>
                              {getCategoryDescription(category) && (
                                <p className="text-gray-600 line-clamp-2">{getCategoryDescription(category)}</p>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                          <Link href={`/categories/${category._id}`} className="flex items-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden">
                              <Image
                                src={category.image || "/placeholder.svg"}
                                alt={getCategoryName(category)}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                                sizes="128px"
                              />
                            </div>

                            <div className="flex-1 p-6">
                              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                {getCategoryName(category)}
                              </h3>
                              {getCategoryDescription(category) && (
                                <p className="text-gray-600">{getCategoryDescription(category)}</p>
                              )}
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
  )
}

export default function CategoriesPage() {
  return (
    <ErrorBoundary>
      <CategoriesPageContent />
    </ErrorBoundary>
  )
}
