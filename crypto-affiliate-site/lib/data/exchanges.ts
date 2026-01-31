// =============================================================================
// Exchange Data - 暗号資産取引所データ
// =============================================================================

export interface Exchange {
  id: string;
  name: string;
  nameJa: string;
  logo: string;
  type: 'domestic' | 'international';
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
    deadline?: string;
  };
  affiliate: {
    url: string;
    asp: string;
    bonus?: string;
  };
  slug: string;
  description: string;
  foundedYear: number;
  headquarters: string;
}

export const exchanges: Exchange[] = [
  // =========================================================================
  // 国内取引所 (Domestic Exchanges)
  // =========================================================================
  {
    id: 'bitflyer',
    name: 'bitFlyer',
    nameJa: 'ビットフライヤー',
    logo: '/images/exchanges/bitflyer.png',
    type: 'domestic',
    rating: 4.5,
    fees: {
      trading: '約定数量 × 0.01〜0.15%',
      deposit: '無料（銀行振込）',
      withdrawal: '220〜770円',
    },
    features: {
      currencies: 22,
      leverage: 2,
      staking: false,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 80,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      'ビットコイン取引量国内No.1',
      '大手企業出資で信頼性が高い',
      '取引ツールが充実（bitFlyer Lightning）',
      'Tポイントをビットコインに交換可能',
    ],
    cons: [
      '取引手数料がやや高め',
      'アルトコインの種類が少なめ',
      '出金手数料が発生する',
    ],
    campaign: {
      active: true,
      description: '新規口座開設で2,500円相当のビットコインプレゼント',
      deadline: '2026-03-31',
    },
    affiliate: {
      url: 'https://bitflyer.com/ja-jp/',
      asp: 'A8.net',
      bonus: '口座開設完了で5,000円',
    },
    slug: 'bitflyer',
    description:
      'bitFlyerは2014年設立の日本最大級の暗号資産取引所です。ビットコインの取引量は国内No.1を誇り、強固なセキュリティと使いやすいインターフェースが特徴です。初心者から上級者まで幅広いユーザーに支持されています。',
    foundedYear: 2014,
    headquarters: '東京都港区',
  },
  {
    id: 'coincheck',
    name: 'Coincheck',
    nameJa: 'コインチェック',
    logo: '/images/exchanges/coincheck.png',
    type: 'domestic',
    rating: 4.3,
    fees: {
      trading: '無料（販売所はスプレッドあり）',
      deposit: '無料（銀行振込）',
      withdrawal: '407円',
    },
    features: {
      currencies: 29,
      leverage: 0,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 95,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '取扱通貨数が国内最多クラス',
      'アプリが非常に使いやすい（国内DL数No.1）',
      '500円から購入可能で初心者に最適',
      'NFTマーケットプレイスを運営',
    ],
    cons: [
      'レバレッジ取引に非対応',
      '販売所のスプレッドがやや広い',
      '過去にハッキング被害あり（現在はセキュリティ強化済み）',
    ],
    campaign: {
      active: true,
      description: '新規口座開設＋入金で1,500円相当のビットコインプレゼント',
      deadline: '2026-02-28',
    },
    affiliate: {
      url: 'https://coincheck.com/ja/',
      asp: 'AccessTrade',
      bonus: '口座開設完了で3,000円',
    },
    slug: 'coincheck',
    description:
      'Coincheckはマネックスグループのもとでサービスを提供する暗号資産取引所です。シンプルで直感的なアプリが好評で、初心者に最も推奨される取引所の一つです。NFTマーケットプレイスやIEOなど先進的なサービスも展開しています。',
    foundedYear: 2012,
    headquarters: '東京都渋谷区',
  },
  {
    id: 'gmo-coin',
    name: 'GMO Coin',
    nameJa: 'GMOコイン',
    logo: '/images/exchanges/gmo-coin.png',
    type: 'domestic',
    rating: 4.4,
    fees: {
      trading: 'Maker: -0.01% / Taker: 0.05%',
      deposit: '無料',
      withdrawal: '無料',
    },
    features: {
      currencies: 26,
      leverage: 2,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 90,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '各種手数料が無料（入出金・送金）',
      'オリコン顧客満足度No.1を受賞',
      'GMOインターネットグループの信頼性',
      'ステーキングサービスに対応',
    ],
    cons: [
      '最低出金額が10,000円とやや高め',
      'スプレッドが広がる場合がある',
      'レバレッジが2倍まで',
    ],
    campaign: {
      active: true,
      description: '暗号資産購入で最大10,000円が当たるキャンペーン',
      deadline: '2026-03-15',
    },
    affiliate: {
      url: 'https://coin.z.com/jp/',
      asp: 'A8.net',
      bonus: '口座開設＋取引で7,000円',
    },
    slug: 'gmo-coin',
    description:
      'GMOコインは東証プライム上場のGMOインターネットグループが運営する暗号資産取引所です。入出金・送金手数料が無料という強みがあり、コスト重視のユーザーに最適です。取引所・販売所両方のサービスを提供しています。',
    foundedYear: 2016,
    headquarters: '東京都渋谷区',
  },
  {
    id: 'dmm-bitcoin',
    name: 'DMM Bitcoin',
    nameJa: 'DMMビットコイン',
    logo: '/images/exchanges/dmm-bitcoin.png',
    type: 'domestic',
    rating: 4.1,
    fees: {
      trading: '無料（スプレッドあり）',
      deposit: '無料',
      withdrawal: '無料',
    },
    features: {
      currencies: 38,
      leverage: 2,
      staking: false,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 85,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      'レバレッジ取引の通貨ペアが豊富',
      '取引手数料・入出金手数料が無料',
      'DMMグループの充実したサポート体制',
      'LINEでの問い合わせに対応',
    ],
    cons: [
      '現物取引の通貨数が少ない',
      'スプレッドがやや広め',
      '出金に時間がかかる場合がある',
    ],
    campaign: {
      active: true,
      description: '新規口座開設で即時2,000円プレゼント',
      deadline: '2026-04-01',
    },
    affiliate: {
      url: 'https://bitcoin.dmm.com/',
      asp: 'TCS',
      bonus: '口座開設完了で4,000円',
    },
    slug: 'dmm-bitcoin',
    description:
      'DMM BitcoinはDMMグループが運営する暗号資産取引所で、レバレッジ取引に強みがあります。取引手数料無料、365日対応のサポート体制など、初心者にも安心のサービスを提供しています。',
    foundedYear: 2016,
    headquarters: '東京都中央区',
  },
  {
    id: 'bitbank',
    name: 'bitbank',
    nameJa: 'ビットバンク',
    logo: '/images/exchanges/bitbank.png',
    type: 'domestic',
    rating: 4.3,
    fees: {
      trading: 'Maker: -0.02% / Taker: 0.12%',
      deposit: '無料',
      withdrawal: '550〜770円',
    },
    features: {
      currencies: 37,
      leverage: 0,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 90,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '取引量が国内トップクラス',
      'Maker手数料がマイナス（リベートあり）',
      'チャートツールが高機能',
      'セキュリティの高さに定評',
    ],
    cons: [
      'レバレッジ取引に非対応',
      '出金手数料がかかる',
      '販売所のスプレッドがやや広い',
    ],
    campaign: {
      active: true,
      description: '口座開設後、10,000円以上の入金で1,000円プレゼント',
      deadline: '2026-03-31',
    },
    affiliate: {
      url: 'https://bitbank.cc/',
      asp: 'AccessTrade',
      bonus: '口座開設完了で3,500円',
    },
    slug: 'bitbank',
    description:
      'bitbankは国内取引量トップクラスを誇る暗号資産取引所です。高機能なチャートツールと板取引に対応しており、中〜上級者トレーダーから高い評価を受けています。セキュリティ面でも第三者機関から高評価を獲得しています。',
    foundedYear: 2014,
    headquarters: '東京都品川区',
  },
  {
    id: 'bitpoint',
    name: 'BITPOINT',
    nameJa: 'ビットポイント',
    logo: '/images/exchanges/bitpoint.png',
    type: 'domestic',
    rating: 3.9,
    fees: {
      trading: '無料',
      deposit: '無料',
      withdrawal: '無料',
    },
    features: {
      currencies: 21,
      leverage: 0,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 85,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '各種手数料が完全無料',
      '珍しいアルトコインの取扱いあり',
      'ステーキングに対応',
      'SBIグループの安心感',
    ],
    cons: [
      '取引量がやや少ない',
      '取扱通貨数がやや少なめ',
      '板取引の流動性が低い場合がある',
    ],
    campaign: {
      active: true,
      description: '口座開設で3,000円相当の暗号資産プレゼント',
      deadline: '2026-02-28',
    },
    affiliate: {
      url: 'https://www.bitpoint.co.jp/',
      asp: 'TCS',
      bonus: '口座開設完了で2,500円',
    },
    slug: 'bitpoint',
    description:
      'BITPOINTはSBIグループのビットポイントジャパンが運営する暗号資産取引所です。各種手数料が無料という点が最大の特徴で、コストを抑えた取引が可能です。国内では珍しいアルトコインも取り扱っています。',
    foundedYear: 2016,
    headquarters: '東京都港区',
  },

  // =========================================================================
  // 海外取引所 (International Exchanges)
  // =========================================================================
  {
    id: 'binance',
    name: 'Binance',
    nameJa: 'バイナンス',
    logo: '/images/exchanges/binance.png',
    type: 'international',
    rating: 4.7,
    fees: {
      trading: 'Maker: 0.1% / Taker: 0.1%（BNB保有で25%割引）',
      deposit: '無料',
      withdrawal: '通貨・ネットワークにより異なる',
    },
    features: {
      currencies: 350,
      leverage: 125,
      staking: true,
      japaneseSupport: false,
      mobileApp: true,
    },
    security: {
      coldWallet: 90,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '世界最大の取引量と流動性',
      '取扱通貨数が圧倒的に多い',
      'DeFi・NFT・ローンチパッドなど総合サービス',
      '手数料が非常に安い',
    ],
    cons: [
      '日本居住者向けサービスは制限あり',
      '日本語サポートが限定的',
      '規制リスクが存在する',
      '日本円の直接入金に非対応',
    ],
    campaign: {
      active: true,
      description: '紹介リンクから登録で取引手数料20%キックバック',
      deadline: undefined,
    },
    affiliate: {
      url: 'https://www.binance.com/ja',
      asp: 'Direct',
      bonus: '取引手数料の20%還元',
    },
    slug: 'binance',
    description:
      'Binanceは世界最大の暗号資産取引所であり、取引量・ユーザー数ともにグローバルNo.1を誇ります。350種類以上の通貨を取扱い、先物取引・ステーキング・NFTマーケットプレイスなど幅広いサービスを展開しています。',
    foundedYear: 2017,
    headquarters: 'ケイマン諸島（グローバル展開）',
  },
  {
    id: 'bybit',
    name: 'Bybit',
    nameJa: 'バイビット',
    logo: '/images/exchanges/bybit.png',
    type: 'international',
    rating: 4.5,
    fees: {
      trading: 'Maker: 0.1% / Taker: 0.1%',
      deposit: '無料',
      withdrawal: '通貨により異なる',
    },
    features: {
      currencies: 300,
      leverage: 100,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 85,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '日本語に完全対応',
      'デリバティブ取引が充実',
      'UIが直感的で使いやすい',
      'コピートレード機能あり',
    ],
    cons: [
      '日本の金融庁未登録',
      '日本円の直接入金に非対応',
      'カスタマーサポートの応答が遅い場合がある',
    ],
    campaign: {
      active: true,
      description: '新規登録＋入金で最大30,000 USDT相当のボーナス',
      deadline: '2026-03-31',
    },
    affiliate: {
      url: 'https://www.bybit.com/ja-JP/',
      asp: 'Direct',
      bonus: '取引手数料の30%還元',
    },
    slug: 'bybit',
    description:
      'Bybitはデリバティブ取引に強みを持つ海外暗号資産取引所です。日本語に完全対応しており、海外取引所の中でも日本人ユーザーからの人気が非常に高いのが特徴です。最大100倍のレバレッジとコピートレード機能を提供しています。',
    foundedYear: 2018,
    headquarters: 'ドバイ（UAE）',
  },
  {
    id: 'okx',
    name: 'OKX',
    nameJa: 'オーケーエックス',
    logo: '/images/exchanges/okx.png',
    type: 'international',
    rating: 4.4,
    fees: {
      trading: 'Maker: 0.08% / Taker: 0.1%',
      deposit: '無料',
      withdrawal: '通貨・ネットワークにより異なる',
    },
    features: {
      currencies: 320,
      leverage: 125,
      staking: true,
      japaneseSupport: false,
      mobileApp: true,
    },
    security: {
      coldWallet: 90,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '取引量世界トップクラス',
      'Web3ウォレット統合が優秀',
      'DeFi機能が充実',
      '手数料体系が競争力あり',
    ],
    cons: [
      '日本語対応が不十分',
      '日本からのアクセスに制限がある場合がある',
      'UIがやや複雑',
    ],
    campaign: {
      active: true,
      description: '新規登録で最大10,000 USDT相当のリワード',
      deadline: '2026-04-30',
    },
    affiliate: {
      url: 'https://www.okx.com/ja',
      asp: 'Direct',
      bonus: '取引手数料の20%還元',
    },
    slug: 'okx',
    description:
      'OKX（旧OKEx）は世界第3位の取引量を誇る暗号資産取引所です。現物・デリバティブ・DeFiまで幅広いサービスを提供し、特にWeb3ウォレットの統合により分散型サービスへのアクセスも容易です。',
    foundedYear: 2017,
    headquarters: 'セーシェル',
  },
  {
    id: 'gate-io',
    name: 'Gate.io',
    nameJa: 'ゲートアイオー',
    logo: '/images/exchanges/gate-io.png',
    type: 'international',
    rating: 4.1,
    fees: {
      trading: 'Maker: 0.2% / Taker: 0.2%（GT保有で割引）',
      deposit: '無料',
      withdrawal: '通貨により異なる',
    },
    features: {
      currencies: 1700,
      leverage: 100,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 80,
      insurance: true,
      twoFactor: true,
    },
    pros: [
      '取扱通貨数が非常に多い（1,700以上）',
      '新規トークンの上場が早い',
      '日本語対応あり',
      'Startup（IEO）参加が可能',
    ],
    cons: [
      '手数料がやや高め',
      'マイナー通貨の流動性が低い',
      '日本の金融庁未登録',
    ],
    campaign: {
      active: true,
      description: '新規登録で最大5,000 USDT相当のウェルカムボーナス',
      deadline: undefined,
    },
    affiliate: {
      url: 'https://www.gate.io/ja',
      asp: 'Direct',
      bonus: '取引手数料の30%還元',
    },
    slug: 'gate-io',
    description:
      'Gate.ioは2013年設立の老舗暗号資産取引所で、1,700種類以上のトークンを取り扱っています。新規プロジェクトの上場が早く、草コイン投資家に人気があります。IEO（Startup）プラットフォームも活発に運営しています。',
    foundedYear: 2013,
    headquarters: 'ケイマン諸島',
  },
  {
    id: 'mexc',
    name: 'MEXC',
    nameJa: 'エムイーエックスシー',
    logo: '/images/exchanges/mexc.png',
    type: 'international',
    rating: 4.0,
    fees: {
      trading: 'Maker: 0% / Taker: 0.1%（現物）',
      deposit: '無料',
      withdrawal: '通貨により異なる',
    },
    features: {
      currencies: 1500,
      leverage: 200,
      staking: true,
      japaneseSupport: true,
      mobileApp: true,
    },
    security: {
      coldWallet: 75,
      insurance: false,
      twoFactor: true,
    },
    pros: [
      '現物Maker手数料が無料',
      '取扱通貨数が多い',
      '新規トークンの上場が非常に早い',
      '日本語に対応',
    ],
    cons: [
      'セキュリティ面でやや不安',
      '保険基金が未整備',
      'カスタマーサポートの質にばらつき',
    ],
    campaign: {
      active: true,
      description: '新規登録で最大1,000 USDTのボーナスパッケージ',
      deadline: undefined,
    },
    affiliate: {
      url: 'https://www.mexc.com/ja-JP',
      asp: 'Direct',
      bonus: '取引手数料の40%還元',
    },
    slug: 'mexc',
    description:
      'MEXCは2018年設立の暗号資産取引所で、現物取引のMaker手数料が無料という大きな特徴があります。1,500種類以上のトークンを取り扱い、新規トークンの上場スピードは業界でもトップクラスです。',
    foundedYear: 2018,
    headquarters: 'シンガポール',
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * スラッグで取引所を検索する
 */
export function getExchangeBySlug(slug: string): Exchange | undefined {
  return exchanges.find((exchange) => exchange.slug === slug);
}

/**
 * 国内取引所の一覧を取得する
 */
export function getDomesticExchanges(): Exchange[] {
  return exchanges.filter((exchange) => exchange.type === 'domestic');
}

/**
 * 海外取引所の一覧を取得する
 */
export function getInternationalExchanges(): Exchange[] {
  return exchanges.filter((exchange) => exchange.type === 'international');
}

/**
 * IDで取引所を検索する
 */
export function getExchangeById(id: string): Exchange | undefined {
  return exchanges.find((exchange) => exchange.id === id);
}

/**
 * 評価順で取引所を取得する
 */
export function getExchangesByRating(type?: 'domestic' | 'international'): Exchange[] {
  const filtered = type
    ? exchanges.filter((exchange) => exchange.type === type)
    : exchanges;
  return [...filtered].sort((a, b) => b.rating - a.rating);
}

/**
 * キャンペーン実施中の取引所を取得する
 */
export function getExchangesWithActiveCampaigns(): Exchange[] {
  return exchanges.filter((exchange) => exchange.campaign.active);
}
