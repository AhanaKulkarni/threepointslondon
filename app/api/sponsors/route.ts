import { NextRequest, NextResponse } from "next/server";
import { getSiteData, updateSponsorSlot } from "@/lib/store";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({ success: true, sponsors: data.sponsors });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, imageUrl, targetUrl, altText, isActive } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing slot id" }, { status: 400 });
    }

    const updated = updateSponsorSlot(id, {
      imageUrl: imageUrl || null,
      targetUrl: targetUrl || null,
      altText: altText || "Sponsor placement",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return NextResponse.json({ success: true, sponsor: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
