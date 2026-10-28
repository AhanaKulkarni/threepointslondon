import { NextRequest, NextResponse } from "next/server";
import { getSiteData, updateDataStat, updateClubStandings } from "@/lib/store";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({
    success: true,
    dataStats: data.dataStats,
    standings: data.standings,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, club, updates } = body;

    if (type === "dataStat" && club && updates) {
      updateDataStat(club, updates);
      return NextResponse.json({ success: true, message: `Data stat for ${club} updated` });
    }

    if (type === "standings" && club && updates) {
      updateClubStandings(club, updates);
      return NextResponse.json({ success: true, message: `Standings for ${club} updated` });
    }

    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
