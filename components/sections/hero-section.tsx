// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/components/providers/language-provider";
// import { useLocation } from "@/components/providers/location-provider";
// import { apiService, type HomeContent } from "@/lib/api";
// import { LoadingScreen } from "@/components/ui/loading-screen";
// import { ErrorBoundary } from "@/components/ui/error-boundary";

// function HeroSectionContent() {
//   const { t, language } = useLanguage();
//   const { country } = useLocation();
//   const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const fetchHomeContent = async () => {
//       try {
//         const content = await apiService.getHomeContent(country || "LEB");
//         console.log("Fetched home content:", content);
//         setHomeContent(content);
//       } catch (error) {
//         console.error("Failed to fetch home content:", error);
//         // Set default content if API fails
//         setHomeContent({
//           hero: {
//             titleAr: "مرحبًا بكم في مجوهرات الحاج",
//             titleEn: "Welcome to El Hage Jewelry",
//             subtitleAr: "اكتشف مجموعاتنا الحصرية",
//             subtitleEn: "Discover our exclusive collections",
//             useVideo: false,
//             buttonTextAr: "إكتشف مجموعاتنا",
//             buttonTextEn: "Explore Collections",
//             buttonLink: "/collections",
//           },
//           aboutSection: {
//             titleAr: "حول مجوهرات الحاج",
//             titleEn: "About El Hage Jewelers",
//             contentAr: "مجوهرات الحاج تصنع المجوهرات الرائعة منذ عام 1953",
//             contentEn:
//               "El Hage Jewelers has been crafting exquisite jewelry since 1953",
//           },
//           featuredProducts: [],
//           featuredCollections: [],
//           testimonials: [],
//           isActive: true,
//         });
//       } finally {
//         setIsLoading(false);
//         setTimeout(() => setShowContent(true), 100);
//       }
//     };

//     fetchHomeContent();
//   }, [country]);

//   // Auto-play video when component mounts and video is available
//   useEffect(() => {
//     if (
//       videoRef.current &&
//       homeContent?.hero?.useVideo &&
//       homeContent?.hero?.videoUrl
//     ) {
//       const video = videoRef.current;

//       // Set video properties
//       video.muted = true;
//       video.loop = true;
//       video.playsInline = true;
//       video.autoplay = true;

//       // Attempt to play the video
//       const playVideo = async () => {
//         try {
//           await video.play();
//           console.log("Hero video started playing");
//         } catch (error) {
//           console.warn("Failed to auto-play hero video:", error);
//         }
//       };

//       playVideo();
//     }
//   }, [homeContent]);

//   // Get hero content with fallbacks
//   const getHeroTitle = () => {
//     if (homeContent?.hero) {
//       return language === "ar"
//         ? homeContent.hero.titleAr
//         : homeContent.hero.titleEn;
//     }
//     return t("hero.title");
//   };

//   const getHeroSubtitle = () => {
//     if (homeContent?.hero) {
//       return language === "ar"
//         ? homeContent.hero.subtitleAr
//         : homeContent.hero.subtitleEn;
//     }
//     return t("hero.subtitle");
//   };

//   const getHeroButtonText = () => {
//     if (homeContent?.hero) {
//       return language === "ar"
//         ? homeContent.hero.buttonTextAr
//         : homeContent.hero.buttonTextEn;
//     }
//     return t("hero.cta");
//   };

//   const getHeroButtonLink = () => {
//     return homeContent?.hero?.buttonLink || "/collections";
//   };

//   const useVideo = homeContent?.hero?.useVideo || false;
//   const heroVideo = homeContent?.hero?.videoUrl;
//   const heroImage = "/placeholder.svg?height=1080&width=1920"; // Default hero image

//   return (
//     <>
//       <LoadingScreen
//         isLoading={isLoading}
//         onComplete={() => setShowContent(true)}
//       />

