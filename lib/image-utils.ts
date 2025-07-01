/**
 * Utility functions for handling images with CORS issues
 */

export function getProxiedImageUrl(originalUrl: string): string {
  // If it's already a relative URL or from allowed domains, return as-is
  if (!originalUrl.startsWith("http")) {
    return originalUrl;
  }

  // If it's from api.elhagejewelers.com, proxy it through our domain
  if (originalUrl.includes("api.elhagejewelers.com")) {
    // Extract the path after the domain
    const url = new URL(originalUrl);
    return `/api/images${url.pathname}`;
  }

  // For other URLs, return as-is
  return originalUrl;
}

export function getImageUrl(
  url: string | undefined,
  fallback = "/placeholder.svg?height=400&width=400"
): string {
  if (!url) return fallback;

  try {
    return getProxiedImageUrl(url);
  } catch (error) {
    console.warn("Invalid image URL:", url, error);
    return fallback;
  }
}

// For handling multiple images
export function getImageUrls(urls: string[]): string[] {
  return urls.map((url) => getImageUrl(url)).filter(Boolean);
}
