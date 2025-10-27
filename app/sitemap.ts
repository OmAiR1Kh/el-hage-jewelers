// app/sitemap.ts
import { MetadataRoute } from "next";
import { apiService } from "@/lib/api"; // Update this path to match your api.ts location

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://elhagejewelers.com";

  try {
    // Fetch data using your existing API service
    const [categories, collections, products] = await Promise.all([
      apiService.getAllCategories(),
      apiService.getAllCollections(),
      apiService.getAllProducts(),
    ]);

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];

    // Dynamic routes for categories (only active ones)
    const categoryRoutes: MetadataRoute.Sitemap = categories
      .filter((category) => category.isActive)
      .map((category) => ({
        url: `${baseUrl}/categories/${category._id}`,
        lastModified: new Date(category.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    // Dynamic routes for collections (only active ones)
    const collectionRoutes: MetadataRoute.Sitemap = collections
      .filter((collection) => collection.isActive)
      .map((collection) => ({
        url: `${baseUrl}/collections/${collection._id}`,
        lastModified: new Date(collection.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    // Dynamic routes for products (only active ones)
    const productRoutes: MetadataRoute.Sitemap = products.products
      .filter((product) => product.isActive)
      .map((product) => ({
        url: `${baseUrl}/products/${product._id}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    console.log(
      `Generated sitemap with ${staticRoutes.length} static routes, ${categoryRoutes.length} categories, ${collectionRoutes.length} collections, and ${productRoutes.length} products`
    );

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...collectionRoutes,
      ...productRoutes,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}
