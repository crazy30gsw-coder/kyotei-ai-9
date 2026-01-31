import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BookOpen,
  Calculator,
  Star,
  ChevronRight,
  Zap,
  BarChart3,
} from "lucide-react";
import { ExchangeCard } from "@/components/crypto/ExchangeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getExchangesByRating } from "@/lib/data/exchanges";

export default function Home() {
  const topExchanges = getExchangesByRating().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CryptoNavi - 仮想通貨ナビ",
    url: "https://cryptonavi.jp",
    description:
      "仮想通貨・暗号資産の総合情報サイト。取引所比較、価格情報、初心者ガイドなど、暗号資産投資に必要な情報をすべてお届けします。",
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
      {/* Hero Section */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            2025年最新情報を毎日更新中
          </Badge>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            CryptoNavi
            <span className="block mt-2 bg-gradient-to-r from-primary via-blue-400 to-gold bg-clip-text text-transparent">
              仮想通貨ナビ
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            仮想通貨・暗号資産の取引所比較、最新価格情報、初心者ガイドまで。
            <br className="hidden sm:inline" />
            あなたの暗号資産投資を完全サポートする総合情報サイトです。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="gold" className="text-base px-8">
              <Link href="/exchanges">
                取引所ランキングを見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8">
              <Link href="/guides/crypto-beginners-guide">
                初心者ガイドを読む
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-crypto-green" />
              <span>金融庁登録済み取引所を厳選</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gold" />
              <span>独自評価で徹底比較</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>リアルタイム価格情報</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 今月のおすすめ取引所 Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="warning" className="mb-4">
              <Star className="mr-1 h-3 w-3" />
              厳選ピックアップ
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              今月のおすすめ取引所
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              手数料・セキュリティ・使いやすさを総合的に評価し、
              編集部が厳選したおすすめの暗号資産取引所をご紹介します。
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
            <Button asChild variant="outline" size="lg">
              <Link href="/exchanges">
                すべての取引所を比較する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 取引所比較 Quick Comparison Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              取引所比較ハイライト
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              目的に合った取引所が一目でわかる比較ポイントをまとめました。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">安全性で選ぶなら</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  コールドウォレット比率が高く、保険制度が充実している取引所を厳選。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">GMOコイン</span>
                    <Badge variant="success">おすすめ</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Coincheck</span>
                    <Badge variant="secondary">高評価</Badge>
                  </div>
                </div>
                <Link
                  href="/exchanges?sort=security"
                  className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                >
                  セキュリティ比較を見る
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-gold/20 hover:border-gold/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                    <Zap className="h-5 w-5 text-gold" />
                  </div>
                  <CardTitle className="text-lg">手数料の安さで選ぶなら</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  取引手数料・入出金手数料が無料またはお得な取引所をピックアップ。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">GMOコイン</span>
                    <Badge variant="success">手数料無料</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">BITPOINT</span>
                    <Badge variant="secondary">完全無料</Badge>
                  </div>
                </div>
                <Link
                  href="/exchanges?sort=fees"
                  className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                >
                  手数料比較を見る
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-crypto-green/20 hover:border-crypto-green/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crypto-green/10">
                    <TrendingUp className="h-5 w-5 text-crypto-green" />
                  </div>
                  <CardTitle className="text-lg">初心者におすすめ</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  使いやすさ・サポート体制・少額投資対応で初心者に最適な取引所。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Coincheck</span>
                    <Badge variant="success">500円から</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">bitFlyer</span>
                    <Badge variant="secondary">国内No.1</Badge>
                  </div>
                </div>
                <Link
                  href="/exchanges?filter=beginner"
                  className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                >
                  初心者向け取引所を見る
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 最新の仮想通貨価格 Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              最新の仮想通貨価格
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              主要な暗号資産のリアルタイム価格情報をチェックしましょう。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Bitcoin",
                symbol: "BTC",
                color: "text-[#F7931A]",
                bgColor: "bg-[#F7931A]/10",
              },
              {
                name: "Ethereum",
                symbol: "ETH",
                color: "text-[#627EEA]",
                bgColor: "bg-[#627EEA]/10",
              },
              {
                name: "Ripple",
                symbol: "XRP",
                color: "text-[#00AAE4]",
                bgColor: "bg-[#00AAE4]/10",
              },
              {
                name: "Solana",
                symbol: "SOL",
                color: "text-[#9945FF]",
                bgColor: "bg-[#9945FF]/10",
              },
            ].map((coin) => (
              <Card
                key={coin.symbol}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${coin.bgColor}`}
                    >
                      <span className={`text-sm font-bold ${coin.color}`}>
                        {coin.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {coin.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div className="text-xs text-muted-foreground">
                      最新価格は価格ページで確認
                    </div>
                    <TrendingUp className="h-4 w-4 text-crypto-green" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/coins">
                すべての価格を見る
                <BarChart3 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Affiliate CTA Banner */}
      {/* ================================================================== */}
      <section className="py-12 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            今なら口座開設キャンペーン実施中!
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            対象の取引所で新規口座を開設すると、ビットコインやボーナスがもらえるキャンペーンを実施中。
            この機会をお見逃しなく。
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg" className="text-base px-8">
              <Link href="/exchanges">
                キャンペーン一覧を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 初心者ガイド Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="mr-1 h-3 w-3" />
              学習コンテンツ
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              初心者ガイド
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              仮想通貨を始めるために必要な知識をゼロから丁寧に解説します。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "仮想通貨の始め方完全ガイド",
                description:
                  "仮想通貨の基礎知識から口座開設、初めての購入まで。初心者が知っておくべきことをすべて解説。",
                href: "/guides/crypto-beginners-guide",
                icon: BookOpen,
                badge: "入門",
              },
              {
                title: "ビットコインの購入方法ガイド",
                description:
                  "ビットコインの具体的な買い方を5ステップで解説。おすすめ取引所や手数料を抑えるコツも。",
                href: "/guides/how-to-buy-bitcoin",
                icon: TrendingUp,
                badge: "実践",
              },
              {
                title: "取引所の選び方・比較ガイド",
                description:
                  "手数料・セキュリティ・使いやすさなど、取引所を選ぶ際のポイントを徹底解説。",
                href: "/guides/exchange-comparison-guide",
                icon: BarChart3,
                badge: "比較",
              },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group">
                <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <guide.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline">{guide.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      記事を読む
                      <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 便利ツール Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              便利ツール
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              投資判断やポートフォリオ管理に役立つツールをご用意しました。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            <Link href="/tools/calculator" className="group">
              <Card className="h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors">
                      <Calculator className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        損益計算シミュレーター
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        購入価格と売却価格を入力するだけで、利益・損失額と税金の概算を自動計算。確定申告の参考にも。
                      </p>
                      <span className="mt-3 inline-flex items-center text-sm font-medium text-gold">
                        ツールを使う
                        <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/simulator" className="group">
              <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        積立投資シミュレーター
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        毎月の積立額と期間を設定して、将来のリターンをシミュレーション。長期投資の計画にお役立てください。
                      </p>
                      <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                        ツールを使う
                        <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Bottom CTA Section */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            仮想通貨を始めるなら今がチャンス
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            各取引所でお得なキャンペーンを実施中です。
            口座開設は無料で、最短即日で取引を始められます。
            まずはおすすめの取引所をチェックしてみましょう。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="gold" size="lg" className="text-base px-10">
              <Link href="/exchanges">
                おすすめ取引所を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/guides/crypto-beginners-guide">
                まずはガイドを読む
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            ※ 暗号資産の取引にはリスクが伴います。余裕資金での投資をおすすめします。
          </p>
        </div>
      </section>
    </>
  );
}
