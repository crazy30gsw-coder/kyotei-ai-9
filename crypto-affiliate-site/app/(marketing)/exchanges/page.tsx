import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  getDomesticExchanges,
  getInternationalExchanges,
} from "@/lib/data/exchanges";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "仮想通貨取引所比較 | おすすめランキング2025 - CryptoNavi",
  description:
    "国内・海外の仮想通貨取引所を徹底比較。手数料、セキュリティ、取扱通貨数、使いやすさなどの観点からおすすめの取引所をランキング形式でご紹介。初心者にも分かりやすく解説します。",
  openGraph: {
    title: "仮想通貨取引所比較 | おすすめランキング2025 - CryptoNavi",
    description:
      "国内・海外の仮想通貨取引所を手数料・セキュリティ・使いやすさで徹底比較。",
    type: "website",
  },
};

export default function ExchangesPage() {
  const domesticExchanges = getDomesticExchanges();
  const internationalExchanges = getInternationalExchanges();

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          ホーム
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">取引所比較</span>
      </nav>

      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          仮想通貨取引所おすすめ比較ランキング
          <span className="ml-2 text-lg text-muted-foreground">2025年最新</span>
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          仮想通貨（暗号資産）の取引を始めるには、まず取引所で口座を開設する必要があります。
          国内取引所は金融庁の認可を受けており安心して利用できます。
          このページでは、手数料、セキュリティ、取扱通貨数、使いやすさなどを
          総合的に比較し、あなたに最適な取引所選びをサポートします。
        </p>
      </div>

      {/* Comparison Highlights Section */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="exchange-card flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">安全性を重視</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              金融庁登録済みの国内取引所を中心に、セキュリティ体制を厳しくチェックしています。
            </p>
          </div>
        </div>
        <div className="exchange-card flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">手数料を徹底比較</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              取引手数料、入出金手数料、スプレッドなどのコストを詳細に比較しています。
            </p>
          </div>
        </div>
        <div className="exchange-card flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">国内・海外を網羅</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              初心者向けの国内取引所から上級者向けの海外取引所まで幅広くカバーしています。
            </p>
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold">取引所の選び方 - 5つのポイント</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "手数料の安さ",
              description: "取引手数料・スプレッド・入出金手数料を総合的に比較",
            },
            {
              title: "セキュリティ",
              description: "コールドウォレット管理・マルチシグ対応・保険の有無",
            },
            {
              title: "取扱通貨数",
              description: "投資したい銘柄が取り扱われているかを確認",
            },
            {
              title: "使いやすさ",
              description: "アプリの操作性・チャート機能・注文方法の充実度",
            },
            {
              title: "キャンペーン",
              description: "口座開設ボーナス・取引キャッシュバックなどの特典",
            },
          ].map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">{point.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domestic Exchanges Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold sm:text-2xl">
                国内取引所おすすめランキング
              </h2>
              <Badge variant="success">金融庁登録済</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              日本円で直接取引可能な金融庁認可の国内暗号資産交換業者を厳選
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domesticExchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.slug}
              exchange={exchange}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden rounded-2xl gradient-hero border border-border p-8 text-center sm:p-12">
        <div className="relative z-10 mx-auto max-w-2xl space-y-4">
          <h2 className="text-xl font-bold sm:text-2xl">
            今すぐ仮想通貨取引を始めよう
          </h2>
          <p className="text-muted-foreground">
            口座開設は最短5分、本人確認もオンラインで完結。
            多くの取引所で口座開設キャンペーンを実施中です。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {domesticExchanges.slice(0, 2).map((exchange) => (
              <a
                key={exchange.slug}
                href={exchange.affiliate.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-cta-primary"
              >
                {exchange.name}で口座開設
                <ArrowRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* International Exchanges Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold sm:text-2xl">
              海外取引所おすすめランキング
            </h2>
            <Badge variant="warning">上級者向け</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            取扱通貨数やレバレッジ倍率で国内取引所を上回る海外取引所をご紹介。
            ご利用は自己責任となりますのでご注意ください。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internationalExchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.slug}
              exchange={exchange}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-xl border border-accent/30 bg-card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold">
              どの取引所を選べばいいか迷っていますか？
            </h3>
            <p className="text-sm text-muted-foreground">
              初心者の方には、まず国内大手取引所での口座開設をおすすめします。
              複数の取引所に口座を持つことで、取引の幅が広がります。
            </p>
          </div>
          <Link
            href="/guides/how-to-start"
            className="btn-cta-secondary shrink-0"
          >
            初心者ガイドを見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose-crypto border-t border-border pt-8">
        <h2>仮想通貨取引所とは</h2>
        <p>
          仮想通貨取引所（暗号資産交換業者）は、ビットコインやイーサリアムなどの
          仮想通貨を売買できるプラットフォームです。日本国内では金融庁に登録された
          事業者のみが暗号資産交換業を行うことができ、利用者保護の体制が
          整えられています。
        </p>
        <p>
          取引所は「販売所」と「取引所（板取引）」の2つの取引形式を提供していることが多く、
          販売所は簡単に売買できる一方スプレッドが広い傾向にあり、
          取引所（板取引）はユーザー間で直接取引するためコストを抑えられます。
        </p>

        <h2>国内取引所と海外取引所の違い</h2>
        <p>
          国内取引所は金融庁の監督下にあり、日本円での入出金が容易です。
          一方、海外取引所は取扱通貨数が多く、レバレッジ取引の倍率も高い傾向にあります。
          ただし、海外取引所は日本の法規制の対象外であるため、
          トラブル発生時の保護が限定的です。初心者の方はまず国内取引所から
          始めることを推奨します。
        </p>
      </section>
    </div>
  );
}
