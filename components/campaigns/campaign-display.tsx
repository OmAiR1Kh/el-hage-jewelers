"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiService, type Campaign } from "@/lib/api";
import { useLanguage } from "@/components/providers/language-provider";
import { SafeImage } from "@/components/ui/safe-image";

interface CampaignDisplayProps {
  position?: "top" | "bottom" | "left" | "right" | "center" | "home";
}

export function CampaignDisplay({ position = "home" }: CampaignDisplayProps) {
  const { language } = useLanguage();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState<Campaign[]>([]);
  const [dismissedCampaigns, setDismissedCampaigns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get device type
  const getDeviceType = () => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  };

  // Check if campaign should be shown based on date range
  const isCampaignActive = (campaign: Campaign) => {
    const now = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);

    return now >= startDate && now <= endDate && campaign.isActive;
  };

  // Check if campaign should be shown based on display rules
  const shouldShowCampaign = (campaign: Campaign) => {
    if (!isCampaignActive(campaign)) {
      console.log(
        `Campaign ${campaign._id} is not active or outside date range`
      );
      return false;
    }

    if (dismissedCampaigns.includes(campaign._id)) {
      console.log(`Campaign ${campaign._id} was dismissed`);
      return false;
    }

    if (campaign.position !== position) {
      console.log(
        `Campaign ${campaign._id} position ${campaign.position} doesn't match ${position}`
      );
      return false;
    }

    // Check device targeting
    const currentDevice = getDeviceType();
    const targetDevices = campaign.displayRules?.targetDevices || [
      "desktop",
      "mobile",
      "tablet",
    ];

    if (!targetDevices.includes(currentDevice)) {
      console.log(`Campaign ${campaign._id} doesn't target ${currentDevice}`);
      return false;
    }

    console.log(`Campaign ${campaign._id} should be shown`);
    return true;
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching campaigns...");
        const data = await apiService.getActiveCampaigns();
        console.log("Fetched campaigns:", data);

        const filteredCampaigns = data.filter(shouldShowCampaign);
        console.log(
          "Filtered campaigns for position",
          position,
          ":",
          filteredCampaigns
        );

        // Sort by priority (higher priority first)
        const sortedCampaigns = filteredCampaigns.sort(
          (a, b) => (b.priority || 1) - (a.priority || 1)
        );

        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [position]);

  useEffect(() => {
    if (campaigns.length === 0) return;

    campaigns.forEach((campaign) => {
      const showAfterSeconds = campaign.displayRules?.showAfterSeconds || 0;

      if (showAfterSeconds > 0) {
        console.log(
          `Scheduling campaign ${campaign._id} to show after ${showAfterSeconds} seconds`
        );
        setTimeout(() => {
          setVisibleCampaigns((prev) => {
            if (!prev.find((c) => c._id === campaign._id)) {
              console.log(`Showing campaign ${campaign._id}`);
              return [...prev, campaign];
            }
            return prev;
          });
        }, showAfterSeconds * 1000);
      } else {
        console.log(`Showing campaign ${campaign._id} immediately`);
        setVisibleCampaigns((prev) => {
          if (!prev.find((c) => c._id === campaign._id)) {
            return [...prev, campaign];
          }
          return prev;
        });
      }
    });
  }, [campaigns]);

  const dismissCampaign = (campaignId: string) => {
    console.log(`Dismissing campaign ${campaignId}`);
    setDismissedCampaigns((prev) => [...prev, campaignId]);
    setVisibleCampaigns((prev) => prev.filter((c) => c._id !== campaignId));

    // Store in localStorage to persist dismissal
    if (typeof window !== "undefined") {
      const dismissed = JSON.parse(
        localStorage.getItem("dismissedCampaigns") || "[]"
      );
      localStorage.setItem(
        "dismissedCampaigns",
        JSON.stringify([...dismissed, campaignId])
      );
    }
  };

  // Load dismissed campaigns from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = JSON.parse(
        localStorage.getItem("dismissedCampaigns") || "[]"
      );
      setDismissedCampaigns(dismissed);
    }
  }, []);

  const getCampaignTitle = (campaign: Campaign) => {
    return language === "ar" ? campaign.titleAr : campaign.titleEn;
  };

  const getCampaignDescription = (campaign: Campaign) => {
    return language === "ar" ? campaign.descriptionAr : campaign.descriptionEn;
  };

  if (isLoading) {
    console.log("Campaigns are loading...");
    return null;
  }

  if (visibleCampaigns.length === 0) {
    console.log("No visible campaigns to display");
    return null;
  }

  console.log("Rendering campaigns:", visibleCampaigns);

  return (
    <AnimatePresence>
      {visibleCampaigns.map((campaign) => {
        switch (campaign.type) {
          case "popup":
            return (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    dismissCampaign(campaign._id);
                  }
                }}
              >
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                  className="bg-white rounded-lg max-w-md w-full mx-4 relative overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => dismissCampaign(campaign._id)}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-md transition-colors"
                    aria-label="Close campaign"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {campaign.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <SafeImage
                        src={campaign.image}
                        alt={getCampaignTitle(campaign)}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                        sizes="400px"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {getCampaignTitle(campaign)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {getCampaignDescription(campaign)}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );

          case "banner":
            return (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: position === "top" ? -50 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: position === "top" ? -50 : 50 }}
                transition={{ duration: 0.5 }}
                className={`relative w-full ${
                  position === "top"
                    ? "mb-4"
                    : position === "bottom"
                    ? "mt-4"
                    : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <SafeImage
                    src={campaign.image}
                    alt={getCampaignTitle(campaign)}
                    width={1200}
                    height={200}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-2xl font-bold mb-2">
                        {getCampaignTitle(campaign)}
                      </h3>
                      <p className="text-lg">
                        {getCampaignDescription(campaign)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissCampaign(campaign._id)}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    aria-label="Close campaign"
                  >
                    <X className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </motion.div>
            );

          case "featured":
            return (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden relative"
              >
                <button
                  onClick={() => dismissCampaign(campaign._id)}
                  className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                  aria-label="Close campaign"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>

                <SafeImage
                  src={campaign.image}
                  alt={getCampaignTitle(campaign)}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  sizes="400px"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {getCampaignTitle(campaign)}
                  </h3>
                  <p className="text-gray-600">
                    {getCampaignDescription(campaign)}
                  </p>
                </div>
              </motion.div>
            );

          default:
            console.warn(`Unknown campaign type: ${campaign.type}`);
            return null;
        }
      })}
    </AnimatePresence>
  );
}
