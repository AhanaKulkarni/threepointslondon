import { NextRequest, NextResponse } from "next/server";
import { runNewsIngestion } from "@/lib/rss-fetcher";

export async function POST(req: NextRequest) {
  try {
    const result = await runNewsIngestion();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await runNewsIngestion();
    return NextResponse.json({
      ...result,
      trigger: "automated-cron",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
