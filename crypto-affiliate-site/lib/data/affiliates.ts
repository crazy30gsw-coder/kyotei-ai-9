// =============================================================================
// Affiliate Link Management - アフィリエイトリンク管理システム
// =============================================================================

/**
 * サポートするASP（アフィリエイト・サービス・プロバイダ）
 */
export type ASPProvider = 'A8.net' | 'AccessTrade' | 'TCS' | 'Direct';

/**
 * アフィリエイト設定インターフェース
 */
export interface AffiliateConfig {
  /** 取引所のID */
  exchangeId: string;
  /** ASPプロバイダ */
  asp: ASPProvider;
  /** ベースアフィリエイトURL */
  baseUrl: string;
  /** ASP側のプログラムID */
  programId: string;
  /** メディアID（サイト識別子） */
  mediaId: string;
  /** 成果条件 */
  conversionType: 'registration' | 'deposit' | 'trade';
  /** 成果報酬額（円） */
  rewardAmount: number;
  /** アフィリエイトリンクの有効状態 */
  active: boolean;
  /** リンクの有効期限 */
  expiresAt?: string;
}

/**
 * UTMパラメータ
 */
export interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

/**
 * クリックイベントデータ
 */
export interface ClickEventData {
  exchangeId: string;
  asp: ASPProvider;
  url: string;
  page: string;
  position: string;
  timestamp: string;
  sessionId?: string;
  userId?: string;
}

// =============================================================================
// Affiliate Configurations
// =============================================================================

const affiliateConfigs: AffiliateConfig[] = [
  // 国内取引所
  {
    exchangeId: 'bitflyer',
    asp: 'A8.net',
    baseUrl: 'https://bitflyer.com/ja-jp/',
    programId: 's00000025170001',
    mediaId: 'a24100100000',
    conversionType: 'registration',
    rewardAmount: 5000,
    active: true,
  },
  {
    exchangeId: 'coincheck',
    asp: 'AccessTrade',
    baseUrl: 'https://coincheck.com/ja/',
    programId: '1234567',
    mediaId: 'crypto-affiliate-001',
    conversionType: 'registration',
    rewardAmount: 3000,
    active: true,
  },
  {
    exchangeId: 'gmo-coin',
    asp: 'A8.net',
    baseUrl: 'https://coin.z.com/jp/',
    programId: 's00000020625001',
    mediaId: 'a24100100000',
    conversionType: 'trade',
    rewardAmount: 7000,
    active: true,
  },
  {
    exchangeId: 'dmm-bitcoin',
    asp: 'TCS',
    baseUrl: 'https://bitcoin.dmm.com/',
    programId: 'dmm_btc_001',
    mediaId: 'tcs-media-001',
    conversionType: 'registration',
    rewardAmount: 4000,
    active: true,
  },
  {
    exchangeId: 'bitbank',
    asp: 'AccessTrade',
    baseUrl: 'https://bitbank.cc/',
    programId: '2345678',
    mediaId: 'crypto-affiliate-001',
    conversionType: 'registration',
    rewardAmount: 3500,
    active: true,
  },
  {
    exchangeId: 'bitpoint',
    asp: 'TCS',
    baseUrl: 'https://www.bitpoint.co.jp/',
    programId: 'bitpoint_001',
    mediaId: 'tcs-media-001',
    conversionType: 'registration',
    rewardAmount: 2500,
    active: true,
  },
  // 海外取引所
  {
    exchangeId: 'binance',
    asp: 'Direct',
    baseUrl: 'https://www.binance.com/ja',
    programId: 'ref_binance',
    mediaId: 'direct',
    conversionType: 'trade',
    rewardAmount: 0,
    active: true,
  },
  {
    exchangeId: 'bybit',
    asp: 'Direct',
    baseUrl: 'https://www.bybit.com/ja-JP/',
    programId: 'ref_bybit',
    mediaId: 'direct',
    conversionType: 'trade',
    rewardAmount: 0,
    active: true,
  },
  {
    exchangeId: 'okx',
    asp: 'Direct',
    baseUrl: 'https://www.okx.com/ja',
    programId: 'ref_okx',
    mediaId: 'direct',
    conversionType: 'trade',
    rewardAmount: 0,
    active: true,
  },
  {
    exchangeId: 'gate-io',
    asp: 'Direct',
    baseUrl: 'https://www.gate.io/ja',
    programId: 'ref_gateio',
    mediaId: 'direct',
    conversionType: 'trade',
    rewardAmount: 0,
    active: true,
  },
  {
    exchangeId: 'mexc',
    asp: 'Direct',
    baseUrl: 'https://www.mexc.com/ja-JP',
    programId: 'ref_mexc',
    mediaId: 'direct',
    conversionType: 'trade',
    rewardAmount: 0,
    active: true,
  },
];

