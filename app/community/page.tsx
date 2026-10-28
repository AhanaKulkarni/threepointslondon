"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getSiteData } from "@/lib/store";
import { MessageSquare, ThumbsUp, Share2, AlertCircle, Shield, Award } from "lucide-react";
import AdSlot from "@/components/AdSlot";

export default function CommunityPage() {
  const [activeClub, setActiveClub] = useState<string>("all");
  const [commentInput, setCommentInput] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const posts = [
    {
      id: "c-1",
      club: "arsenal",
      authorName: "danny_k",
      badge: "TOP CONTRIBUTOR",
      time: "4 hours ago",
      desk: "Matchday",
      title: "Are we actually watching a rest-defence problem, or just variance? Eleven games is not a season",
      content:
        "Read the xGA piece this morning and I buy most of it, but 0.47 of the jump comes from counters and we have played three of the four quickest sides in the league already. Genuine question for the people who track this properly — at what point does the sample stop being noise? #xGA #arteta #tactics",
      upvotes: 248,
      repliesCount: 64,
      replies: [
        {
          author: "Vayam Lahoti",
          badge: "EDITOR",
          time: "3 hours ago",
          text: "Fair challenge, and I said as much in the piece. Phase-level xGA stabilises around fifteen to eighteen games, so we are not there. What makes me think it is signal rather than noise is that the full-back height has moved too, and that is a choice rather than a sample.",
          upvotes: 96,
        },
        {
          author: "spursmatt",
          badge: "TOTTENHAM",
          time: "2 hours ago",
          text: "Same thing happened to us under Ange and it took a full season for anyone to call it. The full-back height is the tell every time.",
          upvotes: 41,
        },
      ],
    },
    {
      id: "c-2",
      club: "chelsea",
      authorName: "rhys_bridge",
      badge: "CHELSEA",
      time: "6 hours ago",
      desk: "Transfers",
      title: "Chelsea's amortisation cliff: what the 2026 accounts actually show",
      content:
        "A breakdown of the squad cost ratio and why the January headroom is smaller than reported. Not ours and not a TPL take — but it is the clearest thing I have read on the squad cost ratio, and it lines up with Nathan's piece last week. #psr #january #offsite",
      upvotes: 176,
      repliesCount: 38,
      replies: [],
    },
    {
      id: "c-3",
      club: "all",
      authorName: "Amelia Hart",
      badge: "WRITER",
      time: "Yesterday",
      desk: "Matchday",
      title: "Which London side finishes highest this season? (Poll)",
      content:
        "Vote below and explain why in the comments. Arsenal have the defensive baseline, Chelsea have the bench depth, Tottenham have the tactical dynamism.",
      upvotes: 412,
      repliesCount: 193,
      poll: {
        total: 2104,
        options: [
          { name: "Arsenal", pct: 54 },
          { name: "Chelsea", pct: 31 },
          { name: "Tottenham", pct: 15 },
        ],
      },
      replies: [],
    },
  ];

  const filteredPosts = posts.filter((p) => {
    if (activeClub === "all") return true;
    return p.club === activeClub || p.club === "all";
  });

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-hairline mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted">
            THE COMMUNITY
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-navy">
            Three clubs, one room
          </h1>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Argue about the football, share what you are reading elsewhere, and get answers from the people who write the site. Moderated, named, and open to all three fanbases.
          </p>
        </div>

        {/* Counter Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-surface border border-hairline px-4 py-2 text-center rounded-xs">
            <span className="block text-[10px] font-extrabold text-muted uppercase">MEMBERS</span>
            <span className="font-display font-black text-xl text-navy">4,318</span>
          </div>
          <div className="bg-surface border border-hairline px-4 py-2 text-center rounded-xs">
            <span className="block text-[10px] font-extrabold text-muted uppercase">POSTS TODAY</span>
            <span className="font-display font-black text-xl text-navy">87</span>
          </div>
          <div className="bg-surface border border-hairline px-4 py-2 text-center rounded-xs">
            <span className="block text-[10px] font-extrabold text-muted uppercase">ACTIVE NOW</span>
            <span className="font-display font-black text-xl text-green-600">212</span>
          </div>
        </div>
      </div>

      {/* Club Selector Tabs */}
      <div className="flex items-center gap-2 pb-6 border-b border-hairline mb-8 text-xs font-bold">
        {[
          { key: "all", label: "All Rooms" },
          { key: "arsenal", label: "Arsenal Room" },
          { key: "chelsea", label: "Chelsea Room" },
          { key: "tottenham", label: "Tottenham Room" },
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveClub(c.key)}
            className={`px-3 py-1.5 rounded-xs transition-colors ${
              activeClub === c.key
                ? "bg-navy text-white font-extrabold"
                : "bg-surface hover:bg-gray-200 text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Feed + Rules/Trending Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Posts Feed (8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Creation Box */}
          <div className="bg-surface border border-hairline p-4 rounded-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs">
                V
              </span>
              <input
                type="text"
                placeholder="Share a link, debate a decision, or start a topic..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="flex-1 bg-white border border-hairline px-3 py-2 text-xs rounded-xs focus:outline-indigo"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-hairline text-xs font-semibold text-muted">
              <div className="flex items-center gap-3">
                <button className="hover:text-navy">Link</button>
                <button className="hover:text-navy">Poll</button>
                <button className="hover:text-navy">Stats</button>
              </div>
              <button
                onClick={() => {
                  if (newPostTitle.trim()) {
                    alert("Your topic has been posted to the London Community room!");
                    setNewPostTitle("");
                  }
                }}
                className="bg-navy text-white font-bold px-4 py-1 rounded text-xs hover:bg-indigo transition-colors"
              >
                Post to Room
              </button>
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white border border-hairline p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy">@{post.authorName}</span>
                  {post.badge && (
                    <span className="text-[10px] font-black uppercase bg-surface text-muted px-1.5 py-0.5 rounded border border-hairline">
                      {post.badge}
                    </span>
                  )}
                  <span className="text-gray-400">• {post.time}</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase text-ember tracking-wider">
                  #{post.desk}
                </span>
              </div>

              <h2 className="font-headline font-bold text-base sm:text-lg text-ink leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#333] leading-relaxed">
                {post.content}
              </p>

              {/* Poll Rendering if present */}
              {post.poll && (
                <div className="bg-surface p-4 rounded-xs border border-hairline space-y-2 text-xs">
                  {post.poll.options.map((opt) => (
                    <div key={opt.name} className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>{opt.name}</span>
                        <span>{opt.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-xs overflow-hidden">
                        <div
                          className="bg-navy h-full"
                          style={{ width: `${opt.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="text-[10px] text-muted pt-2 text-right">
                    {post.poll.total.toLocaleString()} votes
                  </div>
                </div>
              )}

              {/* Actions & Comment Count */}
              <div className="flex items-center justify-between pt-3 border-t border-hairline text-xs font-semibold text-muted">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-navy">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.upvotes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.repliesCount} comments</span>
                  </span>
                </div>
                <button className="flex items-center gap-1 hover:text-navy">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Nested Replies */}
              {post.replies && post.replies.length > 0 && (
                <div className="bg-surface p-4 rounded-xs space-y-3 mt-4 border-l-2 border-l-navy">
                  {post.replies.map((reply, ridx) => (
                    <div key={ridx} className="text-xs space-y-1 pb-2 border-b border-hairline last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy">{reply.author}</span>
                        {reply.badge && (
                          <span className={`text-[9px] font-black uppercase px-1 py-0.2 rounded ${
                            reply.badge === "EDITOR" ? "bg-ember text-white" : "bg-white text-muted border border-hairline"
                          }`}>
                            {reply.badge}
                          </span>
                        )}
                        <span className="text-[11px] text-gray-400">• {reply.time}</span>
                      </div>
                      <p className="text-ink leading-relaxed">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <AdSlot id="infeed_728x90" label="AD — 970×250 IN-FEED · AFTER POST 2, HEIGHT RESERVED" />
        </div>

        {/* Sidebar: House Rules & Top Contributors (4) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* House Rules */}
          <div className="bg-white border border-hairline p-5 rounded-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline">
              <Shield className="w-4 h-4 text-navy" />
              <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-navy">
                House Rules
              </h3>
            </div>
            <ol className="space-y-2.5 text-xs text-muted leading-relaxed list-decimal list-inside font-medium">
              <li><strong className="text-ink">Argue with the point</strong>, never the person.</li>
              <li><strong className="text-ink">Credit and link</strong> anything that is not yours.</li>
              <li><strong className="text-ink">No tragedy chanting</strong>, no abuse, no unverified leaks.</li>
              <li><strong className="text-ink">Rival fans are guests</strong>, not targets. All three London badges live here.</li>
            </ol>
          </div>

          {/* Top Contributors */}
          <div className="bg-surface border border-hairline p-5 rounded-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-navy">
                Top Contributors This Month
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy">@danny_k (Arsenal)</span>
                <span className="font-extrabold text-muted">1,204 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy">@spursmatt (Tottenham)</span>
                <span className="font-extrabold text-muted">988 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy">@rhys_bridge (Chelsea)</span>
                <span className="font-extrabold text-muted">743 pts</span>
              </div>
            </div>
          </div>

          <AdSlot id="rail_300x600" label="AD — 300×600 HALF-PAGE · HIGHEST-DWELL PAGE ON SITE" />
        </aside>
      </div>
    </div>
  );
}
