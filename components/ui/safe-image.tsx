"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/image-utils";

interface SafeImageProps {
  src: string | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  fallback?: string;
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  fill,
  fallback = "/placeholder.svg?height=400&width=400",
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = imageError ? fallback : getImageUrl(src, fallback);

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className || ""}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${className || ""} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={imageUrl.includes("placeholder.svg")}
      />
    </div>
  );
}
