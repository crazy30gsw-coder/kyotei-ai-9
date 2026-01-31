"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight } from "lucide-react";

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
  return `${rate.toFixed(2)}%`;
}

interface MonthlyBreakdown {
  month: number;
  invested: number;
  balance: number;
  profit: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ProfitSimulatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("100000");
  const [monthlyReturn, setMonthlyReturn] = useState<string>("5");
  const [duration, setDuration] = useState<string>("12");
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("10000");

  const results = useMemo(() => {
    const initial = Number(initialInvestment) || 0;
    const rate = (Number(monthlyReturn) || 0) / 100;
    const months = Math.min(Math.max(Number(duration) || 0, 0), 360); // cap at 30 years
    const monthly = Number(monthlyDeposit) || 0;

    // Compound growth simulation
    const breakdown: MonthlyBreakdown[] = [];
    let balance = initial;
    let totalInvested = initial;

    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + rate) + monthly;
      totalInvested += monthly;
      breakdown.push({
        month: m,
        invested: totalInvested,
        balance: Math.round(balance),
        profit: Math.round(balance - totalInvested),
      });
    }

    const finalBalance = Math.round(balance);
    const totalProfit = finalBalance - totalInvested;
    const profitRate =
      totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    return {
      finalBalance,
      totalInvested,
      totalProfit,
      profitRate,
      breakdown,
      months,
    };
  }, [initialInvestment, monthlyReturn, duration, monthlyDeposit]);

  // Build a display table: first 12 months + final month (if > 12)
  const displayBreakdown = useMemo(() => {
    const { breakdown, months } = results;
    if (months <= 13) return breakdown;
    const first12 = breakdown.slice(0, 12);
    const last = breakdown[breakdown.length - 1];
    if (last && last.month > 12) {
      return [...first12, last];
    }
    return first12;
  }, [results]);

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
          <Calculator className="h-4 w-4" />
          ツール
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          利益シミュレーター
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          初期投資額・月次リターン率・投資期間・積立額を入力して、
          複利運用による資産成長をシミュレーションしましょう。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* -------------------------------------------------------------- */}
        {/* Input Card                                                      */}
        {/* -------------------------------------------------------------- */}
        <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">投資条件を入力</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 初期投資金額 */}
            <div className="space-y-2">
              <label
                htmlFor="initial-investment"
                className="text-sm font-medium text-slate-300"
              >
                初期投資金額（JPY）
              </label>
              <Input
                id="initial-investment"
                type="number"
                min={0}
                step={10000}
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="例: 100000"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[50000, 100000, 300000, 500000, 1000000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setInitialInvestment(String(v))}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {formatJPY(v)}
                  </button>
                ))}
              </div>
            </div>

            {/* 月次リターン率 */}
            <div className="space-y-2">
              <label
                htmlFor="monthly-return"
                className="text-sm font-medium text-slate-300"
              >
                月次リターン率（%）
              </label>
              <Input
                id="monthly-return"
                type="number"
                min={-100}
                max={100}
                step={0.5}
                value={monthlyReturn}
                onChange={(e) => setMonthlyReturn(e.target.value)}
                placeholder="例: 5"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[1, 3, 5, 10, 20].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setMonthlyReturn(String(v))}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {v}%
                  </button>
                ))}
              </div>
            </div>

            {/* 投資期間 */}
            <div className="space-y-2">
              <label
                htmlFor="duration"
                className="text-sm font-medium text-slate-300"
              >
                投資期間（月数）
              </label>
              <Input
                id="duration"
                type="number"
                min={1}
                max={360}
                step={1}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="例: 12"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[6, 12, 24, 36, 60].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDuration(String(v))}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {v}ヶ月{v >= 12 ? `（${v / 12}年）` : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* 毎月の積立額 */}
            <div className="space-y-2">
              <label
                htmlFor="monthly-deposit"
                className="text-sm font-medium text-slate-300"
              >
                毎月の積立額（JPY）
              </label>
              <Input
                id="monthly-deposit"
                type="number"
                min={0}
                step={1000}
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                placeholder="例: 10000"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[0, 5000, 10000, 30000, 50000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setMonthlyDeposit(String(v))}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    {v === 0 ? "なし" : formatJPY(v)}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* -------------------------------------------------------------- */}
        {/* Results Card                                                    */}
        {/* -------------------------------------------------------------- */}
        <Card className="border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">シミュレーション結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.totalInvested > 0 ? (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4">
                  <SummaryCard
                    label="最終資産額"
                    value={formatJPY(results.finalBalance)}
                    accent
                  />
                  <SummaryCard
                    label="総投資額"
                    value={formatJPY(results.totalInvested)}
                  />
                  <SummaryCard
                    label="利益額"
                    value={formatJPY(results.totalProfit)}
                    positive={results.totalProfit >= 0}
                    negative={results.totalProfit < 0}
                  />
                  <SummaryCard
                    label="利益率"
                    value={formatPercent(results.profitRate)}
                    positive={results.profitRate >= 0}
                    negative={results.profitRate < 0}
                  />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    月次リターン: {monthlyReturn}%
                  </Badge>
                  <Badge variant="secondary">
                    期間: {duration}ヶ月
                  </Badge>
                  <Badge variant="outline">複利運用</Badge>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a href="/exchanges">
                      おすすめ取引所で投資を始める
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-slate-500">
                投資条件を入力するとシミュレーション結果が表示されます
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Monthly Breakdown Table                                            */}
      {/* ------------------------------------------------------------------ */}
      {results.totalInvested > 0 && displayBreakdown.length > 0 && (
        <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">月別資産推移</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 text-left text-slate-400">
                    <th className="pb-3 pr-4 font-medium">月</th>
                    <th className="pb-3 pr-4 font-medium text-right">
                      累計投資額
                    </th>
                    <th className="pb-3 pr-4 font-medium text-right">
                      資産残高
                    </th>
                    <th className="pb-3 font-medium text-right">損益</th>
                  </tr>
                </thead>
                <tbody>
                  {displayBreakdown.map((row, idx) => {
                    // Insert separator if this is the final row and there's a gap
                    const showSeparator =
                      idx > 0 &&
                      row.month - displayBreakdown[idx - 1].month > 1;

                    return (
                      <>
                        {showSeparator && (
                          <tr key={`sep-${row.month}`}>
                            <td
                              colSpan={4}
                              className="py-2 text-center text-xs text-slate-600"
                            >
                              ・・・
                            </td>
                          </tr>
                        )}
                        <tr
                          key={row.month}
                          className="border-b border-slate-800/50"
                        >
                          <td className="py-3 pr-4 text-slate-300">
                            {row.month}ヶ月目
                          </td>
                          <td className="py-3 pr-4 text-right text-slate-300">
                            {formatJPY(row.invested)}
                          </td>
                          <td className="py-3 pr-4 text-right font-medium text-white">
                            {formatJPY(row.balance)}
                          </td>
                          <td
                            className={`py-3 text-right font-medium ${
                              row.profit >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {row.profit >= 0 ? "+" : ""}
                            {formatJPY(row.profit)}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Disclaimer                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h2 className="mb-2 text-sm font-semibold text-slate-400">
          ご注意事項
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
          <li>
            本シミュレーターは複利計算による概算であり、将来のリターンを保証するものではありません。
          </li>
          <li>
            暗号資産への投資は価格変動リスクが大きく、元本割れの可能性があります。
          </li>
          <li>
            税金・手数料・スプレッドなどのコストは含まれていません。
          </li>
          <li>
            投資判断はご自身の責任において行ってください。
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
// Sub-component: SummaryCard
// ---------------------------------------------------------------------------
function SummaryCard({
  label,
  value,
  accent,
  positive,
  negative,
}: {
  label: string;
  value: string;
  accent?: boolean;
  positive?: boolean;
  negative?: boolean;
}) {
  let valueColor = "text-white";
  if (accent) valueColor = "text-blue-400";
  if (positive) valueColor = "text-green-400";
  if (negative) valueColor = "text-red-400";

  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-800/50 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1 text-lg font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