//       <section className="relative h-screen overflow-hidden">
//         {/* Background Media */}
//         <motion.div
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: [0.25, 0.25, 0, 1] }}
//           className="absolute inset-0"
//         >
//           {useVideo && heroVideo ? (
//             <div className="absolute inset-0">
//               <video
//                 ref={videoRef}
//                 src={heroVideo}
//                 className="w-full h-full object-cover"
//                 muted
//                 loop
//                 playsInline
//                 autoPlay
//                 preload="auto"
//                 style={{ pointerEvents: "none" }}
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30" />
//             </div>
//           ) : (
//             <div className="absolute inset-0">
//               <Image
//                 src={heroImage || "/placeholder.svg"}
//                 alt="Hero"
//                 fill
//                 className="object-cover"
//                 priority
//                 sizes="100vw"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40" />
//             </div>
//           )}
//         </motion.div>

//         {/* Content Overlay */}
//         {showContent && (
//           <div className="relative z-10 h-full flex items-center justify-center">
//             <div className="text-center text-white container-responsive">
//               <motion.h1
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.3,
//                   ease: [0.25, 0.25, 0, 1],
//                 }}
//                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold mb-4 sm:mb-6 text-shadow leading-tight"
//               >
//                 {getHeroTitle()}
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.6,
//                   ease: [0.25, 0.25, 0, 1],
//                 }}
//                 className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-shadow max-w-2xl mx-auto leading-relaxed"
//               >
//                 {getHeroSubtitle()}
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.9,
//                   ease: [0.25, 0.25, 0, 1],
//                 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 focus-visible"
//                 >
//                   <a href={getHeroButtonLink()}>{getHeroButtonText()}</a>
//                 </Button>
//               </motion.div>
//             </div>
//           </div>
//         )}

