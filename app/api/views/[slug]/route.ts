import { NextRequest, NextResponse } from "next/server";
import { recordArticleView } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const views = recordArticleView(slug);
    return NextResponse.json({ success: true, slug, views });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
