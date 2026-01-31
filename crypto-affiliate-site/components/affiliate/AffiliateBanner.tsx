"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import CTAButton from "@/components/affiliate/CTAButton";

interface AffiliateBannerProps {
  exchangeId: string;
  exchangeName: string;
  bonus: string;
  description: string;
}

const STORAGE_KEY_PREFIX = "affiliate_banner_dismissed_";

export default function AffiliateBanner({
  exchangeId,
  exchangeName,
  bonus,
  description,
}: AffiliateBannerProps) {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash

  const storageKey = `${STORAGE_KEY_PREFIX}${exchangeId}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Re-show after 7 days
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.timestamp > sevenDays) {
          localStorage.removeItem(storageKey);
          setDismissed(false);
        } else {
          setDismissed(true);
        }
      } else {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ timestamp: Date.now() })
      );
    } catch {
      // Storage unavailable; banner will re-appear next visit
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl">
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />

      {/* Dismiss button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
        aria-label="バナーを閉じる"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 px-6 py-6 text-center sm:flex-row sm:text-left">
        {/* Icon */}
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold-dark/20 ring-1 ring-gold/30">
          <Sparkles className="h-7 w-7 text-gold" />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h3 className="text-lg font-bold text-white">{exchangeName}</h3>
            <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
              {bonus}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <CTAButton
            exchangeId={exchangeId}
            exchangeName={exchangeName}
            variant="banner"
            position="top-banner"
          />
        </div>
      </div>
    </div>
  );
}
