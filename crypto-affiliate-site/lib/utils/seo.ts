/**
 * SEO helper functions for a Japanese crypto affiliate site.
 *
 * Generates Next.js Metadata objects and JSON-LD structured data
 * (Article, Review, FAQPage, BreadcrumbList) that comply with
 * Google's Rich Results requirements.
 */

import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Site-wide constants
// ---------------------------------------------------------------------------

/** Canonical base URL of the site (no trailing slash). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crypto-navi.jp";

/** Default site name shown in titles and structured data. */
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "クリプトナビ";

/** Default OG image path (relative to SITE_URL). */
const DEFAULT_OG_IMAGE = "/images/og-default.png";

/** Default locale for the site. */
const DEFAULT_LOCALE = "ja_JP";

/** Publisher organization info for structured data. */
const PUBLISHER = {
  "@type": "Organization" as const,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/images/logo.png`,
    width: 600,
    height: 60,
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PageSEOParams {
  /** Page title (will be combined with site name) */
  title: string;
  /** Meta description (max ~155 chars recommended) */
  description: string;
  /** Canonical path, e.g. "/exchanges/bitflyer" (no domain) */
  path: string;
  /** OG image path relative to SITE_URL, defaults to DEFAULT_OG_IMAGE */
  ogImage?: string;
  /** Additional keywords for meta keywords (optional) */
  keywords?: string[];
  /** Published date as ISO string */
  publishedAt?: string;
  /** Last modified date as ISO string */
  modifiedAt?: string;
  /** noindex flag for pages that should not be indexed */
  noIndex?: boolean;
  /** Article type for OG: "article" | "website" */
  type?: "article" | "website";
}

export interface ArticleJSONLDParams {
  /** Article headline */
  headline: string;
  /** Article description / excerpt */
  description: string;
  /** Canonical URL of the article */
  url: string;
  /** URL of the article's main image */
  image: string;
  /** Date published (ISO 8601) */
  datePublished: string;
  /** Date modified (ISO 8601) */
  dateModified: string;
  /** Author name */
  authorName: string;
  /** Author URL (optional) */
  authorUrl?: string;
  /** Article section / category, e.g. "取引所レビュー" */
  articleSection?: string;
  /** Keywords / tags */
  keywords?: string[];
}

export interface ReviewJSONLDParams {
  /** Name of the item being reviewed, e.g. "ビットフライヤー" */
  itemName: string;
  /** Description of the reviewed item */
  itemDescription: string;
  /** URL of the reviewed item's image */
  itemImage?: string;
  /** URL of the review page */
  reviewUrl: string;
  /** Review body text (first ~200 chars recommended) */
  reviewBody: string;
  /** Author name of the review */
  authorName: string;
  /** Rating value, e.g. 4.5 */
  ratingValue: number;
  /** Maximum rating, e.g. 5 */
  bestRating?: number;
  /** Minimum rating, e.g. 1 */
  worstRating?: number;
  /** Date published (ISO 8601) */
  datePublished: string;
}

export interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text (can include simple HTML) */
  answer: string;
}

export interface BreadcrumbItem {
  /** Display name of the breadcrumb segment */
  name: string;
  /** URL path of the segment (full URL or path) */
  href: string;
}

// ---------------------------------------------------------------------------
// Metadata Generator
// ---------------------------------------------------------------------------

/**
 * Generates a Next.js `Metadata` object for a page.
 *
 * Handles title templating, Open Graph, Twitter Card, canonical URL,
 * and robots directives.
 *
 * @example
 * ```ts
 * // In a page's generateMetadata or exported metadata:
 * export const metadata = generateMetadata({
 *   title: "ビットフライヤーの評判・口コミ",
 *   description: "ビットフライヤーの手数料、使いやすさ、セキュリティを徹底レビュー。",
 *   path: "/exchanges/bitflyer",
 *   publishedAt: "2024-06-01T00:00:00Z",
 *   modifiedAt: "2024-11-15T00:00:00Z",
 *   keywords: ["ビットフライヤー", "評判", "手数料", "仮想通貨取引所"],
 * });
 * ```
 */
export function generateMetadata(params: PageSEOParams): Metadata {
  const {
    title,
    description,
    path,
    ogImage,
    keywords,
    noIndex,
    type = "website",
  } = params;

  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`)
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const fullTitle = `${title} | ${SITE_NAME}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

// ---------------------------------------------------------------------------
// JSON-LD Generators
// ---------------------------------------------------------------------------

/**
 * Generates Article JSON-LD structured data.
 *
 * Suitable for blog posts, news articles, and informational pages about
 * crypto exchanges, DeFi guides, etc.
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: generateArticleJSONLD({
 *       headline: "仮想通貨取引所おすすめランキング2024",
 *       description: "国内の主要仮想通貨取引所を比較...",
 *       url: "https://crypto-navi.jp/exchanges/ranking",
 *       image: "https://crypto-navi.jp/images/ranking-og.png",
 *       datePublished: "2024-01-15T00:00:00Z",
 *       dateModified: "2024-11-01T00:00:00Z",
 *       authorName: "クリプトナビ編集部",
 *     }),
 *   }}
 * />
 * ```
 */
