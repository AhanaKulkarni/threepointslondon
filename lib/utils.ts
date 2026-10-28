import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Club } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return "Just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
}

export function getClubBorderClass(club: Club | string): string {
  switch (club) {
    case "arsenal":
      return "border-t-[3px] border-[#E8192C]";
    case "chelsea":
      return "border-t-[3px] border-[#1C6BB0]";
    case "tottenham":
      return "border-t-[3px] border-[#24376B]";
    default:
      return "border-t-[3px] border-indigo";
  }
}

export function getClubTextClass(club: Club | string): string {
  switch (club) {
    case "arsenal":
      return "text-[#E8192C]";
    case "chelsea":
      return "text-[#1C6BB0]";
    case "tottenham":
      return "text-[#24376B]";
    default:
      return "text-indigo";
  }
}

export function getGreeting(name = "Vayam"): { greeting: string; period: string } {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { greeting: `Good morning, ${name}`, period: "Morning" };
  } else if (hour < 17) {
    return { greeting: `Good afternoon, ${name}`, period: "Afternoon" };
  } else {
    return { greeting: `Good evening, ${name}`, period: "Evening" };
  }
}
