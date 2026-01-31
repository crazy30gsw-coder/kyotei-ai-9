import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { PriceTable } from "@/components/crypto/PriceTable";

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

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h,7d";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

async function getCoinData(): Promise<CoinData[]> {
  try {
    const response = await fetch(COINGECKO_API_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
    return [];
  }
}

export default async function CoinsPage() {
  const coins = await getCoinData();

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

      {/* Price Table */}
      {coins.length > 0 ? (
        <PriceTable initialCoins={coins} />
      ) : (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            価格データの取得に失敗しました。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            しばらく時間をおいてから再度アクセスしてください。
          </p>
        </div>
      )}

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
