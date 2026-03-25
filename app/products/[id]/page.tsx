// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Share2,
//   Expand,
//   Copy,
//   Check,
//   Star,
//   ShoppingBag,
// } from "lucide-react";
// import { Navbar } from "@/components/ui/navbar";
// import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/components/providers/language-provider";
// import { apiService, type Product } from "@/lib/api";
// import { PageTransition } from "@/components/ui/page-transition";
// import { FadeIn } from "@/components/ui/fade-in";
// import { ImageGallery } from "@/components/ui/image-gallery";
// import { ErrorBoundary } from "@/components/ui/error-boundary";

// function ProductPageContent() {
//   const params = useParams();
//   const router = useRouter();
//   const { t, language, isRTL } = useLanguage();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [skuCopySuccess, setSkuCopySuccess] = useState(false);
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

//   const metalTypes = [
//     { value: "gold", labelEn: "Gold", labelAr: "ذهب" },
//     { value: "silver", labelEn: "Silver", labelAr: "فضة" },
//     { value: "platinum", labelEn: "Platinum", labelAr: "بلاتين" },
//     { value: "other", labelEn: "Other", labelAr: "أخرى" },
//   ];

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setIsLoading(true);
//         const productId = params.id as string;

//         console.log("Fetching product with ID:", productId);

//         if (!productId) {
//           console.log("No product ID provided");
//           router.push("/products");
//           return;
//         }

//         const productData = await apiService.getProduct(productId);

//         if (!productData) {
//           console.log("No product data found, redirecting to products page");
//           router.push("/products");
//           return;
//         }

//         console.log("Setting product data:", productData);
//         setProduct(productData);

//         try {
//           if (typeof productData.categoryId === "string") {
//             console.log(
//               "Fetching related products for category:",
//               productData.categoryId,
//             );
//             const related = await apiService.getProductsByCategory(
//               productData.categoryId,
//             );
//             setRelatedProducts(
//               related.filter((p) => p._id !== productData._id).slice(0, 5),
//             );
//           } else if (
//             productData.categoryId &&
//             typeof productData.categoryId === "object"
//           ) {
//             console.log(
//               "Fetching related products for category object:",
//               productData.categoryId._id,
//             );
//             const related = await apiService.getProductsByCategory(
//               productData.categoryId._id,
//             );
//             setRelatedProducts(
//               related.filter((p) => p._id !== productData._id).slice(0, 5),
//             );
//           }
//         } catch (relatedError) {
//           console.log("Failed to fetch related products:", relatedError);
//         }
//       } catch (error) {
//         console.error("Failed to fetch product:", error);
//         router.push("/products");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id, router]);

//   const getProductName = (product: Product) => {
//     return language === "ar" ? product.nameAr : product.nameEn;
//   };

//   const getProductDescription = (product: Product) => {
//     return language === "ar" ? product.descriptionAr : product.descriptionEn;
//   };

//   const getCategoryName = (categoryId: Product["categoryId"]) => {
//     if (typeof categoryId === "object" && categoryId) {
//       return language === "ar" ? categoryId.nameAr : categoryId.nameEn;
//     }
//     return "";
//   };

//   const getCollectionName = (collectionId: Product["collectionId"]) => {
//     if (collectionId && typeof collectionId === "object") {
//       return language === "ar" ? collectionId.nameAr : collectionId.nameEn;
//     }
//     return "";
//   };

//   const getMetalTypeName = (metalType: string) => {
//     const metal = metalTypes.find((m) => m.value === metalType);
//     return metal
//       ? language === "ar"
//         ? metal.labelAr
//         : metal.labelEn
//       : metalType;
//   };

//   const copyProductUrl = async () => {
//     try {
//       const currentUrl = window.location.href;
//       await navigator.clipboard.writeText(currentUrl);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (error) {
//       console.error("Failed to copy URL:", error);
//       const textArea = document.createElement("textarea");
//       textArea.value = window.location.href;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     }
//   };

//   const copyProductSku = async () => {
//     if (!product?.skuPrice) return;

