import { NextResponse } from "next/server";

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h,7d";

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch(COINGECKO_API_URL, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `CoinGecko API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch coin data from CoinGecko:", error);

    // Return a fallback error response with appropriate status
    return NextResponse.json(
      {
        error: "仮想通貨データの取得に失敗しました",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
  }
}
