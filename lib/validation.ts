import { z } from "zod";

// Base validation schemas
export const SEODataSchema = z.object({
  title: z.string().min(1).default("El Hage Jewelers"),
  titleAr: z.string().optional(),
  titleEn: z.string().optional(),
  description: z
    .string()
    .min(1)
    .default("Luxury jewelry crafted with precision since 1953"),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  keywords: z
    .array(z.string())
    .default(["luxury jewelry", "custom jewelry", "fine jewelry"]),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  structuredData: z.any().optional(),
  alternateLanguages: z.record(z.string()).optional(),
});

export const HomeContentSchema = z.object({
  // Hero section
  hero: z
    .object({
      titleAr: z.string().default("مرحبًا بكم في مجوهرات الحاج"),
      titleEn: z.string().default("Welcome to El Hage Jewelry"),
      subtitleAr: z.string().default("اكتشف مجموعاتنا الحصرية"),
      subtitleEn: z.string().default("Discover our exclusive collections"),
      videoUrl: z.string().url().optional(),
      useVideo: z.boolean().default(false),
      buttonTextAr: z.string().default("إكتشف مجموعاتنا"),
      buttonTextEn: z.string().default("Explore Collections"),
      buttonLink: z.string().default("/collections"),
    })
    .optional(),

  // About section
  aboutSection: z
    .object({
      titleAr: z.string().default("حول مجوهرات الحاج"),
      titleEn: z.string().default("About El Hage Jewelers"),
      contentAr: z
        .string()
        .default("مجوهرات الحاج تصنع المجوهرات الرائعة منذ عام 1953"),
      contentEn: z
        .string()
        .default(
          "El Hage Jewelers has been crafting exquisite jewelry since 1953"
        ),
      image: z.string().url().optional(),
    })
    .optional(),

  // Video section
  videoSection: z
    .object({
      titleAr: z.string().default("فيديو"),
      titleEn: z.string().default("Video"),
      videoUrl: z.string().url().optional(),
      videoThumbnail: z.string().url().optional(),
    })
    .optional(),

  // Featured section - flexible structure to handle any featured content
  featuredSection: z
    .object({
      titleAr: z.string().optional(),
      titleEn: z.string().optional(),
      contentAr: z.string().optional(),
      contentEn: z.string().optional(),
      items: z.array(z.any()).default([]),
      displayType: z.string().optional(),
      showOnHomepage: z.boolean().default(true),
    })
    .optional(),

  // SEO
  seo: SEODataSchema.optional(),

  // Featured products
  featuredProducts: z
    .array(
      z.object({
        productId: z.object({
          _id: z.string(),
          nameAr: z.string(),
          nameEn: z.string(),
          descriptionAr: z.string(),
          descriptionEn: z.string(),
          images: z.array(z.string().url()),
          mainImg: z.string().url(),
          price: z.number(),
          showPrice: z.boolean(),
          categoryId: z.string(),
          metalType: z.string(),
          caratSize: z.number().optional(),
          weight: z.number(),
          stock: z.number(),
          featured: z.boolean(),
          isActive: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
        }),
        displayOrder: z.number(),
        _id: z.string(),
      })
    )
    .default([]),

  // Featured collections
  featuredCollections: z
    .array(
      z.object({
        collectionId: z
          .object({
            _id: z.string(),
            nameAr: z.string(),
            nameEn: z.string(),
            descriptionAr: z.string(),
            descriptionEn: z.string(),
            bannerImage: z.string().url(),
            thumbnailImage: z.string().url(),
            isActive: z.boolean(),
            isFeatured: z.boolean(),
            releaseDate: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
          .optional(),
        displayOrder: z.number(),
        _id: z.string(),
      })
    )
    .default([]),

  // Testimonials
  testimonials: z
    .array(
      z.object({
        testimonialId: z
          .object({
            _id: z.string(),
            name: z.string(),
            content: z.string(),
            rating: z.number(),
            image: z.string().url().optional(),
            isActive: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
          .optional(),
        displayOrder: z.number(),
        _id: z.string(),
      })
    )
    .default([]),

  // Meta fields
  _id: z.string().optional(),
  country: z.string().optional(),
  isActive: z.boolean().default(true),
  lastUpdatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CampaignSchema = z.object({
  _id: z.string().min(1),
  titleEn: z.string().min(1).default("Special Offer"),
  titleAr: z.string().min(1).default("عرض خاص"),
  descriptionEn: z.string().min(1).default("Discover our latest collection"),
  descriptionAr: z.string().min(1).default("اكتشف مجموعتنا الجديدة"),
  image: z.string().url().default("/placeholder.svg?height=400&width=600"),
  position: z
    .enum(["top", "bottom", "left", "right", "center", "home"])
    .default("home"),
  type: z
    .enum(["banner", "popup", "carousel", "sidebar", "featured"])
    .default("banner"),
  isActive: z.boolean().default(true),
  startDate: z.string().default(new Date().toISOString()),
  endDate: z
    .string()
    .default(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
  displayRules: z
    .object({
      targetDevices: z
        .array(z.string())
        .default(["desktop", "mobile", "tablet"]),
      showAfterSeconds: z.number().default(0),
      frequency: z.string().default("every_visit"),
      onlyNewUsers: z.boolean().default(false),
    })
    .optional(),
  priority: z.number().default(1),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
});

export const CollectionSchema = z.object({
  _id: z.string().min(1),
  nameAr: z.string().min(1).default("مجموعة بدون اسم"),
  nameEn: z.string().min(1).default("Untitled Collection"),
  descriptionAr: z.string().min(1).default("وصف المجموعة"),
  descriptionEn: z
    .string()
    .min(1)
    .default("A beautiful collection of fine jewelry"),
  bannerImage: z
    .string()
    .url()
    .default("/placeholder.svg?height=600&width=1200"),
  thumbnailImage: z
    .string()
    .url()
    .default("/placeholder.svg?height=400&width=400"),
  galleryImages: z.array(z.string().url()).default([]),
  pageContent: z
    .object({
      titleAr: z.string().optional(),
      titleEn: z.string().optional(),
      contentAr: z.string().optional(),
      contentEn: z.string().optional(),
      metaDescriptionAr: z.string().optional(),
      metaDescriptionEn: z.string().optional(),
      keywords: z.array(z.string()).default([]),
    })
    .optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  releaseDate: z.string().default(new Date().toISOString()),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
});

export const CategorySchema = z.object({
  _id: z.string().min(1),
  nameAr: z.string().min(1).default("فئة بدون اسم"),
  nameEn: z.string().min(1).default("Untitled Category"),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  image: z.string().url().default("/placeholder.svg?height=300&width=300"),
  isActive: z.boolean().default(true),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
});

export const ProductSchema = z.object({
  _id: z.string().min(1),
  nameAr: z.string().min(1).default("منتج بدون اسم"),
  nameEn: z.string().min(1).default("Untitled Product"),
  descriptionAr: z.string().min(1).default("وصف المنتج"),
  descriptionEn: z.string().min(1).default("Product description"),
  images: z
    .array(z.string().url())
    .min(1)
    .default(["/placeholder.svg?height=300&width=300"]),
  mainImg: z.string().url().default("/placeholder.svg?height=400&width=400"),
  price: z.number().min(0).default(0),
  showPrice: z.boolean().default(true),
  categoryId: z.union([
    z.string(),
    z.object({
      _id: z.string(),
      nameEn: z.string().default("Category"),
      nameAr: z.string().default("فئة"),
    }),
  ]),
  collectionId: z
    .union([
      z.string(),
      z.object({
        _id: z.string(),
        nameEn: z.string().default("Collection"),
        nameAr: z.string().default("مجموعة"),
      }),
    ])
    .optional(),
  metalType: z.enum(["gold", "silver", "platinum", "other"]).default("gold"),
  caratSize: z.number().optional(),
  weight: z.number().min(0).default(0),
  stock: z.number().min(0).default(0),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
});

export const TestimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).default("Anonymous"),
  content: z.string().min(1).default("Great experience!"),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().url().optional(),
});

// Validation functions
export function validateHomeContent(data: unknown) {
  try {
    return HomeContentSchema.parse(data);
  } catch (error) {
    console.warn("Invalid home content data, using defaults:", error);
    return HomeContentSchema.parse({});
  }
}

export function validateCampaigns(data: unknown) {
  try {
    const campaigns = Array.isArray(data) ? data : [];
    return campaigns
      .map((campaign) => {
        try {
          return CampaignSchema.parse(campaign);
        } catch (error) {
          console.warn("Invalid campaign data, skipping:", error);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Invalid campaigns data, returning empty array:", error);
    return [];
  }
}

export function validateCollections(data: unknown) {
  try {
    const collections = Array.isArray(data) ? data : [];
    return collections
      .map((collection) => {
        try {
          return CollectionSchema.parse(collection);
        } catch (error) {
          console.warn("Invalid collection data, skipping:", error);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Invalid collections data, returning empty array:", error);
    return [];
  }
}

export function validateCollection(data: unknown) {
  try {
    return CollectionSchema.parse(data);
  } catch (error) {
    console.warn("Invalid collection data, using defaults:", error);
    return CollectionSchema.parse({});
  }
}

export function validateCategories(data: unknown) {
  try {
    const categories = Array.isArray(data) ? data : [];
    return categories
      .map((category) => {
        try {
          return CategorySchema.parse(category);
        } catch (error) {
          console.warn("Invalid category data, skipping:", error);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Invalid categories data, returning empty array:", error);
    return [];
  }
}

export function validateCategory(data: unknown) {
  try {
    return CategorySchema.parse(data);
  } catch (error) {
    console.warn("Invalid category data, using defaults:", error);
    return CategorySchema.parse({});
  }
}

export function validateProducts(data: unknown) {
  try {
    const products = Array.isArray(data) ? data : [];
    return products
      .map((product) => {
        try {
          return ProductSchema.parse(product);
        } catch (error) {
          console.warn("Invalid product data, skipping:", error);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Invalid products data, returning empty array:", error);
    return [];
  }
}

export function validateProduct(data: unknown) {
  try {
    return ProductSchema.parse(data);
  } catch (error) {
    console.warn("Invalid product data, using defaults:", error);
    return ProductSchema.parse({});
  }
}

export function validateTestimonials(data: unknown) {
  try {
    const testimonials = Array.isArray(data) ? data : [];
    return testimonials
      .map((testimonial) => {
        try {
          return TestimonialSchema.parse(testimonial);
        } catch (error) {
          console.warn("Invalid testimonial data, skipping:", error);
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Invalid testimonials data, returning empty array:", error);
    return [];
  }
}

export function validateSEOData(data: unknown) {
  try {
    return SEODataSchema.parse(data);
  } catch (error) {
    console.warn("Invalid SEO data, using defaults:", error);
    return SEODataSchema.parse({});
  }
}

// Safe data access helpers
export function safeGet<T>(obj: any, path: string, defaultValue: T): T {
  try {
    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current == null || typeof current !== "object") {
        return defaultValue;
      }
      current = current[key];
    }

    return current != null ? current : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeArray<T>(data: unknown, defaultValue: T[] = []): T[] {
  return Array.isArray(data) ? data : defaultValue;
}

export function safeString(data: unknown, defaultValue = ""): string {
  return typeof data === "string" ? data : defaultValue;
}

export function safeNumber(data: unknown, defaultValue = 0): number {
  return typeof data === "number" && !isNaN(data) ? data : defaultValue;
}

export function safeBoolean(data: unknown, defaultValue = false): boolean {
  return typeof data === "boolean" ? data : defaultValue;
}
