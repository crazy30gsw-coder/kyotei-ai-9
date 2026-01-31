"use client";

import Link from "next/link";
import { Star, TrendingUp, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CTAButton from "@/components/affiliate/CTAButton";

interface SidebarProps {
  className?: string;
}

const popularExchanges = [
  {
    id: "bitflyer",
    name: "bitFlyer",
    description: "国内最大級の取引量",
    rating: 4.5,
    features: ["セキュリティ高", "初心者向け"],
  },
  {
    id: "coincheck",
    name: "Coincheck",
    description: "アプリが使いやすい",
    rating: 4.3,
    features: ["豊富な銘柄", "シンプルUI"],
  },
  {
    id: "binance",
    name: "Binance",
    description: "世界最大の取引所",
    rating: 4.6,
    features: ["低手数料", "銘柄数No.1"],
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < Math.floor(rating)
              ? "fill-gold text-gold"
              : i < rating
                ? "fill-gold/50 text-gold"
                : "text-slate-600"
          )}
        />
      ))}
      <span className="ml-1 text-xs text-slate-400">{rating}</span>
    </div>
  );
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn("sticky top-20 space-y-6", className)}
    >
      {/* Top recommended exchange CTA */}
      <div className="overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg">
        <div className="flex items-center gap-2 bg-gradient-to-r from-gold-dark/20 to-gold/10 px-4 py-3">
          <TrendingUp className="h-4 w-4 text-gold" />
          <span className="text-sm font-bold text-gold">
            おすすめ取引所 No.1
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">bitFlyer</h3>
          <p className="mt-1 text-sm text-slate-400">
            ビットコイン取引量6年連続No.1。セキュリティと信頼性で選ぶなら。
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">
              金融庁認可済み取引所
            </span>
          </div>
          <div className="mt-4">
            <CTAButton
              exchangeId="bitflyer"
              exchangeName="bitFlyer"
              variant="primary"
              position="sidebar-top"
              bonus="最大10,000円相当もらえる"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Popular exchanges list */}
      <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/80">
        <div className="border-b border-slate-700/50 px-4 py-3">
          <h3 className="text-sm font-bold text-white">人気の取引所</h3>
        </div>
        <ul className="divide-y divide-slate-800">
          {popularExchanges.map((exchange, index) => (
            <li key={exchange.id}>
              <Link
                href={`/exchanges/${exchange.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-800/60"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-gold">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200">
                      {exchange.name}
                    </span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-600" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {exchange.description}
                  </p>
                  <StarRating rating={exchange.rating} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-800 px-4 py-3">
          <Link
            href="/exchanges"
            className="flex items-center justify-center gap-1 text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            すべての取引所を比較する
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
