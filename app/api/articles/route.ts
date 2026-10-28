import { NextRequest, NextResponse } from "next/server";
import { getArticles, addArticle } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const club = searchParams.get("club") || undefined;
  const desk = searchParams.get("desk") || undefined;

  const articles = getArticles(club, desk);
  return NextResponse.json({ success: true, articles });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.body || !body.club) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, body, club" },
        { status: 400 }
      );
    }

    const created = addArticle({
      slug:
        body.slug ||
        body.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") + `-${Date.now().toString().slice(-4)}`,
      title: body.title,
      excerpt: body.excerpt || body.body.slice(0, 160) + "...",
      body: body.body,
      club: body.club,
      desk: body.desk || "news",
      subDesk: body.subDesk || "ANALYSIS",
      authorId: body.authorId || "vayam-lahoti",
      authorName: body.authorName || "Vayam Lahoti",
      publishedAt: new Date().toISOString(),
      readTime: body.readTime || "5 min read",
      isExclusive: Boolean(body.isExclusive),
      isLead: Boolean(body.isLead),
      imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      imageCaption: body.imageCaption || "",
    });

    return NextResponse.json({ success: true, article: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
