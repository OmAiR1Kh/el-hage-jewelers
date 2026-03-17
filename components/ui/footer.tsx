// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   Calendar,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/components/providers/language-provider";
// import { useLocation } from "@/components/providers/location-provider";
// import { FadeIn } from "@/components/ui/fade-in";
// import { StaggerContainer } from "@/components/ui/stagger-container";

// export function Footer() {
//   const { language } = useLanguage();
//   const { country } = useLocation();
//   const [email, setEmail] = useState("");

//   // Map country to location key
//   const getLocationKey = (country: string) => {
//     switch (country?.toLowerCase()) {
//       case "uae":
//       case "united arab emirates":
//         return "uae";
//       case "ksa":
//       case "saudi arabia":
//         return "ksa";
//       default:
//         return "lebanon";
//     }
//   };

//   const locationKey = getLocationKey(country);

//   const locationData = {
//     lebanon: {
//       en: {
//         address: "Beirut Central District, Lebanon",
//         phone: "+961 71 444 454",
//         hours: "Mon-Fri: 9:00 AM - 3:00 PM",
//       },
//       ar: {
//         address: "بيروت، المنطقة التجارية المركزية، لبنان",
//         phone: "+961 71 444 454",
//         hours: "الإثنين-السبت: 9:00 ص - 8:00 م",
//       },
//     },
//     uae: {
//       en: {
//         address: "Dubai Mall, Downtown Dubai, UAE",
//         phone: "+971 4 123 4567",
//         hours: "Sun-Thu: 10:00 AM - 10:00 PM",
//       },
//       ar: {
//         address: "دبي مول، وسط مدينة دبي، الإمارات",
//         phone: "+971 4 123 4567",
//         hours: "الأحد-الخميس: 10:00 ص - 10:00 م",
//       },
//     },
//     ksa: {
//       en: {
//         address: "Kingdom Centre, Riyadh, Saudi Arabia",
//         phone: "+966 11 123 4567",
//         hours: "Sun-Thu: 9:00 AM - 9:00 PM",
//       },
//       ar: {
//         address: "مركز المملكة، الرياض، السعودية",
//         phone: "+966 11 123 4567",
//         hours: "الأحد-الخميس: 9:00 ص - 9:00 م",
//       },
//     },
//   };

//   const currentLocation =
//     locationData[locationKey]?.[language] || locationData.lebanon[language];

//   const currentTime = new Date().getFullYear();

//   const content = {
//     en: {
//       brand: {
//         description:
//           "Crafting exquisite jewelry with precision and passion since 1953. Each piece tells a story of elegance, tradition, and timeless beauty.",
//         followUs: "Follow Us",
//       },
//       contact: {
//         title: "Contact Info",
//         email: "info@elhagejewelers.com",
//         bookAppointment: "Book Appointment",
//         locations: "Our Locations",
//       },
//       newsletter: {
//         title: "Stay Updated",
//         description:
//           "Subscribe to our newsletter for exclusive offers and latest collections.",
//         placeholder: "Enter your email",
//         subscribe: "Subscribe",
//       },
//       legal: {
//         copyright: `© ${currentTime} El Hage Jewelers. All rights reserved.`,
//         links: [
//           { name: "Privacy Policy", href: "/privacy" },
//           { name: "Terms & Conditions", href: "/terms" },
//         ],
//       },
//     },
//     ar: {
//       brand: {
//         description:
//           "نصنع المجوهرات الرائعة بدقة وشغف منذ عام 1953. كل قطعة تحكي قصة من الأناقة والتقاليد والجمال الخالد.",
//         followUs: "تابعونا",
//       },
//       contact: {
//         title: "معلومات الاتصال",
//         email: "info@elhagejewelers.com",
//         bookAppointment: "احجز موعد",
//         locations: "مواقعنا",
//       },
//       newsletter: {
//         title: "ابق على اطلاع",
//         description:
//           "اشترك في نشرتنا الإخبارية للحصول على عروض حصرية وأحدث المجموعات.",
//         placeholder: "أدخل بريدك الإلكتروني",
//         subscribe: "اشترك",
//       },
//       legal: {
//         copyright: `© ${currentTime} مجوهرات الحاج. جميع الحقوق محفوظة.`,
//         links: [
//           { name: "سياسة الخصوصية", href: "/privacy" },
//           { name: "الشروط والأحكام", href: "/terms" },
//         ],
//       },
//     },
//   };

