import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="font-display font-black text-7xl sm:text-9xl text-navy/15 select-none tracking-tight">
        404
      </div>
      <h1 className="font-display font-black text-2xl sm:text-4xl text-navy uppercase mt-[-1.5rem] sm:mt-[-2.5rem] mb-3">
        Offside. This page does not exist.
      </h1>
      <p className="text-sm sm:text-base text-muted max-w-lg mx-auto mb-8 font-medium">
        The link may be broken, or the tactical breakdown may have moved. Try searching below, or pick a London desk and start again.
      </p>

      {/* Quick Search */}
      <div className="max-w-md mx-auto flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted" />
          <input
            type="text"
            placeholder="Search Three Points London..."
            className="w-full bg-surface border border-hairline pl-9 pr-3 py-2 text-xs rounded-xs font-semibold focus:outline-indigo"
          />
        </div>
        <Link
          href="/search"
          className="bg-navy text-white px-5 py-2 text-xs font-bold rounded-xs hover:bg-indigo transition-colors flex items-center"
        >
          Go
        </Link>
      </div>

      {/* Club Desks */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold mb-10">
        <Link
          href="/arsenal"
          className="px-3 py-1.5 border border-hairline bg-surface rounded hover:border-[#E8192C] text-[#E8192C]"
        >
          Arsenal Desk →
        </Link>
        <Link
          href="/chelsea"
          className="px-3 py-1.5 border border-hairline bg-surface rounded hover:border-[#1C6BB0] text-[#1C6BB0]"
        >
          Chelsea Desk →
        </Link>
        <Link
          href="/tottenham"
          className="px-3 py-1.5 border border-hairline bg-surface rounded hover:border-[#24376B] text-[#24376B]"
        >
          Tottenham Desk →
        </Link>
      </div>

      {/* Latest Instead */}
      <div className="border-t border-hairline pt-6 max-w-lg mx-auto text-left text-xs">
        <span className="text-[10px] font-black uppercase text-muted tracking-wider block mb-2 text-center">
          LATEST INSTEAD
        </span>
        <div className="space-y-2">
          <Link
            href="/article/the-press-is-working-the-rest-defence-is-not"
            className="block font-headline font-bold text-navy hover:text-indigo text-center"
          >
            The press is working. The rest-defence is not.
          </Link>
          <Link
            href="/article/alonsos-build-up-has-changed-three-times"
            className="block font-headline font-bold text-navy hover:text-indigo text-center"
          >
            Alonso's build-up has changed three times in six weeks
          </Link>
        </div>
      </div>
    </div>
  );
}
