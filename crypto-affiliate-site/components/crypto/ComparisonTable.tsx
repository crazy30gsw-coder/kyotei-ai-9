"use client";

import Link from "next/link";
import type { Exchange } from "@/lib/data/exchanges";

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const stars: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push("★");
    } else if (i === fullStars && hasHalf) {
      stars.push("★");
    } else {
      stars.push("☆");
    }
  }
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-yellow-400 text-base tracking-tight">
        {stars.join("")}
      </span>
      <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
    </span>
  );
}

function BooleanCell({ value }: { value: boolean }) {
  return value ? (
    <span className="text-emerald-600 font-bold text-base">○</span>
  ) : (
    <span className="text-red-400 font-bold text-base">✕</span>
  );
}

interface RowDef {
  label: string;
  render: (exchange: Exchange) => React.ReactNode;
}

const rows: RowDef[] = [
  {
    label: "総合評価",
    render: (ex) => <StarRating rating={ex.rating} />,
  },
  {
    label: "取扱通貨数",
    render: (ex) => (
      <span className="text-sm font-semibold text-gray-800">
        {ex.features.currencies}
        <span className="font-normal text-gray-500">種類</span>
      </span>
    ),
  },
  {
    label: "取引手数料",
    render: (ex) => (
      <span className="text-sm text-gray-800">{ex.fees.trading}</span>
    ),
  },
  {
    label: "入金手数料",
    render: (ex) => (
      <span className="text-sm text-gray-800">{ex.fees.deposit}</span>
    ),
  },
  {
    label: "出金手数料",
    render: (ex) => (
      <span className="text-sm text-gray-800">{ex.fees.withdrawal}</span>
    ),
  },
  {
    label: "レバレッジ",
    render: (ex) =>
      ex.features.leverage > 0 ? (
        <span className="text-sm font-semibold text-gray-800">
          {ex.features.leverage}
          <span className="font-normal text-gray-500">倍</span>
        </span>
      ) : (
        <span className="text-sm text-gray-400">なし</span>
      ),
  },
  {
    label: "スマホアプリ",
    render: (ex) => <BooleanCell value={ex.features.mobileApp} />,
  },
  {
    label: "ステーキング",
    render: (ex) => <BooleanCell value={ex.features.staking} />,
  },
];

export function ComparisonTable({ exchanges }: { exchanges: Exchange[] }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 z-10 bg-gray-50 min-w-[120px] px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                比較項目
              </th>
              {exchanges.map((exchange) => (
                <th
                  key={exchange.id}
                  className="min-w-[150px] px-4 py-3 text-center font-semibold text-gray-700 border-b border-gray-200"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                      {exchange.logo}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {exchange.nameJa}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="sticky left-0 z-10 min-w-[120px] px-4 py-3 font-medium text-gray-700 whitespace-nowrap border-b border-gray-100"
                  style={{ backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#f9fafb" }}
                >
                  {row.label}
                </td>
                {exchanges.map((exchange) => (
                  <td
                    key={exchange.id}
                    className="px-4 py-3 text-center border-b border-gray-100"
                  >
                    {row.render(exchange)}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA Row */}
            <tr className="bg-white">
              <td
                className="sticky left-0 z-10 min-w-[120px] px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
                style={{ backgroundColor: "#ffffff" }}
              >
                口座開設
              </td>
              {exchanges.map((exchange) => (
                <td key={exchange.id} className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    {exchange.affiliate.bonus && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-0.5">
                        {exchange.affiliate.bonus}
                      </span>
                    )}
                    <Link
                      href={exchange.affiliate.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      無料で口座開設
                    </Link>
                    <span className="text-[11px] text-gray-400">
                      公式サイトへ
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
