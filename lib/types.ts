export type Club = "arsenal" | "chelsea" | "tottenham" | "all";

export type Desk = "news" | "transfers" | "matchday" | "features";

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  desk: string;
  bio: string;
  initials: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  piecesCount: number;
  exclusivesCount: number;
  writingSince: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  club: "arsenal" | "chelsea" | "tottenham" | "all";
  desk: Desk;
  authorId: string;
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  views: number;
  isExclusive: boolean;
  isLead: boolean;
  imageUrl?: string;
  imageCaption?: string;
  subDesk?: string; // e.g. "DATA ANALYSIS", "INVESTIGATION", "ACADEMY", "INTERVIEW"
  isAutoIngested?: boolean;
  sourceUrl?: string;
  sourceName?: string;
}

export interface TickerItem {
  id: string;
  text: string;
  club: "arsenal" | "chelsea" | "tottenham";
  link?: string;
  active: boolean;
  timestamp: string;
}

export interface DataStat {
  club: "arsenal" | "chelsea" | "tottenham";
  stat: string;
  label: string;
  subtext: string;
  articleTitle: string;
  articleSlug: string;
}

export interface SponsorSlot {
  id: string; // e.g. "billboard_970x250", "infeed_728x90", "rail_300x600", "sticky_floor_728x90", "rail_300x250"
  name: string;
  size: string;
  width: number;
  height: number;
  imageUrl: string | null;
  targetUrl: string | null;
  altText: string;
  isActive: boolean;
}

export interface CommunityPost {
  id: string;
  club: "arsenal" | "chelsea" | "tottenham";
  authorName: string;
  authorHandle: string;
  authorBadge?: string; // e.g. "TOP CONTRIBUTOR", "EDITOR", "WRITER"
  title: string;
  content: string;
  category: "matchday" | "transfers" | "tactics" | "academy" | "off-topic";
  isHot: boolean;
  upvotes: number;
  repliesCount: number;
  lastReplyTime: string;
  replies?: CommunityReply[];
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
  };
}

export interface CommunityReply {
  id: string;
  authorName: string;
  authorBadge?: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export interface ClubStandings {
  club: "arsenal" | "chelsea" | "tottenham";
  position: string;
  points: number;
  nextMatch: {
    opponent: string;
    date: string;
    competition: string;
    venue: string;
  };
  lastMatch: {
    opponent: string;
    result: string;
    score: string;
  };
}

export interface SiteData {
  authors: Author[];
  articles: Article[];
  ticker: TickerItem[];
  dataStats: Record<string, DataStat>;
  sponsors: Record<string, SponsorSlot>;
  community: CommunityPost[];
  standings: Record<string, ClubStandings>;
}
