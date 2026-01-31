// =============================================================================
// ExchangeCard - Professional Japanese crypto affiliate exchange card
// Design modeled after top Japanese financial comparison sites
// =============================================================================

import { cn } from "@/lib/utils";
import type { Exchange } from "@/lib/data/exchanges";
import { ExchangeLogo } from "@/components/crypto/ExchangeLogo";

// =============================================================================
// Sub-components
// =============================================================================

/**
 * Rank badge displayed at the top of the card.
 * Gold for 1st, silver for 2nd, bronze for 3rd, gray for the rest.
 */
function RankBadge({ rank }: { rank: number }) {
  const styles =
    rank === 1
      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-sm shadow-amber-200"
      : rank === 2
        ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-sm shadow-gray-200"
        : rank === 3
          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm shadow-amber-100"
          : "bg-gray-100 text-gray-500 border border-gray-200";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold",
        styles
      )}
    >
      {rank <= 3 && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8 1l2.5 5 5.5.8-4 3.9.9 5.3L8 13.3 3.1 16l.9-5.3-4-3.9L5.5 6z"
            fill="currentColor"
          />
        </svg>
      )}
      <span>
        第{rank}位
      </span>
    </div>
  );
}

/**
 * Star rating display with gold stars and numeric rating.
 * Supports full stars, half stars, and empty stars.
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5" aria-label={`${rating}点 / 5点`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {half ? (
                <>
                  {/* Half star: left half filled, right half empty */}
                  <defs>
                    <clipPath id={`half-star-${i}`}>
                      <rect x="0" y="0" width="10" height="20" />
                    </clipPath>
                  </defs>
                  <path
                    d="M10 1.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.4l-5.6 3.3 1.1-6.2L1 8.1l6.2-.9z"
                    fill="#D1D5DB"
                  />
                  <path
                    d="M10 1.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.4l-5.6 3.3 1.1-6.2L1 8.1l6.2-.9z"
                    fill="#FBBF24"
                    clipPath={`url(#half-star-${i})`}
                  />
                </>
              ) : (
                <path
                  d="M10 1.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L10 15.4l-5.6 3.3 1.1-6.2L1 8.1l6.2-.9z"
                  fill={filled ? "#FBBF24" : "#D1D5DB"}
                />
              )}
            </svg>
          );
        })}
      </div>
      <span className="ml-1 text-base font-bold text-gray-800">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/**
 * A single key metric box shown in the 3-column grid.
 */
function MetricBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-gray-50 px-3 py-3 text-center">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="mt-1 text-sm font-bold text-gray-900 leading-tight">
        {value}
      </span>
    </div>
  );
}

/**
 * Campaign banner shown above the CTA if there's an active promotion.
 */
function CampaignBanner({ description }: { description: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="10" fill="#F59E0B" />
        <text
          x="10"
          y="11"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          !
        </text>
      </svg>
      <p className="text-sm font-semibold text-orange-800">
        {description}
      </p>
    </div>
  );
}

// =============================================================================
// Main ExchangeCard component
// =============================================================================

interface ExchangeCardProps {
  exchange: Exchange;
  rank?: number;
}

/**
 * ExchangeCard renders a professional exchange comparison card styled after
 * top Japanese financial affiliate / comparison sites. It includes:
 *
 * - Rank badge (gold/silver/bronze)
 * - Exchange SVG logo and name
 * - Star rating
 * - Key metrics in a 3-column grid (currencies, trading fee, min amount)
 * - Highlighted pros with green checkmarks
 * - Campaign banner (if active)
 * - Large green CTA button for account opening
 */
export function ExchangeCard({ exchange, rank }: ExchangeCardProps) {
  // Derive a short minimum trading amount from fees for display
  const minAmount =
    exchange.type === "domestic" ? "500円〜" : "$1〜";

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
      {/* ================================================================= */}
      {/* Top section: Rank badge */}
      {/* ================================================================= */}
      {rank !== undefined && (
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/60 px-5 py-3">
          <RankBadge rank={rank} />
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              exchange.type === "domestic"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            )}
          >
            {exchange.type === "domestic" ? "国内取引所" : "海外取引所"}
          </span>
        </div>
      )}

      {/* ================================================================= */}
      {/* Card body */}
      {/* ================================================================= */}
      <div className="px-5 py-5 sm:px-6">
        {/* --------------------------------------------------------------- */}
        {/* Exchange identity: Logo + Name + Rating                         */}
        {/* --------------------------------------------------------------- */}
        <div className="flex items-center gap-4">
          {/* SVG Logo */}
          <div className="shrink-0">
            <ExchangeLogo exchange={exchange.id} size={64} />
          </div>

          {/* Name block */}
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {exchange.nameJa}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">
              {exchange.name}
            </p>
            <div className="mt-1.5">
              <StarRating rating={exchange.rating} />
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* One-line description                                            */}
        {/* --------------------------------------------------------------- */}
        <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
          {exchange.description}
        </p>

        {/* --------------------------------------------------------------- */}
        {/* Key metrics: 3-column grid                                      */}
        {/* --------------------------------------------------------------- */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <MetricBox
            label="取扱通貨"
            value={`${exchange.features.currencies}種類`}
          />
          <MetricBox
            label="取引手数料"
            value={exchange.fees.trading.length > 12
              ? exchange.fees.trading.split("（")[0].split("Maker")[0].trim() || exchange.fees.trading.substring(0, 12)
              : exchange.fees.trading
            }
          />
          <MetricBox
            label="最低取引額"
            value={minAmount}
          />
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Recommended points (pros)                                       */}
        {/* --------------------------------------------------------------- */}
        <div className="mt-5">
          <h4 className="mb-2.5 text-sm font-bold text-gray-800">
            おすすめポイント
          </h4>
          <ul className="space-y-2">
            {exchange.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 6l2.5 2.5 4.5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="leading-snug">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Campaign banner                                                 */}
        {/* --------------------------------------------------------------- */}
        {exchange.campaign.active && exchange.campaign.description && (
          <div className="mt-5">
            <CampaignBanner description={exchange.campaign.description} />
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* Affiliate bonus callout                                         */}
        {/* --------------------------------------------------------------- */}
        {exchange.affiliate.bonus && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-center">
            <p className="text-sm font-bold text-amber-800">
              {exchange.affiliate.bonus}
            </p>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* CTA Button                                                      */}
        {/* --------------------------------------------------------------- */}
        <a
          href={exchange.affiliate.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(
            "mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4",
            "bg-gradient-to-r from-green-500 to-green-600 text-white",
            "text-base font-bold shadow-sm shadow-green-200",
            "hover:from-green-600 hover:to-green-700 hover:shadow-md hover:shadow-green-200",
            "active:from-green-700 active:to-green-800",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          )}
        >
          <span className="flex items-center gap-2">
            {/* Green circle icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="8" fill="#FFFFFF" opacity="0.25" />
              <circle cx="10" cy="10" r="4" fill="#FFFFFF" opacity="0.5" />
            </svg>
            無料口座開設はこちら
            {/* Arrow icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>

        {/* Sub-CTA note */}
        <p className="mt-2.5 text-center text-xs text-gray-400">
          ※ 公式サイトに遷移します（無料）
        </p>
      </div>
    </div>
  );
}
