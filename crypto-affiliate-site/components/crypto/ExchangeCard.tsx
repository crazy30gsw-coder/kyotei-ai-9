import { cn } from "@/lib/utils";
import { Star, ExternalLink, Shield, Smartphone, Zap } from "lucide-react";

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

interface ExchangeCardProps {
  exchange: Exchange;
  rank: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.floor(rating)
              ? "fill-gold text-gold"
              : i < rating
                ? "fill-gold/50 text-gold"
                : "fill-muted text-muted"
          )}
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function ExchangeCard({ exchange, rank }: ExchangeCardProps) {
  const rankBadgeColor =
    rank === 1
      ? "bg-gold text-white"
      : rank === 2
        ? "bg-gray-400 text-white"
        : rank === 3
          ? "bg-amber-700 text-white"
          : "bg-muted text-muted-foreground";

  return (
    <div className="group relative rounded-xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      {/* Campaign Banner */}
      {exchange.campaign.active && exchange.campaign.description && (
        <div className="rounded-t-xl bg-gradient-to-r from-gold-dark to-gold px-4 py-2 text-center text-sm font-medium text-white">
          {exchange.campaign.description}
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Top Row: Rank + Logo + Name + Rating */}
        <div className="flex items-start gap-4">
          {/* Rank Badge */}
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              rankBadgeColor
            )}
          >
            {rank}
          </div>

          {/* Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
            <img
              src={exchange.logo}
              alt={exchange.nameJa}
              className="h-10 w-10 object-contain"
              loading="lazy"
            />
          </div>

          {/* Name + Rating */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground">
              {exchange.nameJa}
            </h3>
            <p className="text-xs text-muted-foreground mb-1">
              {exchange.name}
            </p>
            <StarRating rating={exchange.rating} />
          </div>

          {/* Type Badge */}
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
              exchange.type === "domestic"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
            )}
          >
            {exchange.type === "domestic" ? "国内" : "海外"}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {exchange.description}
        </p>

        {/* Key Features */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2.5">
            <Zap className="h-4 w-4 text-gold mb-1" />
            <span className="text-xs text-muted-foreground">取扱通貨</span>
            <span className="text-sm font-bold text-foreground">
              {exchange.features.currencies}種
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2.5">
            <Shield className="h-4 w-4 text-crypto-green mb-1" />
            <span className="text-xs text-muted-foreground">セキュリティ</span>
            <span className="text-sm font-bold text-foreground">
              {exchange.security.coldWallet}%
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2.5">
            <Smartphone className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">アプリ</span>
            <span className="text-sm font-bold text-foreground">
              {exchange.features.mobileApp ? "対応" : "非対応"}
            </span>
          </div>
        </div>

        {/* Fees Summary */}
        <div className="mt-4 rounded-lg border border-border p-3">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">
            手数料
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">取引</p>
              <p className="text-sm font-semibold text-foreground">
                {exchange.fees.trading}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">入金</p>
              <p className="text-sm font-semibold text-foreground">
                {exchange.fees.deposit}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">出金</p>
              <p className="text-sm font-semibold text-foreground">
                {exchange.fees.withdrawal}
              </p>
            </div>
          </div>
        </div>

        {/* Pros Highlights */}
        <ul className="mt-4 space-y-1.5">
          {exchange.pros.slice(0, 3).map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-crypto-green/10 text-crypto-green flex items-center justify-center text-xs">
                ✓
              </span>
              {pro}
            </li>
          ))}
        </ul>

        {/* Affiliate Bonus */}
        {exchange.affiliate.bonus && (
          <div className="mt-4 rounded-lg bg-gold/10 border border-gold/20 p-3 text-center">
            <p className="text-sm font-semibold text-gold-dark dark:text-gold-light">
              {exchange.affiliate.bonus}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={exchange.affiliate.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(
            "mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3",
            "bg-primary text-primary-foreground font-bold text-sm",
            "hover:opacity-90 transition-opacity",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
        >
          無料で口座開設する
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          ※ 公式サイトに遷移します
        </p>
      </div>
    </div>
  );
}