export function generateArticleJSONLD(params: ArticleJSONLDParams): string {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: params.url,
    image: {
      "@type": "ImageObject",
      url: params.image,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: {
      "@type": "Person",
      name: params.authorName,
      ...(params.authorUrl ? { url: params.authorUrl } : {}),
    },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    ...(params.articleSection ? { articleSection: params.articleSection } : {}),
    ...(params.keywords && params.keywords.length > 0
      ? { keywords: params.keywords.join(", ") }
      : {}),
    inLanguage: "ja",
  };

  return JSON.stringify(jsonld);
}

/**
 * Generates Review JSON-LD structured data.
 *
 * Suitable for exchange review pages, wallet reviews, etc.
 * Follows Google's Review snippet guidelines.
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: generateReviewJSONLD({
 *       itemName: "ビットフライヤー",
 *       itemDescription: "国内最大級の仮想通貨取引所",
 *       reviewUrl: "https://crypto-navi.jp/exchanges/bitflyer",
 *       reviewBody: "ビットフライヤーは初心者にも使いやすく...",
 *       authorName: "クリプトナビ編集部",
 *       ratingValue: 4.5,
 *       datePublished: "2024-06-01T00:00:00Z",
 *     }),
 *   }}
 * />
 * ```
 */
export function generateReviewJSONLD(params: ReviewJSONLDParams): string {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: params.itemName,
      description: params.itemDescription,
      applicationCategory: "FinanceApplication",
      ...(params.itemImage ? { image: params.itemImage } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: params.ratingValue,
      bestRating: params.bestRating ?? 5,
      worstRating: params.worstRating ?? 1,
    },
    author: {
      "@type": "Organization",
      name: params.authorName,
    },
    publisher: PUBLISHER,
    reviewBody: params.reviewBody,
    datePublished: params.datePublished,
    url: params.reviewUrl,
    inLanguage: "ja",
  };

  return JSON.stringify(jsonld);
}

/**
 * Generates FAQPage JSON-LD structured data.
 *
 * Enables the FAQ rich result in Google Search. Each question/answer
 * pair becomes a `mainEntity` item.
 *
 * @example
 * ```tsx
 * const faqs = [
 *   {
 *     question: "仮想通貨取引所の口座開設に必要なものは？",
 *     answer: "本人確認書類（運転免許証、マイナンバーカード等）とメールアドレスが必要です。",
 *   },
 *   {
 *     question: "取引所と販売所の違いは？",
 *     answer: "取引所はユーザー同士の売買、販売所は業者との売買です。取引所のほうが手数料が安い傾向にあります。",
 *   },
 * ];
 *
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: generateFAQPageJSONLD(faqs) }}
 * />
 * ```
 */
export function generateFAQPageJSONLD(items: FAQItem[]): string {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    inLanguage: "ja",
  };

  return JSON.stringify(jsonld);
}

