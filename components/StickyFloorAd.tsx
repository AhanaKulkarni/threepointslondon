"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function StickyFloorAd() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Sponsored advertisement"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#111317]/95 backdrop-blur-xs border-t border-gray-700 shadow-2xl transition-all"
    >
      <div className="max-w-[728px] mx-auto h-[60px] sm:h-[90px] flex items-center justify-between px-3 relative">
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="text-[9px] sm:text-[10px] bg-ember text-white px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider shrink-0">
              SPONSOR
            </span>
            <span className="text-[11px] sm:text-xs text-gray-300 font-semibold truncate max-w-[240px] sm:max-w-none">
              Three Points London: Arsenal, Chelsea & Tottenham
            </span>
            <Link
              href="/admin#sponsors"
              className="text-[10px] sm:text-[11px] font-bold text-indigo-400 hover:text-white underline"
            >
              Configure in Admin
            </Link>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors ml-1 shrink-0"
          aria-label="Close sponsor banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
