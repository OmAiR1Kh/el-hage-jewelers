"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Star,
  Sparkles,
  Award,
  Globe,
  Heart,
  Diamond,
  Crown,
} from "lucide-react";
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

  const sections = [
    {
      id: "story",
      title: t("about.story.title"),
      content: t("about.story.content"),
      icon: Heart,
      gradient: "from-rose-500 to-pink-600",
    },
    {
      id: "artist",
      title: t("about.artist.title"),
      content: t("about.artist.content"),
      icon: Crown,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: "masterpiece",
      title: t("about.masterpiece.title"),
      content: t("about.masterpiece.content"),
      icon: Diamond,
      gradient: "from-blue-500 to-indigo-600",
    },
  ];

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
      period: "1953 - 1973",
      title: t("about.timeline.founding.title"),
      subtitle: t("about.timeline.founding.subtitle"),
      content: t("about.timeline.founding.content"),
      icon: Star,
      color: "emerald",
    },
    {
      period: "1973 - 1997",
      title: t("about.timeline.expansion.title"),
      subtitle: t("about.timeline.expansion.subtitle"),
      content: t("about.timeline.expansion.content"),
      icon: Globe,
      color: "blue",
    },
    {
      period: "1997 - 2003",
      title: t("about.timeline.modernization.title"),
      subtitle: t("about.timeline.modernization.subtitle"),
      content: t("about.timeline.modernization.content"),
      icon: Diamond,
      color: "purple",
    },
    {
      period: "2003 - 2028",
      title: t("about.timeline.luxury.title"),
      subtitle: t("about.timeline.luxury.subtitle"),
      content: t("about.timeline.luxury.content"),
      icon: Crown,
      color: "amber",
    },
    {
      period: "2028 & Beyond",
      title: t("about.timeline.future.title"),
      subtitle: t("about.timeline.future.subtitle"),
      content: t("about.timeline.future.content"),
      icon: Sparkles,
      color: "rose",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with parallax */}
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="El Hage Jewelers Heritage"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Floating elements */}
          <motion.div
            style={{ y: y2 }}
            className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-rose-400/20 rounded-full blur-xl"
          />

          <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm px-6 py-3 rounded-full text-amber-300 font-medium mb-6"
                >
                  <Crown className="h-5 w-5" />
                  {t("about.anniversary.title")}
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 leading-tight"
              >
                {t("about.page.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto text-gray-200 font-light"
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Legacy Introduction */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-responsive">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-8">
                  {t("about.legacy.title")}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                  {t("about.legacy.intro")}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("about.legacy.description")}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-20">
          <div className="container-responsive">
            <StaggerContainer className="space-y-32">
              {sections.map((section, index) => (
                <StaggerItem key={section.id}>
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-12 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-r ${section.gradient} text-white shadow-lg`}
                        >
                          <section.icon className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {section.content
                          .split("\n\n")
                          .map((paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className="mb-6 text-lg leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className="flex-1 relative">
                      <div className="relative aspect-square max-w-md mx-auto">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-3xl opacity-20 blur-3xl transform rotate-6`}
                        />
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                          <section.icon className={`h-32 w-32 text-gray-300`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
                  {t("about.values.title")}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {t("about.values.subtitle")}
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20" />
                    <div className="relative p-8 text-center space-y-6">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.gradient} shadow-lg`}
                      >
                        <value.icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-playfair font-bold text-amber-300">
                        {value.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Journey Through Time */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
                  {language === "ar"
                    ? "رحلة عبر الزمن"
                    : "Journey Through Time"}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === "ar"
                    ? "٧٥ عاماً من التميز والإبداع في عالم المجوهرات الفاخرة"
                    : "75 years of excellence and innovation in luxury jewelry"}
                </p>
              </div>
            </FadeIn>

            <div className="space-y-16">
              {eras.map((era, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Era Card */}
                  <div className="flex-1">
                    <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-${era.color}-500 to-${era.color}-600`}
                      />

                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-3 rounded-xl bg-${era.color}-100 text-${era.color}-600`}
                        >
                          <era.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div
                            className={`text-sm font-bold text-${era.color}-600 uppercase tracking-wider`}
                          >
                            {era.period}
                          </div>
                          <h3 className="text-2xl font-playfair font-bold text-gray-900">
                            {era.subtitle}
                          </h3>
                        </div>
                      </div>

                      <div className="prose max-w-none text-gray-700">
                        {era.content
                          .split("\n\n")
                          .slice(0, 2)
                          .map((paragraph, pIndex) => (
                            <p key={pIndex} className="mb-4 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Timeline Element */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      <div
                        className={`w-32 h-32 rounded-full bg-gradient-to-r from-${era.color}-500 to-${era.color}-600 shadow-lg flex items-center justify-center`}
                      >
                        <era.icon className="h-16 w-16 text-white" />
                      </div>
                      <div
                        className={`absolute -top-4 -left-4 w-40 h-40 rounded-full bg-${era.color}-500/20 animate-pulse`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white">
          <div className="container-responsive">
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-8">
                  {t("about.experience.title")}
                </h2>
                <p className="text-xl mb-12 text-amber-100">
                  {t("about.experience.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg"
                  >
                    <Link href="/contact">
                      {t("about.experience.appointment")}
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg font-medium"
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
