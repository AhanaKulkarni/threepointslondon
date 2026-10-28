import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1D2B45] text-white pt-12 pb-16 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Logo and Brand row */}
        <div className="pb-8 mb-8 border-b border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/"
              className="bg-white px-3.5 py-2 rounded-xs inline-flex items-center shadow-xs hover:opacity-95 transition-opacity max-w-fit"
              title="Three Points London"
            >
              <img
                src="/logo.png"
                alt="Three Points London"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </Link>
            <div className="bg-white px-3.5 py-2 rounded-xs inline-flex items-center shadow-xs max-w-fit">
              <img
                src="/tagline.png"
                alt="One City. Three Clubs. Endless Passion."
                className="h-3.5 sm:h-4 w-auto object-contain"
              />
            </div>
          </div>
          <div className="text-xs text-gray-400 font-bold flex items-center gap-4">
            <span>Follow the desks:</span>
            <span className="text-white hover:text-indigo-400 cursor-pointer transition-colors">X</span>
            <span className="text-white hover:text-indigo-400 cursor-pointer transition-colors">Instagram</span>
            <span className="text-white hover:text-indigo-400 cursor-pointer transition-colors">YouTube</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
          {/* Arsenal */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E8192C]"></span>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#E8192C]">
                Arsenal
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/arsenal?desk=news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/arsenal?desk=transfers" className="hover:text-white transition-colors">
                  Transfers
                </Link>
              </li>
              <li>
                <Link href="/arsenal?desk=matchday" className="hover:text-white transition-colors">
                  Matchday
                </Link>
              </li>
              <li>
                <Link href="/arsenal?desk=features" className="hover:text-white transition-colors">
                  Features & Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Chelsea */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#1C6BB0]"></span>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1C6BB0]">
                Chelsea
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/chelsea?desk=news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/chelsea?desk=transfers" className="hover:text-white transition-colors">
                  Transfers
                </Link>
              </li>
              <li>
                <Link href="/chelsea?desk=matchday" className="hover:text-white transition-colors">
                  Matchday
                </Link>
              </li>
              <li>
                <Link href="/chelsea?desk=features" className="hover:text-white transition-colors">
                  Features & Tactics
                </Link>
              </li>
            </ul>
          </div>

          {/* Tottenham */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#24376B]"></span>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#8FA5E8]">
                Tottenham
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/tottenham?desk=news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/tottenham?desk=transfers" className="hover:text-white transition-colors">
                  Transfers
                </Link>
              </li>
              <li>
                <Link href="/tottenham?desk=matchday" className="hover:text-white transition-colors">
                  Matchday
                </Link>
              </li>
              <li>
                <Link href="/tottenham?desk=features" className="hover:text-white transition-colors">
                  Features & Rebuild
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
              About
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/author/vayam-lahoti" className="hover:text-white transition-colors">
                  The Team
                </Link>
              </li>
              <li>
                <Link href="/about#founder-vision" className="hover:text-white transition-colors">
                  Founder's Vision
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-white transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-white transition-colors">
                  Corrections Log
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/contact#advertise" className="hover:text-white transition-colors">
                  Advertise / Guest Posting
                </Link>
              </li>
              <li>
                <Link href="/contact#write" className="hover:text-white transition-colors">
                  Write for us / Pitch
                </Link>
              </li>
              <li>
                <Link href="/contact#feedback" className="hover:text-white transition-colors">
                  Feedback / Report an issue
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-amber-400 font-bold">
                  Admin Panel (Vayam)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-gray-400">
          <div className="max-w-2xl leading-relaxed">
            <p className="font-semibold text-gray-300">
              Independent coverage of Arsenal, Chelsea and Tottenham Hotspur. Not affiliated with, endorsed by, or connected to any football club.
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              © 2026 Three Points London Ltd. Registered in England & Wales. Built in London. Written for everywhere.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <Link href="/editorial-standards" className="hover:text-white">
              Editorial Standards
            </Link>
            <Link href="/corrections" className="hover:text-white">
              Corrections
            </Link>
            <Link href="/about" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
