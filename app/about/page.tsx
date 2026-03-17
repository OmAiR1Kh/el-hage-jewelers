// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Star, Sparkles, Award, Globe, Diamond, Crown } from "lucide-react";
// import { Navbar } from "@/components/ui/navbar";
// import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/components/providers/language-provider";
// import { PageTransition } from "@/components/ui/page-transition";
// import { FadeIn } from "@/components/ui/fade-in";
// import {
//   StaggerContainer,
//   StaggerItem,
// } from "@/components/ui/stagger-container";
// import { ErrorBoundary } from "@/components/ui/error-boundary";

// function AboutPageContent() {
//   const { language, t } = useLanguage();
//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 300], [0, 50]);
//   const y2 = useTransform(scrollY, [0, 300], [0, -50]);

//   const values = [
//     {
//       title: t("about.values.luxe.title"),
//       description: t("about.values.luxe.description"),
//       icon: Crown,
//       gradient: "from-purple-600 to-pink-600",
//     },
//     {
//       title: t("about.values.exclusive.title"),
//       description: t("about.values.exclusive.description"),
//       icon: Sparkles,
//       gradient: "from-blue-600 to-cyan-600",
//     },
//     {
//       title: t("about.values.classique.title"),
//       description: t("about.values.classique.description"),
//       icon: Award,
//       gradient: "from-amber-600 to-orange-600",
//     },
//   ];

//   const eras = [
//     {
//       period: language === "ar" ? "١٩٥٣ - ١٩٧٣" : "1953 - 1973",
//       title: t("about.timeline.founding.title"),
//       subtitle: t("about.timeline.founding.subtitle"),
//       content: t("about.timeline.founding.content"),
//       icon: Star,
//       color: "emerald",
//       img: "/about/sc-01.jpg",
//     },
//     {
//       period: language === "ar" ? "١٩٧٣ - ١٩٩٧" : "1973 - 1997",
//       title: t("about.timeline.expansion.title"),
//       subtitle: t("about.timeline.expansion.subtitle"),
//       content: t("about.timeline.expansion.content"),
//       icon: Globe,
//       color: "blue",
//       img: "/about/sc-02.jpg",
//     },
//     {
//       period: "",
//       title: t("about.artist.title"),
//       subtitle: "",
//       content: t("about.artist.content"),
//       icon: Crown,
//       color: "amber",
//       isArtist: true,
//       img: "/about/sc-03.jpg",
//     },
//     {
//       period: language === "ar" ? "١٩٩٧ - ٢٠٠٣" : "1997 - 2003",
//       title: t("about.timeline.modernization.title"),
//       subtitle: t("about.timeline.modernization.subtitle"),
//       content: t("about.timeline.modernization.content"),
//       icon: Diamond,
//       color: "purple",
//       img: "/about/sc-04.jpg",
//     },
//     {
//       period: language === "ar" ? "٢٠٠٣ - ٢٠٢٦" : "2003 - 2026",
//       title: t("about.timeline.luxury.title"),
//       subtitle: t("about.timeline.luxury.subtitle"),
//       content: t("about.timeline.luxury.content"),
//       icon: Crown,
//       color: "amber",
//       img: "/about/sc-05.jpg",
//     },
//     {
//       period: language === "ar" ? "٢٠٢٦ وما بعدها" : "2026 & Beyond",
//       title: t("about.timeline.future.title"),
//       subtitle: t("about.timeline.future.subtitle"),
//       content: t("about.timeline.future.content"),
//       icon: Sparkles,
//       color: "rose",
//       img: "/about/sc-06.jpg",
//     },
//   ];

