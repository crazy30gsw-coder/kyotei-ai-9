import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CryptoNavi - 仮想通貨ナビ",
    default: "CryptoNavi - 仮想通貨ナビ | 仮想通貨取引所比較・情報サイト",
  },
  description:
    "CryptoNavi（仮想通貨ナビ）は、国内・海外の主要仮想通貨取引所を徹底比較する総合情報サイトです。手数料、セキュリティ、使いやすさなどの観点から最適な取引所が見つかります。初心者向けガイドや便利ツールも充実。",
  keywords: [
    "仮想通貨",
    "暗号資産",
    "取引所比較",
    "ビットコイン",
    "仮想通貨取引所",
    "bitFlyer",
    "Coincheck",
    "仮想通貨 おすすめ",
    "仮想通貨 初心者",
    "暗号資産 比較",
  ],
  authors: [{ name: "CryptoNavi編集部" }],
  creator: "CryptoNavi",
  publisher: "CryptoNavi",
  metadataBase: new URL("https://cryptonavi.jp"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://cryptonavi.jp",
    siteName: "CryptoNavi - 仮想通貨ナビ",
    title: "CryptoNavi - 仮想通貨ナビ | 仮想通貨取引所比較・情報サイト",
    description:
      "国内・海外の主要仮想通貨取引所を徹底比較。手数料、セキュリティ、使いやすさで最適な取引所が見つかります。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptoNavi - 仮想通貨ナビ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoNavi - 仮想通貨ナビ | 仮想通貨取引所比較・情報サイト",
    description:
      "国内・海外の主要仮想通貨取引所を徹底比較。手数料、セキュリティ、使いやすさで最適な取引所が見つかります。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
