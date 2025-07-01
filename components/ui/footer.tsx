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
        phone: "+961 1 234 567",
        hours: "Mon-Sat: 9:00 AM - 8:00 PM",
      },
      ar: {
        address: "بيروت، المنطقة التجارية المركزية، لبنان",
        phone: "+961 1 234 567",
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
          { name: "About Us", href: "/about" },
          { name: "Collections", href: "/collections" },
          { name: "Products", href: "/products" },
          { name: "Contact", href: "/contact" },
        ],
      },
      services: {
        title: "Our Services",
        items: [
          "Custom Jewelry Design",
          "Jewelry Repair & Restoration",
          "Diamond Certification",
          "Jewelry Appraisal",
          "Wedding Collections",
          "Corporate Gifts",
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
        copyright: "© 2024 El Hage Jewelers. All rights reserved.",
        links: [
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Terms & Conditions", href: "/terms" },
          { name: "Sitemap", href: "/sitemap" },
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
          { name: "من نحن", href: "/about" },
          { name: "المجموعات", href: "/collections" },
          { name: "المنتجات", href: "/products" },
          { name: "اتصل بنا", href: "/contact" },
        ],
      },
      services: {
        title: "خدماتنا",
        items: [
          "تصميم المجوهرات المخصصة",
          "إصلاح وترميم المجوهرات",
          "شهادة الماس",
          "تقييم المجوهرات",
          "مجموعات الزفاف",
          "الهدايا المؤسسية",
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
        copyright: "© 2024 مجوهرات الحاج. جميع الحقوق محفوظة.",
        links: [
          { name: "سياسة الخصوصية", href: "/privacy" },
          { name: "الشروط والأحكام", href: "/terms" },
          { name: "خريطة الموقع", href: "/sitemap" },
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <FadeIn>
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/logo.png"
                    alt="El Hage Jewelers"
                    width={150}
                    height={60}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t.brand.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-4">{t.brand.followUs}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gray-800 rounded-full hover:bg-gold-600 transition-colors duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Links */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg font-semibold mb-6 font-playfair">
                  {t.quickLinks.title}
                </h3>
                <ul className="space-y-3">
                  {t.quickLinks.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Services */}
            <FadeIn delay={0.2}>
              <div>
                <h3 className="text-lg font-semibold mb-6 font-playfair">
                  {t.services.title}
                </h3>
                <ul className="space-y-3">
                  {t.services.items.map((service) => (
                    <li key={service} className="text-gray-300">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.3}>
              <div>
                <h3 className="text-lg font-semibold mb-6 font-playfair">
                  {t.contact.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gold-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                      {currentLocation.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    <a
                      href={`tel:${currentLocation.phone}`}
                      className="text-gray-300 hover:text-gold-400 transition-colors"
                    >
                      {currentLocation.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-gray-300 hover:text-gold-400 transition-colors"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      {currentLocation.hours}
                    </span>
                  </div>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/96171444454"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-gray-900"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {t.contact.bookAppointment}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Newsletter Section */}
          <FadeIn delay={0.4}>
            <div className="border-t border-gray-800 pt-12 mb-12">
              <div className="max-w-md mx-auto text-center">
                <h3 className="text-xl font-semibold mb-4 font-playfair">
                  {t.newsletter.title}
                </h3>
                <p className="text-gray-300 mb-6">{t.newsletter.description}</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-gold-400"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gold-600 hover:bg-gold-700 text-gray-900"
                  >
                    {t.newsletter.subscribe}
                  </Button>
                </form>
              </div>
            </div>
          </FadeIn>

          {/* All Locations */}
          <FadeIn delay={0.5}>
            <div className="border-t border-gray-800 pt-12 mb-12">
              <h3 className="text-xl font-semibold mb-8 text-center font-playfair">
                {t.contact.locations}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(locationData).map(([key, location]) => (
                  <div key={key} className="text-center">
                    <h4 className="font-semibold mb-3 text-gold-400">
                      {key === "lebanon"
                        ? "Lebanon"
                        : key === "uae"
                        ? "UAE"
                        : "Saudi Arabia"}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>{location[language].address}</p>
                      <p>{location[language].phone}</p>
                      <p>{location[language].hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Legal Footer */}
          <FadeIn delay={0.6}>
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">{t.legal.copyright}</p>
                <div className="flex space-x-6">
                  {t.legal.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </StaggerContainer>
      </div>
    </footer>
  );
}
