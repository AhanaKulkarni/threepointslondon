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
      <div className="max-w-[1280px] mx-auto flex items-center h-9 px-4 sm:px-6">
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
                <Link
                  href={item.link || "#"}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {item.text}
                </Link>
                <span className="text-gray-500 font-bold">•</span>
              </span>
            ))}
            {/* Duplicate for seamless infinite loop */}
            {activeItems.map((item, idx) => (
              <span key={`ticker-2-${item.id}-${idx}`} className="inline-flex items-center gap-3">
                <Link
                  href={item.link || "#"}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {item.text}
                </Link>
                <span className="text-gray-500 font-bold">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Utility: Search & Report & Admin Shortcut */}
        <div className="flex items-center gap-4 pl-3 border-l border-gray-700 shrink-0 text-gray-400">
          <Link
            href="/search"
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Search Three Points London"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-white transition-colors text-gray-400 hover:text-ember"
            title="Report an issue or correction"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 bg-[#1D2B45] hover:bg-indigo text-white px-2 py-0.5 rounded text-[11px] font-bold transition-colors ml-1"
          >
            <span className="w-4 h-4 rounded-full bg-ember flex items-center justify-center text-[10px] font-black">
              V
            </span>
            <span>Vayam</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