/**
 * Generates BreadcrumbList JSON-LD structured data.
 *
 * Enables breadcrumb rich results in Google Search.
 * Automatically prepends the home page as the first item if not included.
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: generateBreadcrumbJSONLD([
 *       { name: "ホーム", href: "/" },
 *       { name: "取引所比較", href: "/exchanges" },
 *       { name: "ビットフライヤー", href: "/exchanges/bitflyer" },
 *     ]),
 *   }}
 * />
 * ```
 */
export function generateBreadcrumbJSONLD(items: BreadcrumbItem[]): string {
  // Ensure items have full URLs
  const resolvedItems = items.map((item) => ({
    name: item.name,
    href: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
  }));

  // Prepend home if not already included
  if (
    resolvedItems.length === 0 ||
    (resolvedItems[0].href !== SITE_URL &&
      resolvedItems[0].href !== `${SITE_URL}/`)
  ) {
    resolvedItems.unshift({ name: "ホーム", href: SITE_URL });
  }

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: resolvedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };

  return JSON.stringify(jsonld);
}

// ---------------------------------------------------------------------------
// Convenience: Combined JSON-LD for review pages
// ---------------------------------------------------------------------------

/**
 * Generates a combined JSON-LD array string for a typical exchange review page.
 * Includes Article, Review, FAQPage (if FAQs provided), and BreadcrumbList.
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{
 *     __html: generateExchangeReviewJSONLD({
 *       exchangeName: "ビットフライヤー",
 *       exchangeDescription: "国内最大級の暗号資産取引所",
 *       slug: "bitflyer",
 *       reviewBody: "ビットフライヤーは...",
 *       ratingValue: 4.5,
 *       authorName: "クリプトナビ編集部",
 *       datePublished: "2024-06-01T00:00:00Z",
 *       dateModified: "2024-11-15T00:00:00Z",
 *       image: "https://crypto-navi.jp/images/bitflyer-review.png",
 *       faqs: [
 *         { question: "手数料は？", answer: "取引手数料は..." },
 *       ],
 *     }),
 *   }}
 * />
 * ```
 */
export function generateExchangeReviewJSONLD(params: {
  exchangeName: string;
  exchangeDescription: string;
  slug: string;
  reviewBody: string;
  ratingValue: number;
  authorName: string;
  datePublished: string;
  dateModified: string;
  image: string;
  faqs?: FAQItem[];
  keywords?: string[];
}): string {
  const reviewUrl = `${SITE_URL}/exchanges/${params.slug}`;

  const parts: unknown[] = [];

  // Article
  parts.push(
    JSON.parse(
      generateArticleJSONLD({
        headline: `${params.exchangeName}の評判・口コミ・レビュー`,
        description: params.exchangeDescription,
        url: reviewUrl,
        image: params.image,
        datePublished: params.datePublished,
        dateModified: params.dateModified,
        authorName: params.authorName,
        articleSection: "取引所レビュー",
        keywords: params.keywords,
      })
    )
  );

  // Review
  parts.push(
    JSON.parse(
      generateReviewJSONLD({
        itemName: params.exchangeName,
        itemDescription: params.exchangeDescription,
        reviewUrl,
        reviewBody: params.reviewBody,
        authorName: params.authorName,
        ratingValue: params.ratingValue,
        datePublished: params.datePublished,
      })
    )
  );

  // FAQPage (if provided)
  if (params.faqs && params.faqs.length > 0) {
    parts.push(JSON.parse(generateFAQPageJSONLD(params.faqs)));
  }

  // BreadcrumbList
  parts.push(
    JSON.parse(
      generateBreadcrumbJSONLD([
        { name: "ホーム", href: "/" },
        { name: "取引所比較", href: "/exchanges" },
        { name: params.exchangeName, href: `/exchanges/${params.slug}` },
      ])
    )
  );

  return JSON.stringify(parts);
}

// ---------------------------------------------------------------------------
// Utility: Canonical URL builder
// ---------------------------------------------------------------------------

/**
 * Returns the full canonical URL for a given path.
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Returns the site name constant.
 */
export function getSiteName(): string {
  return SITE_NAME;
}

/**
 * Returns the site URL constant.
 */
export function getSiteUrl(): string {
  return SITE_URL;
}
