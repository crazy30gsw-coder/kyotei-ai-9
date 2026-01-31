"use client";

import { useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAffiliateUrl } from "@/lib/data/affiliates";

interface ComparisonCTAProps {
  exchangeId: string;
  exchangeName: string;
  bonus?: string;
}

export default function ComparisonCTA({
  exchangeId,
  exchangeName,
  bonus,
}: ComparisonCTAProps) {
  const handleClick = useCallback(() => {
    // Track affiliate click
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        exchange_id: exchangeId,
        exchange_name: exchangeName,
        position: "comparison-table",
        variant: "compact",
      });
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("affiliate_click", {
          detail: {
            exchangeId,
            exchangeName,
            position: "comparison-table",
            variant: "compact",
            timestamp: Date.now(),
          },
        })
      );
    }

    const url = getAffiliateUrl(exchangeId);
    window.open(url, "_blank", "noopener,noreferrer");
  }, [exchangeId, exchangeName]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all duration-150",
          "bg-gradient-to-r from-gold-dark to-gold text-slate-900",
          "shadow-sm shadow-gold/15 hover:shadow-md hover:shadow-gold/25 hover:brightness-110",
          "active:brightness-95"
        )}
      >
        {exchangeName}で口座開設
        <ExternalLink className="h-3 w-3" />
      </button>
      {bonus && (
        <span className="inline-block max-w-full truncate rounded bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">
          {bonus}
        </span>
      )}
    </div>
  );
}
