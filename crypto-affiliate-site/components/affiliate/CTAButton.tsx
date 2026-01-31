"use client";

import { useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAffiliateUrl } from "@/lib/data/affiliates";

interface CTAButtonProps {
  exchangeId: string;
  exchangeName: string;
  variant?: "primary" | "secondary" | "banner";
  position?: string;
  bonus?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CTAButton({
  exchangeId,
  exchangeName,
  variant = "primary",
  position = "unknown",
  bonus,
  className,
  children,
}: CTAButtonProps) {
  const handleClick = useCallback(() => {
    // Track affiliate click event
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        exchange_id: exchangeId,
        exchange_name: exchangeName,
        position,
        variant,
      });
    }

    // Also send a custom event for any analytics listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("affiliate_click", {
          detail: {
            exchangeId,
            exchangeName,
            position,
            variant,
            timestamp: Date.now(),
          },
        })
      );
    }

    // Navigate to affiliate URL
    const url = getAffiliateUrl(exchangeId);
    window.open(url, "_blank", "noopener,noreferrer");
  }, [exchangeId, exchangeName, position, variant]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200",
        // Primary: gold/amber gradient
        variant === "primary" &&
          "bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-3 text-sm text-slate-900 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:brightness-110 active:brightness-95",
        // Secondary: outline style
        variant === "secondary" &&
          "border border-gold/50 bg-transparent px-5 py-2.5 text-sm text-gold hover:border-gold hover:bg-gold/10 active:bg-gold/20",
        // Banner: large, prominent
        variant === "banner" &&
          "bg-gradient-to-r from-gold-dark via-gold to-gold-light px-8 py-4 text-base text-slate-900 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 hover:brightness-110 active:brightness-95",
        className
      )}
    >
      <span className="flex flex-col items-center gap-0.5">
        <span>{children ?? "無料口座開設はこちら"}</span>
        {bonus && (
          <span
            className={cn(
              "text-xs font-semibold",
              variant === "secondary"
                ? "text-gold-light"
                : "text-slate-700"
            )}
          >
            {bonus}
          </span>
        )}
      </span>
      <ExternalLink
        className={cn(
          "h-4 w-4 transition-transform group-hover:translate-x-0.5",
          variant === "secondary" ? "text-gold" : "text-slate-700"
        )}
      />
    </button>
  );
}

