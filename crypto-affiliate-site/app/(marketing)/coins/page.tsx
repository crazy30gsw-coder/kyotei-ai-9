import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { CoinsClient } from "./coins-client";

export const metadata: Metadata = {
  title: "仮想通貨価格一覧 | リアルタイム相場チャート - CryptoNavi",
  description:
    "ビットコイン、イーサリアムなど主要仮想通貨100銘柄のリアルタイム価格・チャート・時価総額ランキング。24時間・7日間の価格変動率も一覧で確認できます。",
  openGraph: {
    title: "仮想通貨価格一覧 | リアルタイム相場チャート - CryptoNavi",
    description:
      "主要仮想通貨100銘柄のリアルタイム価格・チャート・時価総額ランキングを一覧表示。",
    type: "website",
  },
};

export default function CoinsPage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          ホーム
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">仮想通貨価格一覧</span>
      </nav>

      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            仮想通貨価格一覧
          </h1>
        </div>

        <p className="max-w-3xl text-muted-foreground">
          ビットコイン（BTC）、イーサリアム（ETH）をはじめとする主要仮想通貨の最新価格を
          リアルタイムで一覧表示しています。時価総額ランキング上位100銘柄の価格、
          24時間・7日間の変動率、スパークラインチャートをご確認いただけます。
          データはCoinGecko APIより自動取得され、約1分間隔で更新されます。
        </p>
      </div>

      {/* Client-side Price Table */}
      <CoinsClient />

      {/* SEO Content Section */}
      <section className="prose-crypto mt-12 space-y-6 border-t border-border pt-8">
        <h2>仮想通貨の価格をリアルタイムで確認する方法</h2>
        <p>
          仮想通貨（暗号資産）の価格は24時間365日変動しています。
          投資判断を行う際には、リアルタイムの価格情報に加えて、
          時価総額、取引量、価格変動率などの指標を総合的に確認することが重要です。
        </p>
        <p>
          当サイトでは、世界最大級の仮想通貨データプロバイダーであるCoinGeckoの
          データを基に、日本円建てで主要銘柄の最新情報をお届けしています。
        </p>

        <h2>時価総額ランキングの見方</h2>
        <p>
          時価総額（マーケットキャップ）は、その仮想通貨の「現在価格 x 流通供給量」で
          計算される指標です。時価総額が大きいほど、一般的に市場での信頼性や流動性が
          高いとされています。ただし、時価総額だけで投資判断を行うことは推奨されません。
        </p>
      </section>
    </div>
  );
}
