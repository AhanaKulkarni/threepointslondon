import React from "react";
import { getArticles, getSiteData } from "@/lib/store";
import ClubHubView from "@/components/ClubHubView";

export const revalidate = 0;

export default function TottenhamPage() {
  const articles = getArticles("tottenham");
  const siteData = getSiteData();

  return (
    <ClubHubView
      club="tottenham"
      clubTitle="The Tottenham Desk"
      tagline="Tactical evolution, youth development, and insider reporting from Hotspur Way."
      themeColor="text-[#24376B]"
      borderColor="border-[#24376B]"
      standings={siteData.standings.tottenham}
      articles={articles}
    />
  );
}
