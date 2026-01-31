"use client";

import { useMemo } from "react";

interface PriceChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export function PriceChart({
  data,
  color,
  width = 120,
  height = 40,
}: PriceChartProps) {
  const { points, gradientId, trend } = useMemo(() => {
    if (!data || data.length === 0) {
      return { points: "", gradientId: "", trend: "neutral" as const };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Padding to keep the line away from edges
    const paddingX = 2;
    const paddingY = 4;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    // Sample down to a manageable number of points if needed
    const maxPoints = 50;
    const step = data.length > maxPoints ? Math.floor(data.length / maxPoints) : 1;
    const sampled: number[] = [];
    for (let i = 0; i < data.length; i += step) {
      sampled.push(data[i]);
    }
    // Always include the last point
    if (sampled[sampled.length - 1] !== data[data.length - 1]) {
      sampled.push(data[data.length - 1]);
    }

    const pts = sampled
      .map((value, index) => {
        const x = paddingX + (index / (sampled.length - 1)) * chartWidth;
        const y =
          paddingY + chartHeight - ((value - min) / range) * chartHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    // Build area fill path (close to bottom)
    const id = `gradient-${Math.random().toString(36).slice(2, 9)}`;
    const currentTrend =
      data[data.length - 1] >= data[0] ? "positive" : "negative";

    return { points: pts, gradientId: id, trend: currentTrend };
  }, [data, width, height]);

  if (!data || data.length === 0) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center text-xs text-muted-foreground"
      >
        —
      </div>
    );
  }

  const resolvedColor = trend === "positive" ? "#00C853" : "#FF1744";
  const displayColor = color || resolvedColor;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-label="7日間の価格推移"
      role="img"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={displayColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={displayColor} stopOpacity={0.02} />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <polygon
        points={`${points} ${width - 2},${height - 4} 2,${height - 4}`}
        fill={`url(#${gradientId})`}
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={displayColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
