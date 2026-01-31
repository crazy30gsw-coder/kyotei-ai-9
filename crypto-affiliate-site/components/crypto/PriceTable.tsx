"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { PriceChart } from "./PriceChart";

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
}

function formatJPY(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}兆`;
  }
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(2)}億`;
  }
  if (value >= 10_000) {
    return `${(value / 10_000).toFixed(2)}万`;
  }
  return value.toLocaleString("ja-JP");
}

function formatPrice(value: number): string {
  if (value >= 1) {
    return `¥${value.toLocaleString("ja-JP", { maximumFractionDigits: 0 })}`;
  }
  return `¥${value.toLocaleString("ja-JP", { maximumFractionDigits: 4 })}`;
}

function formatPercent(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

interface PriceTableProps {
  initialCoins: CoinData[];
}

export function PriceTable({ initialCoins }: PriceTableProps) {
  const [coins, setCoins] = useState<CoinData[]>(
    [...initialCoins].sort((a, b) => a.market_cap_rank - b.market_cap_rank)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchCoins = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/coins");
      if (res.ok) {
        const data: CoinData[] = await res.json();
        setCoins(
          [...data].sort((a, b) => a.market_cap_rank - b.market_cap_rank)
        );
        setLastUpdated(new Date());
      }
    } catch {
      // Silently fail on refresh — keep previous data
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchCoins, 60_000);
    return () => clearInterval(interval);
  }, [fetchCoins]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          最終更新:{" "}
          {lastUpdated.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
        <button
          onClick={fetchCoins}
          disabled={isRefreshing}
          className={cn(
            "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            isRefreshing && "animate-spin"
          )}
          aria-label="価格を更新"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">更新</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground">
              <th className="px-3 py-3 text-left font-medium">#</th>
              <th className="px-3 py-3 text-left font-medium">名前</th>
              <th className="px-3 py-3 text-right font-medium">価格</th>
              <th className="px-3 py-3 text-right font-medium">24h</th>
              <th className="hidden md:table-cell px-3 py-3 text-right font-medium">
                7d
              </th>
              <th className="hidden lg:table-cell px-3 py-3 text-right font-medium">
                時価総額
              </th>
              <th className="hidden lg:table-cell px-3 py-3 text-right font-medium">
                出来高(24h)
              </th>
              <th className="hidden xl:table-cell px-3 py-3 text-right font-medium">
                7日間チャート
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const is24hPositive = coin.price_change_percentage_24h >= 0;
              const is7dPositive =
                (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;

              return (
                <tr
                  key={coin.id}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  {/* Rank */}
                  <td className="px-3 py-3 text-muted-foreground">
                    {coin.market_cap_rank}
                  </td>

                  {/* Name */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-6 w-6 rounded-full"
                        loading="lazy"
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-medium text-foreground">
                          {coin.name}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 text-right font-mono font-medium text-foreground">
                    {formatPrice(coin.current_price)}
                  </td>

                  {/* 24h Change */}
                  <td
                    className={cn(
                      "px-3 py-3 text-right font-mono text-sm",
                      is24hPositive ? "text-crypto-green" : "text-crypto-red"
                    )}
                  >
                    <div className="flex items-center justify-end gap-0.5">
                      {is24hPositive ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {formatPercent(coin.price_change_percentage_24h)}
                    </div>
                  </td>

                  {/* 7d Change */}
                  <td
                    className={cn(
                      "hidden md:table-cell px-3 py-3 text-right font-mono text-sm",
                      is7dPositive ? "text-crypto-green" : "text-crypto-red"
                    )}
                  >
                    <div className="flex items-center justify-end gap-0.5">
                      {is7dPositive ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {formatPercent(
                        coin.price_change_percentage_7d_in_currency
                      )}
                    </div>
                  </td>

                  {/* Market Cap */}
                  <td className="hidden lg:table-cell px-3 py-3 text-right font-mono text-muted-foreground">
                    ¥{formatJPY(coin.market_cap)}
                  </td>

                  {/* Volume */}
                  <td className="hidden lg:table-cell px-3 py-3 text-right font-mono text-muted-foreground">
                    ¥{formatJPY(coin.total_volume)}
                  </td>

                  {/* Sparkline */}
                  <td className="hidden xl:table-cell px-3 py-3">
                    {coin.sparkline_in_7d?.price && (
                      <div className="flex justify-end">
                        <PriceChart
                          data={coin.sparkline_in_7d.price}
                          color={is7dPositive ? "#00C853" : "#FF1744"}
                          width={120}
                          height={40}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
