import React from "react";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Editorial Standards & AI Policy | Three Points London",
  description: "Editorial guidelines, attribution policies, and AI standards for Three Points London.",
};

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (8) */}
        <div className="lg:col-span-8">
          <nav className="text-xs font-semibold text-muted flex items-center gap-2 mb-3">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <span>›</span>
            <Link href="/about" className="hover:text-navy">
              About
            </Link>
            <span>›</span>
            <span>Editorial Standards</span>
          </nav>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-navy uppercase mb-2">
            Editorial Standards
          </h1>
          <p className="text-xs text-muted mb-8">
            Last reviewed October 2026 · Owner: <strong>Vayam Lahoti</strong>, Editor
          </p>

          <div className="editorial-prose text-ink font-body">
            <p>
              Every piece on Three Points London carries a named byline and is read by a named editor before publication. Where a claim comes from somewhere else, we say where and we link to it. Where a claim is ours, we say how we know.
            </p>

            <h2 className="font-display font-extrabold text-xl text-navy uppercase mt-8 mb-4">
              Our Use of AI Tools
            </h2>
            <p>
              We use AI tools for research assistance, transcription, sub-editing, and headline suggestions. We do not publish unverified AI-generated articles. No piece reaches this site without a named human writer or editor who can answer for every single sentence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 not-prose font-sans">
              <div className="bg-green-50/60 border border-green-200 p-4 rounded-xs">
                <span className="text-xs font-black text-green-900 uppercase tracking-wider block mb-2">
                  WHAT WE DO USE IT FOR
                </span>
                <ul className="text-xs text-green-900 space-y-1.5 list-disc list-inside">
                  <li>Transcribing press conferences and interviews</li>
                  <li>Searching public club filings and corporate accounts</li>
                  <li>Assisting with real-time news wire ingestion</li>
                  <li>Proofreading spelling, grammar, and style adherence</li>
                  <li>Suggesting headline variations for human review</li>
                </ul>
              </div>

              <div className="bg-red-50/60 border border-red-200 p-4 rounded-xs">
                <span className="text-xs font-black text-red-900 uppercase tracking-wider block mb-2">
                  WHAT WE NEVER USE IT FOR
                </span>
                <ul className="text-xs text-red-900 space-y-1.5 list-disc list-inside">
                  <li>Fabricating quotes, anonymous sources, or gossip</li>
                  <li>Generating synthetic images presented as real match photography</li>
                  <li>Publishing any analysis without human verification</li>
                  <li>Automating opinions or commentary</li>
                </ul>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-xl text-navy uppercase mt-8 mb-4">
              Corrections Policy
            </h2>
            <p>
              If we make an error, we correct it on the page transparently with a dated correction note explaining what was altered. We do not quietly overwrite copy and we do not delete. To report an error or inaccuracy, contact our desk at <a href="mailto:corrections@threepointslondon.com" className="text-indigo font-bold underline">corrections@threepointslondon.com</a>.
            </p>

            <h2 className="font-display font-extrabold text-xl text-navy uppercase mt-8 mb-4">
              Commercial Content & Sponsored Guest Placements
            </h2>
            <p>
              Sponsored articles, betting integrations, and commercial partnerships are clearly labeled as sponsored at the top of the post. No commercial partner or advertiser has approval over our independent editorial desks.
            </p>
          </div>
        </div>

        {/* Sidebar (4) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-hairline p-5 rounded-xs text-xs">
            <h3 className="font-display font-black text-navy uppercase tracking-wider mb-3">
              On This Page
            </h3>
            <ul className="space-y-2 text-muted font-semibold">
              <li>• What we publish</li>
              <li>• Sourcing and attribution</li>
              <li>• Use of AI tools</li>
              <li>• Corrections process</li>
              <li>• Commercial integrity</li>
            </ul>
          </div>

          <AdSlot id="rail_300x250" label="AD — 300×250 MPU RAIL" />
        </aside>
      </div>
    </div>
  );
}