//   // Explicit color map — avoids Tailwind purging dynamic class strings
//   const colorMap: Record<
//     string,
//     {
//       text: string;
//       iconBg: string;
//       gradientFrom: string;
//       gradientTo: string;
//     }
//   > = {
//     emerald: {
//       text: "text-emerald-600",
//       iconBg: "bg-emerald-100",
//       gradientFrom: "from-emerald-400",
//       gradientTo: "to-emerald-600",
//     },
//     blue: {
//       text: "text-blue-600",
//       iconBg: "bg-blue-100",
//       gradientFrom: "from-blue-400",
//       gradientTo: "to-blue-600",
//     },
//     amber: {
//       text: "text-amber-600",
//       iconBg: "bg-amber-100",
//       gradientFrom: "from-amber-400",
//       gradientTo: "to-amber-600",
//     },
//     purple: {
//       text: "text-purple-600",
//       iconBg: "bg-purple-100",
//       gradientFrom: "from-purple-400",
//       gradientTo: "to-purple-600",
//     },
//     rose: {
//       text: "text-rose-600",
//       iconBg: "bg-rose-100",
//       gradientFrom: "from-rose-400",
//       gradientTo: "to-rose-600",
//     },
//   };

//   return (
//     <PageTransition>
//       <div className="min-h-screen bg-white">
//         <Navbar />

//         {/* ── Hero ── */}
//         <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//           <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
//             <Image
//               src="/about/banner.jpg"
//               alt="El Hage Jewelers Heritage"
//               fill
//               className="object-cover"
//               priority
//             />
//           </motion.div>

//           <motion.div
//             style={{ y: y2 }}
//             className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"
//           />
//           <motion.div
//             style={{ y: y1 }}
//             className="absolute bottom-20 right-10 w-32 h-32 bg-rose-400/20 rounded-full blur-xl"
//           />

//           <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-amber-300 text-xs font-medium mb-5 border border-white/20"
//               >
//                 <Crown className="h-3.5 w-3.5" />
//                 {t("about.anniversary.title")}
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1, delay: 0.4 }}
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-5 leading-tight text-white"
//               >
//                 {t("about.page.title")}
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-gray-300 font-light"
//               >
//                 {t("about.page.subtitle")}
//               </motion.p>
//             </motion.div>
//           </div>

//           {/* Scroll indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.2 }}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2"
//           >
//             <motion.div
//               animate={{ y: [0, 8, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center"
//             >
//               <motion.div
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5"
//               />
//             </motion.div>
//           </motion.div>
//         </section>

//         {/* ── Legacy Intro ── */}
//         <section className="py-10 bg-gray-50 border-b border-gray-100">
//           <div className="container-responsive">
//             <FadeIn>
//               <div className="max-w-2xl mx-auto text-center">
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3">
//                   {t("about.legacy.title")}
//                 </h2>
//                 <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
//                   {t("about.legacy.intro")}
//                 </p>
//               </div>
//             </FadeIn>
//           </div>
//         </section>

//         {/* ── Journey Through Time ── */}
//         <section className="py-10 bg-white">
//           <div className="container-responsive">
//             <FadeIn>
//               <div className="text-center mb-8">
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-2">
//                   {language === "ar"
//                     ? "رحلة عبر الزمن"
//                     : "Journey Through Time"}
//                 </h2>
//                 <p className="text-sm text-gray-400 max-w-xl mx-auto">
//                   {language === "ar"
//                     ? "أكثر من ٧٠ عاماً من التميز والإبداع في عالم المجوهرات الفاخرة"
//                     : "Over 70 years of excellence and innovation in luxury jewelry"}
//                 </p>
//               </div>
//             </FadeIn>

//             <div className="space-y-4">
//               {eras.map((era, index) => {
//                 const colors = colorMap[era.color] || colorMap.amber;
//                 const isReversed = index % 2 === 1;

