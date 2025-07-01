import type { Metadata } from "next";

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  alternateLanguages?: { [key: string]: string };
}

export function generateMetadata(
  seoData: SEOData,
  currentUrl: string
): Metadata {
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(", "),
    authors: [{ name: "El Hage Jewelers" }],
    creator: "El Hage Jewelers",
    publisher: "El Hage Jewelers",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: currentUrl,
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.description,
      siteName: "El Hage Jewelers",
      images: seoData.ogImage
        ? [
            {
              url: seoData.ogImage,
              width: 1200,
              height: 630,
              alt: seoData.ogTitle || seoData.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.description,
      images: seoData.ogImage ? [seoData.ogImage] : [],
      creator: "@elhagejewelers",
    },
    alternates: {
      canonical: seoData.canonicalUrl || currentUrl,
      languages: seoData.alternateLanguages || {},
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

export function generateStructuredData(type: string, data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseData,
        name: "El Hage Jewelers",
        url: "https://elhagejewelers.com",
        logo: "https://elhagejewelers.com/logo.png",
        description: "Luxury jewelry crafted with precision since 1953",
        foundingDate: "1953",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Luxury Avenue",
          addressLocality: "Beirut",
          addressCountry: "Lebanon",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+961-1-234-567",
          contactType: "customer service",
        },
        sameAs: [
          "https://facebook.com/elhagejewelers",
          "https://instagram.com/elhagejewelers",
          "https://twitter.com/elhagejewelers",
        ],
        ...data,
      };

    case "Product":
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        image: data.images,
        brand: {
          "@type": "Brand",
          name: "El Hage Jewelers",
        },
        category: data.category,
        ...data,
      };

    case "BreadcrumbList":
      return {
        ...baseData,
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return { ...baseData, ...data };
  }
}

export function generateProductStructuredData(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images || [],
    brand: {
      "@type": "Brand",
      name: "El Hage Jewelers",
    },
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "El Hage Jewelers",
          },
        }
      : undefined,
    additionalProperty: product.specifications
      ? Object.entries(product.specifications).map(([key, value]) => ({
          "@type": "PropertyValue",
          name: key,
          value: value,
        }))
      : [],
  };
}
