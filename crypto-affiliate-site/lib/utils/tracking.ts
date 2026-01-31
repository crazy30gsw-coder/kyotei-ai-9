/**
 * Affiliate click tracking utilities.
 *
 * Provides GA4 event tracking for affiliate link clicks, UTM parameter
 * building, and session-based click attribution for a Japanese crypto
 * affiliate site.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Parameters attached to every affiliate click event. */
export interface AffiliateClickParams {
  /** Exchange or service identifier, e.g. "bitflyer", "coincheck" */
  exchangeId: string;
  /** Human-readable exchange name, e.g. "ビットフライヤー" */
  exchangeName: string;
  /** Where the link was placed: "comparison_table", "review_cta", "sidebar", etc. */
  placement: string;
  /** The page path where the click occurred */
  pagePath?: string;
  /** Campaign identifier if applicable */
  campaignId?: string;
  /** Position in a list (e.g. rank in comparison table) */
  position?: number;
  /** Creative variant for A/B tests */
  variant?: string;
}

/** UTM parameters for building affiliate URLs. */
export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
}

/** Shape of the GA4 window.gtag function. */
type GtagFunction = (
  command: "event" | "config" | "set",
  targetOrName: string,
  params?: Record<string, unknown>
) => void;

/** Extend Window to include gtag. */
declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: Record<string, unknown>[];
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default UTM source for all affiliate links originating from this site. */
const DEFAULT_UTM_SOURCE = "crypto-navi";

/** Default UTM medium for affiliate links. */
const DEFAULT_UTM_MEDIUM = "affiliate";

/** LocalStorage key for tracking the last 50 clicks (for attribution). */
const CLICK_HISTORY_KEY = "cn_click_history";

/** Maximum number of click events stored in local storage. */
const MAX_STORED_CLICKS = 50;

// ---------------------------------------------------------------------------
// GA4 Event Tracking
// ---------------------------------------------------------------------------

/**
 * Checks whether GA4 (gtag) is available on the page.
 */
function isGtagAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

/**
 * Sends a GA4 event. Falls back to dataLayer.push when gtag is not yet
 * initialised (e.g. consent not yet given).
 */
