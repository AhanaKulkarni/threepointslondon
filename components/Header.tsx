"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="w-full bg-white border-b border-hairline sticky top-0 z-40 shadow-xs backdrop-blur-md bg-white/95">
      {/* Brand Masthead */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 border-b border-hairline">
        {/* Official Logo as requested */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="group inline-flex items-center" title="Three Points London - Home">
            <img
              src="/logo.png"
              alt="Three Points London"
              className="h-5 xs:h-6 sm:h-8 md:h-9 w-auto max-w-[180px] xs:max-w-[210px] sm:max-w-none object-contain hover:opacity-95 transition-opacity"
            />
          </Link>
          <div className="hidden xl:flex items-center pl-4 border-l border-hairline">
            <img
              src="/tagline.png"
              alt="One City. Three Clubs. Endless Passion."
              className="h-3.5 w-auto object-contain"
            />
          </div>
        </div>

        {/* Global Live Desk stats / quick badge on desktop */}
        <div className="hidden sm:flex items-center gap-5 text-xs font-bold text-muted">
          <div className="flex items-center gap-2 bg-[#FDF2F2] text-[#E8192C] px-2.5 py-1 rounded-full border border-red-100">
            <span className="w-2 h-2 rounded-full bg-[#E8192C]"></span>
            <span>Arsenal 1st</span>
          </div>
          <div className="flex items-center gap-2 bg-[#F0F5FA] text-[#1C6BB0] px-2.5 py-1 rounded-full border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-[#1C6BB0]"></span>
            <span>Chelsea 3rd</span>
          </div>
          <div className="flex items-center gap-2 bg-[#F2F4F8] text-[#24376B] px-2.5 py-1 rounded-full border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-[#24376B]"></span>
            <span>Spurs 5th</span>
          </div>
          <Link
            href="/admin"
            className="text-xs bg-navy text-white hover:bg-indigo px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-4 h-4 rounded-full bg-ember text-white text-[10px] flex items-center justify-center font-black">
              V
            </span>
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Mobile quick actions */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className="w-9 h-9 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold hover:bg-indigo transition-colors shadow-xs"
            title="Vayam Admin Portal"
          >
            V
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-navy hover:text-indigo focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="hidden md:flex items-center justify-between h-12">
          <nav className="flex items-center space-x-1 lg:space-x-2 h-full font-bold text-sm text-ink">
            {/* 1. About */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/about"
                className={`flex items-center gap-1 px-3 py-2 hover:text-indigo transition-colors ${
                  isActive("/about") || isActive("/editorial-standards") ? "text-indigo font-black" : ""
                }`}
              >
                About
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              {openDropdown === "about" && (
                <div className="absolute top-12 left-0 w-52 bg-white shadow-xl border border-hairline py-2 z-50 rounded-b-xs">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Who We Are
                  </Link>
                  <Link
                    href="/author/vayam-lahoti"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    The Team
                  </Link>
                  <Link
                    href="/about#founder-vision"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Founder's Vision
                  </Link>
                  <Link
                    href="/editorial-standards"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Editorial Standards
                  </Link>
                  <Link
                    href="/corrections"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Corrections Log
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Arsenal */}
            <div
              className="relative h-full flex items-center border-t-2 border-transparent hover:border-[#E8192C]"
              onMouseEnter={() => setOpenDropdown("arsenal")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/arsenal"
                className={`flex items-center gap-1.5 px-3 py-2 hover:text-[#E8192C] transition-colors ${
                  isActive("/arsenal") ? "text-[#E8192C] font-black" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#E8192C]"></span>
                Arsenal
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              {openDropdown === "arsenal" && (
                <div className="absolute top-12 left-0 w-56 bg-white shadow-xl border-t-2 border-t-[#E8192C] border-hairline border py-2 z-50 rounded-b-xs">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase text-muted tracking-wider">
                    The Arsenal Desk
                  </div>
                  <Link
                    href="/arsenal?desk=all"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#E8192C]"
                  >
                    All Arsenal
                  </Link>
                  <Link
                    href="/arsenal?desk=news"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#E8192C]"
                  >
                    News
                  </Link>
                  <Link
                    href="/arsenal?desk=transfers"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#E8192C]"
                  >
                    Transfers
                  </Link>
                  <Link
                    href="/arsenal?desk=matchday"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#E8192C]"
                  >
                    Matchday
                  </Link>
                  <Link
                    href="/arsenal?desk=features"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#E8192C]"
                  >
                    Features & Data
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Chelsea */}
            <div
              className="relative h-full flex items-center border-t-2 border-transparent hover:border-[#1C6BB0]"
              onMouseEnter={() => setOpenDropdown("chelsea")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/chelsea"
                className={`flex items-center gap-1.5 px-3 py-2 hover:text-[#1C6BB0] transition-colors ${
                  isActive("/chelsea") ? "text-[#1C6BB0] font-black" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#1C6BB0]"></span>
                Chelsea
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              {openDropdown === "chelsea" && (
                <div className="absolute top-12 left-0 w-56 bg-white shadow-xl border-t-2 border-t-[#1C6BB0] border-hairline border py-2 z-50 rounded-b-xs">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase text-muted tracking-wider">
                    The Chelsea Desk
                  </div>
                  <Link
                    href="/chelsea?desk=all"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#1C6BB0]"
                  >
                    All Chelsea
                  </Link>
                  <Link
                    href="/chelsea?desk=news"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#1C6BB0]"
                  >
                    News
                  </Link>
                  <Link
                    href="/chelsea?desk=transfers"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#1C6BB0]"
                  >
                    Transfers
                  </Link>
                  <Link
                    href="/chelsea?desk=matchday"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#1C6BB0]"
                  >
                    Matchday
                  </Link>
                  <Link
                    href="/chelsea?desk=features"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#1C6BB0]"
                  >
                    Features & Tactics
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Tottenham */}
            <div
              className="relative h-full flex items-center border-t-2 border-transparent hover:border-[#24376B]"
              onMouseEnter={() => setOpenDropdown("tottenham")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/tottenham"
                className={`flex items-center gap-1.5 px-3 py-2 hover:text-[#24376B] transition-colors ${
                  isActive("/tottenham") ? "text-[#24376B] font-black" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#24376B]"></span>
                Tottenham
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              {openDropdown === "tottenham" && (
                <div className="absolute top-12 left-0 w-56 bg-white shadow-xl border-t-2 border-t-[#24376B] border-hairline border py-2 z-50 rounded-b-xs">
                  <div className="px-4 py-1 text-[10px] font-extrabold uppercase text-muted tracking-wider">
                    The Tottenham Desk
                  </div>
                  <Link
                    href="/tottenham?desk=all"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#24376B]"
                  >
                    All Tottenham
                  </Link>
                  <Link
                    href="/tottenham?desk=news"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#24376B]"
                  >
                    News
                  </Link>
                  <Link
                    href="/tottenham?desk=transfers"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#24376B]"
                  >
                    Transfers
                  </Link>
                  <Link
                    href="/tottenham?desk=matchday"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#24376B]"
                  >
                    Matchday
                  </Link>
                  <Link
                    href="/tottenham?desk=features"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-[#24376B]"
                  >
                    Features & Rebuild
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Community */}
            <Link
              href="/community"
              className={`px-3 py-2 hover:text-indigo transition-colors flex items-center gap-1.5 ${
                isActive("/community") ? "text-indigo font-black" : ""
              }`}
            >
              <span>Community</span>
              <span className="text-[10px] bg-ember text-white px-2 py-0.5 rounded-full font-extrabold animate-pulse">
                212 LIVE
              </span>
            </Link>

            {/* 6. Contact */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown("contact")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/contact"
                className={`flex items-center gap-1 px-3 py-2 hover:text-indigo transition-colors ${
                  isActive("/contact") ? "text-indigo font-black" : ""
                }`}
              >
                Contact
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              {openDropdown === "contact" && (
                <div className="absolute top-12 left-0 w-56 bg-white shadow-xl border border-hairline py-2 z-50 rounded-b-xs">
                  <Link
                    href="/contact#advertise"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Advertise / Guest Posting (£500)
                  </Link>
                  <Link
                    href="/contact#write"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Write for us / Pitch
                  </Link>
                  <Link
                    href="/contact#feedback"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-indigo"
                  >
                    Feedback / Report an issue
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/article/the-press-is-working-the-rest-defence-is-not"
              className="text-xs font-bold text-ember border border-ember/40 hover:bg-ember hover:text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-ping"></span>
              <span>EXCLUSIVE: Rest-Defence</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-white px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/admin"
            className="flex items-center justify-between p-3 bg-surface rounded border border-hairline text-navy font-bold text-sm min-h-[44px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-navy text-white text-xs flex items-center justify-center font-black">
                V
              </span>
              <span>Admin Portal (Vayam)</span>
            </span>
            <span className="text-xs text-indigo font-bold">Open Dashboard →</span>
          </Link>

          <div className="space-y-1 font-bold text-sm">
            <Link
              href="/about"
              className="flex items-center min-h-[44px] px-2 border-b border-hairline text-navy hover:text-indigo"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Three Points London
            </Link>
            <Link
              href="/arsenal"
              className="flex items-center min-h-[44px] px-2 border-b border-hairline text-[#E8192C] gap-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8192C]"></span>
              Arsenal Desk
            </Link>
            <Link
              href="/chelsea"
              className="flex items-center min-h-[44px] px-2 border-b border-hairline text-[#1C6BB0] gap-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C6BB0]"></span>
              Chelsea Desk
            </Link>
            <Link
              href="/tottenham"
              className="flex items-center min-h-[44px] px-2 border-b border-hairline text-[#24376B] gap-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#24376B]"></span>
              Tottenham Desk
            </Link>
            <Link
              href="/community"
              className="flex items-center justify-between min-h-[44px] px-2 border-b border-hairline text-navy hover:text-indigo"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Community Rooms</span>
              <span className="text-[10px] bg-ember text-white px-2 py-0.5 rounded-full font-extrabold">
                212 LIVE
              </span>
            </Link>
            <Link
              href="/editorial-standards"
              className="flex items-center min-h-[44px] px-2 border-b border-hairline text-navy hover:text-indigo"
              onClick={() => setMobileMenuOpen(false)}
            >
              Editorial Standards & AI Policy
            </Link>
            <Link
              href="/contact"
              className="flex items-center min-h-[44px] px-2 text-navy hover:text-indigo"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact & Advertising (£500 Guest Posts)
            </Link>
          </div>

          {/* Official Tagline Badge in Drawer */}
          <div className="pt-3 pb-1 border-t border-hairline flex items-center justify-center">
            <img
              src="/tagline.png"
              alt="One City. Three Clubs. Endless Passion."
              className="h-3.5 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      )}
    </header>
  );
}