//                 return (
//                   <motion.div
//                     key={index}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     initial={{ opacity: 0, y: 20 }}
//                     transition={{ duration: 0.5, delay: index * 0.05 }}
//                     viewport={{ once: true }}
//                     className={`flex flex-col lg:flex-row gap-4 items-start justify-center ${
//                       isReversed ? "lg:flex-row-reverse" : ""
//                     }`}
//                   >
//                     {/* ── Text Square ── */}
//                     <div className="w-full lg:w-[38%] aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center px-6 py-6 overflow-hidden">
//                       <div className="flex items-start gap-3 mb-4">
//                         <div
//                           className={`p-2 rounded-lg ${colors.iconBg} shrink-0 mt-0.5`}
//                         >
//                           <era.icon className={`h-4 w-4 ${colors.text}`} />
//                         </div>
//                         <div>
//                           {era.period && (
//                             <div
//                               className={`text-xs font-semibold ${colors.text} uppercase tracking-widest mb-1`}
//                             >
//                               {era.period}
//                             </div>
//                           )}
//                           <h3 className="text-xl font-playfair font-bold text-gray-900 leading-tight">
//                             {era.isArtist
//                               ? era.title
//                               : era.subtitle || era.title}
//                           </h3>
//                           {!era.isArtist &&
//                             era.subtitle &&
//                             era.title !== era.subtitle && (
//                               <p className="text-xs text-gray-400 mt-1">
//                                 {era.title}
//                               </p>
//                             )}
//                         </div>
//                       </div>
//                       <div className="text-sm text-gray-500 leading-relaxed space-y-2 pl-9">
//                         {era.content.split("\n\n").map((paragraph, pIndex) => (
//                           <p key={pIndex}>{paragraph}</p>
//                         ))}
//                       </div>
//                     </div>

//                     {/* ── Image Square ── */}
//                     <div className="w-full lg:w-[38%] aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
//                       {era.img ? (
//                         <Image
//                           src={era.img}
//                           alt={era.title}
//                           fill
//                           sizes="38vw"
//                           className="object-fill object-center"
//                         />
//                       ) : (
//                         <div
//                           className={`w-full h-full bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} flex items-center justify-center`}
//                         >
//                           <era.icon className="h-16 w-16 text-white/25" />
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ── Maison Philosophy ── */}
//         <section className="py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
//           <div className="container-responsive">
//             <FadeIn>
//               <div className="text-center mb-8">
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold">
//                   {t("about.values.title")}
//                 </h2>
//               </div>
//             </FadeIn>

//             <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {values.map((value, index) => (
//                 <StaggerItem key={index}>
//                   <motion.div
//                     whileHover={{ y: -5, scale: 1.01 }}
//                     transition={{ duration: 0.25 }}
//                     className="relative"
//                   >
//                     <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/15" />
//                     <div className="relative p-6 text-center space-y-3">
//                       <div
//                         className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.gradient} shadow`}
//                       >
//                         <value.icon className="h-5 w-5 text-white" />
//                       </div>
//                       <h3 className="text-base font-playfair font-bold text-amber-300">
//                         {value.title}
//                       </h3>
//                       <p className="text-xs text-gray-400 leading-relaxed">
//                         {value.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 </StaggerItem>
//               ))}
//             </StaggerContainer>
//           </div>
//         </section>

//         {/* ── Call to Action — light gray ── */}
//         <section className="py-12 bg-gray-100 border-t border-gray-200">
//           <div className="container-responsive">
//             <FadeIn>
//               <div className="text-center max-w-2xl mx-auto">
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold mb-3 text-gray-900">
//                   {t("about.experience.title")}
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-7">
//                   {t("about.experience.subtitle")}
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button
//                     asChild
//                     size="lg"
//                     className="bg-gray-900 text-white hover:bg-gray-700 px-7 py-3 text-sm font-medium shadow-sm"
//                   >
//                     <Link href="/contact">
//                       {t("about.experience.appointment")}
//                     </Link>
//                   </Button>

//                   <Button
//                     asChild
//                     variant="outline"
//                     size="lg"
//                     className="border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 px-7 py-3 text-sm font-medium"
//                   >
//                     <Link href="/collections">
//                       {t("about.experience.collections")}
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             </FadeIn>
//           </div>
//         </section>
//       </div>
//     </PageTransition>
//   );
// }

