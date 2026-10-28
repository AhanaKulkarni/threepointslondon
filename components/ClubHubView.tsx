"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article, ClubStandings } from "@/lib/types";
import AdSlot from "@/components/AdSlot";
import { formatTimeAgo, getClubBorderClass, getClubTextClass } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ClubHubViewProps {
  club: "arsenal" | "chelsea" | "tottenham";
  clubTitle: string;
  tagline: string;
  themeColor: string;
  borderColor: string;
  standings?: ClubStandings;
  articles: Article[];
}

export default function ClubHubView({
  club,
  clubTitle,
  tagline,
  themeColor,
  borderColor,
  standings,
  articles,
}: ClubHubViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredArticles = articles.filter((a) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "exclusives") return a.isExclusive;
    return a.desk === activeFilter;
  });

  const leadStory = filteredArticles[0];
  const sideStories = filteredArticles.slice(1, 4);
  const feedStories = filteredArticles.slice(4);

  return (
    <div className="max-w-[1280px] mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* Club Desk Header */}
      <div className={`pb-4 sm:pb-6 border-b-2 ${borderColor} mb-5 sm:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full ${club === "arsenal" ? "bg-[#E8192C]" : club === "chelsea" ? "bg-[#1C6BB0]" : "bg-[#24376B]"}`}></span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted">
              London Desks
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-5xl uppercase tracking-tight text-navy">
            {clubTitle}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-muted mt-1">
            {tagline}
          </p>
        </div>

        {/* Position & Points Badge */}
        {standings && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-surface border border-hairline px-3 sm:px-4 py-1.5 sm:py-2 text-center rounded-xs">
              <span className="block text-[9px] sm:text-[10px] font-extrabold text-muted uppercase">
                POSITION
              </span>
              <span className="font-display font-black text-lg sm:text-xl text-navy">
                {standings.position}
              </span>
            </div>
            <div className="bg-surface border border-hairline px-3 sm:px-4 py-1.5 sm:py-2 text-center rounded-xs">
              <span className="block text-[9px] sm:text-[10px] font-extrabold text-muted uppercase">
                POINTS
              </span>
              <span className="font-display font-black text-lg sm:text-xl text-navy">
                {standings.points}
              </span>
            </div>
            {standings.nextMatch && (
              <div className="hidden sm:block bg-surface border border-hairline px-4 py-2 text-left rounded-xs">
                <span className="block text-[10px] font-extrabold text-muted uppercase">
                  NEXT UP
                </span>
                <span className="text-xs font-bold text-navy block">
                  v {standings.nextMatch.opponent}
                </span>
                <span className="text-[10px] text-gray-500">
                  {standings.nextMatch.date}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sub-Desk Filter Tabs (Mobile Scrollable) */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none items-center gap-1.5 sm:gap-2 pb-3 sm:pb-6 border-b border-hairline mb-6 sm:mb-8 text-xs font-bold">
        {[
          { key: "all", label: "All" },
          { key: "news", label: "News" },
          { key: "transfers", label: "Transfers" },
          { key: "matchday", label: "Matchday" },
          { key: "features", label: "Features" },
          { key: "exclusives", label: "EXCLUSIVES ONLY" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 rounded-xs transition-colors shrink-0 text-[11px] sm:text-xs ${
              activeFilter === f.key
                ? f.key === "exclusives"
                  ? "bg-ember text-white font-extrabold"
                  : "bg-navy text-white font-extrabold"
                : "bg-surface hover:bg-gray-200 text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Hero + Stack */}
      {leadStory ? (
        <section className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-hairline">
          {/* Lead Article */}
          <div className="lg:col-span-8 group bg-white border border-hairline p-4 sm:p-5 rounded-sm shadow-xs hover-elevate transition-all">
            {leadStory.imageUrl && (
              <a
                href={leadStory.sourceUrl || `/article/${leadStory.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xs mb-3 aspect-[16/9]"
              >
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </a>
            )}

            <div className="flex items-center gap-2 mb-2">
              {leadStory.isExclusive && (
                <span className="bg-ember text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                  EXCLUSIVE
                </span>
              )}
              <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider ${themeColor}`}>
                {leadStory.club}
              </span>
              <span className="text-muted/60">•</span>
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase">
                {leadStory.subDesk || leadStory.desk}
              </span>
            </div>

            <a
              href={leadStory.sourceUrl || `/article/${leadStory.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-extrabold text-xl sm:text-3xl text-ink group-hover:text-indigo transition-colors leading-tight mb-2 block"
            >
              {leadStory.title} ↗
            </a>

            {/* Little description of original article */}
            <p className="font-body text-sm sm:text-base text-[#333] leading-relaxed mb-4">
              {leadStory.excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-hairline">
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy">{leadStory.authorName}</span>
                <span>•</span>
                <span>{leadStory.readTime}</span>
              </div>
              <a
                href={leadStory.sourceUrl || `/article/${leadStory.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo hover:text-ember underline"
              >
                Read on {leadStory.sourceName || "Source"} ↗
              </a>
            </div>
          </div>

          {/* Right Rail Stories */}
          <div className="lg:col-span-4 flex flex-col divide-y divide-hairline">
            {sideStories.map((story, idx) => (
              <div
                key={story.id}
                className={`reveal-card delay-${(idx + 1) * 100} py-3 sm:py-4 first:pt-0 group`}
              >
                <div className="text-[9px] sm:text-[10px] font-extrabold text-muted uppercase tracking-wider mb-1">
                  {story.subDesk || story.desk}
                </div>
                <a
                  href={story.sourceUrl || `/article/${story.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline font-bold text-sm sm:text-base text-ink group-hover:text-indigo transition-colors leading-snug mb-1.5 block"
                >
                  {story.title} ↗
                </a>
                {/* Little description */}
                <p className="text-[11px] sm:text-xs text-muted line-clamp-2 leading-relaxed mb-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>{story.authorName}</span>
                  <a
                    href={story.sourceUrl || `/article/${story.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo hover:text-ember underline text-[10px]"
                  >
                    {story.sourceName || "Source"} ↗
                  </a>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <AdSlot id="rail_300x250" label="AD — 300×250 MPU RAIL" />
            </div>
          </div>
        </section>
      ) : (
        <div className="py-12 text-center text-muted font-bold text-sm">
          No articles found under this filter.
        </div>
      )}

      {/* AD / SPONSOR: 728x90 In-feed Unit 1 */}
      <AdSlot id="infeed_728x90" label="AD — 728×90 IN-FEED · UNIT 1 OF 2 · HEIGHT RESERVED" />

      {/* MORE FEED STORIES */}
      {feedStories.length > 0 && (
        <section className="reveal-on-scroll my-8 sm:my-10">
          <div className="pb-3 border-b border-hairline mb-5 sm:mb-6 flex items-center justify-between">
            <h3 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-navy">
              More {clubTitle}
            </h3>
            <span className="text-xs text-muted font-bold">
              {feedStories.length} pieces in archive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {feedStories.map((item) => (
              <div key={item.id} className="border border-hairline p-4 sm:p-5 bg-white rounded-xs group flex flex-col justify-between hover-elevate transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.isExclusive && (
                      <span className="bg-ember text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs">
                        EXCLUSIVE
                      </span>
                    )}
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted">
                      {item.subDesk || item.desk}
                    </span>
                  </div>

                  <a
                    href={item.sourceUrl || `/article/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-headline font-bold text-sm sm:text-lg text-ink group-hover:text-indigo transition-colors leading-snug mb-1.5 block"
                  >
                    {item.title} ↗
                  </a>

                  {/* Little description */}
                  <p className="text-xs text-muted line-clamp-2 mb-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted pt-2.5 border-t border-hairline">
                  <span className="font-semibold text-navy">{item.authorName}</span>
                  <a
                    href={item.sourceUrl || `/article/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo hover:text-ember underline text-[11px]"
                  >
                    Read on {item.sourceName || "Source"} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
