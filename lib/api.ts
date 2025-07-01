import {
  validateHomeContent,
  validateCampaigns,
  validateCollections,
  validateCollection,
  validateCategories,
  validateCategory,
  validateProducts,
  validateProduct,
  validateTestimonials,
  validateSEOData,
} from "./validation";

const API_BASE_URL = "https://api.elhagejewelers.com/api/v1";

export interface HomeContent {
  hero?: {
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    videoUrl?: string;
    useVideo: boolean;
    buttonTextAr: string;
    buttonTextEn: string;
    buttonLink: string;
  };
  aboutSection?: {
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    image?: string;
  };
  videoSection?: {
    titleAr: string;
    titleEn: string;
    videoUrl?: string;
    videoThumbnail?: string;
  };
  featuredSection?: {
    titleAr?: string;
    titleEn?: string;
    contentAr?: string;
    contentEn?: string;
    items: any[];
    displayType?: string;
    showOnHomepage: boolean;
  };
  seo?: SEOData;
  featuredProducts: Array<{
    productId: {
      _id: string;
      nameAr: string;
      nameEn: string;
      descriptionAr: string;
      descriptionEn: string;
      images: string[];
      mainImg: string;
      price: number;
      showPrice: boolean;
      categoryId: string;
      metalType: string;
      caratSize?: number;
      weight: number;
      stock: number;
      featured: boolean;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    displayOrder: number;
    _id: string;
  }>;
  featuredCollections: Array<{
    collectionId?: {
      _id: string;
      nameAr: string;
      nameEn: string;
      descriptionAr: string;
      descriptionEn: string;
      bannerImage: string;
      thumbnailImage: string;
      isActive: boolean;
      isFeatured: boolean;
      releaseDate: string;
      createdAt: string;
      updatedAt: string;
    };
    displayOrder: number;
    _id: string;
  }>;
  testimonials: Array<{
    testimonialId?: {
      _id: string;
      name: string;
      content: string;
      rating: number;
      image?: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    displayOrder: number;
    _id: string;
  }>;
  _id?: string;
  country?: string;
  isActive: boolean;
  lastUpdatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Campaign {
  _id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  position: "top" | "bottom" | "left" | "right" | "center" | "home";
  type: "banner" | "popup" | "carousel" | "sidebar" | "featured";
  isActive: boolean;
  startDate: string;
  endDate: string;
  displayRules?: {
    targetDevices: string[];
    showAfterSeconds: number;
    frequency: string;
    onlyNewUsers: boolean;
  };
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  bannerImage: string;
  thumbnailImage: string;
  galleryImages: string[];
  pageContent?: {
    titleAr?: string;
    titleEn?: string;
    contentAr?: string;
    contentEn?: string;
    metaDescriptionAr?: string;
    metaDescriptionEn?: string;
    keywords: string[];
  };
  isActive: boolean;
  isFeatured: boolean;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  images: string[];
  mainImg: string;
  price: number;
  showPrice: boolean;
  categoryId:
    | string
    | {
        _id: string;
        nameEn: string;
        nameAr: string;
      };
  collectionId?:
    | string
    | {
        _id: string;
        nameEn: string;
        nameAr: string;
      };
  metalType: "gold" | "silver" | "platinum" | "other";
  caratSize?: number;
  weight: number;
  stock: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image?: string;
}

export interface SEOData {
  title: string;
  titleAr?: string;
  titleEn?: string;
  description: string;
  descriptionAr?: string;
  descriptionEn?: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  alternateLanguages?: { [key: string]: string };
}

class ApiService {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.warn(
          `API request failed: ${response.status} ${response.statusText} for ${endpoint}`
        );
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      return null;
    }
  }

  async getHomeContent(country: string): Promise<HomeContent> {
    try {
      const data = await this.fetchWithErrorHandling<any>(
        `/home-content?country=${encodeURIComponent(country)}`
      );

      // Handle the new API response structure
      if (data?.status === "success" && data?.data?.homeContent) {
        return validateHomeContent(data.data.homeContent);
      }

      // Fallback for direct response
      if (data?.homeContent) {
        return validateHomeContent(data.homeContent);
      }

      console.warn("Unexpected home content API response structure:", data);
      return validateHomeContent({});
    } catch (error) {
      console.warn("Failed to fetch home content, using defaults:", error);
      return validateHomeContent({});
    }
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/campaigns/active");

      // Handle the nested structure from your API response
      if (data?.data?.campaigns) {
        return validateCampaigns(data.data.campaigns);
      }

      // Fallback for direct array response
      if (Array.isArray(data)) {
        return validateCampaigns(data);
      }

      console.warn("Unexpected campaigns API response structure:", data);
      return [];
    } catch (error) {
      console.warn("Failed to fetch campaigns, returning empty array:", error);
      return [];
    }
  }

