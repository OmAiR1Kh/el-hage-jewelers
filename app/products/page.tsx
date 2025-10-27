// "use client";

// import { useState, useEffect, useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Search, Filter, X, ChevronDown } from "lucide-react";
// import { Navbar } from "@/components/ui/navbar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useLanguage } from "@/components/providers/language-provider";
// import { apiService, type Product, type Category } from "@/lib/api";
// import { PageTransition } from "@/components/ui/page-transition";
// import { FadeIn } from "@/components/ui/fade-in";
// import {
//   StaggerContainer,
//   StaggerItem,
// } from "@/components/ui/stagger-container";
// import { ErrorBoundary } from "@/components/ui/error-boundary";

// interface Filters {
//   category: string;
//   metalType: string;
//   search: string;
// }

// function ProductsPageContent() {
//   const { t, language, isRTL } = useLanguage();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState<Filters>({
//     category: "",
//     metalType: "",
//     search: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   const metalTypes = [
//     { value: "gold", labelEn: "Gold", labelAr: "ذهب" },
//     { value: "silver", labelEn: "Silver", labelAr: "فضة" },
//     { value: "platinum", labelEn: "Platinum", labelAr: "بلاتين" },
//     { value: "other", labelEn: "Other", labelAr: "أخرى" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const [productsData, categoriesData] = await Promise.all([
//           apiService.getAllProducts(),
//           apiService.getActiveCategories(),
//         ]);

//         setProducts(productsData.products || []);
//         setCategories(categoriesData || []);
//       } catch (error) {
//         console.error("Failed to fetch products data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesCategory =
//         !filters.category ||
//         (typeof product.categoryId === "object"
//           ? product.categoryId._id === filters.category
//           : product.categoryId === filters.category);

//       const matchesMetalType =
//         !filters.metalType || product.metalType === filters.metalType;

//       const matchesSearch =
//         !filters.search ||
//         (language === "ar"
//           ? product.nameAr
//               .toLowerCase()
//               .includes(filters.search.toLowerCase()) ||
//             product.descriptionAr
//               .toLowerCase()
//               .includes(filters.search.toLowerCase())
//           : product.nameEn
//               .toLowerCase()
//               .includes(filters.search.toLowerCase()) ||
//             product.descriptionEn
//               .toLowerCase()
//               .includes(filters.search.toLowerCase()));

//       return (
//         matchesCategory && matchesMetalType && matchesSearch && product.isActive
//       );
//     });
//   }, [products, filters, language]);

//   const handleFilterChange = (key: keyof Filters, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearFilters = () => {
//     setFilters({ category: "", metalType: "", search: "" });
//   };

//   const getProductName = (product: Product) => {
//     return language === "ar" ? product.nameAr : product.nameEn;
//   };

//   const getProductDescription = (product: Product) => {
//     return language === "ar" ? product.descriptionAr : product.descriptionEn;
//   };

//   const getCategoryName = (categoryId: Product["categoryId"]) => {
//     if (typeof categoryId === "object") {
//       return language === "ar" ? categoryId.nameAr : categoryId.nameEn;
//     }
//     const category = categories.find((cat) => cat._id === categoryId);
//     return category ? (language === "ar" ? category.nameAr : category.nameEn) : "";
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen">
//         <Navbar />
//         <div className="pt-16 lg:pt-20">
//           <div className="container-responsive spacing-section">
//             <div className="animate-pulse">
//               <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {[...Array(12)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white rounded-lg shadow-sm overflow-hidden"
//                   >
//                     <div className="aspect-square bg-gray-200"></div>
//                     <div className="p-4">
//                       <div className="h-6 bg-gray-200 rounded mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <PageTransition>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />

//         <div className="pt-16 lg:pt-20">
//           {/* Header */}
//           <section className="bg-white border-b border-gray-200">
//             <div className="container-responsive py-8 sm:py-12">
//               <FadeIn>
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
//                   {language === "ar" ? "منتجاتنا" : "Our Products"}
//                 </h1>
//                 <p className="text-lg text-gray-600 max-w-2xl">
//                   {language === "ar"
//                     ? "اكتشف مجموعتنا الرائعة من المجوهرات الفاخرة المصنوعة بعناية فائقة"
//                     : "Discover our exquisite collection of luxury jewelry crafted with exceptional care"}
//                 </p>
//               </FadeIn>
//             </div>
//           </section>

