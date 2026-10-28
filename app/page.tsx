import React from "react";
import Link from "next/link";
import { getArticles, getMostReadArticles, getSiteData } from "@/lib/store";
import AdSlot from "@/components/AdSlot";
import MostRead from "@/components/MostRead";
import NumbersBand from "@/components/NumbersBand";
import CommunityTeaser from "@/components/CommunityTeaser";
import { formatTimeAgo, getClubBorderClass, getClubTextClass } from "@/lib/utils";

export const revalidate = 0; // Dynamic server rendering for live updates

export default function HomePage() {
  const allArticles = getArticles();
  const siteData = getSiteData();

  // Lead story is either marked isLead or the latest exclusive
  const leadArticle =
    allArticles.find((a) => a.isLead) ||
    allArticles.find((a) => a.isExclusive) ||
    allArticles[0];

  // Secondary top stories
  const topSecondary = allArticles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 3);

  // Filter desk stories for The Three Desks
  const arsenalArticles = allArticles.filter((a) => a.club === "arsenal").slice(0, 4);
  const chelseaArticles = allArticles.filter((a) => a.club === "chelsea").slice(0, 4);
  const tottenhamArticles = allArticles.filter((a) => a.club === "tottenham").slice(0, 4);

  // Latest auto-ingested stories (if any)
  const recentAuto = allArticles.filter((a) => a.isAutoIngested).slice(0, 3);

  // Pre-calculate Most Read tabs
  const mostReadData = {
    all: getMostReadArticles("all", 4),
    arsenal: getMostReadArticles("arsenal", 4),
    chelsea: getMostReadArticles("chelsea", 4),
    tottenham: getMostReadArticles("tottenham", 4),
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
      {/* Newly Ingested Alert Banner (when automated news arrives) */}
      {recentAuto.length > 0 && (
        <div className="mb-6 bg-surface border border-hairline p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy">
              Live Wire: {recentAuto[0].title}
            </span>
          </div>
          <Link
            href={`/article/${recentAuto[0].slug}`}
            className="text-xs font-bold text-indigo hover:text-ember transition-colors"
          >
            Read latest update →
          </Link>
        </div>
      )}

      {/* Hero Grid: Lead Story + Secondary Stack */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-hairline">
        {/* Left / Lead Story (7 cols on desktop) */}
        {leadArticle && (
          <div className="lg:col-span-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {leadArticle.isExclusive && (
                  <span className="bg-ember text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-wider rounded-xs">
                    EXCLUSIVE
                  </span>
                )}
                <span className={`text-xs font-extrabold uppercase tracking-wider ${getClubTextClass(leadArticle.club)}`}>
                  {leadArticle.club === "all" ? "LONDON DESKS" : leadArticle.club}
                </span>
                <span className="text-muted/60">•</span>
                <span className="text-xs font-bold text-muted uppercase">
                  {leadArticle.subDesk || leadArticle.desk}
                </span>
              </div>

              <Link href={`/article/${leadArticle.slug}`}>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight tracking-tight group-hover:text-indigo transition-colors mb-3">
                  {leadArticle.title}
                </h1>
              </Link>

              <p className="font-body text-base sm:text-lg text-[#333] leading-relaxed mb-4">
                {leadArticle.excerpt}
              </p>

              {leadArticle.imageUrl && (
                <Link href={`/article/${leadArticle.slug}`} className="block overflow-hidden rounded-xs my-4">
                  <img
                    src={leadArticle.imageUrl}
                    alt={leadArticle.title}
                    className="w-full h-[260px] sm:h-[340px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-muted pt-2 border-t border-hairline">
              <Link href="/author/vayam-lahoti" className="hover:text-navy font-bold">
                {leadArticle.authorName}
              </Link>
              <span>•</span>
              <span>{leadArticle.readTime}</span>
              <span>•</span>
              <span>{formatTimeAgo(leadArticle.publishedAt)}</span>
            </div>
          </div>
        )}

        {/* Right Stack: 3 Priority Pieces (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-hairline">
          {topSecondary.map((article) => (
            <div key={article.id} className="py-4 first:pt-0 last:pb-0 flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${getClubTextClass(article.club)}`}>
                    {article.club}
                  </span>
                  <span className="text-muted/60">•</span>
                  <span className="text-[11px] font-bold text-muted uppercase">
                    {article.subDesk || article.desk}
                  </span>
                </div>

                <Link href={`/article/${article.slug}`}>
                  <h2 className="font-headline font-bold text-lg sm:text-xl text-ink leading-snug group-hover:text-indigo transition-colors mb-2">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-muted line-clamp-2 mb-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted pt-1">
                <span className="font-semibold">{article.authorName}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{formatTimeAgo(article.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AD / SPONSOR: 970x250 Below Hero */}
      <AdSlot id="billboard_970x250" label="AD — 970×250 BILLBOARD · BELOW THE LEAD STORY, HEIGHT RESERVED" />

      {/* THE THREE DESKS */}
      <section className="my-10">
        <div className="border-b border-hairline pb-2 mb-6 flex items-center justify-between">
          <h2 className="font-display font-extrabold text-sm sm:text-base text-navy uppercase tracking-wider">
            The Three Desks
          </h2>
          <span className="text-xs text-muted font-bold hidden sm:inline">
            London's independent coverage
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Arsenal Column */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#E8192C]">
              <span className="font-display font-black text-sm uppercase text-[#E8192C]">
                Arsenal
              </span>
              <Link
                href="/arsenal"
                className="text-xs font-bold text-muted hover:text-[#E8192C] transition-colors"
              >
                All Arsenal →
              </Link>
            </div>

            <div className="divide-y divide-hairline">
              {arsenalArticles.map((art, idx) => (
                <div key={art.id} className="py-3 group">
                  <div className="text-[10px] font-extrabold text-muted uppercase tracking-wider mb-1">
                    {art.subDesk || art.desk}
                  </div>
                  <Link
                    href={`/article/${art.slug}`}
                    className={`font-headline font-bold text-ink group-hover:text-[#E8192C] transition-colors block leading-snug ${
                      idx === 0 ? "text-base sm:text-lg mb-1" : "text-sm mb-1"
                    }`}
                  >
                    {art.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{art.authorName}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chelsea Column */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#1C6BB0]">
              <span className="font-display font-black text-sm uppercase text-[#1C6BB0]">
                Chelsea
              </span>
              <Link
                href="/chelsea"
                className="text-xs font-bold text-muted hover:text-[#1C6BB0] transition-colors"
              >
                All Chelsea →
              </Link>
            </div>

            <div className="divide-y divide-hairline">
              {chelseaArticles.map((art, idx) => (
                <div key={art.id} className="py-3 group">
                  <div className="text-[10px] font-extrabold text-muted uppercase tracking-wider mb-1">
                    {art.subDesk || art.desk}
                  </div>
                  <Link
                    href={`/article/${art.slug}`}
                    className={`font-headline font-bold text-ink group-hover:text-[#1C6BB0] transition-colors block leading-snug ${
                      idx === 0 ? "text-base sm:text-lg mb-1" : "text-sm mb-1"
                    }`}
                  >
                    {art.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{art.authorName}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tottenham Column */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#24376B]">
              <span className="font-display font-black text-sm uppercase text-[#24376B]">
                Tottenham
              </span>
              <Link
                href="/tottenham"
                className="text-xs font-bold text-muted hover:text-[#24376B] transition-colors"
              >
                All Tottenham →
              </Link>
            </div>

            <div className="divide-y divide-hairline">
              {tottenhamArticles.map((art, idx) => (
                <div key={art.id} className="py-3 group">
                  <div className="text-[10px] font-extrabold text-muted uppercase tracking-wider mb-1">
                    {art.subDesk || art.desk}
                  </div>
                  <Link
                    href={`/article/${art.slug}`}
                    className={`font-headline font-bold text-ink group-hover:text-[#24376B] transition-colors block leading-snug ${
                      idx === 0 ? "text-base sm:text-lg mb-1" : "text-sm mb-1"
                    }`}
                  >
                    {art.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{art.authorName}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE NUMBERS BEHIND THE FOOTBALL */}
      <NumbersBand stats={siteData.dataStats} />

      {/* LOWER SECTION: MOST READ & SIDEBAR RAIL */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
        {/* Most Read (8 cols) */}
        <div className="lg:col-span-8">
          <MostRead initialArticles={mostReadData} />
        </div>

        {/* Sticky Sidebar MPU / Half-Page (4 cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <AdSlot
            id="rail_300x600"
            label="AD — 300×600 HALF-PAGE · STICKY SEQUENTIAL · 30s REFRESH"
          />
        </div>
      </section>

      {/* COMMUNITY DESK */}
      <CommunityTeaser posts={siteData.community} />
    </div>
  );
}
