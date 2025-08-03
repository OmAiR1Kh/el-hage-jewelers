// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useLanguage } from "@/components/providers/language-provider";
// import { useLocation } from "@/components/providers/location-provider";
// import { apiService, type HomeContent } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { FadeIn } from "@/components/ui/fade-in";
// import {
//   StaggerContainer,
//   StaggerItem,
// } from "@/components/ui/stagger-container";

// export function ProductsSection() {
//   const { t, language } = useLanguage();
//   const { country } = useLocation();
//   const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHomeContent = async () => {
//       try {
//         const content = await apiService.getHomeContent(country || "LEB");
//         setHomeContent(content);
//       } catch (error) {
//         console.error("Failed to fetch home content:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHomeContent();
//   }, [country]);

//   if (isLoading) {
//     return (
//       <section className="spacing-section bg-white">
//         <div className="container-responsive">
//           <div className="text-center mb-12 sm:mb-16">
//             <div className="h-8 sm:h-12 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-4 animate-pulse"></div>
//             <div className="h-4 sm:h-6 bg-gray-200 rounded w-64 sm:w-96 mx-auto animate-pulse"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="group">
//                 <div className="aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
//                 <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
//                 <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
//                 <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Get featured products from home content
//   const featuredProducts = homeContent?.featuredProducts || [];

//   if (featuredProducts.length === 0) {
//     return null; // Don't render if no featured products
//   }

//   const getProductName = (product: any) => {
//     return language === "ar"
//       ? product.productId.nameAr
//       : product.productId.nameEn;
//   };

//   const getProductDescription = (product: any) => {
//     return language === "ar"
//       ? product.productId.descriptionAr
//       : product.productId.descriptionEn;
//   };

//   const router = useRouter();

//   return (
//     <>
//       {featuredProducts.length > 0 ? (
//         <section className="spacing-section bg-white">
//           <div className="container-responsive">
//             <FadeIn className="text-center mb-12 sm:mb-16">
//               <h2 className="text-responsive-xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
//                 {t("products.title")}
//               </h2>
//               <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
//                 {t("products.subtitle")}
//               </p>
//             </FadeIn>

//             <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {featuredProducts.map((product) => {
//                 const primaryImage =
//                   product.productId.mainImg ||
//                   "/placeholder.svg?height=300&width=300";
//                 const hoverImage =
//                   product.productId.images?.[0] || primaryImage;
//                 const isHovered = hoveredProduct === product._id;

//                 return (
//                   <StaggerItem key={product._id}>
//                     <motion.div
//                       whileHover={{ y: -12 }}
//                       transition={{ duration: 0.3, ease: "easeOut" }}
//                       className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
//                       onClick={() => {
//                         router.push(`/products/${product.productId._id}`);
//                       }}
//                       onMouseEnter={() => setHoveredProduct(product._id)}
//                       onMouseLeave={() => setHoveredProduct(null)}
//                     >
//                       <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           transition={{ duration: 0.4, ease: "easeOut" }}
//                           className="w-full h-full relative"
//                         >
//                           {/* Primary Image */}
//                           <Image
//                             src={primaryImage}
//                             alt={getProductName(product)}
//                             width={400}
//                             height={400}
//                             className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
//                               isHovered ? "opacity-0" : "opacity-100"
//                             }`}
//                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                           />

//                           {/* Hover Image */}
//                           <Image
//                             src={hoverImage}
//                             alt={getProductName(product)}
//                             width={400}
//                             height={400}
//                             className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
//                               isHovered ? "opacity-100" : "opacity-0"
//                             }`}
//                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                           />
//                         </motion.div>

//                         {/* Overlay gradient for better text readability */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                         {/* Quick view indicator */}
//                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
//                           <svg
//                             className="w-4 h-4 text-gray-700"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                             />
//                           </svg>
//                         </div>
//                       </div>

//                       <div className="p-4 sm:p-6">
//                         <div className="mb-3">
//                           <h3 className="text-lg sm:text-xl font-playfair font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
//                             {getProductName(product)}
//                           </h3>

//                           {/* Description with smooth transition */}
//                           <div className="overflow-hidden">
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{
//                                 height: isHovered ? "auto" : 0,
//                                 opacity: isHovered ? 1 : 0,
//                               }}
//                               transition={{
//                                 duration: 0.4,
//                                 ease: "easeInOut",
//                                 opacity: { duration: 0.3 },
//                               }}
//                             >
//                               <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed pb-2">
//                                 {getProductDescription(product)}
//                               </p>
//                             </motion.div>
//                           </div>
//                         </div>

//                         {product.productId.showPrice && (
//                           <div className="flex items-center justify-between">
//                             <p className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                               ${product.productId.price.toLocaleString()}
//                             </p>
//                             <motion.div
//                               whileHover={{ x: 4 }}
//                               className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
//                             >
//                               <svg
//                                 className="w-5 h-5"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M9 5l7 7-7 7"
//                                 />
//                               </svg>
//                             </motion.div>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   </StaggerItem>
//                 );
//               })}
//             </StaggerContainer>
//           </div>
//         </section>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";

export function ProductsSection() {
  const { t, language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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
      <section className="spacing-section bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-8 sm:h-12 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-64 sm:w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
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
    <>
      {featuredProducts.length > 0 ? (
        <section className="spacing-section bg-white">
          <div className="container-responsive">
            <FadeIn className="text-center mb-12 sm:mb-16">
              <h2 className="text-responsive-xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
                {t("products.title")}
              </h2>
              <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t("products.subtitle")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredProducts.map((product) => {
                const primaryImage =
                  product.productId.mainImg ||
                  "/placeholder.svg?height=300&width=300";
                const hoverImage =
                  product.productId.images?.[0] || primaryImage;
                const isHovered = hoveredProduct === product._id;

                return (
                  <StaggerItem key={product._id}>
                    <motion.div
                      whileHover={{ y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                      onClick={() => {
                        router.push(`/products/${product.productId._id}`);
                      }}
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="w-full h-full relative"
                        >
                          {/* Primary Image */}
                          <Image
                            src={primaryImage}
                            alt={getProductName(product)}
                            width={400}
                            height={400}
                            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                              isHovered ? "opacity-0" : "opacity-100"
                            }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />

                          {/* Hover Image */}
                          <Image
                            src={hoverImage}
                            alt={getProductName(product)}
                            width={400}
                            height={400}
                            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                              isHovered ? "opacity-100" : "opacity-0"
                            }`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        </motion.div>

                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Quick view indicator */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <svg
                            className="w-4 h-4 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="mb-3">
                          <h3 className="text-lg sm:text-xl font-playfair font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                            {getProductName(product)}
                          </h3>

                          {/* Description with smooth transition */}
                          <div className="overflow-hidden">
                            <motion.div
                              initial={{ height: 0, opacity: 0, y: -10 }}
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
                              className="will-change-transform"
                            >
                              <div className="pt-1 pb-2">
                                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
                                  {getProductDescription(product)}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {product.productId.showPrice && (
                          <div className="flex items-center justify-between">
                            <p className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              ${product.productId.price.toLocaleString()}
                            </p>
                            <motion.div
                              whileHover={{ x: 4 }}
                              className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
