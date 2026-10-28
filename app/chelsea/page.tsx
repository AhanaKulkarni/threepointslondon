import React from "react";
import { getArticles, getSiteData } from "@/lib/store";
import ClubHubView from "@/components/ClubHubView";

export const revalidate = 0;

export default function ChelseaPage() {
  const articles = getArticles("chelsea");
  const siteData = getSiteData();

  return (
    <ClubHubView
      club="chelsea"
      clubTitle="The Chelsea Desk"
      tagline="Tactics, recruitment, and financial accounting from Stamford Bridge to Cobham."
      themeColor="text-[#1C6BB0]"
      borderColor="border-[#1C6BB0]"
      standings={siteData.standings.chelsea}
      articles={articles}
    />
  );
}