//     try {
//       await navigator.clipboard.writeText(product.skuPrice);
//       setSkuCopySuccess(true);
//       setTimeout(() => setSkuCopySuccess(false), 2000);
//     } catch (error) {
//       console.error("Failed to copy SKU:", error);
//       const textArea = document.createElement("textarea");
//       textArea.value = product.skuPrice;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
//       setSkuCopySuccess(true);
//       setTimeout(() => setSkuCopySuccess(false), 2000);
//     }
//   };

//   const allImages = product
//     ? [product.mainImg, ...product.images].filter(Boolean)
//     : [];

//   // Loading state - minimal skeleton with exact dimensions to prevent layout shift
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="pt-16 lg:pt-20">
//           {/* Breadcrumb Skeleton */}
//           <div className="border-b border-gray-50">
//             <div className="container-responsive py-12">
//               <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
//             </div>
//           </div>

//           {/* Product Details Skeleton */}
//           <section className="container-responsive py-16 lg:py-32">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
//               {/* Images Skeleton - Fixed Aspect Ratio */}
//               <div className="space-y-8">
//                 <div className="w-full aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
//                 <div className="flex gap-4">
//                   {[...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 animate-pulse"
//                     ></div>
//                   ))}
//                 </div>
//               </div>

//               {/* Product Info Skeleton */}
//               <div className="space-y-10">
//                 <div className="space-y-6">
//                   <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
//                   <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
//                   {/* SKU */}
//                   <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
//                 </div>

//                 {/* Title and Share */}
//                 <div className="space-y-6">
//                   <div className="h-16 bg-gray-200 rounded w-full animate-pulse"></div>
//                 </div>

//                 {/* Price Section */}
//                 <div className="py-8 border-t border-b border-gray-100">
//                   <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
//                   <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
//                 </div>

//                 {/* Specifications */}
//                 <div className="space-y-4">
//                   <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
//                   {[...Array(3)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="h-4 bg-gray-100 rounded w-full animate-pulse"
//                     ></div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Related Products Skeleton */}
//           <section className="border-t border-gray-100 py-20 lg:py-32 bg-gray-50">
//             <div className="container-responsive">
//               <div className="text-center mb-20">
//                 <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-6"></div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={i} className="space-y-4">
//                     <div className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
//                     <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="pt-16 lg:pt-20">
//           <div className="container-responsive spacing-section text-center">
//             <div className="max-w-md mx-auto">
//               <h1 className="text-3xl font-playfair font-light text-gray-900 mb-8">
//                 {language === "ar" ? "المنتج غير موجود" : "Product not found"}
//               </h1>
//               <Button
//                 onClick={() => router.push("/products")}
//                 className="bg-black text-white hover:bg-gray-800 px-8 py-3"
//               >
//                 {language === "ar" ? "العودة للمنتجات" : "Back to Products"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <PageTransition>
//       <div className="min-h-screen bg-white">
//         <Navbar />

//         <div className="pt-16 lg:pt-20">
//           {/* Breadcrumb */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//             className="border-b border-gray-50"
//           >
//             <div className="container-responsive py-12">
//               <div className="flex items-center gap-4 text-sm">
//                 <button
//                   onClick={() => router.back()}
//                   className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-light tracking-wide"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                   {language === "ar" ? "رجوع" : "Back"}
//                 </button>
//                 <span className="text-gray-200">•</span>
//                 <span className="text-gray-400 font-light tracking-wide">
//                   {language === "ar" ? "المنتجات" : "Products"}
//                 </span>
//                 <span className="text-gray-200">•</span>
//                 <span className="text-gray-900 font-light tracking-wide truncate">
//                   {getProductName(product)}
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Product Details */}
//           <section className="container-responsive py-16 lg:py-32">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.15 }}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
//             >
//               {/* Images */}
//               <div className="space-y-8">
//                 {/* Main Image */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.98 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="aspect-square bg-gray-50 overflow-hidden relative group rounded-lg"
//                 >
//                   <Image
//                     src={allImages[selectedImageIndex] || "/placeholder.svg"}
//                     alt={getProductName(product)}
//                     fill
//                     className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
//                     sizes="(max-width: 1024px) 100vw, 50vw"
//                     priority
//                   />
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setIsGalleryOpen(true)}
//                     className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:shadow-xl"
//                   >
//                     <Expand className="h-5 w-5 text-gray-700" />
//                   </motion.button>
//                 </motion.div>

