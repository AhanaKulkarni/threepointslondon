"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { getArticles } from "@/lib/store";
import { Search as SearchIcon } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import { formatTimeAgo, getClubTextClass } from "@/lib/utils";

export default function SearchPage() {
  const [query, setQuery] = useState("arsenal xga");
  const [filter, setFilter] = useState("all");

  const allArticles = [
    {
      id: "art-01",
      slug: "the-press-is-working-the-rest-defence-is-not",
      title: "The press is working. The rest-defence is not.",
      excerpt: "...expected goals against has climbed from 0.91 to 1.42 per game...",
      club: "arsenal",
      desk: "features",
      subDesk: "DATA",
      publishedAt: "2026-10-06T09:15:00Z",
    },
    {
      id: "art-08",
      slug: "the-single-pivot-problem-touch-map-breakdown",
      title: "The single-pivot problem, explained with every touch map",
      excerpt: "...the channel two players used to share now shows up in the xGA split...",
      club: "arsenal",
      desk: "features",
      subDesk: "FEATURES",
      publishedAt: "2026-10-05T11:00:00Z",
    },
    {
      id: "art-03",
      slug: "de-zerbi-spurs-rebuild-in-five-numbers",
      title: "De Zerbi's rebuild in five numbers: progression up, control down",
      excerpt: "...compared against Arsenal's equivalent defensive cohort...",
      club: "tottenham",
      desk: "features",
      subDesk: "DATA",
      publishedAt: "2026-10-06T07:15:00Z",
    },
    {
      id: "art-02",
      slug: "chelsea-wage-structure-question-before-january",
      title: "The wage-structure question Chelsea must answer before January",
      excerpt: "...tactical and wage structure balance ahead of the London derby...",
      club: "chelsea",
      desk: "transfers",
      subDesk: "TRANSFERS",
      publishedAt: "2026-10-06T08:30:00Z",
    },
  ];

  const results = allArticles.filter((a) => {
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      a.club.toLowerCase().includes(query.toLowerCase());
    if (filter === "all") return matchesQuery;
    if (filter === "data") return matchesQuery && a.subDesk === "DATA";
    return matchesQuery && a.club === filter;
  });

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
      {/* Strict SEO requirement from PDF page 9 & 14 */}
      <head>
        <meta name="robots" content="noindex, follow" />
        <title>Search | Three Points London</title>
      </head>

      <h1 className="font-display font-black text-2xl sm:text-3xl text-navy uppercase mb-4">
        Search Three Points London
      </h1>

      {/* Search Input Bar */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="w-4 h-4 absolute left-3 top-3 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players, clubs, tactics, xGA, writers..."
            className="w-full bg-surface border border-hairline pl-9 pr-3 py-2 text-sm rounded-xs font-semibold focus:outline-indigo"
          />
        </div>
        <button className="bg-navy text-white px-5 py-2 text-xs font-bold rounded-xs hover:bg-indigo transition-colors">
          Search
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 pb-4 border-b border-hairline mb-6 text-xs font-bold">
        <span className="text-muted mr-2">{results.length} results</span>
        {["all", "arsenal", "chelsea", "tottenham", "data"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-xs uppercase text-[11px] transition-colors ${
              filter === f ? "bg-navy text-white" : "bg-surface text-muted hover:text-navy"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Search Results */}
      <div className="divide-y divide-hairline">
        {results.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div className="py-5 group">
              <div className="flex items-center gap-2 mb-1 text-[10px] font-extrabold uppercase tracking-wider">
                <span className={getClubTextClass(item.club)}>{item.club}</span>
                <span className="text-muted">•</span>
                <span className="text-muted">{item.subDesk || item.desk}</span>
              </div>
              <Link href={`/article/${item.slug}`}>
                <h3 className="font-headline font-bold text-base sm:text-lg text-navy group-hover:text-indigo transition-colors mb-1">
                  {item.title}
                </h3>
              </Link>
              <p className="text-xs text-muted leading-relaxed font-body">
                {item.excerpt}
              </p>
            </div>
            {/* PDF Spec: Ad below Result 3 */}
            {idx === 2 && (
              <AdSlot id="infeed_728x90" label="AD — 728×90 · BELOW RESULT 3 (SEARCH SPEC)" />
            )}
          </React.Fragment>
        ))}

        {results.length === 0 && (
          <div className="py-12 text-center text-muted font-bold text-sm">
            No articles found matching "{query}". Try searching for "Arsenal", "Chelsea", "Spurs", or "xGA".
          </div>
        )}
      </div>
    </div>
  );
}