//   const t = content[language];

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "https://facebook.com/elhagejewelers",
//       label: "Facebook",
//       bgColor: "hover:bg-gray-700",
//     },
//     {
//       icon: Instagram,
//       href: "https://instagram.com/elhagejewelers",
//       label: "Instagram",
//       bgColor: "hover:bg-gray-700",
//     },
//     {
//       icon: Twitter,
//       href: "https://twitter.com/elhagejewelers",
//       label: "Twitter",
//       bgColor: "hover:bg-gray-700",
//     },
//     {
//       icon: Youtube,
//       href: "https://youtube.com/elhagejewelers",
//       label: "YouTube",
//       bgColor: "hover:bg-gray-700",
//     },
//   ];

//   const handleNewsletterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Newsletter subscription:", email);
//     setEmail("");
//   };

//   return (
//     <footer className="bg-black text-gray-100">
//       <div className="container mx-auto px-4 py-10">
//         <StaggerContainer>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
//             {/* Brand Section */}
//             <FadeIn>
//               <div className="lg:col-span-2">
//                 <Link href="/" className="inline-block mb-3">
//                   <Image
//                     src="/logo.png"
//                     alt="El Hage Jewelers"
//                     width={150}
//                     height={60}
//                     className="h-12 w-auto brightness-0 invert"
//                   />
//                 </Link>
//                 <p className="text-gray-400 mb-4 leading-relaxed text-xs">
//                   {t.brand.description}
//                 </p>
//                 <div>
//                   <h4 className="font-semibold mb-2 text-gray-200 text-xs uppercase tracking-wider">
//                     {t.brand.followUs}
//                   </h4>
//                   <div
//                     className={`flex gap-2 ${
//                       language === "ar" ? "flex-row-reverse" : ""
//                     }`}
//                   >
//                     {socialLinks.map((social) => (
//                       <motion.a
//                         key={social.label}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.1, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         className={`p-2 bg-gray-800 rounded-full transition-all duration-300 ${social.bgColor}`}
//                         aria-label={social.label}
//                       >
//                         <social.icon className="h-3.5 w-3.5 text-gray-300" />
//                       </motion.a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </FadeIn>

//             {/* Contact Info */}
//             <FadeIn delay={0.2}>
//               <div className="lg:col-span-3">
//                 <h3 className="text-xs font-semibold mb-3 uppercase tracking-widest text-gray-200">
//                   {t.contact.title}
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex items-start gap-2">
//                     <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-400 text-xs leading-snug">
//                       {currentLocation.address}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
//                     <a
//                       href={`tel:${currentLocation.phone}`}
//                       className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
//                     >
//                       {currentLocation.phone}
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
//                     <a
//                       href={`mailto:${t.contact.email}`}
//                       className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
//                     >
//                       {t.contact.email}
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
//                     <span className="text-gray-400 text-xs">
//                       {currentLocation.hours}
//                     </span>
//                   </div>
//                   <div className="pt-1">
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <a
//                         href="https://wa.me/96171444454"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block"
//                       >
//                         <Button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600 h-8 text-xs">
//                           <Calendar className="mr-1.5 h-3 w-3" />
//                           {t.contact.bookAppointment}
//                         </Button>
//                       </a>
//                     </motion.div>
//                   </div>
//                 </div>
//               </div>
//             </FadeIn>
//           </div>