// export default function AboutPage() {
//   return (
//     <ErrorBoundary>
//       <AboutPageContent />
//     </ErrorBoundary>
//   );
// }

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Sparkles, Award, Globe, Diamond, Crown } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { PageTransition } from "@/components/ui/page-transition";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function AboutPageContent() {
  const { language, t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  const values = [
    {
      title: t("about.values.luxe.title"),
      description: t("about.values.luxe.description"),
      icon: Crown,
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: t("about.values.exclusive.title"),
      description: t("about.values.exclusive.description"),
      icon: Sparkles,
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: t("about.values.classique.title"),
      description: t("about.values.classique.description"),
      icon: Award,
      gradient: "from-amber-600 to-orange-600",
    },
  ];

  const eras = [
    {
      period: language === "ar" ? "١٩٥٣ - ١٩٧٣" : "1953 - 1973",
      title: t("about.timeline.founding.title"),
      subtitle: t("about.timeline.founding.subtitle"),
      content: t("about.timeline.founding.content"),
      icon: Star,
      color: "emerald",
      img: "/about/sc-01.jpg",
    },
    {
      period: language === "ar" ? "١٩٧٣ - ١٩٩٧" : "1973 - 1997",
      title: t("about.timeline.expansion.title"),
      subtitle: t("about.timeline.expansion.subtitle"),
      content: t("about.timeline.expansion.content"),
      icon: Globe,
      color: "blue",
      img: "/about/sc-02.jpg",
    },
    {
      period: "",
      title: t("about.artist.title"),
      subtitle: "",
      content: t("about.artist.content"),
      icon: Crown,
      color: "amber",
      isArtist: true,
      img: "/about/sc-03.jpg",
    },
    {
      period: language === "ar" ? "١٩٩٧ - ٢٠٠٣" : "1997 - 2003",
      title: t("about.timeline.modernization.title"),
      subtitle: t("about.timeline.modernization.subtitle"),
      content: t("about.timeline.modernization.content"),
      icon: Diamond,
      color: "purple",
      img: "/about/sc-04.jpg",
    },
    {
      period: language === "ar" ? "٢٠٠٣ - ٢٠٢٦" : "2003 - 2026",
      title: t("about.timeline.luxury.title"),
      subtitle: t("about.timeline.luxury.subtitle"),
      content: t("about.timeline.luxury.content"),
      icon: Crown,
      color: "amber",
      img: "/about/sc-05.jpg",
    },
    {
      period: language === "ar" ? "٢٠٢٦ وما بعدها" : "2026 & Beyond",
      title: t("about.timeline.future.title"),
      subtitle: t("about.timeline.future.subtitle"),
      content: t("about.timeline.future.content"),
      icon: Sparkles,
      color: "rose",
      img: "/about/sc-06.jpg",
    },
  ];

  // Explicit color map — avoids Tailwind purging dynamic class strings
  const colorMap: Record<
    string,
    {
      text: string;
      iconBg: string;
      gradientFrom: string;
      gradientTo: string;
    }
  > = {
    emerald: {
      text: "text-emerald-600",
      iconBg: "bg-emerald-100",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-emerald-600",
    },
    blue: {
      text: "text-blue-600",
      iconBg: "bg-blue-100",
      gradientFrom: "from-blue-400",
      gradientTo: "to-blue-600",
    },
    amber: {
      text: "text-amber-600",
      iconBg: "bg-amber-100",
      gradientFrom: "from-amber-400",
      gradientTo: "to-amber-600",
    },
    purple: {
      text: "text-purple-600",
      iconBg: "bg-purple-100",
      gradientFrom: "from-purple-400",
      gradientTo: "to-purple-600",
    },
    rose: {
      text: "text-rose-600",
      iconBg: "bg-rose-100",
      gradientFrom: "from-rose-400",
      gradientTo: "to-rose-600",
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
            <Image
              src="/about/banner.jpg"
              alt="El Hage Jewelers Heritage"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-rose-400/20 rounded-full blur-xl"
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-amber-300 text-xs font-medium mb-5 border border-white/20"
              >
                <Crown className="h-3.5 w-3.5" />
                {t("about.anniversary.title")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-5 leading-tight text-white"
              >
                {t("about.page.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-gray-300 font-light"
              >
                {t("about.page.subtitle")}
              </motion.p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Legacy Intro ── */}
        <section className="py-10 bg-gray-50 border-b border-gray-100">
          <div className="container-responsive">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3">
                  {t("about.legacy.title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                  {t("about.legacy.intro")}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Journey Through Time ── */}
        <section className="py-10 bg-white">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-2">
                  {language === "ar"
                    ? "رحلة عبر الزمن"
                    : "Journey Through Time"}
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                  {language === "ar"
                    ? "أكثر من ٧٠ عاماً من التميز والإبداع في عالم المجوهرات الفاخرة"
                    : "Over 70 years of excellence and innovation in luxury jewelry"}
                </p>
              </div>
            </FadeIn>

            <div className="space-y-4">
              {eras.map((era, index) => {
                const colors = colorMap[era.color] || colorMap.amber;
                const isReversed = index % 2 === 1;

                return (
                  <motion.div
                    key={index}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row gap-4 items-start justify-center ${
                      isReversed ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* ── Text Square ── */}
                    <div className="w-full lg:w-[38%] aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center px-6 py-6 overflow-hidden">
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`p-2 rounded-lg ${colors.iconBg} shrink-0 mt-0.5`}
                        >
                          <era.icon className={`h-4 w-4 ${colors.text}`} />
                        </div>
                        <div>
                          {era.period && (
                            <div
                              className={`text-xs font-semibold ${colors.text} uppercase tracking-widest mb-1`}
                            >
                              {era.period}
                            </div>
                          )}
                          <h3 className="text-xl font-playfair font-bold text-gray-900 leading-tight">
                            {era.isArtist
                              ? era.title
                              : era.subtitle || era.title}
                          </h3>
                          {!era.isArtist &&
                            era.subtitle &&
                            era.title !== era.subtitle && (
                              <p className="text-xs text-gray-400 mt-1">
                                {era.title}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 leading-relaxed space-y-2 pl-9">
                        {era.content.split("\n\n").map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* ── Image Square ── */}
                    <div className="w-full lg:w-[38%] aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                      {era.img ? (
                        <Image
                          src={era.img}
                          alt={era.title}
                          fill
                          sizes="38vw"
                          className="object-fill object-center"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} flex items-center justify-center`}
                        >
                          <era.icon className="h-16 w-16 text-white/25" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Maison Philosophy ── */}
        <section className="py-16 bg-black text-white border-t border-gray-800">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                  {t("about.values.title")}
                </h2>
                <div className="h-1 w-16 bg-gray-700 mx-auto"></div>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="p-8 text-center space-y-4 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300">
                      <h3 className="text-xl font-playfair font-bold text-white">
                        {value.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Call to Action — light gray ── */}
        <section className="py-12 bg-gray-100 border-t border-gray-200">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold mb-3 text-gray-900">
                  {t("about.experience.title")}
                </h2>
                <p className="text-sm text-gray-500 mb-7">
                  {t("about.experience.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gray-900 text-white hover:bg-gray-700 px-7 py-3 text-sm font-medium shadow-sm"
                  >
                    <Link href="https://wa.me/96171444454">
                      {t("about.experience.appointment")}
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 px-7 py-3 text-sm font-medium"
                  >
                    <Link href="/collections">
                      {t("about.experience.collections")}
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <AboutPageContent />
    </ErrorBoundary>
  );
}
