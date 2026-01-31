"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Exchange fee data (hardcoded)
// ---------------------------------------------------------------------------
interface ExchangeFeeData {
  id: string;
  name: string;
  nameJa: string;
  makerRate: number; // as decimal (0.001 = 0.1%)
  takerRate: number;
  spreadRate: number; // estimated spread cost as decimal
  leverageFeeExtra: number; // additional cost multiplier for leverage
  affiliateUrl: string;
}

const exchangeFees: ExchangeFeeData[] = [
  {
    id: "bitflyer",
    name: "bitFlyer",
    nameJa: "ビットフライヤー",
    makerRate: 0.0015,
    takerRate: 0.0015,
    spreadRate: 0.001,
    leverageFeeExtra: 0.0004, // daily swap rate approx
    affiliateUrl: "/exchanges/bitflyer",
  },
  {
    id: "coincheck",
    name: "Coincheck",
    nameJa: "コインチェック",
    makerRate: 0,
    takerRate: 0,
    spreadRate: 0.04, // ~4% spread on 販売所
    leverageFeeExtra: 0,
    affiliateUrl: "/exchanges/coincheck",
  },
  {
    id: "gmo-coin",
    name: "GMO Coin",
    nameJa: "GMOコイン",
    makerRate: -0.0001, // -0.01% maker rebate
    takerRate: 0.0005, // 0.05%
    spreadRate: 0.001,
    leverageFeeExtra: 0.0004,
    affiliateUrl: "/exchanges/gmo-coin",
  },
  {
    id: "binance",
    name: "Binance",
    nameJa: "バイナンス",
    makerRate: 0.001,
    takerRate: 0.001,
    spreadRate: 0.0005,
    leverageFeeExtra: 0.0003,
    affiliateUrl: "/exchanges/binance",
  },
  {
    id: "bybit",
    name: "Bybit",
    nameJa: "バイビット",
    makerRate: 0.001,
    takerRate: 0.001,
    spreadRate: 0.0005,
    leverageFeeExtra: 0.0003,
    affiliateUrl: "/exchanges/bybit",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatJPY(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(3)}%`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function FeeCalculatorPage() {
  const [amount, setAmount] = useState<string>("100000");
  const [selectedExchange, setSelectedExchange] = useState<string>("bitflyer");
  const [tradeType, setTradeType] = useState<"spot" | "leverage">("spot");

  const exchange = useMemo(
    () => exchangeFees.find((e) => e.id === selectedExchange) ?? exchangeFees[0],
    [selectedExchange]
  );

  const results = useMemo(() => {
    const tradeAmount = Number(amount) || 0;

    // Use taker rate as default (most common for market orders)
    const tradingFee = tradeAmount * exchange.takerRate;
    const makerFee = tradeAmount * exchange.makerRate;
    const spreadCost = tradeAmount * exchange.spreadRate;
    const leverageExtra =
      tradeType === "leverage" ? tradeAmount * exchange.leverageFeeExtra : 0;

    const totalCostTaker = tradingFee + spreadCost + leverageExtra;
    const totalCostMaker = makerFee + spreadCost + leverageExtra;

    return {
      tradeAmount,
      tradingFeeTaker: tradingFee,
      tradingFeeMaker: makerFee,
      spreadCost,
      leverageExtra,
      totalCostTaker,
      totalCostMaker,
    };
  }, [amount, exchange, tradeType]);

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
          <Calculator className="h-4 w-4" />
          ツール
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          手数料計算シミュレーター
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          取引金額・取引所・取引タイプを入力するだけで、実際にかかるコストを瞬時に算出。
          最適な取引所選びにお役立てください。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* -------------------------------------------------------------- */}
        {/* Input Card                                                      */}
        {/* -------------------------------------------------------------- */}
        <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">取引条件を入力</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 取引金額 */}
            <div className="space-y-2">
              <label
                htmlFor="trade-amount"
                className="text-sm font-medium text-slate-300"
              >
                取引金額（JPY）
              </label>
              <Input
                id="trade-amount"
                type="number"
                min={0}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="例: 100000"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[10000, 50000, 100000, 500000, 1000000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {formatJPY(v)}
                  </button>
                ))}
              </div>
            </div>

            {/* 取引所 */}
            <div className="space-y-2">
              <label
                htmlFor="exchange-select"
                className="text-sm font-medium text-slate-300"
              >
                取引所
              </label>
              <select
                id="exchange-select"
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {exchangeFees.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}（{ex.nameJa}）
                  </option>
                ))}
              </select>
            </div>

            {/* 取引タイプ */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                取引タイプ
              </span>
              <div className="flex gap-4">
                {[
                  { value: "spot" as const, label: "現物取引" },
                  { value: "leverage" as const, label: "レバレッジ取引" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="tradeType"
                      value={opt.value}
                      checked={tradeType === opt.value}
                      onChange={() => setTradeType(opt.value)}
                      className="h-4 w-4 accent-blue-500"
                    />
                    <span className="text-sm text-slate-200">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exchange info badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">
                Maker: {formatPercent(exchange.makerRate)}
              </Badge>
              <Badge variant="secondary">
                Taker: {formatPercent(exchange.takerRate)}
              </Badge>
              <Badge variant="outline">
                スプレッド目安: {formatPercent(exchange.spreadRate)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* -------------------------------------------------------------- */}
        {/* Results Card                                                    */}
        {/* -------------------------------------------------------------- */}
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">計算結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.tradeAmount > 0 ? (
              <>
                {/* Main results */}
                <div className="space-y-4">
                  <ResultRow
                    label="取引金額"
                    value={formatJPY(results.tradeAmount)}
                  />
                  <div className="border-t border-slate-700/50" />
                  <ResultRow
                    label="取引手数料（Taker）"
                    value={formatJPY(results.tradingFeeTaker)}
                    sub={formatPercent(exchange.takerRate)}
                  />
                  <ResultRow
                    label="取引手数料（Maker）"
                    value={formatJPY(results.tradingFeeMaker)}
                    sub={formatPercent(exchange.makerRate)}
                    highlight={exchange.makerRate < 0}
                  />
                  <ResultRow
                    label="スプレッドコスト目安"
                    value={formatJPY(results.spreadCost)}
                    sub={formatPercent(exchange.spreadRate)}
                  />
                  {tradeType === "leverage" && (
                    <ResultRow
                      label="レバレッジ手数料（日次目安）"
                      value={formatJPY(results.leverageExtra)}
                      sub={formatPercent(exchange.leverageFeeExtra)}
                    />
                  )}
                  <div className="border-t border-slate-700/50" />
                  <div className="rounded-lg bg-blue-500/10 p-4">
                    <ResultRow
                      label="実質コスト合計（Taker）"
                      value={formatJPY(results.totalCostTaker)}
                      bold
                    />
                    <div className="mt-2">
                      <ResultRow
                        label="実質コスト合計（Maker）"
                        value={formatJPY(results.totalCostMaker)}
                        bold
                        highlight={results.totalCostMaker < results.totalCostTaker}
                      />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a href={exchange.affiliateUrl}>
                      この取引所で口座開設する
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <p className="mt-2 text-center text-xs text-slate-500">
                    ※ 上記は概算値です。実際の手数料は取引時の条件により異なる場合があります。
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-slate-500">
                取引金額を入力すると計算結果が表示されます
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Fee comparison table                                               */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">取引所別 手数料一覧比較</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 text-left text-slate-400">
                  <th className="pb-3 pr-4 font-medium">取引所</th>
                  <th className="pb-3 pr-4 font-medium">Maker手数料</th>
                  <th className="pb-3 pr-4 font-medium">Taker手数料</th>
                  <th className="pb-3 pr-4 font-medium">スプレッド目安</th>
                  <th className="pb-3 font-medium">
                    {formatJPY(Number(amount) || 100000)} 取引時コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                {exchangeFees.map((ex) => {
                  const tradeAmt = Number(amount) || 100000;
                  const cost = tradeAmt * ex.takerRate + tradeAmt * ex.spreadRate;
                  return (
                    <tr
                      key={ex.id}
                      className={`border-b border-slate-800/50 ${
                        ex.id === selectedExchange ? "bg-blue-500/5" : ""
                      }`}
                    >
                      <td className="py-3 pr-4 font-medium text-slate-200">
                        {ex.name}
                      </td>
                      <td className="py-3 pr-4 text-slate-300">
                        {formatPercent(ex.makerRate)}
                      </td>
                      <td className="py-3 pr-4 text-slate-300">
                        {formatPercent(ex.takerRate)}
                      </td>
                      <td className="py-3 pr-4 text-slate-300">
                        {formatPercent(ex.spreadRate)}
                      </td>
                      <td className="py-3 font-medium text-white">
                        {formatJPY(cost)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Disclaimer                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h2 className="mb-2 text-sm font-semibold text-slate-400">
          ご注意事項
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
          <li>
            本シミュレーターの計算結果は概算であり、実際の取引コストとは異なる場合があります。
          </li>
          <li>
            スプレッドは市場状況により大きく変動するため、あくまで参考値としてご利用ください。
          </li>
          <li>
            レバレッジ取引の手数料はポジション保有日数に応じて変動します。
          </li>
          <li>
            最新の手数料情報は各取引所の公式サイトでご確認ください。
          </li>
          <li>
            当サイトにはアフィリエイトリンクが含まれています。詳細は
            <a href="/disclaimer" className="underline hover:text-slate-300">
              免責事項
            </a>
            をご覧ください。
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: ResultRow
// ---------------------------------------------------------------------------
function ResultRow({
  label,
  value,
  sub,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${bold ? "font-semibold text-white" : "text-slate-400"}`}
      >
        {label}
      </span>
      <div className="text-right">
        <span
          className={`${bold ? "text-lg font-bold" : "text-base font-medium"} ${
            highlight ? "text-green-400" : "text-white"
          }`}
        >
          {value}
        </span>
        {sub && (
          <span className="ml-2 text-xs text-slate-500">({sub})</span>
        )}
      </div>
    </div>
  );
}
