import { NextRequest, NextResponse } from "next/server";
import { getSiteData, updateTickerItems } from "@/lib/store";
import { TickerItem } from "@/lib/types";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({ success: true, ticker: data.ticker });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.ticker)) {
      return NextResponse.json({ success: false, error: "Ticker array required" }, { status: 400 });
    }

    updateTickerItems(body.ticker as TickerItem[]);
    return NextResponse.json({ success: true, message: "Ticker updated" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
