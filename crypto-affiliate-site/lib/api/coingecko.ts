// =============================================================================
// CoinGecko API Client - 暗号資産価格データ取得
// =============================================================================

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * CoinGecko APIのリクエスト間隔制御（Free tier: 10-30 calls/min）
 */
const RATE_LIMIT_MS = 2500;
let lastRequestTime = 0;

// =============================================================================
// Types
// =============================================================================

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface MarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
    ja?: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    subreddit_url: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

export interface CoinGeckoError {
  status: {
    error_code: number;
    error_message: string;
  };
}

// =============================================================================
// Rate Limiting
// =============================================================================

/**
 * レートリミット制御 - 連続リクエストを防ぐ
 */
async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

// =============================================================================
// Base Fetch Function
// =============================================================================

/**
 * CoinGecko APIへのリクエストを実行する
 *
 * - レートリミット制御
 * - エラーハンドリング
 * - Next.js ISR用のキャッシュヘッダー設定
 */
async function fetchFromCoinGecko<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  options?: {
    /** Next.js revalidate time in seconds (default: 300 = 5min) */
    revalidate?: number;
    /** Cache tags for on-demand revalidation */
    tags?: string[];
  }
): Promise<T> {
  await waitForRateLimit();

  const url = new URL(`${COINGECKO_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const fetchOptions: RequestInit = {
    headers: {
      Accept: 'application/json',
    },
    next: {
      revalidate: options?.revalidate ?? 300,
      tags: options?.tags,
    },
  } as RequestInit;

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    if (response.status === 429) {
      throw new CoinGeckoRateLimitError(
        'CoinGecko API rate limit exceeded. Please try again later.'
      );
    }

    let errorMessage = `CoinGecko API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = (await response.json()) as CoinGeckoError;
      if (errorData.status?.error_message) {
        errorMessage = `CoinGecko API error: ${errorData.status.error_message}`;
      }
    } catch {
      // JSONパース失敗時はデフォルトのエラーメッセージを使用
    }

    throw new CoinGeckoAPIError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}

// =============================================================================
// Custom Error Classes
// =============================================================================

export class CoinGeckoAPIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'CoinGeckoAPIError';
    this.statusCode = statusCode;
  }
}

export class CoinGeckoRateLimitError extends CoinGeckoAPIError {
  constructor(message: string) {
    super(message, 429);
    this.name = 'CoinGeckoRateLimitError';
  }
}

// =============================================================================
// API Functions
// =============================================================================

/**
 * 時価総額上位のコインを取得する
 *
 * @param limit - 取得件数（デフォルト: 50, 最大: 250）
 * @param currency - 通貨単位（デフォルト: 'jpy'）
 * @returns CoinData配列
 *
 * @example
 * ```ts
 * const topCoins = await fetchTopCoins(20);
 * console.log(topCoins[0].name); // "Bitcoin"
 * console.log(topCoins[0].current_price); // 15234567 (JPY)
 * ```
 */
export async function fetchTopCoins(
  limit: number = 50,
  currency: string = 'jpy'
): Promise<CoinData[]> {
  return fetchFromCoinGecko<CoinData[]>(
    '/coins/markets',
    {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: Math.min(limit, 250),
      page: 1,
      sparkline: true,
      price_change_percentage: '7d,30d',
      locale: 'ja',
    },
    {
      revalidate: 300,
      tags: ['top-coins', `top-coins-${currency}`],
    }
  );
}

/**
 * 単一コインの現在価格を取得する
 *
 * @param id - CoinGeckoのコインID（例: 'bitcoin', 'ethereum'）
 * @param currencies - 取得する通貨（デフォルト: ['jpy', 'usd']）
 * @returns 通貨ごとの価格と変動率
 *
 * @example
 * ```ts
 * const price = await fetchCoinPrice('bitcoin');
 * console.log(price.bitcoin.jpy); // 15234567
 * console.log(price.bitcoin.jpy_24h_change); // -2.34
 * ```
 */