//         {/* Scroll Indicator */}
//         {showContent && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.5 }}
//             className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
//           >
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{
//                 duration: 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//               className="flex flex-col items-center"
//             >
//               <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//                 <motion.div
//                   animate={{ y: [0, 12, 0] }}
//                   transition={{
//                     duration: 2,
//                     repeat: Number.POSITIVE_INFINITY,
//                     ease: "easeInOut",
//                   }}
//                   className="w-1 h-3 bg-white rounded-full mt-2"
//                 />
//               </div>
//               <span className="text-xs mt-2 opacity-75">Scroll</span>
//             </motion.div>
//           </motion.div>
//         )}
//       </section>
//     </>
//   );
// }

// export function HeroSection() {
//   return (
//     <ErrorBoundary>
//       <HeroSectionContent />
//     </ErrorBoundary>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function HeroSectionContent() {
  const { t, language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content = await apiService.getHomeContent(country || "LEB");
        console.log("Fetched home content:", content);
        setHomeContent(content);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
        // Set default content if API fails
        setHomeContent({
          hero: {
            titleAr: "مرحبًا بكم في مجوهرات الحاج",
            titleEn: "Welcome to El Hage Jewelry",
            subtitleAr: "اكتشف مجموعاتنا الحصرية",
            subtitleEn: "Discover our exclusive collections",
            useVideo: false,
            buttonTextAr: "إكتشف مجموعاتنا",
            buttonTextEn: "Explore Collections",
            buttonLink: "/collections",
          },
          aboutSection: {
            titleAr: "حول مجوهرات الحاج",
            titleEn: "About El Hage Jewelers",
            contentAr: "مجوهرات الحاج تصنع المجوهرات الرائعة منذ عام 1953",
            contentEn:
              "El Hage Jewelers has been crafting exquisite jewelry since 1953",
          },
          featuredProducts: [],
          featuredCollections: [],
          testimonials: [],
          isActive: true,
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
      }
    };

    fetchHomeContent();
  }, [country]);

  // Auto-play video when component mounts and video is available
  useEffect(() => {
    if (
      videoRef.current &&
      homeContent?.hero?.useVideo &&
      homeContent?.hero?.videoUrl
    ) {
      const video = videoRef.current;

      // Set video properties
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;

      // Attempt to play the video
      const playVideo = async () => {
        try {
          await video.play();
          console.log("Hero video started playing");
        } catch (error) {
          console.warn("Failed to auto-play hero video:", error);
        }
      };

      playVideo();
    }
  }, [homeContent]);

  // Get hero content with fallbacks
  const getHeroTitle = () => {
    if (homeContent?.hero) {
      return language === "ar"
        ? homeContent.hero.titleAr
        : homeContent.hero.titleEn;
    }
    return t("hero.title");
  };

  const getHeroSubtitle = () => {
    if (homeContent?.hero) {
      return language === "ar"
        ? homeContent.hero.subtitleAr
        : homeContent.hero.subtitleEn;
    }
    return t("hero.subtitle");
  };

  const getHeroButtonText = () => {
    if (homeContent?.hero) {
      return language === "ar"
        ? homeContent.hero.buttonTextAr
        : homeContent.hero.buttonTextEn;
    }
    return t("hero.cta");
  };

  const getHeroButtonLink = () => {
    return homeContent?.hero?.buttonLink || "/collections";
  };

  const useVideo = homeContent?.hero?.useVideo || false;
  const heroVideo = homeContent?.hero?.videoUrl;
  const heroImage = "/placeholder.svg?height=1080&width=1920"; // Default hero image

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onComplete={() => setShowContent(true)}
      />

      {/* Mobile Hero - Original Design */}
      <section className="lg:hidden relative h-screen overflow-hidden">
        {/* Background Media */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.25, 0, 1] }}
          className="absolute inset-0"
        >
          {useVideo && heroVideo ? (
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                src={heroVideo}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                style={{ pointerEvents: "none" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
            </div>
          ) : (
            <div className="absolute inset-0">
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="Hero"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
          )}
        </motion.div>

        {/* Content Overlay */}
        {showContent && (
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white container-responsive">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold mb-4 sm:mb-6 text-shadow leading-tight"
              >
                {getHeroTitle()}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-shadow max-w-2xl mx-auto leading-relaxed"
              >
                {getHeroSubtitle()}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  ease: [0.25, 0.25, 0, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 focus-visible"
                >
                  <a href={getHeroButtonLink()}>{getHeroButtonText()}</a>
                </Button>
              </motion.div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white md:hidden"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </div>
              <span className="text-xs mt-2 opacity-75">Scroll</span>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Desktop Hero - Collection-Style Layout */}
      <section className="hidden lg:block h-screen bg-white">
        {showContent && (
          <div className="h-full flex items-center container-responsive py-12 !pl-0">
            <div className="flex items-center gap-12 w-full !pl-0">
              {/* Video/Image (70% width) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="flex-[0_0_70%] relative aspect-video bg-gray-100 rounded-lg overflow-hidden !pl-0"
              >
                {useVideo && heroVideo ? (
                  <video
                    ref={videoRef}
                    src={heroVideo}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <Image
                    src={heroImage || "/placeholder.svg"}
                    alt="Hero"
                    fill
                    className="object-cover"
                    priority
                    sizes="70vw"
                  />
                )}
              </motion.div>

              {/* Text Content (30% width) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="flex-1 space-y-8"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0.25, 0.25, 0, 1],
                  }}
                  className="text-4xl xl:text-5xl 2xl:text-6xl font-playfair font-bold text-gray-900 leading-tight"
                >
                  {getHeroTitle()}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2,
                    ease: [0.25, 0.25, 0, 1],
                  }}
                  className="text-lg xl:text-xl text-gray-600 leading-relaxed"
                >
                  {getHeroSubtitle()}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.5,
                    ease: [0.25, 0.25, 0, 1],
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-300 focus-visible"
                  >
                    <a href={getHeroButtonLink()}>{getHeroButtonText()}</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Scroll Indicator for Desktop */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 hidden"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </div>
              <span className="text-xs mt-2 opacity-75">Scroll</span>
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  );
}

export function HeroSection() {
  return (
    <ErrorBoundary>
      <HeroSectionContent />
    </ErrorBoundary>
  );
}
