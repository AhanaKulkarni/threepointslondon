import React from "react";
import Link from "next/link";
import { getArticles, getMostReadArticles, getSiteData } from "@/lib/store";
import AdSlot from "@/components/AdSlot";
import MostRead from "@/components/MostRead";
import NumbersBand from "@/components/NumbersBand";
import CommunityTeaser from "@/components/CommunityTeaser";
import { formatTimeAgo, getClubBorderClass, getClubTextClass } from "@/lib/utils";
import { ArrowUpRight, ShieldCheck, Flame, TrendingUp } from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default function HomePage() {
  const allArticles = getArticles();
  const siteData = getSiteData();

  // Lead story
  const leadArticle =
    allArticles.find((a) => a.isLead) ||
    allArticles.find((a) => a.isExclusive) ||
    allArticles[0];

  // Secondary top stories
  const topSecondary = allArticles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 3);

  // Club desks
  const arsenalArticles = allArticles.filter((a) => a.club === "arsenal").slice(0, 4);
  const chelseaArticles = allArticles.filter((a) => a.club === "chelsea").slice(0, 4);
  const tottenhamArticles = allArticles.filter((a) => a.club === "tottenham").slice(0, 4);

  // Pre-calculate Most Read tabs
  const mostReadData = {
    all: getMostReadArticles("all", 4),
    arsenal: getMostReadArticles("arsenal", 4),
    chelsea: getMostReadArticles("chelsea", 4),
    tottenham: getMostReadArticles("tottenham", 4),
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* HERO SECTION: Lead Magazine Cover Story + 3 Priority Briefs */}
      <section className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Lead Feature Story (7 cols) */}
        {leadArticle && (
          <div className="lg:col-span-7 bg-white border border-hairline rounded-sm overflow-hidden shadow-xs hover-elevate transition-all group flex flex-col justify-between">
            <div>
              {/* Lead Image with Gradient Overlay */}
              {leadArticle.imageUrl && (
                <Link
                  href={`/article/${leadArticle.slug}`}
                  className="block relative overflow-hidden aspect-[16/10] sm:aspect-[16/9]"
                >
                  <img
                    src={leadArticle.imageUrl}
                    alt={leadArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Floating Exclusive Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {leadArticle.isExclusive && (
                      <span className="bg-ember text-white text-[11px] font-black uppercase px-2.5 py-1 tracking-wider rounded-xs shadow-md flex items-center gap-1.5">
                        <Flame className="w-3 h-3" />
                        EXCLUSIVE
                      </span>
                    )}
                    <span className="bg-navy/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 tracking-wider rounded-xs">
                      {leadArticle.subDesk || leadArticle.desk}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-300 block mb-1">
                      {leadArticle.club} Desk
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl leading-snug drop-shadow-md">
                      {leadArticle.title}
                    </h2>
                  </div>
                </Link>
              )}

              {/* Text Container */}
              <div className="p-6">
                <p className="font-body text-base sm:text-lg text-[#333] leading-relaxed mb-4">
                  {leadArticle.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-muted pt-4 border-t border-hairline">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-navy text-white text-[10px] font-black flex items-center justify-center">
                      V
                    </span>
                    <span className="font-bold text-navy">{leadArticle.authorName}</span>
                    <span>•</span>
                    <span>{leadArticle.readTime}</span>
                  </div>
                  <span className="text-gray-400 font-medium">
                    {formatTimeAgo(leadArticle.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Stack: 3 London Priority Pieces (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="pb-2 border-b-2 border-navy flex items-center justify-between">
            <span className="font-display font-black text-xs uppercase tracking-wider text-navy">
              London Priority Briefing
            </span>
            <span className="text-[11px] font-bold text-muted">Chelsea · Spurs · Arsenal</span>
          </div>

          <div className="space-y-4">
            {topSecondary.map((article, idx) => (
              <div
                key={article.id}
                className={`reveal-card delay-${(idx + 1) * 100} bg-white border border-hairline p-4 rounded-sm hover-elevate transition-all group flex gap-4 items-center`}
              >
                {/* Thumbnail if present */}
                {article.imageUrl && (
                  <Link
                    href={`/article/${article.slug}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xs relative"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${getClubTextClass(article.club)}`}>
                      {article.club}
                    </span>
                    <span className="text-muted/60 text-xs">•</span>
                    <span className="text-[10px] font-extrabold text-muted uppercase">
                      {article.subDesk || article.desk}
                    </span>
                  </div>

                  <Link href={`/article/${article.slug}`}>
                    <h3 className="font-headline font-bold text-sm sm:text-base text-ink leading-snug group-hover:text-indigo transition-colors line-clamp-2 mb-1.5">
                      {article.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 text-[11px] text-muted">
                    <span>{article.authorName}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD / SPONSOR: 970x250 Below Hero */}
      <AdSlot id="billboard_970x250" label="AD — 970×250 BILLBOARD · BELOW THE LEAD STORY, HEIGHT RESERVED" />

      {/* THE THREE DESKS: London Club Hubs */}
      <section className="reveal-on-scroll">
        <div className="border-b border-hairline pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-black text-base sm:text-lg text-navy uppercase tracking-wider">
              The Three Desks
            </h2>
            <span className="text-xs bg-surface text-muted px-2 py-0.5 rounded font-bold">
              Independent London Newsroom
            </span>
          </div>
          <span className="text-xs text-muted font-bold hidden sm:inline">
            Nothing else covered.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. ARSENAL DESK */}
          <div className="reveal-card delay-100 bg-white border border-hairline rounded-sm overflow-hidden shadow-xs hover-elevate transition-all flex flex-col justify-between">
            <div>
              {/* Red Header Bar */}
              <div className="bg-[#E8192C] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="font-display font-black text-base uppercase tracking-tight">
                    Arsenal
                  </span>
                </div>
                <Link
                  href="/arsenal"
                  className="text-xs font-extrabold uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1"
                >
                  Desk →
                </Link>
              </div>

              {/* Featured piece with thumbnail */}
              {arsenalArticles[0] && (
                <div className="p-4 border-b border-hairline">
                  {arsenalArticles[0].imageUrl && (
                    <Link
                      href={`/article/${arsenalArticles[0].slug}`}
                      className="block aspect-video overflow-hidden rounded-xs mb-3"
                    >
                      <img
                        src={arsenalArticles[0].imageUrl}
                        alt={arsenalArticles[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <span className="text-[10px] font-black uppercase text-[#E8192C] block mb-1">
                    {arsenalArticles[0].subDesk || "FEATURE"}
                  </span>
                  <Link
                    href={`/article/${arsenalArticles[0].slug}`}
                    className="font-headline font-bold text-sm sm:text-base text-ink hover:text-[#E8192C] transition-colors leading-snug block mb-2"
                  >
                    {arsenalArticles[0].title}
                  </Link>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {arsenalArticles[0].excerpt}
                  </p>
                </div>
              )}

              {/* Sub-articles */}
              <div className="divide-y divide-hairline px-4">
                {arsenalArticles.slice(1, 4).map((art) => (
                  <div key={art.id} className="py-3">
                    <span className="text-[9px] font-extrabold uppercase text-muted block mb-0.5">
                      {art.subDesk || art.desk}
                    </span>
                    <Link
                      href={`/article/${art.slug}`}
                      className="font-headline font-bold text-xs sm:text-sm text-ink hover:text-[#E8192C] transition-colors line-clamp-2"
                    >
                      {art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface border-t border-hairline mt-3">
              <Link
                href="/arsenal"
                className="w-full block text-center py-2 bg-white border border-hairline text-xs font-bold text-navy hover:text-[#E8192C] rounded-xs shadow-xs"
              >
                All Arsenal Coverage →
              </Link>
            </div>
          </div>

          {/* 2. CHELSEA DESK */}
          <div className="reveal-card delay-200 bg-white border border-hairline rounded-sm overflow-hidden shadow-xs hover-elevate transition-all flex flex-col justify-between">
            <div>
              {/* Blue Header Bar */}
              <div className="bg-[#1C6BB0] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="font-display font-black text-base uppercase tracking-tight">
                    Chelsea
                  </span>
                </div>
                <Link
                  href="/chelsea"
                  className="text-xs font-extrabold uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1"
                >
                  Desk →
                </Link>
              </div>

              {/* Featured piece with thumbnail */}
              {chelseaArticles[0] && (
                <div className="p-4 border-b border-hairline">
                  {chelseaArticles[0].imageUrl && (
                    <Link
                      href={`/article/${chelseaArticles[0].slug}`}
                      className="block aspect-video overflow-hidden rounded-xs mb-3"
                    >
                      <img
                        src={chelseaArticles[0].imageUrl}
                        alt={chelseaArticles[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <span className="text-[10px] font-black uppercase text-[#1C6BB0] block mb-1">
                    {chelseaArticles[0].subDesk || "FEATURE"}
                  </span>
                  <Link
                    href={`/article/${chelseaArticles[0].slug}`}
                    className="font-headline font-bold text-sm sm:text-base text-ink hover:text-[#1C6BB0] transition-colors leading-snug block mb-2"
                  >
                    {chelseaArticles[0].title}
                  </Link>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {chelseaArticles[0].excerpt}
                  </p>
                </div>
              )}

              {/* Sub-articles */}
              <div className="divide-y divide-hairline px-4">
                {chelseaArticles.slice(1, 4).map((art) => (
                  <div key={art.id} className="py-3">
                    <span className="text-[9px] font-extrabold uppercase text-muted block mb-0.5">
                      {art.subDesk || art.desk}
                    </span>
                    <Link
                      href={`/article/${art.slug}`}
                      className="font-headline font-bold text-xs sm:text-sm text-ink hover:text-[#1C6BB0] transition-colors line-clamp-2"
                    >
                      {art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface border-t border-hairline mt-3">
              <Link
                href="/chelsea"
                className="w-full block text-center py-2 bg-white border border-hairline text-xs font-bold text-navy hover:text-[#1C6BB0] rounded-xs shadow-xs"
              >
                All Chelsea Coverage →
              </Link>
            </div>
          </div>

          {/* 3. TOTTENHAM DESK */}
          <div className="reveal-card delay-300 bg-white border border-hairline rounded-sm overflow-hidden shadow-xs hover-elevate transition-all flex flex-col justify-between">
            <div>
              {/* Navy Header Bar */}
              <div className="bg-[#24376B] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span className="font-display font-black text-base uppercase tracking-tight">
                    Tottenham
                  </span>
                </div>
                <Link
                  href="/tottenham"
                  className="text-xs font-extrabold uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1"
                >
                  Desk →
                </Link>
              </div>

              {/* Featured piece with thumbnail */}
              {tottenhamArticles[0] && (
                <div className="p-4 border-b border-hairline">
                  {tottenhamArticles[0].imageUrl && (
                    <Link
                      href={`/article/${tottenhamArticles[0].slug}`}
                      className="block aspect-video overflow-hidden rounded-xs mb-3"
                    >
                      <img
                        src={tottenhamArticles[0].imageUrl}
                        alt={tottenhamArticles[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}
                  <span className="text-[10px] font-black uppercase text-[#8FA5E8] block mb-1">
                    {tottenhamArticles[0].subDesk || "FEATURE"}
                  </span>
                  <Link
                    href={`/article/${tottenhamArticles[0].slug}`}
                    className="font-headline font-bold text-sm sm:text-base text-ink hover:text-[#24376B] transition-colors leading-snug block mb-2"
                  >
                    {tottenhamArticles[0].title}
                  </Link>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {tottenhamArticles[0].excerpt}
                  </p>
                </div>
              )}

              {/* Sub-articles */}
              <div className="divide-y divide-hairline px-4">
                {tottenhamArticles.slice(1, 4).map((art) => (
                  <div key={art.id} className="py-3">
                    <span className="text-[9px] font-extrabold uppercase text-muted block mb-0.5">
                      {art.subDesk || art.desk}
                    </span>
                    <Link
                      href={`/article/${art.slug}`}
                      className="font-headline font-bold text-xs sm:text-sm text-ink hover:text-[#24376B] transition-colors line-clamp-2"
                    >
                      {art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface border-t border-hairline mt-3">
              <Link
                href="/tottenham"
                className="w-full block text-center py-2 bg-white border border-hairline text-xs font-bold text-navy hover:text-[#24376B] rounded-xs shadow-xs"
              >
                All Tottenham Coverage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE NUMBERS BEHIND THE FOOTBALL: Centerpiece Data Section */}
      <div className="reveal-on-scroll">
        <NumbersBand stats={siteData.dataStats} />
      </div>

      {/* LOWER SECTION: MOST READ & SIDEBAR RAIL */}
      <section className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Most Read (8 cols) */}
        <div className="lg:col-span-8">
          <MostRead initialArticles={mostReadData} />
        </div>

        {/* Sticky Sidebar MPU / Half-Page (4 cols) */}
        <div className="lg:col-span-4 sticky top-20 space-y-6">
          <AdSlot
            id="rail_300x600"
            label="AD — 300×600 HALF-PAGE · STICKY SEQUENTIAL · 30s REFRESH"
          />
        </div>
      </section>

      {/* COMMUNITY DESK */}
      <div className="reveal-on-scroll">
        <CommunityTeaser posts={siteData.community} />
      </div>
    </div>
  );
}
