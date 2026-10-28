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

export async function GET() {
  return NextResponse.json({
    status: "active",
    schedule: "Every 15-30 minutes (or on-demand)",
    targetClubs: ["Arsenal", "Chelsea", "Tottenham Hotspur"],
    policy: "Instant publish to live homepage",
  });
}
