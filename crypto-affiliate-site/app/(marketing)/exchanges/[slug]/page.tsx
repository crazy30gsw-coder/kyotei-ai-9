import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ExternalLink,
  Star,
  Shield,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  TrendingUp,
  Users,
  AlertTriangle,
  Gift,
  Smartphone,
  Coins,
} from "lucide-react";
import {
  exchanges,
  getExchangeBySlug,
  type Exchange,
} from "@/lib/data/exchanges";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Static params generation
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return exchanges.map((exchange) => ({
    slug: exchange.slug,
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
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

  const title = `${exchange.name}（${exchange.nameJa}）の評判・口コミ | 手数料・特徴を徹底解説`;
  const description = `${exchange.name}の手数料、セキュリティ、取扱通貨、メリット・デメリットを詳しく解説。口座開設方法も画像付きでわかりやすくご紹介します。`;

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

// ---------------------------------------------------------------------------
// Star rating component
// ---------------------------------------------------------------------------
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`評価: ${rating}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating)
              ? "fill-current rating-star"
              : i < rating
                ? "fill-current rating-star opacity-50"
                : "rating-star-empty"
          }`}
        />
      ))}
      <span className="ml-1.5 text-lg font-bold text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
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
    .slice(0, 3);

  const jsonLd = generateJsonLd(exchange);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-8 lg:space-y-0">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              ホーム
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/exchanges"
              className="transition-colors hover:text-foreground"
            >
              取引所比較
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{exchange.name}</span>
          </nav>

          {/* Header / Overview */}
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
                    <img
                      src={exchange.logo}
                      alt={`${exchange.name} ロゴ`}
                      width={48}
                      height={48}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {exchange.name}
                      <span className="ml-2 text-lg font-normal text-muted-foreground">
                        {exchange.nameJa}
                      </span>
                    </h1>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant={
                          exchange.type === "domestic" ? "success" : "warning"
                        }
                      >
                        {exchange.type === "domestic"
                          ? "国内取引所"
                          : "海外取引所"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA (top placement) */}
              <a
                href={exchange.affiliate.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-cta-primary shrink-0 text-center"
              >
                無料で口座開設する
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <p className="text-muted-foreground">{exchange.description}</p>
          </section>

          {/* Rating Section */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <Star className="h-5 w-5 text-accent" />
              総合評価
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">
                      {exchange.rating.toFixed(1)}
                    </div>
                    <StarRating rating={exchange.rating} />
                  </div>
                  <Separator orientation="vertical" className="hidden h-20 sm:block" />
                  <div className="grid flex-1 grid-cols-2 gap-4">
                    {[
                      { label: "手数料", value: exchange.type === "domestic" ? 4.0 : 4.5 },
                      { label: "セキュリティ", value: exchange.security.coldWallet >= 90 ? 4.5 : 4.0 },
                      { label: "使いやすさ", value: exchange.features.mobileApp ? 4.3 : 3.5 },
                      { label: "取扱通貨", value: Math.min(5, exchange.features.currencies / 70) },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="font-medium">
                            {item.value.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{
                              width: `${(item.value / 5) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Pros and Cons */}
          <section className="space-y-4">
            <h2 className="border-l-4 border-primary pl-3 text-xl font-bold">
              メリット・デメリット
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Pros */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-crypto-green">
                    <CheckCircle2 className="h-5 w-5" />
                    メリット
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exchange.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-crypto-green" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Cons */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-crypto-red">
                    <XCircle className="h-5 w-5" />
                    デメリット
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exchange.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-crypto-red" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Fee Details */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <Wallet className="h-5 w-5" />
              手数料詳細
            </h2>
            <Card>
              <CardContent className="p-0">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>手数料</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium">取引手数料</td>
                      <td>{exchange.fees.trading}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">日本円入金</td>
                      <td>{exchange.fees.deposit}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">日本円出金</td>
                      <td>{exchange.fees.withdrawal}</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Security Section */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <Shield className="h-5 w-5" />
              セキュリティ
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">コールドウォレット管理</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        資産の{exchange.security.coldWallet}%をコールドウォレットで管理
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">二段階認証</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {exchange.security.twoFactor ? "対応" : "非対応"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">保険・補償</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {exchange.security.insurance ? "あり" : "なし"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">モバイルアプリ</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {exchange.features.mobileApp ? "対応" : "非対応"}
                      </p>
                    </div>
                  </div>
                </div>

                {exchange.type === "international" && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <p className="text-sm text-destructive">
                      海外取引所は日本の法規制の対象外です。万が一のトラブル時に
                      日本の法律による保護を受けられない可能性があります。
                    </p>
                  </div>
                )}

                {exchange.type === "domestic" && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {exchange.name}は金融庁に暗号資産交換業者として登録されており、
                    法律に基づいた利用者保護体制を整えています。
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Features Summary */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <Coins className="h-5 w-5" />
              機能・サービス
            </h2>
            <Card>
              <CardContent className="p-0">
                <table className="comparison-table">
                  <tbody>
                    <tr>
                      <td className="w-1/3 font-medium">取扱通貨数</td>
                      <td>{exchange.features.currencies}種類</td>
                    </tr>
                    <tr>
                      <td className="font-medium">レバレッジ</td>
                      <td>{exchange.features.leverage > 0 ? `最大${exchange.features.leverage}倍` : "非対応"}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">ステーキング</td>
                      <td>{exchange.features.staking ? "対応" : "非対応"}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">日本語サポート</td>
                      <td>{exchange.features.japaneseSupport ? "対応" : "非対応"}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">モバイルアプリ</td>
                      <td>{exchange.features.mobileApp ? "対応" : "非対応"}</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Campaign Info */}
          {exchange.campaign.active && exchange.campaign.description && (
            <section className="space-y-4">
              <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
                <Gift className="h-5 w-5" />
                キャンペーン情報
              </h2>
              <Card className="border-accent/30">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-accent">
                        開催中のキャンペーン
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exchange.campaign.description}
                      </p>
                      {exchange.campaign.deadline && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          期限: {exchange.campaign.deadline}
                        </p>
                      )}
                    </div>
                    <a
                      href={exchange.affiliate.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-cta-primary shrink-0 text-center"
                    >
                      キャンペーンに参加する
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Middle CTA */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center sm:p-8">
            <h3 className="text-lg font-bold">
              {exchange.name}で仮想通貨取引を始めましょう
            </h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              口座開設は無料で、最短数分で完了します。
              まずは少額から始めてみることをおすすめします。
            </p>
            <a
              href={exchange.affiliate.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-cta-primary"
            >
              無料で口座開設する
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* How to Register */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <Users className="h-5 w-5" />
              口座開設の手順
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "メールアドレスの登録",
                  description: `${exchange.name}の公式サイトにアクセスし、メールアドレスとパスワードを登録します。`,
                },
                {
                  step: 2,
                  title: "本人情報の入力",
                  description:
                    "氏名、住所、生年月日などの基本情報を入力します。正確に入力してください。",
                },
                {
                  step: 3,
                  title: "本人確認書類の提出",
                  description:
                    "運転免許証やマイナンバーカードなどの本人確認書類を撮影してアップロードします。",
                },
                {
                  step: 4,
                  title: "審査・口座開設完了",
                  description:
                    "審査が完了すると、口座が開設されます。最短即日で取引を開始できます。",
                },
                {
                  step: 5,
                  title: "日本円の入金・取引開始",
                  description:
                    "銀行振込やコンビニ入金などで日本円を入金し、仮想通貨の取引を開始できます。",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 text-center">
              <a
                href={exchange.affiliate.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-cta-primary"
              >
                {exchange.name}で口座開設する（無料）
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                ※ 口座開設・維持手数料は無料です
              </p>
            </div>
          </section>

          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 border-l-4 border-primary pl-3 text-xl font-bold">
              <TrendingUp className="h-5 w-5" />
              基本情報
            </h2>
            <Card>
              <CardContent className="p-0">
                <table className="comparison-table">
                  <tbody>
                    <tr>
                      <td className="w-1/3 font-medium">取引所名</td>
                      <td>{exchange.name}（{exchange.nameJa}）</td>
                    </tr>
                    <tr>
                      <td className="font-medium">種類</td>
                      <td>
                        {exchange.type === "domestic"
                          ? "国内取引所（金融庁登録済）"
                          : "海外取引所"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">設立年</td>
                      <td>{exchange.foundedYear}年</td>
                    </tr>
                    <tr>
                      <td className="font-medium">所在地</td>
                      <td>{exchange.headquarters}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">取扱通貨数</td>
                      <td>{exchange.features.currencies}種類</td>
                    </tr>
                    {exchange.features.leverage > 0 && (
                      <tr>
                        <td className="font-medium">最大レバレッジ</td>
                        <td>{exchange.features.leverage}倍</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:mt-[calc(2rem+2.75rem)]">
          {/* Sticky CTA sidebar */}
          <div className="lg:sticky lg:top-24 lg:space-y-6">
            {/* Quick CTA Card */}
            <Card className="border-accent/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {exchange.name}
                </CardTitle>
                <CardDescription>
                  {exchange.campaign.active && exchange.campaign.description
                    ? exchange.campaign.description
                    : "今すぐ無料で口座開設"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <StarRating rating={exchange.rating} />
                {exchange.affiliate.bonus && (
                  <p className="text-sm font-semibold text-accent text-center">
                    {exchange.affiliate.bonus}
                  </p>
                )}
                <a
                  href={exchange.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-cta-primary w-full justify-center text-center"
                >
                  無料で口座開設
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-center text-xs text-muted-foreground">
                  ※ 最短5分で口座開設完了
                </p>
              </CardContent>
            </Card>

            {/* Related Exchanges */}
            {relatedExchanges.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    関連する取引所
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedExchanges.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/exchanges/${related.slug}`}
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary hover:bg-muted/50"
                    >
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">
                          {related.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current rating-star" />
                          <span className="text-xs text-muted-foreground">
                            {related.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    href="/exchanges"
                    className="mt-2 block text-center text-sm text-primary hover:underline"
                  >
                    すべての取引所を見る
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