// =============================================================================
// Core Functions
// =============================================================================

/**
 * 取引所IDからアフィリエイト設定を取得する
 */
export function getAffiliateConfig(
  exchangeId: string
): AffiliateConfig | undefined {
  return affiliateConfigs.find(
    (config) => config.exchangeId === exchangeId && config.active
  );
}

/**
 * ASPプロバイダごとのアフィリエイト設定一覧を取得する
 */
export function getConfigsByASP(asp: ASPProvider): AffiliateConfig[] {
  return affiliateConfigs.filter(
    (config) => config.asp === asp && config.active
  );
}

/**
 * 全アクティブなアフィリエイト設定を取得する
 */
export function getAllActiveConfigs(): AffiliateConfig[] {
  return affiliateConfigs.filter((config) => config.active);
}

// =============================================================================
// URL Building
// =============================================================================

/**
 * デフォルトのUTMパラメータ
 */
const DEFAULT_UTM: UTMParams = {
  source: 'crypto-affiliate',
  medium: 'website',
  campaign: 'exchange-comparison',
};

/**
 * UTMパラメータ付きアフィリエイトURLを生成する
 */
export function getAffiliateUrl(
  exchangeId: string,
  options?: {
    utm?: Partial<UTMParams>;
    page?: string;
    position?: string;
  }
): string {
  const config = getAffiliateConfig(exchangeId);
  if (!config) {
    console.warn(`Affiliate config not found for exchange: ${exchangeId}`);
    return '#';
  }

  const url = new URL(config.baseUrl);

  // UTMパラメータの付与
  const utm: UTMParams = {
    ...DEFAULT_UTM,
    ...options?.utm,
  };

  url.searchParams.set('utm_source', utm.source);
  url.searchParams.set('utm_medium', utm.medium);
  url.searchParams.set('utm_campaign', utm.campaign);

  if (utm.content) {
    url.searchParams.set('utm_content', utm.content);
  }
  if (utm.term) {
    url.searchParams.set('utm_term', utm.term);
  }

  // 追加のトラッキングパラメータ
  if (options?.page) {
    url.searchParams.set('ref_page', options.page);
  }
  if (options?.position) {
    url.searchParams.set('ref_pos', options.position);
  }

  return url.toString();
}

/**
 * ASP別のインプレッションタグURLを生成する（A8.net形式）
 */
export function getImpressionTag(exchangeId: string): string | null {
  const config = getAffiliateConfig(exchangeId);
  if (!config) return null;

  switch (config.asp) {
    case 'A8.net':
      return `https://www19.a8.net/0.gif?a8mat=${config.programId}+${config.mediaId}`;
    case 'AccessTrade':
      return `https://h.accesstrade.net/sp/cc?rk=${config.programId}`;
    case 'TCS':
      return `https://www.tcs-asp.net/alink?AC=${config.programId}&LC=${config.mediaId}`;
    case 'Direct':
      return null;
    default:
      return null;
  }
}

// =============================================================================
// Click Tracking
// =============================================================================

/**
 * アフィリエイトリンクのクリックイベントをトラッキングする
 *
 * Google Analytics 4 (GA4)のカスタムイベントとして送信し、
 * 内部APIにもログを送信する。
 */
