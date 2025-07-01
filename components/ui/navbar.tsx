"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type Collection, type Category } from "@/lib/api";

export function Navbar() {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const { country } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, categoriesData] = await Promise.all([
          apiService.getActiveCollections(),
          apiService.getActiveCategories(),
        ]);
        setCollections(collectionsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch navbar data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const getCollectionName = (collection: Collection) => {
    return language === "ar" ? collection.nameAr : collection.nameEn;
  };

  const getCategoryName = (category: Category) => {
    return language === "ar" ? category.nameAr : category.nameEn;
  };

  const closeAllDropdowns = () => {
    setIsCollectionsOpen(false);
    setIsCategoriesOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
        } border-b border-gray-100`}
      >
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/"
                className="flex-shrink-0 focus-visible"
                onClick={closeAllDropdowns}
              >
                <Image
                  src="/logo.png"
                  alt="El Hage Jewelers"
                  width={140}
                  height={48}
                  className="h-10 lg:h-12 w-auto"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center space-x-8 xl:space-x-12"
            >
              {/* Collections Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => {
                  setIsCategoriesOpen(false);
                  setIsCollectionsOpen(true);
                }}
                onMouseLeave={() => setIsCollectionsOpen(false)}
              >
                <Link
                  href="/collections"
                  className="flex items-center space-x-1 text-gray-900 hover:text-gray-600 font-medium transition-colors focus-visible"
                >
                  <span>{t("nav.collections")}</span>
                  <motion.div
                    animate={{ rotate: isCollectionsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Link>
              </div>

              {/* Categories Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => {
                  setIsCollectionsOpen(false);
                  setIsCategoriesOpen(true);
                }}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <Link
                  href="/categories"
                  className="flex items-center space-x-1 text-gray-900 hover:text-gray-600 font-medium transition-colors focus-visible"
                >
                  <span>{t("nav.categories")}</span>
                  <motion.div
                    animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Link>
              </div>

              {/* Products Link */}
              <Link
                href="/products"
                className="text-gray-900 hover:text-gray-600 font-medium transition-colors focus-visible"
                onClick={closeAllDropdowns}
              >
                {language === "ar" ? "المنتجات" : "Products"}
              </Link>

              <Link
                href="/about"
                className="text-gray-900 hover:text-gray-600 font-medium transition-colors focus-visible"
                onClick={closeAllDropdowns}
              >
                {t("nav.about")}
              </Link>

              <Link
                href="/contact"
                className="text-gray-900 hover:text-gray-600 font-medium transition-colors focus-visible"
                onClick={closeAllDropdowns}
              >
                {t("nav.contact")}
              </Link>
            </motion.div>

            {/* Right side buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-3 lg:space-x-4"
            >
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors focus-visible rounded-full"
                aria-label="Toggle language"
              >
                <Globe className="h-5 w-5" />
              </motion.button>

              {/* Book Appointment Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden lg:block"
              >
                <Button
                  asChild
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 focus-visible"
                >
                  <a
                    href="https://calendly.com/elhagejewelers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("nav.appointment")}
                  </a>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors focus-visible rounded-full"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-100 py-4 overflow-hidden bg-white"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-4"
                >
                  {/* Collections Section */}
                  <div>
                    <Link
                      href="/collections"
                      className="block text-gray-900 hover:text-gray-600 font-medium py-2 transition-colors focus-visible border-b border-gray-100 pb-3"
                      onClick={closeMobileMenu}
                    >
                      {t("nav.collections")}
                    </Link>
                    {collections.length > 0 && (
                      <div className="mt-3 pl-4 space-y-2">
                        {collections.slice(0, 6).map((collection) => (
                          <Link
                            key={collection._id}
                            href={`/collections/${collection._id}`}
                            className="block text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {getCollectionName(collection)}
                          </Link>
                        ))}
                        {collections.length > 6 && (
                          <Link
                            href="/collections"
                            className="block text-sm text-gray-500 hover:text-gray-700 py-1 transition-colors font-medium"
                            onClick={closeMobileMenu}
                          >
                            {language === "ar"
                              ? "عرض المزيد..."
                              : "View more..."}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Categories Section */}
                  <div>
                    <Link
                      href="/categories"
                      className="block text-gray-900 hover:text-gray-600 font-medium py-2 transition-colors focus-visible border-b border-gray-100 pb-3"
                      onClick={closeMobileMenu}
                    >
                      {t("nav.categories")}
                    </Link>
                    {categories.length > 0 && (
                      <div className="mt-3 pl-4 space-y-2">
                        {categories.slice(0, 6).map((category) => (
                          <Link
                            key={category._id}
                            href={`/categories/${category._id}`}
                            className="block text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {getCategoryName(category)}
                          </Link>
                        ))}
                        {categories.length > 6 && (
                          <Link
                            href="/categories"
                            className="block text-sm text-gray-500 hover:text-gray-700 py-1 transition-colors font-medium"
                            onClick={closeMobileMenu}
                          >
                            {language === "ar"
                              ? "عرض المزيد..."
                              : "View more..."}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Other Navigation Items */}
                  {[
                    {
                      href: "/products",
                      label: language === "ar" ? "المنتجات" : "Products",
                    },
                    { href: "/about", label: t("nav.about") },
                    { href: "/contact", label: t("nav.contact") },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-gray-900 hover:text-gray-600 font-medium py-2 transition-colors focus-visible"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="pt-4"
                  >
                    <Button
                      asChild
                      className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
                    >
                      <a
                        href="https://calendly.com/elhagejewelers"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("nav.appointment")}
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Full-Width Dropdowns - Positioned outside navbar container */}
      <AnimatePresence>
        {isCollectionsOpen && collections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white shadow-xl border-b border-gray-100"
            style={{ width: "100vw" }}
            onMouseEnter={() => setIsCollectionsOpen(true)}
            onMouseLeave={() => setIsCollectionsOpen(false)}
          >
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-2">
                    {t("nav.collections")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "ar"
                      ? "اكتشف مجموعاتنا المنسقة بعناية من المجوهرات الفاخرة"
                      : "Discover our carefully curated collections of luxury jewelry"}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                  {collections.slice(0, 12).map((collection, index) => (
                    <motion.div
                      key={collection._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/collections/${collection._id}`}
                        className="group block focus-visible p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors text-sm mb-1">
                          {getCollectionName(collection)}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {language === "ar"
                            ? collection.descriptionAr
                            : collection.descriptionEn}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {collections.length > 12 && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/collections"
                      className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      {language === "ar"
                        ? "عرض جميع المجموعات"
                        : "View All Collections"}
                      <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCategoriesOpen && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white shadow-xl border-b border-gray-100"
            style={{ width: "100vw" }}
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-2">
                    {t("nav.categories")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "ar"
                      ? "استكشف فئاتنا المتنوعة من المجوهرات الفاخرة"
                      : "Explore our diverse categories of luxury jewelry"}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/categories/${category._id}`}
                        className="group block focus-visible p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
                        onClick={closeAllDropdowns}
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors text-sm">
                          {getCategoryName(category)}
                        </h4>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/categories"
                    className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                    onClick={closeAllDropdowns}
                  >
                    {language === "ar"
                      ? "عرض جميع الفئات"
                      : "View All Categories"}
                    <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for dropdowns */}
      <AnimatePresence>
        {(isCollectionsOpen || isCategoriesOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-30"
            onClick={closeAllDropdowns}
          />
        )}
      </AnimatePresence>
    </>
  );
}
