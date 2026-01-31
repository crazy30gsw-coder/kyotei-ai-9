import { NextRequest, NextResponse } from "next/server";
import { exchanges, type Exchange } from "@/lib/data/exchanges";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "domestic" | "international"
    const sort = searchParams.get("sort"); // "rating" | "fees"

    let filteredExchanges: Exchange[] = [...exchanges];

    // Filter by type if specified
    if (type === "domestic") {
      filteredExchanges = filteredExchanges.filter(
        (exchange) => exchange.type === "domestic"
      );
    } else if (type === "international") {
      filteredExchanges = filteredExchanges.filter(
        (exchange) => exchange.type === "international"
      );
    }

    // Sort by specified criteria
    if (sort === "rating") {
      filteredExchanges.sort((a, b) => b.rating - a.rating);
    } else if (sort === "fees") {
      // Sort by number of currencies as a proxy for value
      filteredExchanges.sort((a, b) => a.features.currencies - b.features.currencies);
    }

    return NextResponse.json(
      {
        exchanges: filteredExchanges,
        total: filteredExchanges.length,
        filters: {
          type: type || "all",
          sort: sort || "default",
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch exchange data:", error);

    return NextResponse.json(
      {
        error: "取引所データの取得に失敗しました",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