export function trackAffiliateClick(data: ClickEventData): void {
  // GA4カスタムイベントの送信
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (
      command: string,
      action: string,
      params: Record<string, string>
    ) => void;

    gtag('event', 'affiliate_click', {
      exchange_id: data.exchangeId,
      asp_provider: data.asp,
      click_page: data.page,
      click_position: data.position,
      affiliate_url: data.url,
    });
  }

  // 内部トラッキングAPIへの送信（非同期・fire-and-forget）
  sendClickToAPI(data).catch((error) => {
    console.error('Failed to track affiliate click:', error);
  });
}

/**
 * 内部APIにクリックデータを送信する
 */
async function sendClickToAPI(data: ClickEventData): Promise<void> {
  try {
    const response = await fetch('/api/tracking/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exchange_id: data.exchangeId,
        asp: data.asp,
        url: data.url,
        page: data.page,
        position: data.position,
        timestamp: data.timestamp,
        session_id: data.sessionId,
        user_id: data.userId,
      }),
      // fire-and-forget: タイムアウトは短めに設定
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Tracking API responded with status ${response.status}`);
    }
  } catch (error) {
    // ネットワークエラーやタイムアウトの場合はfallbackでlocalStorageに保存
    if (typeof window !== 'undefined') {
      try {
        const pendingClicks = JSON.parse(
          localStorage.getItem('pending_affiliate_clicks') || '[]'
        ) as ClickEventData[];
        pendingClicks.push(data);
        // 最大100件まで保持
        const trimmed = pendingClicks.slice(-100);
        localStorage.setItem(
          'pending_affiliate_clicks',
          JSON.stringify(trimmed)
        );
      } catch {
        // localStorage unavailable - silently fail
      }
    }
    throw error;
  }
}

/**
 * localStorageに保存された未送信のクリックデータを再送する
 */
export async function flushPendingClicks(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const pendingClicks = JSON.parse(
      localStorage.getItem('pending_affiliate_clicks') || '[]'
    ) as ClickEventData[];

    if (pendingClicks.length === 0) return;

    const results = await Promise.allSettled(
      pendingClicks.map((click) => sendClickToAPI(click))
    );

    // 成功したクリックを除外して、失敗したものだけ残す
    const failedClicks = pendingClicks.filter(
      (_, index) => results[index].status === 'rejected'
    );

    if (failedClicks.length > 0) {
      localStorage.setItem(
        'pending_affiliate_clicks',
        JSON.stringify(failedClicks)
      );
    } else {
      localStorage.removeItem('pending_affiliate_clicks');
    }
  } catch {
    // localStorage unavailable - silently fail
  }
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * アフィリエイトリンクのクリックハンドラーを生成する
 *
 * React コンポーネントで使用するヘルパー:
 * ```tsx
 * <a
 *   href={getAffiliateUrl('bitflyer')}
 *   onClick={createClickHandler('bitflyer', 'comparison-page', 'top-table')}
 *   target="_blank"
 *   rel="noopener noreferrer sponsored"
 * >
 *   口座開設はこちら
 * </a>
 * ```
 */
export function createClickHandler(
  exchangeId: string,
  page: string,
  position: string
) {
  return () => {
    const config = getAffiliateConfig(exchangeId);
    if (!config) return;

    trackAffiliateClick({
      exchangeId,
      asp: config.asp,
      url: config.baseUrl,
      page,
      position,
      timestamp: new Date().toISOString(),
    });
  };
}

/**
 * 全アフィリエイト設定の報酬総額を計算する（月次目安）
 */
export function calculateTotalPotentialRevenue(): {
  asp: ASPProvider;
  totalReward: number;
  count: number;
}[] {
  const grouped = affiliateConfigs.reduce(
    (acc, config) => {
      if (!config.active) return acc;
      if (!acc[config.asp]) {
        acc[config.asp] = { totalReward: 0, count: 0 };
      }
      acc[config.asp].totalReward += config.rewardAmount;
      acc[config.asp].count += 1;
      return acc;
    },
    {} as Record<string, { totalReward: number; count: number }>
  );

  return Object.entries(grouped).map(([asp, data]) => ({
    asp: asp as ASPProvider,
    ...data,
  }));
}
