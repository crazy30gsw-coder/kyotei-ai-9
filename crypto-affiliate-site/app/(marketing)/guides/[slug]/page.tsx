import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ChevronRight,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Shield,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

/* ---------- helpers ---------- */

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

interface GuideFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image?: string;
}

function getGuideBySlug(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as GuideFrontmatter, content };
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getRelatedGuides(currentSlug: string, category: string) {
  const slugs = getAllSlugs().filter((s) => s !== currentSlug);
  const related: { slug: string; frontmatter: GuideFrontmatter }[] = [];

  for (const slug of slugs) {
    const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const fm = data as GuideFrontmatter;
    // Prioritise same category
    if (fm.category === category) {
      related.unshift({ slug, frontmatter: fm });
    } else {
      related.push({ slug, frontmatter: fm });
    }
  }

  return related.slice(0, 3);
}

function estimateReadTime(content: string): number {
  // Japanese: roughly 500 chars/min
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 500));
}

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: "ガイドが見つかりません | CryptoNavi" };
  }

  const { frontmatter } = guide;
  return {
    title: `${frontmatter.title} | CryptoNavi`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
    },
  };
}

/* ---------- Affiliate CTA component ---------- */

function AffiliateCTA() {
  return (
    <div className="my-10 rounded-xl border border-accent/30 bg-gradient-to-r from-card to-accent/5 p-6 sm:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent">
              おすすめ取引所
            </span>
          </div>
          <h3 className="text-lg font-bold">
            今すぐ口座開設して仮想通貨を始めよう
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            最短5分で口座開設完了。初心者にも使いやすい国内取引所をご紹介します。
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/exchanges" className="btn-cta-primary whitespace-nowrap">
            取引所を比較
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Table of Contents placeholder ---------- */

function TableOfContents() {
  return (
    <nav className="rounded-lg border bg-card p-5">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        <Clock className="h-4 w-4" />
        目次
      </h2>
      <p className="text-xs text-muted-foreground">
        記事の見出しに沿って読み進めることができます。各セクションをクリックしてジャンプできます。
      </p>
    </nav>
  );
}

/* ---------- Page ---------- */

export default function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold">ガイドが見つかりません</h1>
        <p className="mb-8 text-muted-foreground">
          お探しのガイド記事は存在しないか、削除された可能性があります。
        </p>
        <Link href="/guides" className="btn-cta-secondary">
          <ArrowLeft className="h-4 w-4" />
          ガイド一覧に戻る
        </Link>
      </div>
    );
  }

  const { frontmatter, content } = guide;
  const readTime = estimateReadTime(content);
  const related = getRelatedGuides(params.slug, frontmatter.category);

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CryptoNavi",
      logo: {
        "@type": "ImageObject",
        url: "https://cryptonavi.jp/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cryptonavi.jp/guides/${params.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          className="mb-8 flex items-center gap-1 text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            ホーム
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href="/guides"
            className="transition-colors hover:text-foreground"
          >
            ガイド
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground">
            {frontmatter.title}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <article>
            {/* Article header */}
            <header className="mb-10">
              <Badge variant="default" className="mb-4">
                {frontmatter.category}
              </Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {frontmatter.title}
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {frontmatter.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 border-b border-t py-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {frontmatter.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(frontmatter.date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  約{readTime}分で読めます
                </span>
              </div>
            </header>

            {/* Affiliate CTA (top) */}
            <AffiliateCTA />

            {/* MDX content */}
            <div className="prose-crypto">
              <MDXRemote source={content} />
            </div>

            {/* Affiliate CTA (bottom) */}
            <AffiliateCTA />

            {/* Disclaimer */}
            <div className="mt-10 rounded-lg border bg-muted/30 p-5">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">免責事項</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    本記事は情報提供を目的としたものであり、特定の暗号資産や取引所の購入・利用を推奨するものではありません。暗号資産投資にはリスクが伴います。投資判断はご自身の責任のもと行ってください。記事内にはアフィリエイトリンクが含まれる場合があります。
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <Link
                href="/guides"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4" />
                ガイド一覧に戻る
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents */}
            <TableOfContents />

            {/* Sidebar CTA */}
            <div className="rounded-lg border border-accent/20 bg-gradient-to-b from-card to-accent/5 p-5">
              <h3 className="mb-2 text-sm font-bold">
                仮想通貨を始めるなら
              </h3>
              <p className="mb-4 text-xs text-muted-foreground">
                国内大手の取引所で安全に始められます。最短即日で取引開始可能。
              </p>
              <Link
                href="/exchanges"
                className="btn-cta-primary w-full text-center text-sm"
              >
                おすすめ取引所を見る
              </Link>
            </div>

            {/* Tool links */}
            <div className="rounded-lg border bg-card p-5">
              <h3 className="mb-3 text-sm font-bold">便利ツール</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/tools/calculator"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3" />
                    手数料計算ツール
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/simulator"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3" />
                    利益シミュレーター
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">関連記事</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/guides/${r.slug}`}
                  className="group block"
                >
                  <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <CardHeader>
                      <Badge variant="secondary" className="mb-2 w-fit">
                        {r.frontmatter.category}
                      </Badge>
                      <CardTitle className="text-base group-hover:text-primary">
                        {r.frontmatter.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs">
                        {r.frontmatter.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        記事を読む
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
