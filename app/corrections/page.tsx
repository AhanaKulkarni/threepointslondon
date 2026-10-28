import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Corrections Log | Three Points London",
  description: "Public transparency log of corrections across Arsenal, Chelsea, and Tottenham reporting.",
};

export default function CorrectionsPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs font-semibold text-muted flex items-center gap-2 mb-3">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>›</span>
        <span>Corrections Log</span>
      </nav>

      <h1 className="font-display font-black text-3xl sm:text-4xl text-navy uppercase mb-2">
        Corrections Log
      </h1>
      <p className="text-xs text-muted mb-8">
        We correct errors promptly and publicly. Every edit to factual claims is logged below.
      </p>

      <div className="space-y-6">
        <div className="border border-hairline p-5 rounded-xs bg-surface">
          <div className="flex items-center justify-between text-xs text-muted mb-2">
            <span className="font-extrabold text-[#E8192C] uppercase">ARSENAL · DATA ANALYSIS</span>
            <span>6 October 2026</span>
          </div>
          <Link
            href="/article/the-press-is-working-the-rest-defence-is-not"
            className="font-headline font-bold text-base text-navy hover:text-indigo block mb-2"
          >
            The press is working. The rest-defence is not.
          </Link>
          <p className="text-xs text-[#333] leading-relaxed">
            <strong>Correction (11:02 BST):</strong> An earlier version of this article indicated Arsenal had conceded ten goals in eleven matches. The official Premier League tally is nine goals conceded. The chart and phase-by-phase breakdown have been verified against Opta records.
          </p>
        </div>

        <div className="border border-hairline p-5 rounded-xs bg-surface">
          <div className="flex items-center justify-between text-xs text-muted mb-2">
            <span className="font-extrabold text-[#1C6BB0] uppercase">CHELSEA · TRANSFERS</span>
            <span>28 September 2026</span>
          </div>
          <h3 className="font-headline font-bold text-base text-navy mb-2">
            Chelsea Squad Cost Ratio breakdown
          </h3>
          <p className="text-xs text-[#333] leading-relaxed">
            <strong>Correction:</strong> Clarified that the amortisation calculation reflects the 5-year accounting cap introduced by UEFA and the Premier League, rather than the initial contract duration.
          </p>
        </div>
      </div>
    </div>
  );
}
