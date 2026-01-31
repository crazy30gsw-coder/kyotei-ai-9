import Link from "next/link";
import { Bitcoin } from "lucide-react";

const footerSections = [
  {
    title: "取引所",
    links: [
      { href: "/exchanges/bitflyer", label: "bitFlyer" },
      { href: "/exchanges/coincheck", label: "Coincheck" },
      { href: "/exchanges/binance", label: "Binance" },
    ],
  },
  {
    title: "ガイド",
    links: [
      { href: "/guides/beginners", label: "初心者ガイド" },
      { href: "/guides/glossary", label: "用語集" },
      { href: "/guides/tax", label: "税金ガイド" },
    ],
  },
  {
    title: "ツール",
    links: [
      { href: "/tools/fee-calculator", label: "手数料計算機" },
      { href: "/tools/profit-simulator", label: "利益シミュレーター" },
    ],
  },
  {
    title: "サイトについて",
    links: [
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/disclaimer", label: "免責事項" },
      { href: "/contact", label: "お問い合わせ" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section: logo + nav columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Site info */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Bitcoin className="h-6 w-6 text-gold" />
              <span className="text-lg font-bold text-white">CryptoNavi</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              仮想通貨・暗号資産に関する最新情報、取引所比較、投資ガイドをお届けする総合情報サイトです。初心者から上級者まで役立つコンテンツを提供しています。
            </p>
          </div>

          {/* Navigation columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-200">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-slate-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-slate-800 pt-8">
          <div className="rounded-lg bg-slate-900/50 p-4">
            <p className="text-xs leading-relaxed text-slate-500">
              【免責事項】当サイトはアフィリエイトプログラムに参加しており、一部リンクを通じて商品・サービスをご紹介した場合、提携先から報酬を受け取ることがあります。ただし、掲載する情報の正確性・公平性には十分配慮しております。暗号資産（仮想通貨）の取引にはリスクが伴います。投資判断はご自身の責任において行ってください。当サイトは金融商品取引法に基づく投資助言・代理業を行っておりません。掲載情報は執筆時点のものであり、最新情報は各取引所の公式サイトをご確認ください。
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CryptoNavi（仮想通貨ナビ）All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
