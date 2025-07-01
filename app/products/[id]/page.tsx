import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import { generateProductStructuredData } from "@/lib/seo";
import { ProductClientPage } from "./ProductClientPage";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.id, {
      location: "lebanon",
      language: "en",
    });

    return {
      title: `${product.nameEn} | El Hage Jewelers`,
      description:
        product.descriptionEn ||
        `Discover ${product.nameEn} from El Hage Jewelers. Luxury jewelry crafted with precision and elegance.`,
      keywords: [product.nameEn, "jewelry", "luxury", "El Hage Jewelers"],
      openGraph: {
        title: `${product.nameEn} | El Hage Jewelers`,
        description:
          product.descriptionEn ||
          `Discover ${product.nameEn} from El Hage Jewelers.`,
        images:
          product.images?.map((image: any) => ({
            url: image,
            width: 800,
            height: 800,
            alt: product.nameEn,
          })) || [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.nameEn} | El Hage Jewelers`,
        description:
          product.descriptionEn ||
          `Discover ${product.nameEn} from El Hage Jewelers.`,
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return {
      title: "Product Not Found | El Hage Jewelers",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id, {
      location: "lebanon",
      language: "en",
    });

    // Get related products from the same category
    let relatedProducts: any[] = [];
    if (product.categoryId) {
      try {
        const allProducts = await getProducts({
          location: "lebanon",
          language: "en",
          // @ts-ignore
          categoryId: product.categoryId._id || product.categoryId,
        });
        // Filter out current product and take first 5
        relatedProducts = allProducts
          .filter((p: any) => p._id !== product._id)
          .slice(0, 5);
      } catch {
        // If fetching related products fails, continue without them
        relatedProducts = [];
      }
    }

    const structuredData = generateProductStructuredData(product);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ProductClientPage
          product={product}
          relatedProducts={relatedProducts}
        />
      </>
    );
  } catch {
    notFound();
  }
}
