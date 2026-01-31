import Link from "next/link";

const exchangeLinks = [
  { href: "/exchanges/bitflyer", label: "bitFlyer" },
  { href: "/exchanges/coincheck", label: "Coincheck" },
  { href: "/exchanges/gmo", label: "GMOコイン" },
  { href: "/exchanges/bitbank", label: "bitbank" },
  { href: "/exchanges/dmm", label: "DMM Bitcoin" },
] as const;

const contentLinks = [
  { href: "/guides/beginners", label: "初心者ガイド" },
  { href: "/guides/glossary", label: "用語集" },
  { href: "/guides/tax", label: "税金ガイド" },
  { href: "/tools/calculator", label: "手数料計算機" },
  { href: "/tools/profit-simulator", label: "利益シミュレーター" },
] as const;

const aboutLinks = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/about", label: "運営者情報" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: Logo + description */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold tracking-tight text-gray-900">
                Crypto<span className="text-blue-600">Navi</span>
              </span>
              <span className="ml-1.5 text-xs font-medium text-gray-400">
                仮想通貨ナビ
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">
              仮想通貨・暗号資産に関する最新情報、取引所比較、投資ガイドをお届けする総合情報サイトです。初心者から上級者まで役立つコンテンツを提供しています。
            </p>
          </div>

          {/* Column 2: 取引所 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">取引所</h3>
            <ul className="mt-3 space-y-2">
              {exchangeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: コンテンツ */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">コンテンツ</h3>
            <ul className="mt-3 space-y-2">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: サイトについて */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              サイトについて
            </h3>
            <ul className="mt-3 space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <p className="text-[11px] leading-relaxed text-gray-400">
              【免責事項】当サイトはアフィリエイトプログラムに参加しており、一部リンクを通じて商品・サービスをご紹介した場合、提携先から報酬を受け取ることがあります。ただし、掲載する情報の正確性・公平性には十分配慮しております。暗号資産（仮想通貨）の取引にはリスクが伴います。投資判断はご自身の責任において行ってください。当サイトは金融商品取引法に基づく投資助言・代理業を行っておりません。掲載情報は執筆時点のものであり、最新情報は各取引所の公式サイトをご確認ください。
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CryptoNavi（仮想通貨ナビ）All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