//                 {/* Thumbnail Images */}
//                 {allImages.length > 1 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.25 }}
//                     className="flex gap-4 overflow-x-auto pb-2"
//                   >
//                     {allImages.map((image, index) => (
//                       <motion.button
//                         key={index}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setSelectedImageIndex(index)}
//                         className={`relative w-24 h-24 overflow-hidden rounded-lg border-2 transition-all flex-shrink-0 ${
//                           index === selectedImageIndex
//                             ? "border-black shadow-md"
//                             : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
//                         }`}
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${getProductName(product)} - ${index + 1}`}
//                           fill
//                           className="object-cover"
//                           sizes="96px"
//                         />
//                       </motion.button>
//                     ))}
//                   </motion.div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="space-y-10">
//                 {/* Header Section */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="space-y-6"
//                 >
//                   {/* Category & Featured Badge */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       {getCategoryName(product.categoryId) && (
//                         <div className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
//                           {getCategoryName(product.categoryId)}
//                         </div>
//                       )}
//                       {product.featured && (
//                         <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
//                           <Star className="h-3 w-3 fill-current" />
//                           {language === "ar" ? "مميز" : "Featured"}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Collection */}
//                   {getCollectionName(product.collectionId) && (
//                     <div className="text-sm text-gray-500 font-light tracking-wide">
//                       {language === "ar" ? "من مجموعة" : "From"}{" "}
//                       <span className="font-normal text-gray-700">
//                         {getCollectionName(product.collectionId)}
//                       </span>
//                     </div>
//                   )}

//                   {/* SKU Section */}
//                   {product.skuPrice && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4, delay: 0.25 }}
//                       className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
//                     >
//                       <div className="flex-1">
//                         <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                           {language === "ar" ? "رمز المنتج" : "Product Code"}
//                         </div>
//                         <code className="text-sm font-mono text-gray-900 bg-white px-2 py-1 rounded border">
//                           {product.skuPrice}
//                         </code>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={copyProductSku}
//                         className={`p-2 rounded-lg transition-all duration-300 ${
//                           skuCopySuccess
//                             ? "bg-green-100 text-green-700"
//                             : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                         }`}
//                       >
//                         {skuCopySuccess ? (
//                           <Check className="h-4 w-4" />
//                         ) : (
//                           <Copy className="h-4 w-4" />
//                         )}
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </motion.div>

//                 {/* Product Name & Share */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.25 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light text-gray-900 leading-[1.1] flex-1">
//                       {getProductName(product)}
//                     </h1>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={copyProductUrl}
//                       className={`p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
//                         copySuccess
//                           ? "bg-green-50 border-green-200 text-green-700"
//                           : "border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                       }`}
//                     >
//                       <Share2 className="h-5 w-5" />
//                     </motion.button>
//                   </div>
//                   <AnimatePresence>
//                     {copySuccess && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="text-sm text-green-600 font-light"
//                       >
//                         {language === "ar"
//                           ? "تم نسخ الرابط"
//                           : "Link copied to clipboard"}
//                       </motion.div>
//                     )}
//                     {skuCopySuccess && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="text-sm text-green-600 font-light"
//                       >
//                         {language === "ar"
//                           ? "تم نسخ رمز المنتج"
//                           : "Product code copied to clipboard"}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>

//                 {/* Price */}
//                 {product.showPrice &&
//                   product.price &&
//                   typeof product.price === "number" && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: 0.3 }}
//                       className="py-8 border-t border-b border-gray-100"
//                     >
//                       <div className="flex items-center justify-between gap-4">
//                         <div className="text-3xl sm:text-4xl font-light text-gray-900 tracking-wide">
//                           ${product.price.toLocaleString()}
//                         </div>
//                         <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center gap-2">
//                           <ShoppingBag className="h-4 w-4" />
//                           {language === "ar" ? "استفسار" : "Inquire"}
//                         </Button>
//                       </div>
//                     </motion.div>
//                   )}

//                 {/* Description */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.35 }}
//                   className="prose prose-xl prose-gray max-w-none"
//                 >
//                   <p className="text-gray-600 leading-relaxed font-light tracking-wide text-lg">
//                     {getProductDescription(product)}
//                   </p>
//                 </motion.div>

//                 {/* Product Details */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="space-y-8"
//                 >
//                   <h3 className="text-lg font-light text-gray-900 tracking-wide">
//                     {language === "ar" ? "التفاصيل" : "Specifications"}
//                   </h3>
//                   <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//                     <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
//                       <span className="text-gray-500 font-light tracking-wide">
//                         {language === "ar" ? "نوع المعدن" : "Metal Type"}
//                       </span>
//                       <span className="font-medium text-gray-900 tracking-wide capitalize">
//                         {getMetalTypeName(product.metalType)}
//                       </span>
//                     </div>
//                     {product.caratSize && (
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
//                         <span className="text-gray-500 font-light tracking-wide">
//                           {language === "ar" ? "القيراط" : "Carat Size"}
//                         </span>
//                         <span className="font-medium text-gray-900 tracking-wide">
//                           {product.caratSize}
//                         </span>
//                       </div>
//                     )}
//                     {product.weight && (
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
//                         <span className="text-gray-500 font-light tracking-wide">
//                           {language === "ar" ? "الوزن" : "Weight"}
//                         </span>
//                         <span className="font-medium text-gray-900 tracking-wide">
//                           {product.weight}g
//                         </span>
//                       </div>
//                     )}
//                     {product.stock !== undefined && (
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
//                         <span className="text-gray-500 font-light tracking-wide">
//                           {language === "ar" ? "التوفر" : "Availability"}
//                         </span>
//                         <span
//                           className={`font-medium tracking-wide ${
//                             product.stock > 0
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {product.stock > 0
//                             ? language === "ar"
//                               ? "متوفر"
//                               : "In Stock"
//                             : language === "ar"
//                               ? "غير متوفر"
//                               : "Out of Stock"}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </section>

//           {/* Related Products */}
//           {relatedProducts.length > 0 && (
//             <section className="border-t border-gray-100 py-20 lg:py-32 bg-gray-50">
//               <div className="container-responsive">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.5 }}
//                   className="text-center mb-20"
//                 >
//                   <h2 className="text-3xl sm:text-4xl font-playfair font-light text-gray-900 mb-6 tracking-wide">
//                     {language === "ar" ? "منتجات مشابهة" : "Similar Pieces"}
//                   </h2>
//                   <div className="w-16 h-px bg-gray-400 mx-auto"></div>
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
//                   {relatedProducts.map((relatedProduct, index) => {
//                     const primaryImage =
//                       relatedProduct.mainImg || "/placeholder.svg";
//                     const hoverImage =
//                       relatedProduct.images?.[0] || primaryImage;
//                     const isHovered = hoveredProduct === relatedProduct._id;

//                     return (
//                       <motion.div
//                         key={relatedProduct._id}
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                           duration: 0.5,
//                           delay: 0.5 + index * 0.08,
//                         }}
//                         className="group cursor-pointer"
//                         onMouseEnter={() =>
//                           setHoveredProduct(relatedProduct._id)
//                         }
//                         onMouseLeave={() => setHoveredProduct(null)}
//                       >
//                         <motion.div
//                           whileHover={{ y: -4 }}
//                           transition={{ duration: 0.4 }}
//                           className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
//                         >
//                           <a
//                             href={`/products/${relatedProduct._id}`}
//                             className="block"
//                           >
//                             <div className="aspect-square overflow-hidden relative">
//                               {/* Primary Image */}
//                               <Image
//                                 src={primaryImage}
//                                 alt={getProductName(relatedProduct)}
//                                 width={300}
//                                 height={300}
//                                 className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:scale-[1.05] ${
//                                   isHovered ? "opacity-0" : "opacity-100"
//                                 }`}
//                                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                               />

//                               {/* Hover Image */}
//                               <Image
//                                 src={hoverImage}
//                                 alt={getProductName(relatedProduct)}
//                                 width={300}
//                                 height={300}
//                                 className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:scale-[1.05] ${
//                                   isHovered ? "opacity-100" : "opacity-0"
//                                 }`}
//                                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                               />

//                               {relatedProduct.featured && (
//                                 <div className="absolute top-3 right-3 z-10">
//                                   <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
//                                     <Star className="h-3 w-3 fill-current" />
//                                     {language === "ar" ? "مميز" : "Featured"}
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="p-6 space-y-4">
//                               <h3 className="font-light text-gray-900 text-lg group-hover:text-gray-600 transition-colors line-clamp-2 tracking-wide min-h-[3.5rem]">
//                                 {getProductName(relatedProduct)}
//                               </h3>

//                               {/* Description with smooth transition */}
//                               <div className="overflow-hidden">
//                                 <motion.div
//                                   initial={{
//                                     height: 0,
//                                     opacity: 0,
//                                     y: -10,
//                                   }}
//                                   animate={{
//                                     height: isHovered ? "auto" : 0,
//                                     opacity: isHovered ? 1 : 0,
//                                     y: isHovered ? 0 : -10,
//                                   }}
//                                   transition={{
//                                     duration: 0.5,
//                                     ease: [0.25, 0.1, 0.25, 1],
//                                     opacity: {
//                                       duration: 0.4,
//                                       delay: isHovered ? 0.1 : 0,
//                                     },
//                                     y: {
//                                       duration: 0.4,
//                                       delay: isHovered ? 0.1 : 0,
//                                     },
//                                   }}
//                                   className="text-sm text-gray-600 line-clamp-2"
//                                 >
//                                   {getProductDescription(relatedProduct)}
//                                 </motion.div>
//                               </div>

//                               <div className="space-y-3">
//                                 {/* SKU and Metal Type */}
//                                 <div className="flex items-center gap-2 flex-wrap">
//                                   <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
//                                     {getMetalTypeName(relatedProduct.metalType)}
//                                   </span>
//                                   {relatedProduct.skuPrice && (
//                                     <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-mono">
//                                       {relatedProduct.skuPrice}
//                                     </code>
//                                   )}
//                                 </div>

//                                 {/* Price */}
//                                 {relatedProduct.showPrice &&
//                                   relatedProduct.price &&
//                                   typeof relatedProduct.price === "number" && (
//                                     <div className="flex items-center justify-between">
//                                       <p className="text-xl font-light text-gray-900 tracking-wide">
//                                         ${relatedProduct.price.toLocaleString()}
//                                       </p>
//                                     </div>
//                                   )}
//                               </div>
//                             </div>
//                           </a>
//                         </motion.div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>

//                 {/* Show all products link */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     duration: 0.5,
//                     delay: 0.5 + relatedProducts.length * 0.08,
//                   }}
//                   className="text-center mt-16"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Button
//                       onClick={() => router.push("/products")}
//                       variant="outline"
//                       className="px-8 py-3 text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
//                     >
//                       {language === "ar"
//                         ? "عرض جميع المنتجات"
//                         : "View All Products"}
//                     </Button>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </section>
//           )}
//         </div>

//         {/* Image Gallery Modal */}
//         <ImageGallery
//           images={allImages}
//           alt={getProductName(product)}
//           isOpen={isGalleryOpen}
//           onClose={() => setIsGalleryOpen(false)}
//           initialIndex={selectedImageIndex}
//         />
//       </div>
//     </PageTransition>
//   );
// }

// export default function ProductPage() {
//   return (
//     <ErrorBoundary>
//       <ProductPageContent />
//     </ErrorBoundary>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Expand,
  Copy,
  Check,
  Star,
  ShoppingBag,
} from "lucide-react";
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
  const [skuCopySuccess, setSkuCopySuccess] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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

        console.log("Fetching product with ID:", productId);

        if (!productId) {
          console.log("No product ID provided");
          router.push("/products");
          return;
        }

        const productData = await apiService.getProduct(productId);

        if (!productData) {
          console.log("No product data found, redirecting to products page");
          router.push("/products");
          return;
        }

        console.log("Setting product data:", productData);
        setProduct(productData);

        try {
          if (typeof productData.categoryId === "string") {
            console.log(
              "Fetching related products for category:",
              productData.categoryId,
            );
            const related = await apiService.getProductsByCategory(
              productData.categoryId,
            );
            setRelatedProducts(
              related.filter((p) => p._id !== productData._id).slice(0, 5),
            );
          } else if (
            productData.categoryId &&
            typeof productData.categoryId === "object"
          ) {
            console.log(
              "Fetching related products for category object:",
              productData.categoryId._id,
            );
            const related = await apiService.getProductsByCategory(
              productData.categoryId._id,
            );
            setRelatedProducts(
              related.filter((p) => p._id !== productData._id).slice(0, 5),
            );
          }
        } catch (relatedError) {
          console.log("Failed to fetch related products:", relatedError);
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
    if (typeof categoryId === "object" && categoryId) {
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
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
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

  const copyProductSku = async () => {
    if (!product?.skuPrice) return;

    try {
      await navigator.clipboard.writeText(product.skuPrice);
      setSkuCopySuccess(true);
      setTimeout(() => setSkuCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy SKU:", error);
      const textArea = document.createElement("textarea");
      textArea.value = product.skuPrice;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setSkuCopySuccess(true);
      setTimeout(() => setSkuCopySuccess(false), 2000);
    }
  };

  const allImages = product
    ? [product.mainImg, ...product.images].filter(Boolean)
    : [];

  // Loading skeleton state - rendered first
  const loadingSkeleton = (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Breadcrumb Skeleton */}
        <div className="border-b border-gray-50">
          <div className="container-responsive py-12">
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <section className="container-responsive py-16 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Images Skeleton - Fixed Aspect Ratio */}
            <div className="space-y-8">
              <div className="w-full aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
                {/* SKU */}
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>

              {/* Title and Share */}
              <div className="space-y-6">
                <div className="h-16 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>

              {/* Price Section */}
              <div className="py-8 border-t border-b border-gray-100">
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-100 rounded w-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Skeleton */}
        <section className="border-t border-gray-100 py-20 lg:py-32 bg-gray-50">
          <div className="container-responsive">
            <div className="text-center mb-20">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Not found state
  const notFoundState = (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <div className="container-responsive spacing-section text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-playfair font-light text-gray-900 mb-8">
              {language === "ar" ? "المنتج غير موجود" : "Product not found"}
            </h1>
            <Button
              onClick={() => router.push("/products")}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3"
            >
              {language === "ar" ? "العودة للمنتجات" : "Back to Products"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading or not found state - return early, navbar only renders once
  if (isLoading) return loadingSkeleton;
  if (!product) return notFoundState;

  // Only render animated content when we have product data
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        <div className="pt-16 lg:pt-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-b border-gray-50"
          >
            <div className="container-responsive py-12">
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-light tracking-wide"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {language === "ar" ? "رجوع" : "Back"}
                </button>
                <span className="text-gray-200">•</span>
                <span className="text-gray-400 font-light tracking-wide">
                  {language === "ar" ? "المنتجات" : "Products"}
                </span>
                <span className="text-gray-200">•</span>
                <span className="text-gray-900 font-light tracking-wide truncate">
                  {getProductName(product)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <section className="container-responsive py-16 lg:py-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
            >
              {/* Images */}
              <div className="space-y-8">
                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="aspect-square bg-gray-50 overflow-hidden relative group rounded-lg"
                >
                  <Image
                    src={allImages[selectedImageIndex] || "/placeholder.svg"}
                    alt={getProductName(product)}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:shadow-xl"
                  >
                    <Expand className="h-5 w-5 text-gray-700" />
                  </motion.button>
                </motion.div>

                {/* Thumbnail Images */}
                {allImages.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex gap-4 overflow-x-auto pb-2"
                  >
                    {allImages.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-24 h-24 overflow-hidden rounded-lg border-2 transition-all flex-shrink-0 ${
                          index === selectedImageIndex
                            ? "border-black shadow-md"
                            : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${getProductName(product)} - ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-10">
                {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Category & Featured Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getCategoryName(product.categoryId) && (
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
                          {getCategoryName(product.categoryId)}
                        </div>
                      )}
                      {product.featured && (
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          <Star className="h-3 w-3 fill-current" />
                          {language === "ar" ? "مميز" : "Featured"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collection */}
                  {getCollectionName(product.collectionId) && (
                    <div className="text-sm text-gray-500 font-light tracking-wide">
                      {language === "ar" ? "من مجموعة" : "From"}{" "}
                      <span className="font-normal text-gray-700">
                        {getCollectionName(product.collectionId)}
                      </span>
                    </div>
                  )}

                  {/* SKU Section */}
                  {product.skuPrice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {language === "ar" ? "رمز المنتج" : "Product Code"}
                        </div>
                        <code className="text-sm font-mono text-gray-900 bg-white px-2 py-1 rounded border">
                          {product.skuPrice}
                        </code>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyProductSku}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          skuCopySuccess
                            ? "bg-green-100 text-green-700"
                            : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {skuCopySuccess ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Product Name & Share */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light text-gray-900 leading-[1.1] flex-1">
                      {getProductName(product)}
                    </h1>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyProductUrl}
                      className={`p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
                        copySuccess
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {copySuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-green-600 font-light"
                      >
                        {language === "ar"
                          ? "تم نسخ الرابط"
                          : "Link copied to clipboard"}
                      </motion.div>
                    )}
                    {skuCopySuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-green-600 font-light"
                      >
                        {language === "ar"
                          ? "تم نسخ رمز المنتج"
                          : "Product code copied to clipboard"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Price */}
                {product.showPrice &&
                  product.price &&
                  typeof product.price === "number" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="py-8 border-t border-b border-gray-100"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-3xl sm:text-4xl font-light text-gray-900 tracking-wide">
                          ${product.price.toLocaleString()}
                        </div>
                        <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          {language === "ar" ? "استفسار" : "Inquire"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="prose prose-xl prose-gray max-w-none"
                >
                  <p className="text-gray-600 leading-relaxed font-light tracking-wide text-lg">
                    {getProductDescription(product)}
                  </p>
                </motion.div>

                {/* Product Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-8"
                >
                  <h3 className="text-lg font-light text-gray-900 tracking-wide">
                    {language === "ar" ? "التفاصيل" : "Specifications"}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-500 font-light tracking-wide">
                        {language === "ar" ? "نوع المعدن" : "Metal Type"}
                      </span>
                      <span className="font-medium text-gray-900 tracking-wide capitalize">
                        {getMetalTypeName(product.metalType)}
                      </span>
                    </div>
                    {product.caratSize && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-500 font-light tracking-wide">
                          {language === "ar" ? "القيراط" : "Carat Size"}
                        </span>
                        <span className="font-medium text-gray-900 tracking-wide">
                          {product.caratSize}
                        </span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-500 font-light tracking-wide">
                          {language === "ar" ? "الوزن" : "Weight"}
                        </span>
                        <span className="font-medium text-gray-900 tracking-wide">
                          {product.weight}g
                        </span>
                      </div>
                    )}
                    {product.stock !== undefined && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-500 font-light tracking-wide">
                          {language === "ar" ? "التوفر" : "Availability"}
                        </span>
                        <span
                          className={`font-medium tracking-wide ${
                            product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stock > 0
                            ? language === "ar"
                              ? "متوفر"
                              : "In Stock"
                            : language === "ar"
                              ? "غير متوفر"
                              : "Out of Stock"}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="border-t border-gray-100 py-20 lg:py-32 bg-gray-50">
              <div className="container-responsive">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center mb-20"
                >
                  <h2 className="text-3xl sm:text-4xl font-playfair font-light text-gray-900 mb-6 tracking-wide">
                    {language === "ar" ? "منتجات مشابهة" : "Similar Pieces"}
                  </h2>
                  <div className="w-16 h-px bg-gray-400 mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                  {relatedProducts.map((relatedProduct, index) => {
                    const primaryImage =
                      relatedProduct.mainImg || "/placeholder.svg";
                    const hoverImage =
                      relatedProduct.images?.[0] || primaryImage;
                    const isHovered = hoveredProduct === relatedProduct._id;

                    return (
                      <motion.div
                        key={relatedProduct._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.08,
                        }}
                        className="group cursor-pointer"
                        onMouseEnter={() =>
                          setHoveredProduct(relatedProduct._id)
                        }
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.4 }}
                          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                          <a
                            href={`/products/${relatedProduct._id}`}
                            className="block"
                          >
                            <div className="aspect-square overflow-hidden relative">
                              {/* Primary Image */}
                              <Image
                                src={primaryImage}
                                alt={getProductName(relatedProduct)}
                                width={300}
                                height={300}
                                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:scale-[1.05] ${
                                  isHovered ? "opacity-0" : "opacity-100"
                                }`}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />

                              {/* Hover Image */}
                              <Image
                                src={hoverImage}
                                alt={getProductName(relatedProduct)}
                                width={300}
                                height={300}
                                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:scale-[1.05] ${
                                  isHovered ? "opacity-100" : "opacity-0"
                                }`}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />

                              {relatedProduct.featured && (
                                <div className="absolute top-3 right-3 z-10">
                                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                                    <Star className="h-3 w-3 fill-current" />
                                    {language === "ar" ? "مميز" : "Featured"}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="p-6 space-y-4">
                              <h3 className="font-light text-gray-900 text-lg group-hover:text-gray-600 transition-colors line-clamp-2 tracking-wide min-h-[3.5rem]">
                                {getProductName(relatedProduct)}
                              </h3>

                              {/* Description with smooth transition */}
                              <div className="overflow-hidden">
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                    y: -10,
                                  }}
                                  animate={{
                                    height: isHovered ? "auto" : 0,
                                    opacity: isHovered ? 1 : 0,
                                    y: isHovered ? 0 : -10,
                                  }}
                                  transition={{
                                    duration: 0.5,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    opacity: {
                                      duration: 0.4,
                                      delay: isHovered ? 0.1 : 0,
                                    },
                                    y: {
                                      duration: 0.4,
                                      delay: isHovered ? 0.1 : 0,
                                    },
                                  }}
                                  className="text-sm text-gray-600 line-clamp-2"
                                >
                                  {getProductDescription(relatedProduct)}
                                </motion.div>
                              </div>

                              <div className="space-y-3">
                                {/* SKU and Metal Type */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {getMetalTypeName(relatedProduct.metalType)}
                                  </span>
                                  {relatedProduct.skuPrice && (
                                    <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-mono">
                                      {relatedProduct.skuPrice}
                                    </code>
                                  )}
                                </div>

                                {/* Price */}
                                {relatedProduct.showPrice &&
                                  relatedProduct.price &&
                                  typeof relatedProduct.price === "number" && (
                                    <div className="flex items-center justify-between">
                                      <p className="text-xl font-light text-gray-900 tracking-wide">
                                        ${relatedProduct.price.toLocaleString()}
                                      </p>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </a>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Show all products link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + relatedProducts.length * 0.08,
                  }}
                  className="text-center mt-16"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => router.push("/products")}
                      variant="outline"
                      className="px-8 py-3 text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    >
                      {language === "ar"
                        ? "عرض جميع المنتجات"
                        : "View All Products"}
                    </Button>
                  </motion.div>
                </motion.div>
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