//           {/* All Locations */}
//           <FadeIn delay={0.4}>
//             <div className="border-t border-gray-800 py-6">
//               <h3 className="text-xs font-semibold mb-4 text-center text-gray-200 uppercase tracking-widest">
//                 {t.contact.locations}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 {Object.entries(locationData).map(([key, location]) => (
//                   <motion.div
//                     key={key}
//                     className="p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300"
//                     whileHover={{ y: -2 }}
//                   >
//                     <h4 className="font-semibold mb-2 text-gray-200 text-xs">
//                       {key === "lebanon"
//                         ? "Lebanon"
//                         : key === "uae"
//                           ? "UAE"
//                           : "Saudi Arabia"}
//                     </h4>
//                     <div className="space-y-1 text-xs text-gray-400">
//                       <p className="leading-snug">
//                         {location[language].address}
//                       </p>
//                       <p className="font-medium text-gray-300">
//                         {location[language].phone}
//                       </p>
//                       <p className="text-gray-500">
//                         {location[language].hours}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </FadeIn>

//           {/* Legal Footer */}
//           <div className="border-t border-gray-800 mt-6 pt-6">
//             <div className="flex flex-col items-center justify-center gap-3">
//               <p className="text-gray-400 text-xs">{t.legal.copyright}</p>
//               <div
//                 className={`flex gap-6 ${language === "ar" ? "flex-row-reverse" : ""}`}
//               >
//                 {t.legal.links.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </StaggerContainer>
//       </div>
//     </footer>
//   );
// }

"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";

