import Link from "next/link";
import {
  Shield,
  Coins,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Calculator,
  BarChart3,
} from "lucide-react";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";
import { ExchangeLogo } from "@/components/crypto/ExchangeLogo";
import {
  getExchangesByRating,
  getDomesticExchanges,
} from "@/lib/data/exchanges";

export default function Home() {
  const topExchanges = getExchangesByRating("domestic").slice(0, 3);
  const domesticExchanges = getDomesticExchanges();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CryptoNavi - 仮想通貨ナビ",
    url: "https://cryptonavi.jp",
    description:
      "仮想通貨・暗号資産取引所を徹底比較。金融庁登録済の国内取引所を手数料・セキュリティ・取扱通貨数で比較し、おすすめランキングを掲載。",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cryptonavi.jp/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================================================================== */}
      {/* Section 1: Hero */}
      {/* ================================================================== */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0tMjQgMjRjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Update date badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm text-white mb-6">
            <CheckCircle className="h-4 w-4" />
            <span>2026年1月31日 更新</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            仮想通貨取引所おすすめランキング
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-blue-100 font-medium">
            【2026年1月最新】初心者にもわかりやすく徹底比較
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Shield className="h-4 w-4 text-emerald-300" />
              <span>金融庁登録済の取引所のみ掲載</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              <span>編集部が実際に利用して検証</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 2: Quick Ranking TOP 3 */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm text-amber-700 font-medium mb-4">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>編集部おすすめ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              おすすめ取引所ランキングTOP3
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              手数料・セキュリティ・使いやすさを総合的に評価し、
              編集部が厳選した国内暗号資産取引所をご紹介します。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topExchanges.map((exchange, index) => (
              <ExchangeCard
                key={exchange.id}
                exchange={exchange}
                rank={index + 1}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/exchanges"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              すべての取引所ランキングを見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 3: Comparison Table */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              主要取引所 比較一覧表
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              国内主要取引所の手数料・取扱通貨数・レバレッジを一目で比較できます。
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    取引所名
                  </th>
                  <th className="text-center px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    取扱通貨数
                  </th>
                  <th className="text-center px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    取引手数料
                  </th>
                  <th className="text-center px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    最低取引額
                  </th>
                  <th className="text-center px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    レバレッジ
                  </th>
                  <th className="text-center px-4 py-3.5 font-semibold text-gray-700 whitespace-nowrap">
                    口座開設
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {domesticExchanges.map((exchange, index) => (
                  <tr
                    key={exchange.id}
                    className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${
                      index === 0 ? "" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          <ExchangeLogo exchange={exchange.id} size={32} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 whitespace-nowrap">
                            {exchange.nameJa}
                          </p>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(exchange.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-gray-500">
                              {exchange.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="font-semibold text-gray-900">
                        {exchange.features.currencies}
                      </span>
                      <span className="text-gray-500 text-xs ml-0.5">種類</span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-gray-700 text-xs whitespace-nowrap">
                        {exchange.fees.trading}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-gray-700 whitespace-nowrap">
                        500円〜
                      </span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="font-semibold text-gray-900">
                        {exchange.features.leverage > 0
                          ? `${exchange.features.leverage}倍`
                          : "なし"}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <a
                        href={exchange.affiliate.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 transition-colors whitespace-nowrap"
                      >
                        無料登録
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            ※ 情報は2026年1月31日時点のものです。最新情報は各公式サイトをご確認ください。
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 4: How to Choose */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              仮想通貨取引所の選び方
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              初めて口座を開設する方に向けて、取引所選びで重視すべき3つのポイントを解説します。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1: Security */}
            <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  セキュリティ・信頼性
                </h3>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  金融庁に登録された取引所であることが大前提です。コールドウォレットでの資産管理比率や二段階認証の対応、過去のセキュリティ実績を確認しましょう。大手企業グループが運営する取引所は、経営基盤が安定しており信頼性が高い傾向にあります。
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  金融庁登録済み
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  コールドウォレット管理
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  二段階認証・不正検知
                </li>
              </ul>
            </div>

            {/* Point 2: Fees */}
            <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  手数料の安さ
                </h3>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Coins className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  取引手数料だけでなく、入出金手数料やスプレッドも含めた総コストで比較することが重要です。頻繁に取引する方は取引手数料、長期保有の方は入出金手数料を重視しましょう。手数料無料の取引所でもスプレッドが広い場合があるため注意が必要です。
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  取引手数料
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  入出金手数料
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  スプレッドの狭さ
                </li>
              </ul>
            </div>

            {/* Point 3: Coin Variety */}
            <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  取扱銘柄の豊富さ
                </h3>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  ビットコインやイーサリアムだけでなく、将来性のあるアルトコインにも投資したい場合は取扱通貨数が多い取引所を選びましょう。国内取引所でも20〜30種類以上の銘柄を取り扱うところが増えています。ステーキングやNFTに興味がある方は対応サービスの有無もチェックポイントです。
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  取扱通貨の種類
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  ステーキング対応
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  NFT・DeFi連携
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 5: Beginner Guide CTA */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            仮想通貨を始めるなら
          </h2>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            口座開設は無料で、最短即日で取引を開始できます。
            まずは少額から始めて、仮想通貨投資の基本を学びましょう。
            初心者向けのガイドで、口座開設から購入方法まで丁寧に解説しています。
          </p>
          <div className="mt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-blue-700 font-bold px-8 py-3.5 text-base hover:bg-blue-50 transition-colors shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              初心者ガイドを読む
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 6: Latest Articles/Tools */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              お役立ちコンテンツ
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              初心者ガイドや便利なツールで、仮想通貨投資をサポートします。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Guide 1 */}
            <Link
              href="/guides/crypto-beginners-guide"
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mb-4">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                仮想通貨の始め方ガイド
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                口座開設から初めての購入まで、仮想通貨の始め方をゼロから解説します。
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
                詳しく見る
                <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Guide 2 */}
            <Link
              href="/guides/how-to-buy-bitcoin"
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors mb-4">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                ビットコインの買い方
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                ビットコインの具体的な購入方法を5ステップで分かりやすく解説します。
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
                詳しく見る
                <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Tool 1 */}
            <Link
              href="/tools/calculator"
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors mb-4">
                <Calculator className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                手数料計算ツール
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                購入・売却時の手数料や利益を自動計算。確定申告の参考にも活用できます。
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
                ツールを使う
                <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Tool 2 */}
            <Link
              href="/tools/simulator"
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors mb-4">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                積立シミュレーター
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                毎月の積立額と期間を設定して、将来のリターンをシミュレーションできます。
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
                ツールを使う
                <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 7: Disclaimer */}
      {/* ================================================================== */}
      <section className="py-10 sm:py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-lg bg-white border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              リスクに関する注意事項
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              暗号資産（仮想通貨）の取引は、価格変動により損失が生じる可能性があります。暗号資産の価格は急激に変動することがあり、投資元本を失うリスクがあります。レバレッジ取引を利用した場合、預けた証拠金以上の損失が発生する可能性があります。取引を行う際は、各取引所の利用規約やリスクに関する説明を十分にご確認の上、ご自身の判断と責任において行ってください。当サイトの情報は、投資判断の参考として提供するものであり、特定の暗号資産の売買を推奨するものではありません。当サイトに掲載されている情報の正確性・完全性を保証するものではなく、掲載情報に基づいて被ったいかなる損害について、当サイトは責任を負いません。
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              当サイトは一部のリンクにおいてアフィリエイトプログラムを利用しており、リンク先のサービスへの登録や利用に対して報酬を受け取る場合があります。ただし、ランキングや評価はアフィリエイト報酬の有無に関わらず、編集部の独自基準に基づいて作成しています。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
