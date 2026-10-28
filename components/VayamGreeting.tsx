"use client";

import React, { useEffect, useState } from "react";
import { getGreeting } from "@/lib/utils";

export default function VayamGreeting() {
  const [greetingInfo, setGreetingInfo] = useState<{ greeting: string; period: string }>({
    greeting: "Welcome, Vayam",
    period: "Day",
  });

  useEffect(() => {
    setGreetingInfo(getGreeting("Vayam"));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy text-white p-6 rounded-xs shadow-md border-b-4 border-b-ember">
      <div className="flex items-center gap-4">
        {/* V Profile Avatar */}
        <div className="w-16 h-16 rounded-full bg-ember text-white flex items-center justify-center font-display font-black text-3xl shadow-lg ring-4 ring-white/10 shrink-0">
          V
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded-xs text-gray-200">
              FOUNDER & EDITOR IN CHIEF
            </span>
            <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Super Admin Access
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
            {greetingInfo.greeting}
          </h1>
          <p className="text-xs text-gray-300 font-medium mt-0.5 max-w-xl">
            Full administrative access over Three Points London: articles, automated ingestion, sponsors, breaking ticker, and live stats.
          </p>
        </div>
      </div>

      {/* Official TPL Branding in Admin Header */}
      <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
        <div className="bg-white px-3 py-1.5 rounded-xs shadow-xs">
          <img
            src="/logo.png"
            alt="Three Points London"
            className="h-6 w-auto object-contain"
          />
        </div>
        <div className="bg-white px-3 py-1 rounded-xs shadow-xs">
          <img
            src="/tagline.png"
            alt="One City. Three Clubs. Endless Passion."
            className="h-3 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
