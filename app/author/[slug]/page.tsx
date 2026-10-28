import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getSiteData } from "@/lib/store";
import AdSlot from "@/components/AdSlot";
import { formatDate, formatTimeAgo, getClubTextClass } from "@/lib/utils";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const siteData = getSiteData();
  const author = siteData.authors.find((a) => a.slug === slug);

  if (!author) {
    notFound();
  }

  const authorArticles = getArticles().filter((a) => a.authorId === author.id);
  const otherAuthors = siteData.authors.filter((a) => a.id !== author.id);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* Profile Header */}
      <div className="bg-surface border border-hairline p-6 sm:p-8 rounded-xs mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-navy text-white font-display font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
            {author.initials}
          </div>

          <div className="flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">
              AUTHOR PROFILE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-navy">
              {author.name}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-indigo mt-0.5 mb-2">
              {author.role} · {author.desk}
            </p>
            <p className="font-body text-sm sm:text-base text-[#333] leading-relaxed max-w-3xl">
              {author.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-hairline text-xs font-semibold text-muted">
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy"
                >
                  X (Twitter)
                </a>
              )}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy"
                >
                  LinkedIn
                </a>
              )}
              {author.email && (
                <a href={`mailto:${author.email}`} className="hover:text-navy">
                  {author.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats on site */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-hairline">
          <div>
            <span className="text-[10px] uppercase font-bold text-muted block">
              Pieces Published
            </span>
            <span className="font-display font-black text-xl text-navy">
              {author.piecesCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-muted block">
              Exclusives Broken
            </span>
            <span className="font-display font-black text-xl text-ember">
              {author.exclusivesCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-muted block">
              Writing Since
            </span>
            <span className="font-display font-black text-xl text-navy">
              {author.writingSince}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-muted block">
              Primary Beat
            </span>
            <span className="font-display font-black text-xl text-navy capitalize">
              London Desks
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Articles + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Author Articles Feed (8) */}
        <div className="lg:col-span-8">
          <div className="pb-3 border-b border-hairline mb-6 flex items-center justify-between">
            <h2 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-navy">
              Published Work by {author.name.split(" ")[0]}
            </h2>
            <span className="text-xs text-muted font-bold">
              {authorArticles.length} pieces on this beat
            </span>
          </div>

          <div className="divide-y divide-hairline">
            {authorArticles.map((art) => (
              <div key={art.id} className="py-5 group">
                <div className="flex items-center gap-2 mb-1">
                  {art.isExclusive && (
                    <span className="bg-ember text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs">
                      EXCLUSIVE
                    </span>
                  )}
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${getClubTextClass(art.club)}`}>
                    {art.club}
                  </span>
                  <span className="text-muted/60">•</span>
                  <span className="text-[11px] font-bold text-muted uppercase">
                    {art.subDesk || art.desk}
                  </span>
                </div>

                <Link href={`/article/${art.slug}`}>
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-ink group-hover:text-indigo transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed mb-3">
                  {art.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{formatDate(art.publishedAt)}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Other Staff Writers */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-hairline p-5 rounded-xs">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-navy mb-4 pb-2 border-b border-hairline">
              Other Editorial Staff
            </h3>
            <div className="space-y-4">
              {otherAuthors.map((other) => (
                <div key={other.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface border border-hairline text-navy flex items-center justify-center font-bold text-xs">
                    {other.initials}
                  </div>
                  <div>
                    <Link
                      href={`/author/${other.slug}`}
                      className="font-headline font-bold text-xs text-navy hover:text-indigo block"
                    >
                      {other.name}
                    </Link>
                    <span className="text-[11px] text-muted block">{other.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdSlot id="rail_300x600" label="AD — 300×600 HALF-PAGE · STICKY REFRESH" />
        </aside>
      </div>
    </div>
  );
}
