"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocation } from "@/components/providers/location-provider";
import { apiService, type HomeContent } from "@/lib/api";

export function VideoSection() {
  const { t, language } = useLanguage();
  const { country } = useLocation();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content = await apiService.getHomeContent(country);
        setHomeContent(content);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (country) {
      fetchHomeContent();
    }
  }, [country]);

  // Get video content - check both videoSection and hero section for video
  const getVideoTitle = () => {
    if (homeContent?.videoSection) {
      return language === "ar"
        ? homeContent.videoSection.titleAr
        : homeContent.videoSection.titleEn;
    }
    return t("video.title");
  };

  const getVideoUrl = () => {
    // First check if there's a dedicated video section with its own video
    if (homeContent?.videoSection?.videoUrl) {
      return homeContent.videoSection.videoUrl;
    }
    // Fallback to hero video if hero section has video enabled
    if (homeContent?.hero?.useVideo && homeContent?.hero?.videoUrl) {
      return homeContent.hero.videoUrl;
    }
    return null;
  };

  const getVideoThumbnail = () => {
    if (homeContent?.videoSection?.videoThumbnail) {
      return homeContent.videoSection.videoThumbnail;
    }
    return "/placeholder.svg?height=720&width=1280";
  };

  const videoUrl = getVideoUrl();

  // Don't render if loading or no video available
  if (isLoading || !videoUrl) {
    return null;
  }

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            {getVideoTitle()}
          </h2>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          {!isPlaying ? (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={handlePlayClick}
            >
              <Image
                src={getVideoThumbnail() || "/placeholder.svg"}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group hover:bg-opacity-20 transition-all duration-300">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 group-hover:bg-opacity-30 transition-all duration-300">
                  <Play className="h-16 w-16 text-white ml-2" />
                </div>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              preload="metadata"
            />
          )}
        </div>
      </div>
    </section>
  );
}