function sendGA4Event(
  eventName: string,
  params: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  if (isGtagAvailable()) {
    window.gtag!("event", eventName, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

/**
 * Tracks an affiliate link click as a GA4 custom event.
 *
 * Event name: `affiliate_click`
 *
 * @example
 * ```ts
 * trackAffiliateClick({
 *   exchangeId: "bitflyer",
 *   exchangeName: "ビットフライヤー",
 *   placement: "comparison_table",
 *   position: 1,
 * });
 * ```
 */
export function trackAffiliateClick(params: AffiliateClickParams): void {
  const eventParams: Record<string, unknown> = {
    exchange_id: params.exchangeId,
    exchange_name: params.exchangeName,
    link_placement: params.placement,
    page_path: params.pagePath ?? (typeof window !== "undefined" ? window.location.pathname : ""),
    campaign_id: params.campaignId ?? "",
    link_position: params.position ?? 0,
    variant: params.variant ?? "",
    click_timestamp: new Date().toISOString(),
  };

  sendGA4Event("affiliate_click", eventParams);

  // Persist to local history for attribution
  persistClick(params);
}

/**
 * Tracks when an affiliate CTA becomes visible in the viewport.
 * Useful for measuring impression-to-click ratio.
 */
export function trackAffiliateImpression(params: {
  exchangeId: string;
  exchangeName: string;
  placement: string;
  position?: number;
}): void {
  sendGA4Event("affiliate_impression", {
    exchange_id: params.exchangeId,
    exchange_name: params.exchangeName,
    link_placement: params.placement,
    link_position: params.position ?? 0,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Tracks outbound link navigation (non-affiliate external links).
 */
export function trackOutboundClick(url: string, label?: string): void {
  sendGA4Event("outbound_click", {
    link_url: url,
    link_label: label ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

// ---------------------------------------------------------------------------
// UTM Parameter Builder
// ---------------------------------------------------------------------------

/**
 * Builds a complete affiliate URL with UTM parameters appended.
 *
 * @param baseUrl - The raw affiliate / destination URL
 * @param campaign - Campaign name (e.g. "exchange_comparison_2024")
 * @param content - Optional content identifier (e.g. "top_cta", "table_row_1")
 * @param overrides - Optional full UTM override
 * @returns The URL string with UTM query parameters
 *
 * @example
 * ```ts
 * buildAffiliateUrl(
 *   "https://bitflyer.com/ja-jp/",
 *   "exchange_hikaku",
 *   "sidebar_banner"
 * );
 * // => "https://bitflyer.com/ja-jp/?utm_source=crypto-navi&utm_medium=affiliate&utm_campaign=exchange_hikaku&utm_content=sidebar_banner"
 * ```
 */
export function buildAffiliateUrl(
  baseUrl: string,
  campaign: string,
  content?: string,
  overrides?: Partial<UTMParams>
): string {
  const utm: UTMParams = {
    utm_source: overrides?.utm_source ?? DEFAULT_UTM_SOURCE,
    utm_medium: overrides?.utm_medium ?? DEFAULT_UTM_MEDIUM,
    utm_campaign: campaign,
    ...(content ? { utm_content: content } : {}),
    ...(overrides?.utm_term ? { utm_term: overrides.utm_term } : {}),
  };

  try {
    const url = new URL(baseUrl);

    // Append UTM params without overwriting existing params
    (Object.entries(utm) as [string, string][]).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  } catch {
    // If URL parsing fails, fall back to naive string concatenation
    const separator = baseUrl.includes("?") ? "&" : "?";
    const query = Object.entries(utm)
      .filter(([, v]) => v)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
      .join("&");
    return `${baseUrl}${separator}${query}`;
  }
}

/**
 * Extracts UTM parameters from the current page URL.
 * Useful for attributing conversions back to inbound campaigns.
 */
export function getInboundUTMParams(): Partial<UTMParams> | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const keys: (keyof UTMParams)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];

  const result: Partial<UTMParams> = {};
  let hasAny = false;

  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      result[key] = value;
      hasAny = true;
    }
  }

  return hasAny ? result : null;
}

// ---------------------------------------------------------------------------
// Click Persistence (Local Storage)
// ---------------------------------------------------------------------------

interface StoredClick {
  exchangeId: string;
  placement: string;
  pagePath: string;
  timestamp: string;
  campaignId?: string;
}

/**
 * Saves an affiliate click to localStorage for later attribution analysis.
 * Keeps the most recent MAX_STORED_CLICKS entries.
 */
function persistClick(params: AffiliateClickParams): void {
  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    const raw = localStorage.getItem(CLICK_HISTORY_KEY);
    const history: StoredClick[] = raw ? JSON.parse(raw) : [];

    history.push({
      exchangeId: params.exchangeId,
      placement: params.placement,
      pagePath: params.pagePath ?? window.location.pathname,
      timestamp: new Date().toISOString(),
      campaignId: params.campaignId,
    });

    // Trim to the most recent entries
    const trimmed = history.slice(-MAX_STORED_CLICKS);
    localStorage.setItem(CLICK_HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

/**
 * Retrieves the stored click history from localStorage.
 * Returns an empty array if nothing is stored or storage is unavailable.
 */
export function getClickHistory(): StoredClick[] {
  if (typeof window === "undefined" || !window.localStorage) return [];

  try {
    const raw = localStorage.getItem(CLICK_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clears all stored click history from localStorage.
 */
export function clearClickHistory(): void {
  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    localStorage.removeItem(CLICK_HISTORY_KEY);
  } catch {
    // Silently fail
  }
}

// ---------------------------------------------------------------------------
// Affiliate Link onClick Handler Factory
// ---------------------------------------------------------------------------

/**
 * Creates an onClick handler for affiliate links that handles tracking,
 * URL building, and navigation in one composable function.
 *
 * @example
 * ```tsx
 * <a
 *   href={affiliateUrl}
 *   onClick={createAffiliateClickHandler({
 *     exchangeId: "coincheck",
 *     exchangeName: "コインチェック",
 *     placement: "review_cta",
 *     url: "https://coincheck.com/ja/",
 *     campaign: "exchange_review_coincheck",
 *   })}
 *   target="_blank"
 *   rel="noopener noreferrer sponsored"
 * >
 *   口座開設はこちら
 * </a>
 * ```
 */
export function createAffiliateClickHandler(options: {
  exchangeId: string;
  exchangeName: string;
  placement: string;
  url: string;
  campaign: string;
  content?: string;
  position?: number;
  variant?: string;
  /** If true, prevents default and opens programmatically (default: false) */
  programmaticOpen?: boolean;
}): (event: React.MouseEvent | MouseEvent) => void {
  return (event) => {
    // Track the click
    trackAffiliateClick({
      exchangeId: options.exchangeId,
      exchangeName: options.exchangeName,
      placement: options.placement,
      position: options.position,
      variant: options.variant,
      campaignId: options.campaign,
    });

    // If programmatic open is requested, handle navigation ourselves
    if (options.programmaticOpen) {
      event.preventDefault();
      const finalUrl = buildAffiliateUrl(
        options.url,
        options.campaign,
        options.content
      );
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    }
  };
}
