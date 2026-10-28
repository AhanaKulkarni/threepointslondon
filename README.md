# Three Points London (`threepointslondon.com`)

> **"One city. Three clubs. Endless passion."**  
> Independent editorial coverage of **Arsenal, Chelsea, and Tottenham Hotspur ONLY**. Built strictly against the 14-page brand and design specification.

---

## ⚡ Key Highlights Built

1. **Strict Design & Brand System Alignment**:
   - **Colors**: Slate Navy (`#1D2B45`), Indigo (`#2B4BC4`), Ember Red (`#CE3426`), Page (`#FFFFFF`), Surface (`#F6F7F9`).
   - **Off-Crest Club Wayfinding** (3–4px rules, dots, badges only — never full fills):
     - Arsenal: `#E8192C`
     - Chelsea: `#1C6BB0`
     - Tottenham: `#24376B`
   - **Typography**: Archivo (Display, Headline, UI) and Newsreader (Editorial Body).
   - **Core Web Vitals Engineered**: LCP < 2.0s, CLS < 0.05 (all sponsor slots have reserved container heights in CSS).

2. **Autonomous News Ingestion Pipeline**:
   - Automated ingestion service (`/api/auto-ingest`) that continuously scrapes and parses football feeds.
   - **Club Isolation Filter**: Strictly keeps stories matching Arsenal, Chelsea, and Tottenham keywords; discards the rest.
   - **Instant Publishing**: Every ingested story is published immediately to live and prominently featured on the homepage.
   - Updates the top running breaking ticker automatically.

3. **Algorithmic "Most Read" Engine (100% Automated)**:
   - Tracks actual reads per article.
   - Time-decay scoring formula:
     $$\text{Score} = \frac{\text{Views in last 48 hours}}{(\text{Age in hours} + 2)^{1.25}}$$
   - Features 4 tabs: `All three | Arsenal | Chelsea | Tottenham`.

4. **Founder & Editor Admin Suite for Vayam (`/admin`)**:
   - Time-of-day greeting: **"Good morning, Vayam" / "Good afternoon, Vayam" / "Good evening, Vayam"** with the **"V"** profile badge.
   - **Articles Manager**: Write new stories, edit, delete, toggle `EXCLUSIVE` (red chip), or pin to homepage hero.
   - **News Ingestion Controller**: 1-click on-demand ingestion trigger with live activity logs.
   - **Sponsors & Ad Slot Manager**:
     - Keep slots blank/reserved wireframe by default.
     - Upload Sponsor Image URL + Target Website Link (clickable image redirect).
   - **Breaking Ticker Manager**: Add, edit, reorder ticker headlines across London clubs.
   - **The Numbers Behind The Football**: Edit xGA (1.42), build-up % (68%), and progressive passes (+14).

---

## 🚀 Deployment to Vercel

This repository is built with **Next.js 15 (App Router)** and is 100% native for Vercel deployment:

1. Push this directory to your GitHub / GitLab account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Three Points London platform build"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Done!
