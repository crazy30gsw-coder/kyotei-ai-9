"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/exchanges", label: "取引所比較" },
  { href: "/coins", label: "価格一覧" },
  { href: "/guides", label: "初心者ガイド" },
  { href: "/tools/calculator", label: "ツール" },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Crypto<span className="text-blue-600">Navi</span>
            </span>
            <span className="text-[10px] font-medium text-gray-400">
              仮想通貨ナビ
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between border-b border-gray-50 px-2 py-3 text-sm font-medium text-gray-700 transition-colors last:border-b-0 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
