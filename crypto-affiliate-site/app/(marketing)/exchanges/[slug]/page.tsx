import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ExternalLink,
  Star,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Coins,
  AlertTriangle,
  Gift,
  ArrowRight,
} from "lucide-react";
import {
  exchanges,
  getExchangeBySlug,
  type Exchange,
} from "@/lib/data/exchanges";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";
import { ExchangeLogo } from "@/components/crypto/ExchangeLogo";

// =============================================================================
// Static params generation
// =============================================================================
export async function generateStaticParams() {
  return exchanges.map((exchange) => ({
    slug: exchange.slug,
  }));
}

// =============================================================================
// Dynamic metadata
// =============================================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const exchange = getExchangeBySlug(params.slug);

  if (!exchange) {
    return {
      title: "取引所が見つかりません - CryptoNavi",
    };
  }

  const title = `${exchange.nameJa}（${exchange.name}）の評判・手数料・特徴を徹底解説【2025年】 - CryptoNavi`;
  const description = `${exchange.nameJa}（${exchange.name}）の手数料、セキュリティ、取扱通貨数、メリット・デメリットを詳しく解説。口座開設の手順もわかりやすくご紹介します。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// =============================================================================
// Star rating display
// =============================================================================
function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };
  const textClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-0.5" aria-label={`評価: ${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className={`ml-2 font-bold text-gray-900 ${textClasses[size]}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// =============================================================================
// JSON-LD structured data
// =============================================================================
function generateJsonLd(exchange: Exchange) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "FinancialProduct",
      name: exchange.name,
      description: exchange.description,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: exchange.rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "CryptoNavi",
      url: "https://cryptonavi.jp",
    },
    publisher: {
      "@type": "Organization",
      name: "CryptoNavi",
      url: "https://cryptonavi.jp",
    },
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
  };
}

// =============================================================================
// Page component
// =============================================================================
export default function ExchangeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const exchange = getExchangeBySlug(params.slug);

  if (!exchange) {
    notFound();
  }

  // Get related exchanges (same type, excluding current)
  const relatedExchanges = exchanges
    .filter((e) => e.type === exchange.type && e.slug !== exchange.slug)
    .slice(0, 4);

  const jsonLd = generateJsonLd(exchange);

  const registrationSteps = [
    {
      step: 1,
      title: "公式サイトにアクセス",
      description: `${exchange.nameJa}の公式サイトにアクセスし、「口座開設」ボタンをクリックします。`,
    },
    {
      step: 2,
      title: "メールアドレス・パスワード登録",
      description:
        "メールアドレスを入力し、届いた確認メールのリンクをクリック。パスワードを設定します。",
    },
    {
      step: 3,
      title: "本人情報の入力",
      description:
        "氏名、住所、生年月日、職業などの基本情報を正確に入力します。",
    },
    {
      step: 4,
      title: "本人確認書類の提出",
      description:
        "運転免許証やマイナンバーカードなどの本人確認書類を撮影してアップロードします。eKYC対応でスマホから簡単に完了できます。",
    },
    {
      step: 5,
      title: "審査完了・取引開始",
      description:
        "審査完了後、日本円を入金すれば仮想通貨の取引を開始できます。最短即日で取引可能です。",
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <Link
            href="/exchanges"
            className="hover:text-blue-600 transition-colors"
          >
            取引所比較
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{exchange.nameJa}</span>
        </nav>

        {/* ================================================================= */}
        {/* 2. Exchange Header                                                */}
        {/* ================================================================= */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo Circle */}
            <div className="shrink-0">
              <ExchangeLogo exchange={exchange.id} size={80} />
            </div>

            {/* Name, Rating, Description */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {exchange.nameJa}
                </h1>
                <span className="text-lg text-gray-400 font-medium">
                  {exchange.name}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <StarRating rating={exchange.rating} size="md" />
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${
                    exchange.type === "domestic"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-purple-50 text-purple-700 border border-purple-200"
                  }`}
                >
                  {exchange.type === "domestic" ? "国内取引所" : "海外取引所"}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {exchange.description}
              </p>

              {/* Green CTA Button */}
              <a
                href={exchange.affiliate.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-8 py-3.5 text-sm transition-colors shadow-md shadow-green-600/20"
              >
                無料口座開設はこちら
                <ExternalLink className="h-4 w-4" />
              </a>
              {exchange.affiliate.bonus && (
                <p className="mt-2 text-xs text-green-700 font-medium">
                  {exchange.affiliate.bonus}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. Key Info Grid                                                  */}
        {/* ================================================================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Coins className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                取扱通貨数
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {exchange.features.currencies}
              <span className="text-sm font-normal text-gray-500 ml-1">種類</span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Coins className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                取引手数料
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug">
              {exchange.fees.trading}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Coins className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                レバレッジ
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {exchange.features.leverage > 0 ? (
                <>
                  {exchange.features.leverage}
                  <span className="text-sm font-normal text-gray-500 ml-1">倍</span>
                </>
              ) : (
                <span className="text-base text-gray-400">なし</span>
              )}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                セキュリティ
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug">
              コールドウォレット {exchange.security.coldWallet}%
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. Merit / Demerit Section                                        */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5 border-l-4 border-blue-600 pl-3">
            メリット・デメリット
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Merits */}
            <div className="bg-green-50/50 border border-green-200 rounded-xl p-5">
              <h3 className="flex items-center gap-2 text-base font-bold text-green-700 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                メリット
              </h3>
              <ul className="space-y-3">
                {exchange.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demerits */}
            <div className="bg-red-50/50 border border-red-200 rounded-xl p-5">
              <h3 className="flex items-center gap-2 text-base font-bold text-red-700 mb-4">
                <XCircle className="h-5 w-5" />
                デメリット
              </h3>
              <ul className="space-y-3">
                {exchange.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. Fee Detail Table                                               */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5 border-l-4 border-blue-600 pl-3">
            手数料詳細
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">
                    項目
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">
                    手数料
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    取引手数料
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {exchange.fees.trading}
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    入金手数料
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {exchange.fees.deposit}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-gray-900">
                    出金手数料
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {exchange.fees.withdrawal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. Security Info                                                  */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            セキュリティ情報
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-900 mb-1">
                コールドウォレット管理
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {exchange.security.coldWallet}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                資産をオフライン環境で安全に保管
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
              <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-900 mb-1">
                保険・補償制度
              </p>
              <p className={`text-lg font-bold ${exchange.security.insurance ? "text-green-600" : "text-gray-400"}`}>
                {exchange.security.insurance ? "あり" : "なし"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {exchange.security.insurance
                  ? "万が一の際に資産を保護"
                  : "補償制度は現在未対応"}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-900 mb-1">
                二段階認証（2FA）
              </p>
              <p className={`text-lg font-bold ${exchange.security.twoFactor ? "text-green-600" : "text-gray-400"}`}>
                {exchange.security.twoFactor ? "対応" : "非対応"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {exchange.security.twoFactor
                  ? "ログイン・出金時の認証で安全性向上"
                  : "二段階認証は利用不可"}
              </p>
            </div>
          </div>

          {exchange.type === "international" && (
            <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                海外取引所は日本の金融庁に未登録です。万が一のトラブル時に
                日本の法律による保護を受けられない可能性があります。ご利用は自己責任でお願いいたします。
              </p>
            </div>
          )}

          {exchange.type === "domestic" && (
            <p className="mt-4 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg p-4">
              {exchange.nameJa}は金融庁に暗号資産交換業者として登録されており、
              法律に基づいた利用者保護体制を整えています。安心してご利用いただけます。
            </p>
          )}
        </section>

        {/* ================================================================= */}
        {/* 7. Campaign Section                                               */}
        {/* ================================================================= */}
        {exchange.campaign.active && exchange.campaign.description && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-500" />
              キャンペーン情報
            </h2>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    開催中のキャンペーン
                  </h3>
                  <p className="text-sm text-orange-700">
                    {exchange.campaign.description}
                  </p>
                  {exchange.campaign.deadline && (
                    <p className="flex items-center gap-1 text-xs text-orange-600 mt-2">
                      <Clock className="h-3.5 w-3.5" />
                      期限: {exchange.campaign.deadline}
                    </p>
                  )}
                </div>
                <a
                  href={exchange.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg px-6 py-3 text-sm transition-colors shrink-0 shadow-md"
                >
                  キャンペーンに参加
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 8. Registration Steps                                             */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5 border-l-4 border-blue-600 pl-3">
            口座開設の手順
          </h2>
          <div className="space-y-4">
            {registrationSteps.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 9. Bottom CTA                                                     */}
        {/* ================================================================= */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {exchange.nameJa}で仮想通貨取引を始めましょう
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
              口座開設は無料で、最短数分で完了します。
              まずは少額から始めてみることをおすすめします。
            </p>
            <a
              href={exchange.affiliate.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-10 py-4 text-base transition-colors shadow-lg shadow-green-600/25"
            >
              無料口座開設はこちら
              <ExternalLink className="h-5 w-5" />
            </a>
            <p className="mt-3 text-xs text-gray-500">
              ※ 口座開設・維持手数料は無料です。公式サイトに遷移します。
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 10. Related Exchanges                                             */}
        {/* ================================================================= */}
        {relatedExchanges.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-3">
              関連する取引所
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedExchanges.map((related, index) => (
                <ExchangeCard
                  key={related.slug}
                  exchange={related}
                  rank={index + 1}
                />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/exchanges"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                すべての取引所を比較する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