export async function fetchCoinPrice(
  id: string,
  currencies: string[] = ['jpy', 'usd']
): Promise<
  Record<
    string,
    Record<string, number> & {
      last_updated_at: number;
    }
  >
> {
  return fetchFromCoinGecko(
    '/simple/price',
    {
      ids: id,
      vs_currencies: currencies.join(','),
      include_24hr_change: true,
      include_last_updated_at: true,
      include_24hr_vol: true,
      include_market_cap: true,
    },
    {
      revalidate: 60,
      tags: ['coin-price', `coin-price-${id}`],
    }
  );
}

/**
 * コインの価格履歴データを取得する
 *
 * @param id - CoinGeckoのコインID
 * @param days - 取得する日数（1, 7, 14, 30, 90, 180, 365, 'max'）
 * @param currency - 通貨単位（デフォルト: 'jpy'）
 * @returns MarketChart（prices, market_caps, total_volumes）
 *
 * @example
 * ```ts
 * const chart = await fetchMarketChart('bitcoin', 30);
 * // chart.prices = [[timestamp, price], ...]
 * ```
 */
export async function fetchMarketChart(
  id: string,
  days: number | 'max' = 30,
  currency: string = 'jpy'
): Promise<MarketChart> {
  // キャッシュ時間を日数に応じて調整
  let revalidate = 300; // 5分
  if (days === 1) {
    revalidate = 60; // 1分
  } else if (typeof days === 'number' && days >= 90) {
    revalidate = 3600; // 1時間
  }

  return fetchFromCoinGecko<MarketChart>(
    `/coins/${encodeURIComponent(id)}/market_chart`,
    {
      vs_currency: currency,
      days: String(days),
    },
    {
      revalidate,
      tags: ['market-chart', `market-chart-${id}-${days}`],
    }
  );
}

/**
 * コインの詳細情報を取得する
 *
 * @param id - CoinGeckoのコインID
 * @returns CoinDetail
 */
export async function fetchCoinDetail(id: string): Promise<CoinDetail> {
  return fetchFromCoinGecko<CoinDetail>(
    `/coins/${encodeURIComponent(id)}`,
    {
      localization: true,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
    {
      revalidate: 600,
      tags: ['coin-detail', `coin-detail-${id}`],
    }
  );
}

/**
 * トレンドコインを取得する（検索ランキング上位）
 *
 * @returns TrendingCoin配列
 */
export async function fetchTrendingCoins(): Promise<TrendingCoin[]> {
  const data = await fetchFromCoinGecko<{ coins: TrendingCoin[] }>(
    '/search/trending',
    {},
    {
      revalidate: 600,
      tags: ['trending-coins'],
    }
  );
  return data.coins;
}

/**
 * 複数コインの価格を一括取得する
 *
 * @param ids - CoinGeckoのコインID配列
 * @param currency - 通貨単位（デフォルト: 'jpy'）
 * @returns コインIDをキーとした価格データ
 *
 * @example
 * ```ts
 * const prices = await fetchMultiplePrices(['bitcoin', 'ethereum', 'ripple']);
 * console.log(prices.bitcoin.jpy); // 15234567
 * ```
 */
export async function fetchMultiplePrices(
  ids: string[],
  currency: string = 'jpy'
): Promise<Record<string, Record<string, number>>> {
  return fetchFromCoinGecko(
    '/simple/price',
    {
      ids: ids.join(','),
      vs_currencies: currency,
      include_24hr_change: true,
      include_24hr_vol: true,
      include_market_cap: true,
    },
    {
      revalidate: 120,
      tags: ['multi-price'],
    }
  );
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * 日本円フォーマット用ヘルパー
 */
export function formatJPY(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * USDフォーマット用ヘルパー
 */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * パーセンテージフォーマット用ヘルパー
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * 大きな数値の短縮表示（例: 1.5兆, 234億）
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)}兆`;
  }
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(0)}億`;
  }
  if (value >= 10_000) {
    return `${(value / 10_000).toFixed(0)}万`;
  }
  return value.toLocaleString('ja-JP');
}
