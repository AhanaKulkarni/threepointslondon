import React from "react";
import Link from "next/link";
import { CommunityPost } from "@/lib/types";
import { MessageSquare, Users, ArrowRight } from "lucide-react";

interface CommunityTeaserProps {
  posts: CommunityPost[];
}

export default function CommunityTeaser({ posts }: CommunityTeaserProps) {
  const rooms = [
    {
      club: "arsenal",
      name: "Arsenal Room",
      color: "border-t-[#E8192C]",
      textColor: "text-[#E8192C]",
      online: 312,
      badgeBg: "bg-red-50 text-[#E8192C] border-red-200",
    },
    {
      club: "chelsea",
      name: "Chelsea Room",
      color: "border-t-[#1C6BB0]",
      textColor: "text-[#1C6BB0]",
      online: 248,
      badgeBg: "bg-blue-50 text-[#1C6BB0] border-blue-200",
    },
    {
      club: "tottenham",
      name: "Tottenham Room",
      color: "border-t-[#24376B]",
      textColor: "text-[#24376B]",
      online: 196,
      badgeBg: "bg-indigo-50 text-[#24376B] border-indigo-200",
    },
  ];

  return (
    <section className="my-10 bg-surface border border-hairline p-6 sm:p-8 rounded-sm shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <h2 className="font-display font-black text-base sm:text-lg text-navy uppercase tracking-tight">
            The London Community
          </h2>
          <span className="text-xs text-muted font-bold hidden sm:inline">
            Three clubs, one room. 212 members debating right now.
          </span>
        </div>
        <Link
          href="/community"
          className="text-xs font-bold text-indigo hover:text-ember transition-colors flex items-center gap-1 group"
        >
          <span>All Rooms</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {rooms.map((room) => {
          const clubPosts = posts.filter((p) => p.club === room.club);
          const topPost = clubPosts[0];

          return (
            <div
              key={room.club}
              className={`bg-white border border-hairline border-t-[3px] ${room.color} p-5 rounded-xs flex flex-col justify-between shadow-xs hover-elevate transition-all`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-hairline">
                  <span className={`font-display font-black text-sm uppercase ${room.textColor}`}>
                    {room.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted bg-surface px-2 py-0.5 rounded-full border border-hairline">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span>{room.online} online</span>
                  </div>
                </div>

                {topPost ? (
                  <div className="py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-ember mb-1.5">
                      <span>{topPost.category}</span>
                      <span>•</span>
                      <span className="text-muted">{topPost.lastReplyTime}</span>
                    </div>
                    <Link
                      href="/community"
                      className="font-headline font-bold text-sm text-ink hover:text-indigo transition-colors line-clamp-3 block leading-snug mb-3"
                    >
                      {topPost.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1 font-bold text-navy">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {topPost.repliesCount} comments
                      </span>
                      <span className="font-semibold text-gray-400">
                        by @{topPost.authorHandle}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-xs text-muted text-center font-medium">
                    No active threads in this room right now.
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-hairline mt-2">
                <Link
                  href="/community"
                  className="w-full text-center block text-xs font-bold text-navy hover:text-white py-2 bg-surface hover:bg-navy rounded-xs transition-colors"
                >
                  Join the {room.name.split(" ")[0]} Room →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