//           {/* Filters */}
//           <section className="bg-white border-b border-gray-200">
//             <div className="container-responsive py-4">
//               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                 {/* Search */}
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <Input
//                     type="text"
//                     placeholder={
//                       language === "ar"
//                         ? "البحث في المنتجات..."
//                         : "Search products..."
//                     }
//                     value={filters.search}
//                     onChange={(e) =>
//                       handleFilterChange("search", e.target.value)
//                     }
//                     className="pl-10"
//                   />
//                 </div>

//                 {/* Filter Toggle */}
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center gap-2"
//                 >
//                   <Filter className="h-4 w-4" />
//                   {language === "ar" ? "الفلاتر" : "Filters"}
//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       showFilters ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Button>
//               </div>

//               {/* Filter Options */}
//               {showFilters && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="mt-4 p-4 bg-gray-50 rounded-lg"
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {/* Category Filter */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         {language === "ar" ? "الفئة" : "Category"}
//                       </label>
//                       <select
//                         value={filters.category}
//                         onChange={(e) =>
//                           handleFilterChange("category", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//                       >
//                         <option value="">
//                           {language === "ar" ? "جميع الفئات" : "All Categories"}
//                         </option>
//                         {categories.map((category) => (
//                           <option key={category._id} value={category._id}>
//                             {language == "ar"
//                               ? category.nameAr
//                               : category.nameEn}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Metal Type Filter */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         {language === "ar" ? "نوع المعدن" : "Metal Type"}
//                       </label>
//                       <select
//                         value={filters.metalType}
//                         onChange={(e) =>
//                           handleFilterChange("metalType", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//                       >
//                         <option value="">
//                           {language === "ar" ? "جميع المعادن" : "All Metals"}
//                         </option>
//                         {metalTypes.map((metal) => (
//                           <option key={metal.value} value={metal.value}>
//                             {language === "ar" ? metal.labelAr : metal.labelEn}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Clear Filters */}
//                     <div className="flex items-end">
//                       <Button
//                         variant="outline"
//                         onClick={clearFilters}
//                         className="w-full flex items-center justify-center gap-2 bg-transparent"
//                       >
//                         <X className="h-4 w-4" />
//                         {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
//                       </Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </section>

//           {/* Products Grid */}
//           <section className="container-responsive spacing-section">
//             {filteredProducts.length === 0 ? (
//               <FadeIn className="text-center py-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Search className="h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     {language === "ar"
//                       ? "لم يتم العثور على منتجات"
//                       : "No products found"}
//                   </h3>
//                   <p className="text-gray-600">
//                     {language === "ar"
//                       ? "جرب تغيير الفلاتر أو البحث عن شيء آخر"
//                       : "Try adjusting your filters or search for something else"}
//                   </p>
//                 </div>
//               </FadeIn>
//             ) : (
//               <>
//                 <FadeIn className="mb-8">
//                   <p className="text-gray-600">
//                     {language === "ar"
//                       ? `عرض ${filteredProducts.length} منتج`
//                       : `Showing ${filteredProducts.length} products`}
//                   </p>
//                 </FadeIn>

//                 <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredProducts.map((product) => (
//                     <StaggerItem key={product._id}>
//                       <motion.div
//                         whileHover={{ y: -8 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
//                       >
//                         <Link
//                           href={`/products/${product._id}`}
//                           className="block"
//                         >
//                           <div className="aspect-square overflow-hidden">
//                             <motion.div
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.5 }}
//                               className="w-full h-full"
//                             >
//                               <Image
//                                 src={product.mainImg || "/placeholder.svg"}
//                                 alt={getProductName(product)}
//                                 width={400}
//                                 height={400}
//                                 className="w-full h-full object-cover"
//                                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                               />
//                             </motion.div>
//                           </div>

//                           <div className="p-4 sm:p-6">
//                             <div className="mb-2">
//                               <span className="text-xs text-gray-500 uppercase tracking-wide">
//                                 {getCategoryName(product.categoryId)}
//                               </span>
//                             </div>

//                             <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
//                               {getProductName(product)}
//                             </h3>

//                             <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                               {getProductDescription(product)}
//                             </p>

//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
//                                   {language === "ar"
//                                     ? metalTypes.find(
//                                         (m) => m.value === product.metalType
//                                       )?.labelAr
//                                     : metalTypes.find(
//                                         (m) => m.value === product.metalType
//                                       )?.labelEn}
//                                 </span>
//                               </div>

//                               {product.showPrice && (
//                                 <div className="text-right">
//                                   <span className="text-lg font-bold text-gray-900">
//                                     ${product.price.toLocaleString()}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </Link>
//                       </motion.div>
//                     </StaggerItem>
//                   ))}
//                 </StaggerContainer>
//               </>
//             )}
//           </section>
//         </div>
//       </div>
//     </PageTransition>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <ErrorBoundary>
//       <ProductsPageContent />
//     </ErrorBoundary>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  AlertTriangle,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/providers/language-provider";
import { apiService, type Product, type Category } from "@/lib/api";
import { PageTransition } from "@/components/ui/page-transition";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";
import { ErrorBoundary } from "@/components/ui/error-boundary";

