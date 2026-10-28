import { SiteData, Article, SponsorSlot, TickerItem, Club, Desk } from "./types";
import seedDataRaw from "@/data/site-data.json";

// Safe seed data
const initialSeed = seedDataRaw as unknown as SiteData;

let inMemoryData: SiteData = initialSeed;

function getFs() {
  if (typeof window === "undefined") {
    try {
      return require("fs");
    } catch {
      return null;
    }
  }
  return null;
}

function getPath() {
  if (typeof window === "undefined") {
    try {
      return require("path");
    } catch {
      return null;
    }
  }
  return null;
}

export function getSiteData(): SiteData {
  if (typeof window !== "undefined") {
    return inMemoryData;
  }

  const fs = getFs();
  const path = getPath();

  if (fs && path) {
    try {
      const dataFilePath = path.join(process.cwd(), "data", "site-data.json");
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, "utf-8");
        inMemoryData = JSON.parse(raw);
        return inMemoryData;
      }
    } catch (e) {
      // fallback to inMemoryData
    }
  }

  return inMemoryData;
}

export function saveSiteData(newData: SiteData): boolean {
  inMemoryData = newData;

  const fs = getFs();
  const path = getPath();

  if (fs && path) {
    try {
      const dataFilePath = path.join(process.cwd(), "data", "site-data.json");
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf-8");
      return true;
    } catch (err) {
      console.error("Error saving site data to disk:", err);
    }
  }
  return true;
}

export function getArticles(club?: string, desk?: string): Article[] {
  const data = getSiteData();
  let list = [...data.articles];

  if (club && club !== "all") {
    list = list.filter((a) => a.club === club || a.club === "all");
  }

  if (desk && desk !== "all") {
    list = list.filter((a) => a.desk === desk);
  }

  return list.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  const data = getSiteData();
  return data.articles.find((a) => a.slug === slug);
}

export function recordArticleView(slug: string): number {
  const data = getSiteData();
  const article = data.articles.find((a) => a.slug === slug);
  if (!article) return 0;

  article.views = (article.views || 0) + 1;
  saveSiteData(data);
  return article.views;
}

export function getMostReadArticles(club: "all" | "arsenal" | "chelsea" | "tottenham" = "all", limit = 4): Article[] {
  const data = getSiteData();
  let candidateArticles = [...data.articles];

  if (club !== "all") {
    candidateArticles = candidateArticles.filter((a) => a.club === club);
  }

  const now = Date.now();

  const scored = candidateArticles.map((article) => {
    const publishedTime = new Date(article.publishedAt).getTime();
    const hoursOld = Math.max(0, (now - publishedTime) / (1000 * 60 * 60));
    const score = (article.views || 1) / Math.pow(hoursOld + 2, 1.25);
    return { article, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

export function addArticle(newArticle: Omit<Article, "id" | "views">): Article {
  const data = getSiteData();
  const id = `art-${Date.now()}`;
  const created: Article = {
    ...newArticle,
    id,
    views: 120,
  };

  data.articles.unshift(created);
  saveSiteData(data);
  return created;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const data = getSiteData();
  const idx = data.articles.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  data.articles[idx] = {
    ...data.articles[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveSiteData(data);
  return data.articles[idx];
}

export function deleteArticle(id: string): boolean {
  const data = getSiteData();
  const initialLen = data.articles.length;
  data.articles = data.articles.filter((a) => a.id !== id);
  if (data.articles.length !== initialLen) {
    saveSiteData(data);
    return true;
  }
  return false;
}

export function updateSponsorSlot(id: string, updates: Partial<SponsorSlot>): SponsorSlot | null {
  const data = getSiteData();
  if (!data.sponsors[id]) {
    data.sponsors[id] = {
      id,
      name: id,
      size: "Custom",
      width: 728,
      height: 90,
      imageUrl: null,
      targetUrl: null,
      altText: "Sponsor placement",
      isActive: true,
      ...updates,
    };
  } else {
    data.sponsors[id] = {
      ...data.sponsors[id],
      ...updates,
    };
  }
  saveSiteData(data);
  return data.sponsors[id];
}

export function updateTickerItems(items: TickerItem[]): boolean {
  const data = getSiteData();
  data.ticker = items;
  return saveSiteData(data);
}

export function updateClubStandings(club: string, updates: any): boolean {
  const data = getSiteData();
  if (data.standings[club]) {
    data.standings[club] = { ...data.standings[club], ...updates };
    return saveSiteData(data);
  }
  return false;
}

export function updateDataStat(club: string, updates: any): boolean {
  const data = getSiteData();
  if (data.dataStats[club]) {
    data.dataStats[club] = { ...data.dataStats[club], ...updates };
    return saveSiteData(data);
  }
  return false;
}
