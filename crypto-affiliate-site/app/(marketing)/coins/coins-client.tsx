"use client";

import { useState, useEffect } from "react";
import { PriceTable, type CoinData } from "@/components/crypto/PriceTable";
import { RefreshCw } from "lucide-react";

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h,7d";

export function CoinsClient() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(COINGECKO_API_URL);
        if (!res.ok) throw new Error("API error");
        const data: CoinData[] = await res.json();
        setCoins(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card p-16">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-3 text-muted-foreground">価格データを取得中...</span>
      </div>
    );
  }

  if (error || coins.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          価格データの取得に失敗しました。
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          しばらく時間をおいてから再度アクセスしてください。
        </p>
      </div>
    );
  }

  return <PriceTable initialCoins={coins} />;
}
