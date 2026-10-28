"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { getClubBorderClass, getClubTextClass } from "@/lib/utils";

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
    <div className="bg-white border border-hairline p-5 shadow-xs">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-sm sm:text-base text-navy uppercase tracking-tight">
            Most Read
          </span>
          <span className="text-[10px] font-bold text-muted bg-surface px-1.5 py-0.5 rounded uppercase">
            Auto-Updated
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-muted">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2 py-1 transition-colors ${
              activeTab === "all"
                ? "text-navy border-b-2 border-navy font-extrabold"
                : "hover:text-ink"
            }`}
          >
            All three
          </button>
          <button
            onClick={() => setActiveTab("arsenal")}
            className={`px-2 py-1 transition-colors ${
              activeTab === "arsenal"
                ? "text-[#E8192C] border-b-2 border-[#E8192C] font-extrabold"
                : "hover:text-ink"
            }`}
          >
            Arsenal
          </button>
          <button
            onClick={() => setActiveTab("chelsea")}
            className={`px-2 py-1 transition-colors ${
              activeTab === "chelsea"
                ? "text-[#1C6BB0] border-b-2 border-[#1C6BB0] font-extrabold"
                : "hover:text-ink"
            }`}
          >
            Chelsea
          </button>
          <button
            onClick={() => setActiveTab("tottenham")}
            className={`px-2 py-1 transition-colors ${
              activeTab === "tottenham"
                ? "text-[#24376B] border-b-2 border-[#24376B] font-extrabold"
                : "hover:text-ink"
            }`}
          >
            Tottenham
          </button>
        </div>
      </div>

      {/* 4 Items List */}
      <div className="divide-y divide-hairline mt-2">
        {currentList.slice(0, 4).map((art, idx) => (
          <div key={art.id} className="py-3 flex items-start gap-4 group">
            {/* Index Number */}
            <span className="font-display font-black text-2xl sm:text-3xl text-[#5C6370]/40 group-hover:text-navy transition-colors shrink-0 w-6">
              {idx + 1}
            </span>

            {/* Article Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-wider uppercase mb-1">
                <span className={getClubTextClass(art.club)}>
                  {art.club === "all" ? "LONDON DESKS" : art.club}
                </span>
                <span className="text-muted/60">•</span>
                <span className="text-muted">{art.subDesk || art.desk}</span>
              </div>

              <Link
                href={`/article/${art.slug}`}
                className="font-headline font-bold text-sm sm:text-base text-ink leading-snug group-hover:text-indigo transition-colors line-clamp-2 block"
              >
                {art.title}
              </Link>

              <div className="flex items-center gap-2 mt-1.5 text-xs text-muted">
                <span>{art.authorName}</span>
                <span>•</span>
                <span>{art.readTime}</span>
                <span className="text-[10px] text-gray-400">({art.views} reads)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
