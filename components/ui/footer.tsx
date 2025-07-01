"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";

export function Footer() {
  const { language, t } = useLanguage();
  const { country } = useLocation();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      href: "/collections",
      label: language === "ar" ? "المجموعات" : "Collections",
    },
    { href: "/categories", label: language === "ar" ? "الفئات" : "Categories" },
    { href: "/products", label: language === "ar" ? "المنتجات" : "Products" },
    { href: "/about", label: language === "ar" ? "حولنا" : "About Us" },
    { href: "/contact", label: language === "ar" ? "اتصل بنا" : "Contact" },
  ];

  const services = [
    { label: language === "ar" ? "تصميم مخصص" : "Custom Design" },
    { label: language === "ar" ? "إصلاح المجوهرات" : "Jewelry Repair" },
    { label: language === "ar" ? "تقييم المجوهرات" : "Jewelry Appraisal" },
    { label: language === "ar" ? "استشارة مجانية" : "Free Consultation" },
    { label: language === "ar" ? "ضمان مدى الحياة" : "Lifetime Warranty" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/elhagejewelers",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/elhagejewelers",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/elhagejewelers",
      label: "Twitter",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/elhagejewelers",
      label: "YouTube",
    },
  ];

  const locations = [
    {
      country: "Lebanon",
      countryAr: "لبنان",
      address: "123 Luxury Avenue, Beirut",
      addressAr: "شارع الفخامة ١٢٣، بيروت",
      phone: "+961 1 234 567",
    },
    {
      country: "UAE",
      countryAr: "الإمارات",
      address: "456 Gold Souk, Dubai",
      addressAr: "سوق الذهب ٤٥٦، دبي",
      phone: "+971 4 123 456",
    },
    {
      country: "KSA",
      countryAr: "السعودية",
      address: "789 King Fahd Road, Riyadh",
      addressAr: "طريق الملك فهد ٧٨٩، الرياض",
      phone: "+966 11 123 456",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-responsive py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="El Hage Jewelers"
                width={160}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {language === "ar"
                ? "مجوهرات الحاج - صناعة المجوهرات الفاخرة منذ عام ١٩٥٣. نحن نجمع بين الحرفية التقليدية والتصميم المعاصر لخلق قطع خالدة."
                : "El Hage Jewelers - Crafting luxury jewelry since 1953. We combine traditional craftsmanship with contemporary design to create timeless pieces."}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">
              {language === "ar" ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 py-1">
                  {service.label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>

            <div className="space-y-4">
              {/* Primary Location */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">
                    {language === "ar" ? "المقر الرئيسي" : "Main Location"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {language === "ar"
                      ? "شارع الفخامة ١٢٣، بيروت، لبنان"
                      : "123 Luxury Avenue, Beirut, Lebanon"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="tel:+96112345678"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +961 1 234 567
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:info@elhagejewelers.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@elhagejewelers.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {language === "ar"
                      ? "الإثنين - الجمعة: ١٠:٠٠ ص - ٨:٠٠ م"
                      : "Mon - Fri: 10:00 AM - 8:00 PM"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {language === "ar"
                      ? "السبت: ١٠:٠٠ ص - ٦:٠٠ م"
                      : "Sat: 10:00 AM - 6:00 PM"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <h3 className="text-lg font-semibold mb-6 text-center">
            {language === "ar" ? "مواقعنا" : "Our Locations"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="text-center">
                <h4 className="font-medium text-white mb-2">
                  {language === "ar" ? location.countryAr : location.country}
                </h4>
                <p className="text-gray-300 text-sm mb-1">
                  {language === "ar" ? location.addressAr : location.address}
                </p>
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {location.phone}
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              {language === "ar"
                ? `© ${currentYear} مجوهرات الحاج. جميع الحقوق محفوظة.`
                : `© ${currentYear} El Hage Jewelers. All rights reserved.`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex space-x-6 text-sm"
            >
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {language === "ar" ? "خريطة الموقع" : "Sitemap"}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