  async getActiveCollections(): Promise<Collection[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>(
        "/collections/active"
      );
      if (data?.data?.collections) {
        return validateCollections(data.data.collections);
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch collections, returning empty array:",
        error
      );
      return [];
    }
  }

  async getAllCollections(): Promise<Collection[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/collections");
      if (data?.data?.collections) {
        return validateCollections(data.data.collections);
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch all collections, returning empty array:",
        error
      );
      return [];
    }
  }

  async getCollection(id: string): Promise<Collection | null> {
    try {
      if (!id || typeof id !== "string") {
        console.warn("Invalid collection ID provided");
        return null;
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/collections/${encodeURIComponent(id)}`
      );
      if (data?.data?.collection) {
        return validateCollection(data.data.collection);
      }
      return null;
    } catch (error) {
      console.warn(`Failed to fetch collection ${id}:`, error);
      return null;
    }
  }

  async getActiveCategories(): Promise<Category[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/categories/active");
      if (data?.data?.categories) {
        return validateCategories(data.data.categories);
      }
      return [];
    } catch (error) {
      console.warn("Failed to fetch categories, returning empty array:", error);
      return [];
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/categories");
      if (data?.data?.categories) {
        return validateCategories(data.data.categories);
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch all categories, returning empty array:",
        error
      );
      return [];
    }
  }

  async getCategory(id: string): Promise<Category | null> {
    try {
      if (!id || typeof id !== "string") {
        console.warn("Invalid category ID provided");
        return null;
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/categories/${encodeURIComponent(id)}`
      );
      if (data?.data?.category) {
        return validateCategory(data.data.category);
      }
      return null;
    } catch (error) {
      console.warn(`Failed to fetch category ${id}:`, error);
      return null;
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/products/featured");
      if (data?.data?.products) {
        return validateProducts(data.data.products);
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch featured products, returning empty array:",
        error
      );
      return [];
    }
  }

  async getAllProducts(
    params?: Record<string, string>
  ): Promise<{ products: Product[]; total: number }> {
    try {
      const queryParams = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";
      const data = await this.fetchWithErrorHandling<any>(
        `/products${queryParams}`
      );

      if (data?.data?.products) {
        return {
          products: validateProducts(data.data.products),
          total: data.results || 0,
        };
      }
      return { products: [], total: 0 };
    } catch (error) {
      console.warn("Failed to fetch products, returning empty array:", error);
      return { products: [], total: 0 };
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      if (!id || typeof id !== "string") {
        console.warn("Invalid product ID provided");
        return null;
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/products/${encodeURIComponent(id)}`
      );
      if (data?.data?.product) {
        return validateProduct(data.data.product);
      }
      return null;
    } catch (error) {
      console.warn(`Failed to fetch product ${id}:`, error);
      return null;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      if (!query || typeof query !== "string") {
        console.warn("Invalid search query provided");
        return [];
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/products/search?query=${encodeURIComponent(query)}`
      );
      if (data?.data?.products) {
        return validateProducts(data.data.products);
      }
      return [];
    } catch (error) {
      console.warn(`Failed to search products for query ${query}:`, error);
      return [];
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const data = await this.fetchWithErrorHandling<any>("/testimonials");
      return validateTestimonials(data);
    } catch (error) {
      console.warn(
        "Failed to fetch testimonials, returning empty array:",
        error
      );
      return [];
    }
  }

  async getProductsByCollection(collectionId: string): Promise<Product[]> {
    try {
      if (!collectionId || typeof collectionId !== "string") {
        console.warn("Invalid collection ID provided for products");
        return [];
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/products/collection/${encodeURIComponent(collectionId)}`
      );
      if (data?.data?.products) {
        return validateProducts(data.data.products);
      }
      return [];
    } catch (error) {
      console.warn(
        `Failed to fetch products for collection ${collectionId}:`,
        error
      );
      return [];
    }
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      if (!categoryId || typeof categoryId !== "string") {
        console.warn("Invalid category ID provided for products");
        return [];
      }

      const data = await this.fetchWithErrorHandling<any>(
        `/products/category/${encodeURIComponent(categoryId)}`
      );
      if (data?.data?.products) {
        return validateProducts(data.data.products);
      }
      return [];
    } catch (error) {
      console.warn(
        `Failed to fetch products for category ${categoryId}:`,
        error
      );
      return [];
    }
  }

  async getSEOData(
    page: string,
    params?: Record<string, string>
  ): Promise<SEOData> {
    try {
      if (!page || typeof page !== "string") {
        console.warn("Invalid page provided for SEO data");
        return validateSEOData({});
      }

      const queryParams = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";
      const data = await this.fetchWithErrorHandling<any>(
        `/seo/${encodeURIComponent(page)}${queryParams}`
      );
      return validateSEOData(data);
    } catch (error) {
      console.warn(`Failed to fetch SEO data for page ${page}:`, error);
      return validateSEOData({});
    }
  }
}

export const apiService = new ApiService();
