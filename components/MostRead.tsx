"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { getClubTextClass } from "@/lib/utils";
import { TrendingUp, Flame, ExternalLink } from "lucide-react";

interface MostReadProps {
  initialArticles: {
    all: Article[];
    arsenal: Article[];
    chelsea: Article[];
    tottenham: Article[];
  };
}

export default function MostRead({ initialArticles }: MostReadProps) {
  const [activeTab, setActiveTab] = useState<"all" | "arsenal" | "chelsea" | "tottenham">("all");

  const currentList = initialArticles[activeTab] || initialArticles.all;

  return (
    <div className="bg-white border border-hairline p-3.5 sm:p-6 rounded-sm shadow-xs hover-elevate transition-all">
      {/* Header and Scrollable Mobile Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-hairline gap-2.5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-ember shrink-0" />
          <span className="font-display font-black text-sm sm:text-base text-navy uppercase tracking-tight">
            Most Read
          </span>
          <span className="text-[9px] sm:text-[10px] font-extrabold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
            Live
          </span>
        </div>

        {/* Mobile optimized horizontal scrolling tabs */}
        <div className="flex items-center gap-1 text-xs font-bold text-muted bg-surface p-1 rounded-xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2.5 py-1 rounded-xs text-[11px] sm:text-xs transition-all shrink-0 ${
              activeTab === "all"
                ? "bg-navy text-white font-extrabold shadow-xs"
                : "hover:text-ink"
            }`}
          >
            All three
          </button>
          <button
            onClick={() => setActiveTab("arsenal")}
            className={`px-2.5 py-1 rounded-xs text-[11px] sm:text-xs transition-all shrink-0 ${
              activeTab === "arsenal"
                ? "bg-[#E8192C] text-white font-extrabold shadow-xs"
                : "hover:text-[#E8192C]"
            }`}
          >
            Arsenal
          </button>
          <button
            onClick={() => setActiveTab("chelsea")}
            className={`px-2.5 py-1 rounded-xs text-[11px] sm:text-xs transition-all shrink-0 ${
              activeTab === "chelsea"
                ? "bg-[#1C6BB0] text-white font-extrabold shadow-xs"
                : "hover:text-[#1C6BB0]"
            }`}
          >
            Chelsea
          </button>
          <button
            onClick={() => setActiveTab("tottenham")}
            className={`px-2.5 py-1 rounded-xs text-[11px] sm:text-xs transition-all shrink-0 ${
              activeTab === "tottenham"
                ? "bg-[#24376B] text-white font-extrabold shadow-xs"
                : "hover:text-[#24376B]"
            }`}
          >
            Tottenham
          </button>
        </div>
      </div>

      {/* 4 Items List */}
      <div className="divide-y divide-hairline">
        {currentList.slice(0, 4).map((art, idx) => {
          const redirectUrl = art.sourceUrl || `/article/${art.slug}`;
          const sourceLabel = art.sourceName || "Original Publisher";

          return (
            <div
              key={art.id}
              className={`reveal-card delay-${(idx + 1) * 100} py-3.5 sm:py-4 flex items-start gap-3 sm:gap-4 group`}
            >
              {/* Number Rank (Mobile-tuned width) */}
              <span className="font-display font-black text-xl sm:text-3xl text-gray-300 group-hover:text-navy transition-colors shrink-0 w-6 sm:w-8 select-none leading-none pt-0.5 sm:pt-1">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Article Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-wider uppercase mb-1">
                  <span className={getClubTextClass(art.club)}>
                    {art.club === "all" ? "LONDON DESKS" : art.club}
                  </span>
                  <span className="text-muted/60">•</span>
                  <span className="text-muted">{art.subDesk || art.desk}</span>
                  {art.isExclusive && (
                    <>
                      <span className="text-muted/60">•</span>
                      <span className="text-ember font-black flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        EXCLUSIVE
                      </span>
                    </>
                  )}
                </div>

                {/* Direct redirect link to the original article */}
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline font-bold text-xs sm:text-base text-ink leading-snug group-hover:text-indigo transition-colors line-clamp-2 block"
                  title={`Read original article on ${sourceLabel}`}
                >
                  {art.title}
                  <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-40 group-hover:opacity-100 text-indigo" />
                </a>

                {/* Little description of the original article on the main website */}
                <p className="text-[11px] sm:text-xs text-muted leading-relaxed line-clamp-2 mt-1 mb-2 font-normal">
                  {art.excerpt}
                </p>

                {/* Redirect Button & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs text-muted pt-1 border-t border-hairline/60">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy">{art.authorName}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <a
                    href={redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-extrabold text-indigo hover:text-ember flex items-center gap-1 underline underline-offset-2 transition-colors"
                  >
                    <span>Read on {sourceLabel}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
