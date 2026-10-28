"use client";

import React from "react";
import Link from "next/link";
import { TickerItem } from "@/lib/types";
import { Search, Flag } from "lucide-react";

interface NewsTickerProps {
  items: TickerItem[];
}

export default function NewsTicker({ items }: NewsTickerProps) {
  const activeItems = items.filter((i) => i.active);

  return (
    <div className="bg-[#111317] text-white border-b border-gray-800 text-xs font-semibold select-none z-30">
      <div className="w-full flex items-center h-9 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* LATEST Chip */}
        <div className="flex items-center gap-2 pr-3 border-r border-gray-700 shrink-0">
          <span className="bg-ember text-white font-extrabold uppercase px-1.5 py-0.5 text-[10px] tracking-wider rounded-sm">
            LATEST
          </span>
        </div>

        {/* Marquee viewport */}
        <div className="flex-1 overflow-hidden relative mx-3 h-full flex items-center">
          <div className="animate-ticker flex items-center whitespace-nowrap gap-6 text-gray-200">
            {activeItems.map((item, idx) => (
              <span key={`ticker-1-${item.id}-${idx}`} className="inline-flex items-center gap-3">
                <a
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {item.text} ↗
                </a>
                <span className="text-gray-500 font-bold">•</span>
              </span>
            ))}
            {/* Duplicate for seamless infinite loop */}
            {activeItems.map((item, idx) => (
              <span key={`ticker-2-${item.id}-${idx}`} className="inline-flex items-center gap-3">
                <a
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {item.text} ↗
                </a>
                <span className="text-gray-500 font-bold">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Utility: Search & Report (Strictly as PDF Page 2) */}
        <div className="flex items-center gap-3 sm:gap-4 pl-3 border-l border-gray-700 shrink-0 text-gray-300 text-[11px] sm:text-xs">
          <Link
            href="/search"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="Search Three Points London"
          >
            <Search className="w-3 h-3 text-gray-400" />
            <span>Search</span>
          </Link>
          <span className="text-gray-600">•</span>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 hover:text-white transition-colors hover:text-ember"
            title="Report an issue or correction"
          >
            <Flag className="w-3 h-3 text-gray-400" />
            <span>Report</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
