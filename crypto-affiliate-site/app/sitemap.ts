import { MetadataRoute } from "next";
import { exchanges } from "@/lib/data/exchanges";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cryptonavi.jp";

  const now = new Date();

  // ---------------------------------------------------------------------------
  // Static pages
  // ---------------------------------------------------------------------------
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/exchanges`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coins`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/simulator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ---------------------------------------------------------------------------
  // Exchange pages (dynamic from data)
  // ---------------------------------------------------------------------------
  const exchangePages: MetadataRoute.Sitemap = exchanges.map((exchange) => ({
    url: `${baseUrl}/exchanges/${exchange.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ---------------------------------------------------------------------------
  // Guide pages (hardcoded slugs)
  // ---------------------------------------------------------------------------
  const guideSlugs = [
    "crypto-beginners-guide",
    "how-to-buy-bitcoin",
    "exchange-comparison-guide",
  ];

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ---------------------------------------------------------------------------
  // Combined sitemap
  // ---------------------------------------------------------------------------
  return [...staticPages, ...exchangePages, ...guidePages];
}
