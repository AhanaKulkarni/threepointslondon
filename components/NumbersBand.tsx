import React from "react";
import Link from "next/link";
import { DataStat } from "@/lib/types";

interface NumbersBandProps {
  stats: Record<string, DataStat>;
}

export default function NumbersBand({ stats }: NumbersBandProps) {
  const items = [
    { key: "arsenal", border: "border-t-[#E8192C]", clubColor: "text-[#E8192C]" },
    { key: "chelsea", border: "border-t-[#1C6BB0]", clubColor: "text-[#1C6BB0]" },
    { key: "tottenham", border: "border-t-[#24376B]", clubColor: "text-[#24376B]" },
  ];

  return (
    <section className="my-10 bg-[#1D2B45] text-white p-6 sm:p-8 rounded-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-700 gap-2">
        <h2 className="font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase text-gray-200">
          The Numbers Behind The Football
        </h2>
        <Link
          href="/arsenal?desk=features"
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Data-led features</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {items.map(({ key, border, clubColor }) => {
          const item = stats[key];
          if (!item) return null;

          return (
            <div
              key={key}
              className={`bg-[#152034] p-5 border-t-[3px] ${border} rounded-xs flex flex-col justify-between`}
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2">
                  {item.stat}
                </div>
                <div className={`text-xs font-extrabold uppercase tracking-wider ${clubColor} mb-1`}>
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 leading-relaxed mb-4">
                  {item.subtext}
                </div>
              </div>

              <Link
                href={`/article/${item.articleSlug}`}
                className="text-xs font-bold text-gray-200 hover:text-white underline line-clamp-1 mt-auto pt-2 border-t border-gray-800"
              >
                {item.articleTitle}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