export function Footer() {
  const { language } = useLanguage();
  const { country } = useLocation();
  const [email, setEmail] = useState("");

  // Map country to location key
  const getLocationKey = (country: string) => {
    switch (country?.toLowerCase()) {
      case "uae":
      case "united arab emirates":
        return "uae";
      case "ksa":
      case "saudi arabia":
        return "ksa";
      default:
        return "lebanon";
    }
  };

  const locationKey = getLocationKey(country);

  const locationData = {
    lebanon: {
      en: {
        address: "Beirut Central District, Lebanon",
        phone: "+961 71 444 454",
        hours: "Mon-Fri: 9:00 AM - 3:00 PM",
      },
      ar: {
        address: "بيروت، المنطقة التجارية المركزية، لبنان",
        phone: "+961 71 444 454",
        hours: "الإثنين-السبت: 9:00 ص - 8:00 م",
      },
    },
    uae: {
      en: {
        address: "Dubai Mall, Downtown Dubai, UAE",
        phone: "+971 4 123 4567",
        hours: "Sun-Thu: 10:00 AM - 10:00 PM",
      },
      ar: {
        address: "دبي مول، وسط مدينة دبي، الإمارات",
        phone: "+971 4 123 4567",
        hours: "الأحد-الخميس: 10:00 ص - 10:00 م",
      },
    },
    ksa: {
      en: {
        address: "Kingdom Centre, Riyadh, Saudi Arabia",
        phone: "+966 11 123 4567",
        hours: "Sun-Thu: 9:00 AM - 9:00 PM",
      },
      ar: {
        address: "مركز المملكة، الرياض، السعودية",
        phone: "+966 11 123 4567",
        hours: "الأحد-الخميس: 9:00 ص - 9:00 م",
      },
    },
  };

  const currentLocation =
    locationData[locationKey]?.[language] || locationData.lebanon[language];

  const currentTime = new Date().getFullYear();

  const content = {
    en: {
      brand: {
        description:
          "Crafting exquisite jewelry with precision and passion since 1953. Each piece tells a story of elegance, tradition, and timeless beauty.",
        followUs: "Follow Us",
      },
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/" },
          { name: "Our Heritage", href: "/about" },
          { name: "Collections", href: "/collections" },
          { name: "Products", href: "/products" },
          { name: "Contact Us", href: "/contact" },
        ],
      },
      contact: {
        title: "Contact Info",
        email: "info@elhagejewelers.com",
        bookAppointment: "Book Appointment",
        locations: "Our Locations",
      },
      newsletter: {
        title: "Stay Updated",
        description:
          "Subscribe to our newsletter for exclusive offers and latest collections.",
        placeholder: "Enter your email",
        subscribe: "Subscribe",
      },
      legal: {
        copyright: `© ${currentTime} El Hage Jewelers. All rights reserved.`,
        links: [
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Terms & Conditions", href: "/terms" },
        ],
      },
    },
    ar: {
      brand: {
        description:
          "نصنع المجوهرات الرائعة بدقة وشغف منذ عام 1953. كل قطعة تحكي قصة من الأناقة والتقاليد والجمال الخالد.",
        followUs: "تابعونا",
      },
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { name: "الرئيسية", href: "/" },
          { name: "إرثنا", href: "/about" },
          { name: "المجموعات", href: "/collections" },
          { name: "المنتجات", href: "/products" },
          { name: "اتصل بنا", href: "/contact" },
        ],
      },
      contact: {
        title: "معلومات الاتصال",
        email: "info@elhagejewelers.com",
        bookAppointment: "احجز موعد",
        locations: "مواقعنا",
      },
      newsletter: {
        title: "ابق على اطلاع",
        description:
          "اشترك في نشرتنا الإخبارية للحصول على عروض حصرية وأحدث المجموعات.",
        placeholder: "أدخل بريدك الإلكتروني",
        subscribe: "اشترك",
      },
      legal: {
        copyright: `© ${currentTime} مجوهرات الحاج. جميع الحقوق محفوظة.`,
        links: [
          { name: "سياسة الخصوصية", href: "/privacy" },
          { name: "الشروط والأحكام", href: "/terms" },
        ],
      },
    },
  };

  const t = content[language];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/elhagejewelers",
      label: "Facebook",
      bgColor: "hover:bg-gray-700",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/elhagejewelers",
      label: "Instagram",
      bgColor: "hover:bg-gray-700",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/elhagejewelers",
      label: "Twitter",
      bgColor: "hover:bg-gray-700",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/elhagejewelers",
      label: "YouTube",
      bgColor: "hover:bg-gray-700",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-gray-100">
      <div className="container mx-auto px-4 py-10">
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            {/* Brand Section */}
            <FadeIn>
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-3">
                  <Image
                    src="/logo.png"
                    alt="El Hage Jewelers"
                    width={150}
                    height={60}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-gray-400 mb-4 leading-relaxed text-xs">
                  {t.brand.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-200 text-xs uppercase tracking-wider">
                    {t.brand.followUs}
                  </h4>
                  <div
                    className={`flex gap-2 ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 bg-gray-800 rounded-full transition-all duration-300 ${social.bgColor}`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-3.5 w-3.5 text-gray-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Links */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-xs font-semibold mb-3 uppercase tracking-widest text-gray-200">
                  {t.quickLinks.title}
                </h3>
                <div className="space-y-2">
                  {t.quickLinks.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-400 hover:text-gray-200 transition-colors text-xs block"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div className="lg:col-span-2">
                <h3 className="text-xs font-semibold mb-3 uppercase tracking-widest text-gray-200">
                  {t.contact.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-xs leading-snug">
                      {currentLocation.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                    <a
                      href={`tel:${currentLocation.phone}`}
                      className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
                    >
                      {currentLocation.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">
                      {currentLocation.hours}
                    </span>
                  </div>
                  <div className="pt-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href="https://wa.me/96171444454"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600 h-8 text-xs">
                          <Calendar className="mr-1.5 h-3 w-3" />
                          {t.contact.bookAppointment}
                        </Button>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* All Locations */}
          <FadeIn delay={0.4}>
            <div className="border-t border-gray-800 py-6">
              <h3 className="text-xs font-semibold mb-4 text-center text-gray-200 uppercase tracking-widest">
                {t.contact.locations}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(locationData).map(([key, location]) => (
                  <motion.div
                    key={key}
                    className="p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <h4 className="font-semibold mb-2 text-gray-200 text-xs">
                      {key === "lebanon"
                        ? "Lebanon"
                        : key === "uae"
                          ? "UAE"
                          : "Saudi Arabia"}
                    </h4>
                    <div className="space-y-1 text-xs text-gray-400">
                      <p className="leading-snug">
                        {location[language].address}
                      </p>
                      <p className="font-medium text-gray-300">
                        {location[language].phone}
                      </p>
                      <p className="text-gray-500">
                        {location[language].hours}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Legal Footer */}
          <div className="border-t border-gray-800 mt-6 pt-6">
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-gray-400 text-xs">{t.legal.copyright}</p>
              <div
                className={`flex gap-6 ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                {t.legal.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </footer>
  );
}
