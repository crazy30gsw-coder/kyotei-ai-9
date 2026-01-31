import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  AlertTriangle,
  HelpCircle,
  Star,
  CheckCircle2,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  getDomesticExchanges,
  getInternationalExchanges,
} from "@/lib/data/exchanges";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";

export const metadata: Metadata = {
  title: "仮想通貨取引所おすすめ比較ランキング【2025年最新】 - CryptoNavi",
  description:
    "国内・海外の仮想通貨取引所を徹底比較。金融庁登録済みの国内取引所を中心に、手数料・セキュリティ・取扱通貨数を一覧表で比較。初心者にもわかりやすいおすすめランキングです。",
  openGraph: {
    title: "仮想通貨取引所おすすめ比較ランキング【2025年最新】 - CryptoNavi",
    description:
      "金融庁登録済みの国内取引所を中心に、手数料・セキュリティ・取扱通貨数で徹底比較。",
    type: "website",
  },
};

const faqItems = [
  {
    question: "仮想通貨取引所とは何ですか？",
    answer:
      "仮想通貨取引所（暗号資産交換業者）は、ビットコインやイーサリアムなどの仮想通貨を売買できるプラットフォームです。日本国内では金融庁に登録された事業者のみが暗号資産交換業を行うことができます。",
  },
  {
    question: "初心者におすすめの取引所はどれですか？",
    answer:
      "初心者の方には、金融庁に登録された国内取引所がおすすめです。特にアプリが使いやすく、日本語サポートが充実している取引所を選ぶと安心して取引を始められます。少額（500円程度）から購入できる取引所も多くあります。",
  },
  {
    question: "口座開設にはどのくらい時間がかかりますか？",
    answer:
      "多くの取引所では、オンラインでの本人確認（eKYC）に対応しており、最短で即日〜数日程度で口座開設が完了します。本人確認書類（運転免許証やマイナンバーカードなど）を事前に準備しておくとスムーズです。",
  },
  {
    question: "国内取引所と海外取引所の違いは何ですか？",
    answer:
      "国内取引所は金融庁の監督下にあり、日本円での入出金が容易で利用者保護の体制が整っています。海外取引所は取扱通貨数が多くレバレッジ倍率も高い傾向がありますが、日本の法規制の対象外のため、トラブル時の保護が限定的です。",
  },
  {
    question: "取引所の手数料にはどんな種類がありますか？",
    answer:
      "主な手数料として、取引手数料（売買時に発生）、入金手数料（日本円の入金時）、出金手数料（日本円の出金時）、送金手数料（仮想通貨の送金時）があります。また販売所形式ではスプレッド（売値と買値の差）が実質的なコストとなります。",
  },
  {
    question: "複数の取引所に口座を開設しても大丈夫ですか？",
    answer:
      "はい、複数の取引所に口座を持つことは問題ありません。取引所ごとに取扱通貨や手数料体系が異なるため、用途に応じて使い分けることで、より有利な条件で取引できます。口座開設・維持費は基本的に無料です。",
  },
];

export default function ExchangesPage() {
  const domesticExchanges = getDomesticExchanges();
  const internationalExchanges = getInternationalExchanges();

  const today = new Date();
  const updateDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ================================================================= */}
      {/* 1. Breadcrumb                                                     */}
      {/* ================================================================= */}
      <nav
        aria-label="パンくずリスト"
        className="flex items-center gap-1.5 text-sm text-gray-500 mb-8"
      >
        <Link href="/" className="hover:text-blue-600 transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-900 font-medium">取引所比較</span>
      </nav>

      {/* ================================================================= */}
      {/* 2. Hero Section                                                   */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          仮想通貨取引所おすすめ比較
        </h1>
        <p className="mt-3 text-gray-500 text-sm flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0" />
          最終更新日: {updateDate} | 全{domesticExchanges.length + internationalExchanges.length}社を徹底比較
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          仮想通貨（暗号資産）の取引を始めるには、まず取引所で口座を開設する必要があります。
          このページでは、金融庁登録済みの国内取引所を中心に、手数料・セキュリティ・取扱通貨数などを
          総合的に比較し、あなたに最適な取引所選びをサポートします。
        </p>
      </section>

      {/* ================================================================= */}
      {/* 3. Domestic Exchanges Section                                     */}
      {/* ================================================================= */}
      <section className="mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            国内おすすめ取引所ランキング
          </h2>
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold">
            <Shield className="h-3.5 w-3.5" />
            金融庁登録済
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-6 -mt-4">
          日本円で直接取引可能な金融庁認可の暗号資産交換業者を厳選してランキング形式でご紹介します。
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domesticExchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.slug}
              exchange={exchange}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. Comparison Table Section                                       */}
      {/* ================================================================= */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          国内取引所 比較一覧表
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  取引所
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  評価
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  取引手数料
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  取扱通貨数
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  レバレッジ
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  入金手数料
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  出金手数料
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  アプリ
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  詳細
                </th>
              </tr>
            </thead>
            <tbody>
              {domesticExchanges.map((exchange, index) => (
                <tr
                  key={exchange.slug}
                  className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {exchange.nameJa}
                        </p>
                        <p className="text-xs text-gray-400">{exchange.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {exchange.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs max-w-[180px]">
                    {exchange.fees.trading}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-900">
                    {exchange.features.currencies}種類
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {exchange.features.leverage > 0
                      ? `${exchange.features.leverage}倍`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {exchange.fees.deposit}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {exchange.fees.withdrawal}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {exchange.features.mobileApp ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/exchanges/${exchange.slug}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs whitespace-nowrap"
                    >
                      詳細
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. International Exchanges Section                                */}
      {/* ================================================================= */}
      <section className="mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">海外取引所</h2>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            上級者向け
          </span>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            海外取引所は日本の金融庁に未登録のため、日本の法規制の対象外となります。
            取扱通貨数やレバレッジ倍率は国内取引所を上回りますが、
            トラブル発生時の保護が限定的です。ご利用は自己責任となりますのでご注意ください。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internationalExchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.slug}
              exchange={exchange}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. FAQ Section                                                    */}
      {/* ================================================================= */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            よくある質問（FAQ）
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <h3 className="flex items-start gap-3 text-base font-semibold text-gray-900 mb-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
                  Q
                </span>
                {item.question}
              </h3>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold shrink-0 mt-0.5">
                  A
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. Disclaimer                                                     */}
      {/* ================================================================= */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" />
          免責事項・注意事項
        </h3>
        <div className="text-xs text-gray-500 leading-relaxed space-y-2">
          <p>
            当サイトに掲載されている情報は、情報提供を目的としたものであり、
            特定の暗号資産（仮想通貨）の売買を推奨するものではありません。
            暗号資産の取引は価格変動リスクがあり、元本を損失する可能性があります。
          </p>
          <p>
            掲載情報の正確性には万全を期しておりますが、その内容を保証するものではありません。
            手数料・キャンペーン情報等は変更される場合がありますので、
            最新の情報は各取引所の公式サイトをご確認ください。
          </p>
          <p>
            当サイトでは一部アフィリエイトプログラムを利用しており、
            リンク先での口座開設等により当サイトが報酬を受け取る場合があります。
            ただし、ランキングや評価はアフィリエイト報酬の多寡にかかわらず、
            編集部が独自の基準で作成しています。
          </p>
          <p>
            暗号資産の取引を行う際は、各取引所の利用規約やリスク説明をよくお読みいただき、
            ご自身の判断と責任において行ってください。
          </p>
        </div>
      </section>
    </div>
  );
}
