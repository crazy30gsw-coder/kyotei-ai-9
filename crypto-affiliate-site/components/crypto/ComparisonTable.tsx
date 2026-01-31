"use client";

import { cn } from "@/lib/utils";
import {
  Star,
  ExternalLink,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface Exchange {
  id: string;
  name: string;
  nameJa: string;
  logo: string;
  type: "domestic" | "international";
  rating: number;
  fees: {
    trading: string;
    deposit: string;
    withdrawal: string;
  };
  features: {
    currencies: number;
    leverage: number;
    staking: boolean;
    japaneseSupport: boolean;
    mobileApp: boolean;
  };
  security: {
    coldWallet: number;
    insurance: boolean;
    twoFactor: boolean;
  };
  pros: string[];
  cons: string[];
  campaign: {
    active: boolean;
    description?: string;
  };
  affiliate: {
    url: string;
    asp: string;
    bonus?: string;
  };
  slug: string;
  description: string;
}

interface ComparisonTableProps {
  exchanges: Exchange[];
}

function BooleanIcon({ value }: { value: boolean }) {
  return value ? (
    <div className="flex items-center justify-center">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-crypto-green/10">
        <Check className="h-4 w-4 text-crypto-green" />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-crypto-red/10">
        <X className="h-4 w-4 text-crypto-red" />
      </div>
    </div>
  );
}

function StarRatingCompact({ rating }: { rating: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.floor(rating)
                ? "fill-gold text-gold"
                : i < rating
                  ? "fill-gold/50 text-gold"
                  : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <span className="text-lg font-bold text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

interface ComparisonRow {
  label: string;
  key: string;
  render: (exchange: Exchange) => React.ReactNode;
}

const comparisonRows: ComparisonRow[] = [
  {
    label: "手数料",
    key: "fees",
    render: (ex) => (
      <div className="text-center space-y-1">
        <div>
          <span className="text-xs text-muted-foreground">取引: </span>
          <span className="text-sm font-medium">{ex.fees.trading}</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">入金: </span>
          <span className="text-sm font-medium">{ex.fees.deposit}</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">出金: </span>
          <span className="text-sm font-medium">{ex.fees.withdrawal}</span>
        </div>
      </div>
    ),
  },
  {
    label: "取扱通貨数",
    key: "currencies",
    render: (ex) => (
      <span className="text-lg font-bold text-foreground">
        {ex.features.currencies}
        <span className="text-sm font-normal text-muted-foreground ml-0.5">
          種
        </span>
      </span>
    ),
  },
  {
    label: "レバレッジ",
    key: "leverage",
    render: (ex) => (
      <span className="text-lg font-bold text-foreground">
        {ex.features.leverage > 0 ? (
          <>
            {ex.features.leverage}
            <span className="text-sm font-normal text-muted-foreground ml-0.5">
              倍
            </span>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">非対応</span>
        )}
      </span>
    ),
  },
  {
    label: "セキュリティ",
    key: "security",
    render: (ex) => (
      <div className="text-center space-y-1">
        <div className="text-sm font-medium">
          コールドウォレット {ex.security.coldWallet}%
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          保険: <BooleanIcon value={ex.security.insurance} />
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          2FA: <BooleanIcon value={ex.security.twoFactor} />
        </div>
      </div>
    ),
  },
  {
    label: "日本語対応",
    key: "japanese",
    render: (ex) => <BooleanIcon value={ex.features.japaneseSupport} />,
  },
  {
    label: "ステーキング",
    key: "staking",
    render: (ex) => <BooleanIcon value={ex.features.staking} />,
  },
  {
    label: "総合評価",
    key: "rating",
    render: (ex) => <StarRatingCompact rating={ex.rating} />,
  },
];

export function ComparisonTable({ exchanges }: ComparisonTableProps) {
  const [expandedOnMobile, setExpandedOnMobile] = useState(false);
  const displayExchanges = exchanges.slice(0, 3);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          {/* Exchange Headers */}
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-4 text-left font-semibold text-muted-foreground min-w-[100px]">
                比較項目
              </th>
              {displayExchanges.map((exchange) => (
                <th
                  key={exchange.id}
                  className="px-4 py-4 text-center min-w-[160px] bg-muted/50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
                      <img
                        src={exchange.logo}
                        alt={exchange.nameJa}
                        className="h-10 w-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        {exchange.nameJa}
                      </p>
                      <span
                        className={cn(
                          "inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium",
                          exchange.type === "domestic"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                        )}
                      >
                        {exchange.type === "domestic" ? "国内" : "海外"}
                      </span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Desktop: show all rows / Mobile: show visibleRows */}
            {comparisonRows.map((row, rowIndex) => (
              <tr
                key={row.key}
                className={cn(
                  "border-b border-border last:border-b-0",
                  rowIndex % 2 === 0 ? "bg-card" : "bg-muted/20",
                  // Hide extra rows on mobile when not expanded
                  !expandedOnMobile && rowIndex >= 4
                    ? "hidden md:table-row"
                    : ""
                )}
              >
                <td className="sticky left-0 z-10 bg-inherit px-4 py-4 font-medium text-foreground whitespace-nowrap">
                  {row.label}
                </td>
                {displayExchanges.map((exchange) => (
                  <td key={exchange.id} className="px-4 py-4 text-center">
                    {row.render(exchange)}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA Row */}
            <tr className="bg-muted/10">
              <td className="sticky left-0 z-10 bg-inherit px-4 py-5 font-medium text-foreground">
                公式サイト
              </td>
              {displayExchanges.map((exchange) => (
                <td key={exchange.id} className="px-4 py-5 text-center">
                  <div className="flex flex-col items-center gap-2">
                    {exchange.affiliate.bonus && (
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-dark dark:text-gold-light">
                        {exchange.affiliate.bonus}
                      </span>
                    )}
                    <a
                      href={exchange.affiliate.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5",
                        "bg-primary text-primary-foreground font-bold text-sm",
                        "hover:opacity-90 transition-opacity",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      )}
                    >
                      口座開設
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-xs text-muted-foreground">
                      ※ 公式サイトへ
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile expand toggle */}
      <div className="mt-3 flex justify-center md:hidden">
        <button
          onClick={() => setExpandedOnMobile((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {expandedOnMobile ? (
            <>
              項目を閉じる
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              すべての項目を表示
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
