import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Calendar, ArrowRight, Tag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "仮想通貨ガイド一覧 | CryptoNavi",
  description:
    "仮想通貨・暗号資産に関する初心者ガイド、投資戦略、セキュリティ対策、税金情報まで。あなたの暗号資産投資を徹底サポートするガイド記事をお届けします。",
  openGraph: {
    title: "仮想通貨ガイド一覧 | CryptoNavi",
    description:
      "仮想通貨・暗号資産に関する初心者ガイド、投資戦略、セキュリティ対策、税金情報まで網羅。",
    type: "website",
  },
};

interface GuideFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image?: string;
}

interface GuideEntry {
  slug: string;
  frontmatter: GuideFrontmatter;
}

const categoryStyles: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
  "初心者ガイド": { label: "初心者ガイド", variant: "default" },
  "投資戦略": { label: "投資戦略", variant: "success" },
  "セキュリティ": { label: "セキュリティ", variant: "warning" },
  "税金": { label: "税金", variant: "secondary" },
};

function getGuides(): GuideEntry[] {
  const guidesDir = path.join(process.cwd(), "content", "guides");

  if (!fs.existsSync(guidesDir)) {
    return [];
  }

  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));

  const guides: GuideEntry[] = files.map((filename) => {
    const filePath = path.join(guidesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx$/, ""),
      frontmatter: data as GuideFrontmatter,
    };
  });

  // Sort by date descending
  guides.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return guides;
}

export default function GuidesPage() {
  const guides = getGuides();

  const categories = ["すべて", "初心者ガイド", "投資戦略", "セキュリティ", "税金"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            学習コンテンツ
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            仮想通貨ガイド
          </h1>
          <p className="text-lg text-muted-foreground">
            初心者から上級者まで、仮想通貨投資に必要な知識を体系的に学べるガイド記事を掲載しています。
            取引所の選び方からセキュリティ対策、税金の基礎知識まで幅広くカバーしています。
          </p>
        </div>
      </section>

      {/* Category filter (visual only - static) */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {categories.map((cat) => (
            <span
              key={cat}
              className={`inline-flex cursor-default items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                cat === "すべて"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Guides grid */}
      {guides.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const catStyle = categoryStyles[guide.frontmatter.category] ?? {
              label: guide.frontmatter.category,
              variant: "secondary" as const,
            };
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  {/* Optional image placeholder */}
                  {guide.frontmatter.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <BookOpen className="h-12 w-12 opacity-30" />
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant={catStyle.variant}>{catStyle.label}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg group-hover:text-primary">
                      {guide.frontmatter.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {guide.frontmatter.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(guide.frontmatter.date).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {guide.frontmatter.author && (
                        <span>{guide.frontmatter.author}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                      記事を読む
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="rounded-xl border bg-card p-12 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-xl font-semibold">
            ガイド記事を準備中です
          </h2>
          <p className="text-muted-foreground">
            近日中に仮想通貨に関する詳しいガイド記事を公開予定です。お楽しみに。
          </p>
        </section>
      )}

      {/* CTA section */}
      <section className="mt-16 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 text-center sm:p-12">
        <h2 className="mb-3 text-2xl font-bold">
          仮想通貨を始めてみませんか？
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          信頼性の高い国内取引所で、安全に仮想通貨投資をスタートできます。
          当サイトがおすすめする取引所を比較して、あなたに最適な取引所を見つけましょう。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/exchanges" className="btn-cta-primary">
            取引所を比較する
          </Link>
          <Link href="/tools/calculator" className="btn-cta-secondary">
            手数料を計算する
          </Link>
        </div>
      </section>
    </div>
  );
}
