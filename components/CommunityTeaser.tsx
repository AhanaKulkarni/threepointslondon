import React from "react";
import Link from "next/link";
import { CommunityPost } from "@/lib/types";
import { MessageSquare, Users } from "lucide-react";

interface CommunityTeaserProps {
  posts: CommunityPost[];
}

export default function CommunityTeaser({ posts }: CommunityTeaserProps) {
  const rooms = [
    {
      club: "arsenal",
      name: "Arsenal",
      color: "border-t-[#E8192C]",
      textColor: "text-[#E8192C]",
      online: 312,
    },
    {
      club: "chelsea",
      name: "Chelsea",
      color: "border-t-[#1C6BB0]",
      textColor: "text-[#1C6BB0]",
      online: 248,
    },
    {
      club: "tottenham",
      name: "Tottenham",
      color: "border-t-[#24376B]",
      textColor: "text-[#24376B]",
      online: 196,
    },
  ];

  return (
    <section className="my-10 bg-surface border border-hairline p-6 rounded-xs">
      <div className="flex items-center justify-between pb-4 border-b border-hairline">
        <div className="flex items-center gap-3">
          <h2 className="font-display font-extrabold text-sm sm:text-base text-navy uppercase tracking-tight">
            Community
          </h2>
          <span className="text-xs text-muted font-bold hidden sm:inline">
            Three clubs, one room
          </span>
        </div>
        <Link
          href="/community"
          className="text-xs font-bold text-indigo hover:text-ember transition-colors flex items-center gap-1"
        >
          <span>All rooms</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {rooms.map((room) => {
          const clubPosts = posts.filter((p) => p.club === room.club);
          const topPost = clubPosts[0];

          return (
            <div
              key={room.club}
              className={`bg-white border border-hairline border-t-[3px] ${room.color} p-4 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-hairline">
                  <span className={`font-display font-black text-sm uppercase ${room.textColor}`}>
                    {room.name}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span>{room.online} online</span>
                  </div>
                </div>

                {topPost ? (
                  <div className="py-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-ember mb-1">
                      <span>{topPost.category}</span>
                      <span>•</span>
                      <span className="text-muted">{topPost.lastReplyTime}</span>
                    </div>
                    <Link
                      href="/community"
                      className="font-headline font-bold text-xs sm:text-sm text-ink hover:text-indigo transition-colors line-clamp-3 block leading-snug"
                    >
                      {topPost.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted mt-3">
                      <span className="flex items-center gap-1 font-semibold">
                        <MessageSquare className="w-3 h-3" />
                        {topPost.repliesCount} replies
                      </span>
                      <span className="font-semibold text-gray-400">
                        by @{topPost.authorHandle}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-xs text-muted text-center">
                    No active threads right now.
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-hairline mt-2">
                <Link
                  href="/community"
                  className="w-full text-center block text-xs font-bold text-navy hover:text-indigo py-1 bg-surface rounded hover:bg-gray-100 transition-colors"
                >
                  Open the {room.name} room →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
