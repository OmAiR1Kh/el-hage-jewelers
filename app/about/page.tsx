"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { useLanguage } from "@/components/providers/language-provider";
import { Crown, Gem, Award, Calendar, Users, Globe } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { FadeIn } from "@/components/ui/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/stagger-container";

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: Crown,
      title: t("about.values.luxe.title"),
      description: t("about.values.luxe.description"),
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Gem,
      title: t("about.values.exclusive.title"),
      description: t("about.values.exclusive.description"),
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: Award,
      title: t("about.values.classique.title"),
      description: t("about.values.classique.description"),
      gradient: "from-blue-400 to-blue-600",
    },
  ];

  const timeline = [
    {
      period: "1953 - 1973",
      title: t("about.timeline.founding.title"),
      subtitle: t("about.timeline.founding.subtitle"),
      content: t("about.timeline.founding.content"),
      icon: Calendar,
    },
    {
      period: "1973 - 1997",
      title: t("about.timeline.expansion.title"),
      subtitle: t("about.timeline.expansion.subtitle"),
      content: t("about.timeline.expansion.content"),
      icon: Globe,
    },
    {
      period: "1997 - 2003",
      title: t("about.timeline.modernization.title"),
      subtitle: t("about.timeline.modernization.subtitle"),
      content: t("about.timeline.modernization.content"),
      icon: Gem,
    },
    {
      period: "2003 - 2028",
      title: t("about.timeline.luxury.title"),
      subtitle: t("about.timeline.luxury.subtitle"),
      content: t("about.timeline.luxury.content"),
      icon: Crown,
    },
    {
      period: "2028 & Beyond",
      title: t("about.timeline.future.title"),
      subtitle: t("about.timeline.future.subtitle"),
      content: t("about.timeline.future.content"),
      icon: Users,
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          </motion.div>

          <div className="relative z-10 container-responsive text-center">
            <FadeIn>
              <h1 className="text-responsive-xl font-playfair font-bold mb-4 sm:mb-6 text-shadow">
                {t("about.page.title")}
              </h1>
              <p className="text-responsive-md text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {t("about.page.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="spacing-section bg-white">
          <div className="container-responsive">
            <div className="grid-responsive-2col items-center">
              <FadeIn
                direction={isRTL ? "right" : "left"}
                className={`${isRTL ? "lg:order-2" : "lg:order-1"}`}
              >
                <h2 className="text-responsive-lg font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
                  {t("about.story.title")}
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed">
                    {t("about.story.content")}
                  </p>
                </div>
              </FadeIn>

              <FadeIn
                direction={isRTL ? "left" : "right"}
                className={`${isRTL ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="El Hage Jewelers Story"
                      width={600}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-16 sm:w-24 h-16 sm:h-24 bg-yellow-400 rounded-full opacity-20"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-12 sm:w-16 h-12 sm:h-16 bg-purple-400 rounded-full opacity-20"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="spacing-section bg-gray-50">
          <div className="container-responsive">
            <FadeIn className="text-center mb-12 sm:mb-16">
              <h2 className="text-responsive-lg font-playfair font-bold text-gray-900 mb-4 sm:mb-6">
                {t("about.values.title")}
              </h2>
              <p className="text-responsive-md text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("about.values.subtitle")}
              </p>
            </FadeIn>

            {/* Values Banner */}
            <FadeIn className="relative mb-12 sm:mb-16 p-6 sm:p-8 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-blue-400/10"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center text-white"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-r ${value.gradient} mb-4`}
                      >
                        <IconComponent className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl font-playfair font-bold mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Detailed Values Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group h-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-r ${value.gradient} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900 mb-3 sm:mb-4">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="spacing-section bg-white">
          <div className="container-responsive">
            {/* Legacy Header */}
            <FadeIn className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8">
                {t("about.legacy.title")}
              </h2>
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                  {t("about.legacy.intro")}
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {t("about.legacy.description")}
                </p>
              </div>
            </FadeIn>

            {/* Timeline */}
            <div className="relative max-w-6xl mx-auto">
              {/* Desktop Timeline Line - Hidden on mobile */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 via-purple-400 to-blue-400 rounded-full"
              />

              {/* Mobile Timeline Line - Only visible on mobile */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="lg:hidden absolute left-6 top-0 w-1 bg-gradient-to-b from-yellow-400 via-purple-400 to-blue-400 rounded-full"
              />

              {timeline.map((era, index) => {
                const IconComponent = era.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative mb-12 sm:mb-16 ${
                      isEven
                        ? "lg:flex lg:items-center lg:justify-start"
                        : "lg:flex lg:items-center lg:justify-end"
                    }`}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.2 }}
                      className={`absolute w-10 sm:w-12 h-10 sm:h-12 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center z-10 hover:border-yellow-400 transition-colors duration-300 left-1 sm:left-1 lg:left-1/2 lg:transform lg:-translate-x-1/2`}
                    >
                      <IconComponent className="h-5 sm:h-6 w-5 sm:w-6 text-gray-900" />
                    </motion.div>

                    {/* Content Card */}
                    <div
                      className={`pl-16 sm:pl-20 pr-4 lg:w-full lg:max-w-lg ${
                        isEven
                          ? "lg:pr-8 lg:pl-0 lg:text-right"
                          : "lg:pl-8 lg:pr-0 lg:text-left"
                      } ${
                        isRTL && isEven
                          ? "lg:pl-8 lg:pr-0 lg:text-left"
                          : isRTL && !isEven
                          ? "lg:pr-8 lg:pl-0 lg:text-right"
                          : ""
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                          {era.period}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900 mb-2">
                          {era.title}
                        </h3>
                        <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-4">
                          {era.subtitle}
                        </h4>
                        <div className="prose prose-gray max-w-none">
                          {era.content
                            .split("\n\n")
                            .map((paragraph, pIndex) => (
                              <p
                                key={pIndex}
                                className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 last:mb-0"
                              >
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Anniversary Banner */}
            <FadeIn className="mt-16 sm:mt-20 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg"
              >
                <h3 className="text-lg sm:text-2xl font-playfair font-bold">
                  {t("about.anniversary.title")}
                </h3>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="spacing-section bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
          <div className="container-responsive text-center">
            <FadeIn>
              <h2 className="text-responsive-lg font-playfair font-bold mb-4 sm:mb-6">
                {t("about.experience.title")}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("about.experience.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://calendly.com/elhagejewelers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 focus-visible"
                >
                  {t("about.experience.appointment")}
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/collections"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300 focus-visible"
                >
                  {t("about.experience.collections")}
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