interface Filters {
  category: string;
  metalType: string;
  search: string;
}

interface ApiError extends Error {
  status?: number;
  code?: string;
}

function ProductsPageContent() {
  const { t, language, isRTL } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    metalType: "",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const metalTypes = [
    { value: "gold", labelEn: "Gold", labelAr: "ذهب" },
    { value: "silver", labelEn: "Silver", labelAr: "فضة" },
    { value: "platinum", labelEn: "Platinum", labelAr: "بلاتين" },
    { value: "other", labelEn: "Other", labelAr: "أخرى" },
  ];

  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 1000; // 1 second

  // Utility function to validate product data
  const validateProduct = (product: any): product is Product => {
    try {
      return (
        product &&
        typeof product === "object" &&
        typeof product._id === "string" &&
        typeof product.nameEn === "string" &&
        typeof product.nameAr === "string" &&
        typeof product.descriptionEn === "string" &&
        typeof product.descriptionAr === "string" &&
        typeof product.metalType === "string" &&
        typeof product.isActive === "boolean" &&
        typeof product.featured === "boolean" &&
        (typeof product.mainImg === "string" || product.mainImg === null) &&
        // Price can be number or undefined/null - we'll handle missing prices gracefully
        (typeof product.price === "number" ||
          product.price === null ||
          product.price === undefined) &&
        (typeof product.filterPrice === "number" ||
          product.filterPrice === null ||
          product.filterPrice === undefined)
      );
    } catch {
      return false;
    }
  };

  // Utility function to validate category data
  const validateCategory = (category: any): category is Category => {
    try {
      return (
        category &&
        typeof category === "object" &&
        typeof category._id === "string" &&
        typeof category.nameEn === "string" &&
        typeof category.nameAr === "string"
      );
    } catch {
      return false;
    }
  };

  // Retry mechanism for API calls
  const retryWithDelay = (fn: () => Promise<any>, delay: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn().then(resolve).catch(reject);
      }, delay);
    });
  };

  // Fetch data with comprehensive error handling
  const fetchData = async (attempt: number = 0) => {
    try {
      setIsLoading(true);
      setError(null);

      const [productsResponse, categoriesResponse] = await Promise.all([
        apiService.getAllProducts().catch((err) => {
          console.error("Products API error:", err);
          throw new Error(
            `Failed to fetch products: ${err.message || "Unknown error"}`
          );
        }),
        apiService.getActiveCategories().catch((err) => {
          console.error("Categories API error:", err);
          throw new Error(
            `Failed to fetch categories: ${err.message || "Unknown error"}`
          );
        }),
      ]);

      // Validate and sanitize products data
      const validProducts = Array.isArray(productsResponse?.products)
        ? productsResponse.products.filter(validateProduct)
        : [];

      // Validate and sanitize categories data
      const validCategories = Array.isArray(categoriesResponse)
        ? categoriesResponse.filter(validateCategory)
        : [];

      // Log data validation results
      if (
        productsResponse?.products &&
        validProducts.length !== productsResponse.products.length
      ) {
        console.warn(
          `Filtered out ${
            productsResponse.products.length - validProducts.length
          } invalid products`
        );
      }

      if (
        categoriesResponse &&
        validCategories.length !== categoriesResponse.length
      ) {
        console.warn(
          `Filtered out ${
            categoriesResponse.length - validCategories.length
          } invalid categories`
        );
      }

      setProducts(validProducts);
      setCategories(validCategories);
      setRetryCount(0);
    } catch (error: any) {
      console.error("Failed to fetch products data:", error);

      const apiError = error as ApiError;
      let errorMessage =
        language === "ar" ? "فشل في تحميل البيانات" : "Failed to load data";

      // Handle specific error types
      if (apiError.status === 404) {
        errorMessage =
          language === "ar"
            ? "لم يتم العثور على البيانات المطلوبة"
            : "Requested data not found";
      } else if (apiError.status === 500) {
        errorMessage =
          language === "ar"
            ? "خطأ في الخادم، يرجى المحاولة لاحقاً"
            : "Server error, please try again later";
      } else if (
        apiError.code === "NETWORK_ERROR" ||
        apiError.message?.includes("fetch")
      ) {
        errorMessage =
          language === "ar"
            ? "مشكلة في الاتصال، يرجى التحقق من الإنترنت"
            : "Connection problem, please check your internet";
      }

      setError(errorMessage);

      // Retry logic
      if (attempt < MAX_RETRY_ATTEMPTS) {
        setRetryCount(attempt + 1);
        await retryWithDelay(
          () => fetchData(attempt + 1),
          RETRY_DELAY * Math.pow(2, attempt) // Exponential backoff
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sorting and filtering logic with error handling
  const filteredAndSortedProducts = useMemo(() => {
    try {
      if (!Array.isArray(products) || products.length === 0) {
        return [];
      }

      // Filter products
      const filtered = products.filter((product) => {
        try {
          // Validate product structure
          if (!validateProduct(product)) {
            console.warn("Invalid product found during filtering:", product);
            return false;
          }

          // Category filter
          const matchesCategory =
            !filters.category ||
            (() => {
              if (
                typeof product.categoryId === "object" &&
                product.categoryId !== null
              ) {
                return product.categoryId._id === filters.category;
              } else if (typeof product.categoryId === "string") {
                return product.categoryId === filters.category;
              }
              return false;
            })();

          // Metal type filter
          const matchesMetalType =
            !filters.metalType || product.metalType === filters.metalType;

          // Search filter with safe string operations
          const matchesSearch =
            !filters.search ||
            (() => {
              const searchTerm = filters.search.toLowerCase().trim();
              const nameField =
                language === "ar" ? product.nameAr : product.nameEn;
              const descField =
                language === "ar"
                  ? product.descriptionAr
                  : product.descriptionEn;

              return (
                (nameField && nameField.toLowerCase().includes(searchTerm)) ||
                (descField && descField.toLowerCase().includes(searchTerm)) ||
                (product.skuPrice &&
                  product.skuPrice.toLowerCase().includes(searchTerm))
              );
            })();

          return (
            matchesCategory &&
            matchesMetalType &&
            matchesSearch &&
            product.isActive
          );
        } catch (filterError) {
          console.error("Error filtering product:", filterError, product);
          return false;
        }
      });

      // Sort products: Featured first, then by filterPrice (highest to lowest), products without filterPrice at the end
      return filtered.sort((a, b) => {
        try {
          // Featured products always come first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          // Handle products with missing filterPrice - they go to the end
          const aHasFilterPrice =
            typeof a.filterPrice === "number" && !isNaN(a.filterPrice);
          const bHasFilterPrice =
            typeof b.filterPrice === "number" && !isNaN(b.filterPrice);

          // If one has filterPrice and the other doesn't
          if (aHasFilterPrice && !bHasFilterPrice) return -1;
          if (!aHasFilterPrice && bHasFilterPrice) return 1;

          // If both don't have filterPrice, sort by creation date or name
          if (!aHasFilterPrice && !bHasFilterPrice) {
            // Try to sort by creation date if available, otherwise by name
            if (a.createdAt && b.createdAt) {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            // Fallback to name sorting
            const aName = language === "ar" ? a.nameAr : a.nameEn;
            const bName = language === "ar" ? b.nameAr : b.nameEn;
            return aName.localeCompare(bName);
          }

          // If both have filterPrice, sort by filterPrice (highest to lowest)
          const aFilterPrice = a.filterPrice || 0;
          const bFilterPrice = b.filterPrice || 0;

          return bFilterPrice - aFilterPrice;
        } catch (sortError) {
          console.error("Error sorting products:", sortError, a, b);
          return 0;
        }
      });
    } catch (error) {
      console.error("Error in filteredAndSortedProducts:", error);
      return [];
    }
  }, [products, filters, language]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    try {
      setFilters((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };

  const clearFilters = () => {
    try {
      setFilters({ category: "", metalType: "", search: "" });
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  };

  const getProductName = (product: Product) => {
    try {
      const name = language === "ar" ? product.nameAr : product.nameEn;
      return name || (language === "ar" ? "منتج غير معروف" : "Unknown Product");
    } catch (error) {
      console.error("Error getting product name:", error);
      return language === "ar" ? "منتج غير معروف" : "Unknown Product";
    }
  };

  const getProductDescription = (product: Product) => {
    try {
      const description =
        language === "ar" ? product.descriptionAr : product.descriptionEn;
      return description || "";
    } catch (error) {
      console.error("Error getting product description:", error);
      return "";
    }
  };

  const getCategoryName = (categoryId: Product["categoryId"]) => {
    try {
      if (typeof categoryId === "object" && categoryId !== null) {
        return language === "ar" ? categoryId.nameAr : categoryId.nameEn;
      }
      const category = categories.find((cat) => cat._id === categoryId);
      return category
        ? language === "ar"
          ? category.nameAr
          : category.nameEn
        : "";
    } catch (error) {
      console.error("Error getting category name:", error);
      return "";
    }
  };

  const getMetalTypeName = (metalType: string) => {
    try {
      const metal = metalTypes.find((m) => m.value === metalType);
      return metal
        ? language === "ar"
          ? metal.labelAr
          : metal.labelEn
        : metalType;
    } catch (error) {
      console.error("Error getting metal type name:", error);
      return metalType;
    }
  };

  // Retry handler
  const handleRetry = () => {
    setRetryCount(0);
    fetchData();
  };

  // Error state
  if (error && !isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === "ar" ? "حدث خطأ" : "Something went wrong"}
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                {retryCount > 0 && (
                  <p className="text-sm text-gray-500 mb-4">
                    {language === "ar"
                      ? `محاولة ${retryCount} من ${MAX_RETRY_ATTEMPTS}`
                      : `Attempt ${retryCount} of ${MAX_RETRY_ATTEMPTS}`}
                  </p>
                )}
                <Button
                  onClick={handleRetry}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <div className="container-responsive spacing-section">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
                  {language === "ar" ? "منتجاتنا" : "Our Products"}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {language === "ar"
                    ? "اكتشف مجموعتنا الرائعة من المجوهرات الفاخرة المصنوعة بعناية فائقة"
                    : "Discover our exquisite collection of luxury jewelry crafted with exceptional care"}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Filters */}
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
                        ? "البحث في المنتجات..."
                        : "Search products..."
                    }
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {language === "ar" ? "الفلاتر" : "Filters"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ar" ? "الفئة" : "Category"}
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) =>
                          handleFilterChange("category", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">
                          {language === "ar" ? "جميع الفئات" : "All Categories"}
                        </option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {language === "ar"
                              ? category.nameAr
                              : category.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Metal Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ar" ? "نوع المعدن" : "Metal Type"}
                      </label>
                      <select
                        value={filters.metalType}
                        onChange={(e) =>
                          handleFilterChange("metalType", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">
                          {language === "ar" ? "جميع المعادن" : "All Metals"}
                        </option>
                        {metalTypes.map((metal) => (
                          <option key={metal.value} value={metal.value}>
                            {language === "ar" ? metal.labelAr : metal.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full flex items-center justify-center gap-2 bg-transparent"
                      >
                        <X className="h-4 w-4" />
                        {language === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* Products Grid */}
          <section className="container-responsive spacing-section">
            {filteredAndSortedProducts.length === 0 ? (
              <FadeIn className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar"
                      ? "لم يتم العثور على منتجات"
                      : "No products found"}
                  </h3>
                  <p className="text-gray-600">
                    {language === "ar"
                      ? "جرب تغيير الفلاتر أو البحث عن شيء آخر"
                      : "Try adjusting your filters or search for something else"}
                  </p>
                </div>
              </FadeIn>
            ) : (
              <>
                <FadeIn className="mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {language === "ar"
                        ? `عرض ${filteredAndSortedProducts.length} منتج`
                        : `Showing ${filteredAndSortedProducts.length} products`}
                    </p>
                  </div>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <StaggerItem key={product._id}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                      >
                        {/* Featured Badge */}
                        {product.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                              <Star className="h-3 w-3 fill-current" />
                              {language === "ar" ? "مميز" : "Featured"}
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/products/${product._id}`}
                          className="block"
                        >
                          <div className="aspect-square overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.5 }}
                              className="w-full h-full"
                            >
                              <Image
                                src={product.mainImg || "/placeholder.svg"}
                                alt={getProductName(product)}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                onError={(e) => {
                                  console.error(
                                    "Image load error for product:",
                                    product._id
                                  );
                                  e.currentTarget.src = "/placeholder.svg";
                                }}
                              />
                            </motion.div>
                          </div>

                          <div className="p-4 sm:p-6">
                            <div className="mb-2">
                              <span className="text-xs text-gray-500 uppercase tracking-wide">
                                {getCategoryName(product.categoryId)}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                              {getProductName(product)}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {getProductDescription(product)}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {getMetalTypeName(product.metalType)}
                                </span>
                                {product.skuPrice && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {product.skuPrice}
                                  </span>
                                )}
                              </div>

                              {product.showPrice &&
                                product.price &&
                                typeof product.price === "number" && (
                                  <div className="text-right">
                                    <span className="text-lg font-bold text-gray-900">
                                      ${product.price.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
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

export default function ProductsPage() {
  return (
    <ErrorBoundary>
      <ProductsPageContent />
    </ErrorBoundary>
  );
}
