import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getSiteData, recordArticleView } from "@/lib/store";
import AdSlot from "@/components/AdSlot";
import { formatDate, getClubBorderClass, getClubTextClass } from "@/lib/utils";
import { Share2, Bookmark, Clock, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | Three Points London" };

  return {
    title: `${article.title} | Three Points London`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: article.imageUrl ? [article.imageUrl] : [],
      publishedTime: article.publishedAt,
      authors: [article.authorName],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Increment view count for the Most Read engine
  recordArticleView(slug);

  const siteData = getSiteData();
  const author = siteData.authors.find((a) => a.id === article.authorId) || siteData.authors[0];
  const allArticles = getArticles();

  // Related stories (more on this)
  const moreOnThis = allArticles
    .filter((a) => a.id !== article.id && (a.club === article.club || a.desk === article.desk))
    .slice(0, 4);

  // Read Next across the three clubs
  const readNextArsenal = allArticles.find((a) => a.club === "arsenal" && a.id !== article.id);
  const readNextChelsea = allArticles.find((a) => a.club === "chelsea" && a.id !== article.id);
  const readNextSpurs = allArticles.find((a) => a.club === "tottenham" && a.id !== article.id);

  // Standings / next match for this club
  const clubStanding =
    article.club !== "all" ? siteData.standings[article.club] : siteData.standings.arsenal;

  return (
    <article className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD NewsArticle Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: article.imageUrl ? [article.imageUrl] : [],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: {
              "@type": "Person",
              name: author.name,
              url: `https://threepointslondon.com/author/${author.slug}`,
            },
            publisher: {
              "@type": "Organization",
              name: "Three Points London",
              logo: {
                "@type": "ImageObject",
                url: "https://threepointslondon.com/logo.png",
              },
            },
            articleSection: article.club,
            isAccessibleForFree: true,
          }),
        }}
      />

      {/* Breadcrumb Trail */}
      <nav className="text-xs font-semibold text-muted flex items-center gap-2 mb-4">
        <Link href="/" className="hover:text-navy">
          Home
        </Link>
        <span>›</span>
        <Link href={`/${article.club}`} className="hover:text-navy capitalize">
          {article.club}
        </Link>
        <span>›</span>
        <span className="capitalize">{article.desk}</span>
      </nav>

      {/* Main Grid: Editorial Column (8) + Rail (4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Content Body */}
        <div className="lg:col-span-8">
          {/* Header Badges */}
          <div className="flex items-center gap-2 mb-3">
            {article.isExclusive && (
              <span className="bg-ember text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                EXCLUSIVE
              </span>
            )}
            <span className={`text-xs font-extrabold uppercase tracking-wider ${getClubTextClass(article.club)}`}>
              {article.club}
            </span>
            <span className="text-muted/60">•</span>
            <span className="text-xs font-bold text-muted uppercase">
              {article.subDesk || article.desk}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Standfirst / Excerpt */}
          <p className="font-body text-lg sm:text-xl text-[#333] leading-relaxed mb-6 font-medium">
            {article.excerpt}
          </p>

          {/* Byline Strip */}
          <div className="flex flex-wrap items-center justify-between py-4 border-y border-hairline my-6 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Link
                href={`/author/${author.slug}`}
                className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-display font-black text-xs hover:bg-indigo transition-colors"
              >
                {author.initials}
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/author/${author.slug}`}
                    className="font-headline font-bold text-sm text-navy hover:text-indigo"
                  >
                    {author.name}
                  </Link>
                  <span className="text-muted">• {author.role}</span>
                </div>
                <div className="text-muted text-[11px] flex items-center gap-2 mt-0.5">
                  <span>Published {formatDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted">
              <button
                className="p-2 border border-hairline rounded hover:bg-surface hover:text-navy transition-colors flex items-center gap-1"
                title="Share this piece"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="font-semibold text-[11px]">Share</span>
              </button>
              <button
                className="p-2 border border-hairline rounded hover:bg-surface hover:text-navy transition-colors flex items-center gap-1"
                title="Save"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="font-semibold text-[11px]">Save</span>
              </button>
            </div>
          </div>

          {/* Lead Image */}
          {article.imageUrl && (
            <figure className="mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-xs"
              />
              {article.imageCaption && (
                <figcaption className="text-xs text-muted mt-2 italic flex items-center justify-between">
                  <span>{article.imageCaption}</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Key Facts Box (if Arsenal piece) */}
          {article.club === "arsenal" && (
            <div className="bg-surface border-l-4 border-l-[#E8192C] border-hairline border p-4 my-6 rounded-r-xs">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted mb-2">
                KEY FACTS · WILLIAM SALIBA
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="block text-muted text-[10px]">Position</span>
                  <span className="font-bold text-navy">Centre-back</span>
                </div>
                <div>
                  <span className="block text-muted text-[10px]">Age</span>
                  <span className="font-bold text-navy">25</span>
                </div>
                <div>
                  <span className="block text-muted text-[10px]">Contract</span>
                  <span className="font-bold text-navy">Until June 2030</span>
                </div>
                <div>
                  <span className="block text-muted text-[10px]">Reported Fee</span>
                  <span className="font-bold text-navy">£27m (2019)</span>
                </div>
              </div>
            </div>
          )}

          {/* In-Article Ad Unit 1 */}
          <AdSlot id="infeed_728x90" label="AD — 728×90 IN-ARTICLE · UNIT 1 OF 3 · HEIGHT RESERVED" />

          {/* Article Body Content */}
          <div className="editorial-prose text-ink font-body">
            {article.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Interactive Data Chart Callout (As shown on page 5 & 11) */}
          {article.slug.includes("rest-defence") && (
            <div className="my-8 p-6 bg-surface border border-hairline rounded-xs">
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E8192C]">
                    CHART · TACTICAL MODEL
                  </span>
                  <h4 className="font-headline font-bold text-base text-navy">
                    Expected goals against per game, first eleven matches
                  </h4>
                  <p className="text-xs text-muted">
                    Premier League, 2022/23 to 2026/27. Lower is better.
                  </p>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="space-y-3 pt-2 text-xs font-semibold">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2022/23</span>
                    <span className="font-bold">1.18</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-xs overflow-hidden">
                    <div className="bg-navy h-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2023/24</span>
                    <span className="font-bold">1.04</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-xs overflow-hidden">
                    <div className="bg-navy h-full" style={{ width: "58%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2024/25</span>
                    <span className="font-bold">0.96</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-xs overflow-hidden">
                    <div className="bg-navy h-full" style={{ width: "52%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2025/26</span>
                    <span className="font-bold">0.91 (Lowest)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-xs overflow-hidden">
                    <div className="bg-green-600 h-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-ember font-bold">
                    <span>2026/27 (Current Season)</span>
                    <span>1.42 (+56%)</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-xs overflow-hidden">
                    <div className="bg-ember h-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-muted italic">
                Source: Opta via FBref, correct to October 2026. Compiled by Three Points London.
              </div>
            </div>
          )}

          {/* Data Table */}
          {article.slug.includes("rest-defence") && (
            <div className="my-8 overflow-x-auto">
              <table className="w-full text-left text-xs border border-hairline">
                <thead className="bg-[#1D2B45] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4 font-extrabold">PHASE OF PLAY</th>
                    <th className="py-2.5 px-4 font-extrabold">2025/26</th>
                    <th className="py-2.5 px-4 font-extrabold">2026/27</th>
                    <th className="py-2.5 px-4 font-extrabold">CHANGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <tr className="bg-red-50/40">
                    <td className="py-2.5 px-4 font-bold text-navy">Counter-attack</td>
                    <td className="py-2.5 px-4">0.21</td>
                    <td className="py-2.5 px-4 font-bold">0.68</td>
                    <td className="py-2.5 px-4 font-bold text-[#E8192C]">+0.47</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Open play, settled</td>
                    <td className="py-2.5 px-4">0.44</td>
                    <td className="py-2.5 px-4">0.41</td>
                    <td className="py-2.5 px-4 text-green-600">-0.03</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Set pieces</td>
                    <td className="py-2.5 px-4">0.19</td>
                    <td className="py-2.5 px-4">0.24</td>
                    <td className="py-2.5 px-4">+0.05</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">High turnover against</td>
                    <td className="py-2.5 px-4">0.07</td>
                    <td className="py-2.5 px-4">0.09</td>
                    <td className="py-2.5 px-4">+0.02</td>
                  </tr>
                  <tr className="bg-surface font-black">
                    <td className="py-2.5 px-4 text-navy">TOTAL xGA</td>
                    <td className="py-2.5 px-4">0.91</td>
                    <td className="py-2.5 px-4">1.42</td>
                    <td className="py-2.5 px-4 text-[#E8192C]">+0.51</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Pull Quote Box */}
          <div className="my-8 p-6 bg-surface border-l-4 border-l-navy border border-hairline rounded-r-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-muted mb-2 block">
              THE KEY POINT
            </span>
            <blockquote className="font-display font-extrabold text-lg sm:text-xl text-navy leading-snug mb-3">
              "The press has not stopped working. What has changed is who is left behind it when it fails — and that is a choice Arteta has made deliberately."
            </blockquote>
            <cite className="text-xs font-bold text-muted not-italic block">
              — Vayam Lahoti, Founder & Editor
            </cite>
          </div>

          {/* End of article Ad Unit */}
          <AdSlot id="infeed_728x90" label="AD — 728×90 END OF ARTICLE · HIGHEST-COMPLETION POSITION" />

          {/* Author Box */}
          <div className="bg-surface border border-hairline p-6 rounded-xs my-8 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center font-display font-black text-lg shrink-0">
              {author.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/author/${author.slug}`}
                  className="font-headline font-bold text-lg text-navy hover:text-indigo"
                >
                  {author.name}
                </Link>
                <span className="text-xs font-bold text-muted bg-white px-2 py-0.5 rounded border border-hairline">
                  {author.role}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mt-2 mb-3">
                {author.bio}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold">
                <Link
                  href={`/author/${author.slug}`}
                  className="text-indigo hover:text-ember transition-colors"
                >
                  All pieces by {author.name.split(" ")[0]} ({author.piecesCount}) →
                </Link>
                {author.twitter && (
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-navy"
                  >
                    @vayamlahoti
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* "MORE ON THIS" */}
          <section className="my-10 border-t border-hairline pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-navy">
                More On This
              </h3>
              <span className="text-xs text-muted font-bold">
                Matched on subject, not on traffic
              </span>
            </div>

            <div className="divide-y divide-hairline">
              {moreOnThis.map((m) => (
                <div key={m.id} className="py-3 flex items-center justify-between gap-4 group">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-muted tracking-wider block mb-0.5">
                      {m.subDesk || m.desk}
                    </span>
                    <Link
                      href={`/article/${m.slug}`}
                      className="font-headline font-bold text-sm text-ink group-hover:text-indigo transition-colors"
                    >
                      {m.title}
                    </Link>
                  </div>
                  <span className="text-xs text-muted shrink-0 font-semibold">{m.readTime}</span>
                </div>
              ))}
            </div>
          </section>

          {/* "READ NEXT" Across London Desks */}
          <section className="my-10 border-t border-hairline pt-6">
            <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-navy mb-4">
              Read Next
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {readNextArsenal && (
                <div className="border border-hairline p-4 rounded-xs border-t-2 border-t-[#E8192C]">
                  <span className="text-[10px] font-extrabold uppercase text-[#E8192C] block mb-1">
                    Arsenal
                  </span>
                  <Link
                    href={`/article/${readNextArsenal.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-navy hover:text-[#E8192C] transition-colors line-clamp-2"
                  >
                    {readNextArsenal.title}
                  </Link>
                </div>
              )}
              {readNextChelsea && (
                <div className="border border-hairline p-4 rounded-xs border-t-2 border-t-[#1C6BB0]">
                  <span className="text-[10px] font-extrabold uppercase text-[#1C6BB0] block mb-1">
                    Chelsea
                  </span>
                  <Link
                    href={`/article/${readNextChelsea.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-navy hover:text-[#1C6BB0] transition-colors line-clamp-2"
                  >
                    {readNextChelsea.title}
                  </Link>
                </div>
              )}
              {readNextSpurs && (
                <div className="border border-hairline p-4 rounded-xs border-t-2 border-t-[#24376B]">
                  <span className="text-[10px] font-extrabold uppercase text-[#24376B] block mb-1">
                    Tottenham
                  </span>
                  <Link
                    href={`/article/${readNextSpurs.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-navy hover:text-[#24376B] transition-colors line-clamp-2"
                  >
                    {readNextSpurs.title}
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sticky Rail */}
        <aside className="lg:col-span-4 space-y-6 sticky top-20">
          {/* Matchday Widget */}
          {clubStanding && (
            <div className="bg-surface border border-hairline p-4 rounded-xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted mb-2">
                NEXT UP · {clubStanding.nextMatch.competition}
              </div>
              <div className="font-headline font-bold text-base text-navy">
                {article.club === "arsenal" ? "Arsenal" : article.club === "chelsea" ? "Chelsea" : "Tottenham"}{" "}
                v {clubStanding.nextMatch.opponent}
              </div>
              <div className="text-xs text-muted mt-1">
                {clubStanding.nextMatch.date} · {clubStanding.nextMatch.venue}
              </div>
              <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between text-xs font-semibold">
                <span>Last fixture</span>
                <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-bold">
                  {clubStanding.lastMatch.score} {clubStanding.lastMatch.opponent} ({clubStanding.lastMatch.result})
                </span>
              </div>
            </div>
          )}

          {/* Sticky Rail Ad */}
          <AdSlot id="rail_300x600" label="AD — 300×600 HALF-PAGE · STICKY 30s REFRESH" />

          {/* Trending in London */}
          <div className="bg-white border border-hairline p-4 rounded-xs">
            <div className="flex items-center gap-2 pb-2 mb-3 border-b border-hairline">
              <TrendingUp className="w-3.5 h-3.5 text-ember" />
              <span className="font-display font-extrabold text-xs uppercase text-navy tracking-wider">
                Trending (Last 6 Hours)
              </span>
            </div>
            <div className="space-y-3">
              {allArticles.slice(0, 4).map((art, idx) => (
                <div key={art.id} className="flex items-start gap-2 text-xs">
                  <span className="font-black text-muted/50 text-sm">{idx + 1}</span>
                  <Link
                    href={`/article/${art.slug}`}
                    className="font-headline font-bold text-ink hover:text-indigo leading-snug line-clamp-2"
                  >
                    {art.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Standards Pledge */}
          <div className="bg-surface border border-hairline p-4 rounded-xs text-xs">
            <div className="flex items-center gap-1.5 font-bold text-navy mb-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>How We Work</span>
            </div>
            <p className="text-muted leading-relaxed mb-3">
              Every data piece names its source and its date. Where we are uncertain, we say so. Corrections are published, never quietly edited.
            </p>
            <Link
              href="/editorial-standards"
              className="font-bold text-indigo hover:text-ember transition-colors"
            >
              Our editorial standards →
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
