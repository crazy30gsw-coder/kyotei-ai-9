import { cn } from "@/lib/utils";
import {
  Star,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Shield,
  Banknote,
  Gift,
  Info,
} from "lucide-react";

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

interface ExchangeReviewProps {
  exchange: Exchange;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-6 w-6",
            i < Math.floor(rating)
              ? "fill-gold text-gold"
              : i < rating
                ? "fill-gold/50 text-gold"
                : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

function CTAButton({ exchange }: { exchange: Exchange }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {exchange.affiliate.bonus && (
        <span className="rounded-full bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-dark dark:text-gold-light">
          {exchange.affiliate.bonus}
        </span>
      )}
      <a
        href={exchange.affiliate.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5",
          "bg-primary text-primary-foreground font-bold text-base",
          "hover:opacity-90 transition-opacity shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "w-full sm:w-auto"
        )}
      >
        {exchange.nameJa}で無料口座開設する
        <ExternalLink className="h-4 w-4" />
      </a>
      <p className="text-xs text-muted-foreground">
        ※ 公式サイトに遷移します。最短5分で完了。
      </p>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
    </div>
  );
}

export function ExchangeReview({ exchange }: ExchangeReviewProps) {
  return (
    <div className="space-y-8">
      {/* ===== Overall Rating Section ===== */}
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <SectionHeading
          icon={<Star className="h-5 w-5" />}
          title="総合評価"
        />
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Score */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-gold bg-gold/5">
              <span className="text-3xl font-bold text-gold">
                {exchange.rating.toFixed(1)}
              </span>
            </div>
            <StarRating rating={exchange.rating} />
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 w-full space-y-3">
            {[
              {
                label: "手数料",
                value: exchange.fees.trading === "無料" ? 5 : 3.5,
              },
              {
                label: "取扱通貨数",
                value: Math.min(exchange.features.currencies / 40, 5),
              },
              {
                label: "セキュリティ",
                value: exchange.security.coldWallet / 20,
              },
              { label: "使いやすさ", value: exchange.rating },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-500"
                    style={{
                      width: `${Math.min((item.value / 5) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-semibold text-foreground">
                  {Math.min(item.value, 5).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top CTA */}
        <div className="mt-6 pt-6 border-t border-border">
          <CTAButton exchange={exchange} />
        </div>
      </section>

      {/* ===== Pros & Cons ===== */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Pros */}
        <section className="rounded-xl border border-crypto-green/20 bg-crypto-green/5 p-6">
          <SectionHeading
            icon={<CheckCircle2 className="h-5 w-5 text-crypto-green" />}
            title="メリット"
          />
          <ul className="space-y-3">
            {exchange.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crypto-green" />
                <span className="text-sm text-foreground leading-relaxed">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cons */}
        <section className="rounded-xl border border-crypto-red/20 bg-crypto-red/5 p-6">
          <SectionHeading
            icon={<XCircle className="h-5 w-5 text-crypto-red" />}
            title="デメリット"
          />
          <ul className="space-y-3">
            {exchange.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-crypto-red" />
                <span className="text-sm text-foreground leading-relaxed">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ===== Fee Details ===== */}
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <SectionHeading
          icon={<Banknote className="h-5 w-5" />}
          title="手数料詳細"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  項目
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  手数料
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  備考
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-medium text-foreground">
                  取引手数料
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {exchange.fees.trading}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {exchange.fees.trading === "無料"
                    ? "スプレッドが実質コスト"
                    : "Maker/Takerで異なる場合あり"}
                </td>
              </tr>
              <tr className="border-b border-border bg-muted/20">
                <td className="px-4 py-3 font-medium text-foreground">
                  入金手数料
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {exchange.fees.deposit}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  銀行振込の場合
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">
                  出金手数料
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {exchange.fees.withdrawal}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  日本円出金の場合
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Middle CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-6 sm:p-8">
        <CTAButton exchange={exchange} />
      </section>

      {/* ===== Security ===== */}
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <SectionHeading
          icon={<Shield className="h-5 w-5" />}
          title="セキュリティ"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Cold Wallet */}
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="text-3xl font-bold text-foreground mb-1">
              {exchange.security.coldWallet}%
            </div>
            <p className="text-sm text-muted-foreground">
              コールドウォレット保管
            </p>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-crypto-green"
                style={{ width: `${exchange.security.coldWallet}%` }}
              />
            </div>
          </div>

          {/* Insurance */}
          <div className="rounded-lg border border-border p-4 text-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full mx-auto mb-2",
                exchange.security.insurance
                  ? "bg-crypto-green/10"
                  : "bg-muted"
              )}
            >
              <Shield
                className={cn(
                  "h-5 w-5",
                  exchange.security.insurance
                    ? "text-crypto-green"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <p className="font-semibold text-foreground">
              {exchange.security.insurance ? "保険あり" : "保険なし"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              資産保護保険
            </p>
          </div>

          {/* 2FA */}
          <div className="rounded-lg border border-border p-4 text-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full mx-auto mb-2",
                exchange.security.twoFactor
                  ? "bg-crypto-green/10"
                  : "bg-muted"
              )}
            >
              <Info
                className={cn(
                  "h-5 w-5",
                  exchange.security.twoFactor
                    ? "text-crypto-green"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <p className="font-semibold text-foreground">
              {exchange.security.twoFactor ? "対応" : "非対応"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">二段階認証</p>
          </div>
        </div>
      </section>

      {/* ===== Campaign ===== */}
      {exchange.campaign.active && exchange.campaign.description && (
        <section className="rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-6 sm:p-8 shadow-sm">
          <SectionHeading
            icon={<Gift className="h-5 w-5 text-gold" />}
            title="キャンペーン情報"
          />
          <div className="rounded-lg bg-white/60 dark:bg-card/60 border border-gold/20 p-5">
            <p className="text-base font-semibold text-foreground leading-relaxed">
              {exchange.campaign.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              ※ キャンペーン内容は予告なく変更・終了する場合があります。最新情報は公式サイトをご確認ください。
            </p>
          </div>
        </section>
      )}

      {/* ===== Bottom CTA ===== */}
      <section className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            {exchange.nameJa}を始めてみませんか?
          </h3>
          <p className="text-sm text-muted-foreground">
            口座開設は無料で、最短5分で完了します。
          </p>
        </div>
        <CTAButton exchange={exchange} />
      </section>
    </div>
  );
}
