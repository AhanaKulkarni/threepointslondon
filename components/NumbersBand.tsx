import React from "react";
import Link from "next/link";
import { DataStat } from "@/lib/types";
import { BarChart3, ArrowRight } from "lucide-react";

interface NumbersBandProps {
  stats: Record<string, DataStat>;
}

export default function NumbersBand({ stats }: NumbersBandProps) {
  const items = [
    { key: "arsenal", border: "border-t-[#E8192C]", clubColor: "text-[#E8192C]", glow: "shadow-red-950/20" },
    { key: "chelsea", border: "border-t-[#1C6BB0]", clubColor: "text-[#1C6BB0]", glow: "shadow-blue-950/20" },
    { key: "tottenham", border: "border-t-[#8FA5E8]", clubColor: "text-[#8FA5E8]", glow: "shadow-indigo-950/20" },
  ];

  return (
    <section className="my-10 bg-gradient-to-br from-[#1D2B45] via-[#162238] to-[#10192A] text-white p-6 sm:p-8 rounded-sm shadow-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-700/80 gap-2">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <h2 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-gray-100">
            The Numbers Behind The Football
          </h2>
        </div>
        <Link
          href="/arsenal?desk=features"
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
        >
          <span>Explore All Data-Led Features</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {items.map(({ key, border, clubColor, glow }) => {
          const item = stats[key];
          if (!item) return null;

          return (
            <div
              key={key}
              className={`bg-[#131D30]/90 backdrop-blur-xs p-6 border-t-[3px] ${border} rounded-xs flex flex-col justify-between shadow-lg ${glow} hover-elevate transition-all border border-gray-800/80 group`}
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                  {item.stat}
                </div>
                <div className={`text-xs font-black uppercase tracking-wider ${clubColor} mb-1.5`}>
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                  {item.subtext}
                </div>
              </div>

              <Link
                href={`/article/${item.articleSlug}`}
                className="text-xs font-bold text-gray-200 hover:text-white underline line-clamp-1 pt-3 border-t border-gray-800 flex items-center justify-between group-hover:text-amber-400 transition-colors"
              >
                <span>{item.articleTitle}</span>
                <span className="text-[11px] font-mono opacity-60">→</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
