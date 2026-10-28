"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { getClubTextClass } from "@/lib/utils";
import { TrendingUp, Flame } from "lucide-react";

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
    <div className="bg-white border border-hairline p-6 rounded-sm shadow-xs hover-elevate transition-all">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-3">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-ember" />
          <span className="font-display font-black text-base text-navy uppercase tracking-tight">
            Most Read
          </span>
          <span className="text-[10px] font-extrabold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live Algorithmic Tracking
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-muted bg-surface p-1 rounded-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2.5 py-1 rounded-xs transition-all ${
              activeTab === "all"
                ? "bg-navy text-white font-extrabold shadow-xs"
                : "hover:text-ink"
            }`}
          >
            All three
          </button>
          <button
            onClick={() => setActiveTab("arsenal")}
            className={`px-2.5 py-1 rounded-xs transition-all ${
              activeTab === "arsenal"
                ? "bg-[#E8192C] text-white font-extrabold shadow-xs"
                : "hover:text-[#E8192C]"
            }`}
          >
            Arsenal
          </button>
          <button
            onClick={() => setActiveTab("chelsea")}
            className={`px-2.5 py-1 rounded-xs transition-all ${
              activeTab === "chelsea"
                ? "bg-[#1C6BB0] text-white font-extrabold shadow-xs"
                : "hover:text-[#1C6BB0]"
            }`}
          >
            Chelsea
          </button>
          <button
            onClick={() => setActiveTab("tottenham")}
            className={`px-2.5 py-1 rounded-xs transition-all ${
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
      <div className="divide-y divide-hairline mt-2">
        {currentList.slice(0, 4).map((art, idx) => (
          <div key={art.id} className="py-4 flex items-start gap-5 group">
            {/* Number Rank */}
            <span className="font-display font-black text-3xl sm:text-4xl text-gray-300 group-hover:text-navy transition-colors shrink-0 w-8 select-none leading-none pt-1">
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Article Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-wider uppercase mb-1">
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

              <Link
                href={`/article/${art.slug}`}
                className="font-headline font-bold text-sm sm:text-base text-ink leading-snug group-hover:text-indigo transition-colors line-clamp-2 block"
              >
                {art.title}
              </Link>

              <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                <span className="font-semibold text-navy">{art.authorName}</span>
                <span>•</span>
                <span>{art.readTime}</span>
                <span className="text-[11px] text-gray-400 font-medium">({art.views.toLocaleString()} reads)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
