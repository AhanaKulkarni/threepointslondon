"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import VayamGreeting from "@/components/VayamGreeting";
import { Article, SponsorSlot, TickerItem, Club, Desk } from "@/lib/types";
import {
  FileText,
  Radio,
  Image as ImageIcon,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Sliders,
  Lock,
  Key,
  LogOut,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "articles" | "auto-ingest" | "sponsors" | "ticker" | "data"
  >("overview");

  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [sponsors, setSponsors] = useState<Record<string, SponsorSlot>>({});
  const [ticker, setTicker] = useState<TickerItem[]>([]);
  const [dataStats, setDataStats] = useState<any>({});
  const [standings, setStandings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Ingestion state
  const [ingesting, setIngesting] = useState(false);
  const [ingestLog, setIngestLog] = useState<string[]>([]);

  // Article Form State (Create / Edit)
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    excerpt: "",
    body: "",
    club: "arsenal" as Club,
    desk: "news" as Desk,
    subDesk: "ANALYSIS",
    authorId: "vayam-lahoti",
    authorName: "Vayam Lahoti",
    isExclusive: false,
    isLead: false,
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "",
  });

  // Load all data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [artRes, sponRes, tickRes, dataRes] = await Promise.all([
        fetch("/api/articles"),
        fetch("/api/sponsors"),
        fetch("/api/ticker"),
        fetch("/api/data-numbers"),
      ]);

      const artData = await artRes.json();
      const sponData = await sponRes.json();
      const tickData = await tickRes.json();
      const numData = await dataRes.json();

      if (artData.articles) setArticles(artData.articles);
      if (sponData.sponsors) setSponsors(sponData.sponsors);
      if (tickData.ticker) setTicker(tickData.ticker);
      if (numData.dataStats) setDataStats(numData.dataStats);
      if (numData.standings) setStandings(numData.standings);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("tpl_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoading(false);
      }
      setCheckingAuth(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("tpl_admin_auth", "true");
        localStorage.setItem("tpl_admin_token", data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.message || "Invalid username or password. Please try again.");
      }
    } catch (err) {
      setLoginError("Network connection error. Please verify server status.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tpl_admin_auth");
      localStorage.removeItem("tpl_admin_token");
      setIsAuthenticated(false);
      setLoginPassword("");
    }
  };

  const notify = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // 1. Article handlers
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditingArticle && editingArticleId) {
        const res = await fetch(`/api/articles/${editingArticleId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleForm),
        });
        const data = await res.json();
        if (data.success) {
          notify(`Article "${articleForm.title}" updated successfully!`);
        }
      } else {
        const res = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleForm),
        });
        const data = await res.json();
        if (data.success) {
          notify(`New article published immediately to the homepage!`);
        }
      }
      resetArticleForm();
      fetchData();
    } catch (err) {
      alert("Error saving article");
    }
  };

  const handleEditArticle = (art: Article) => {
    setIsEditingArticle(true);
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      excerpt: art.excerpt,
      body: art.body,
      club: art.club,
      desk: art.desk,
      subDesk: art.subDesk || "ANALYSIS",
      authorId: art.authorId,
      authorName: art.authorName,
      isExclusive: art.isExclusive,
      isLead: art.isLead,
      readTime: art.readTime,
      imageUrl: art.imageUrl || "",
      imageCaption: art.imageCaption || "",
    });
    setActiveTab("articles");
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        notify(`Article deleted.`);
        fetchData();
      }
    } catch (err) {
      alert("Error deleting article");
    }
  };

  const resetArticleForm = () => {
    setIsEditingArticle(false);
    setEditingArticleId(null);
    setArticleForm({
      title: "",
      excerpt: "",
      body: "",
      club: "arsenal",
      desk: "news",
      subDesk: "ANALYSIS",
      authorId: "vayam-lahoti",
      authorName: "Vayam Lahoti",
      isExclusive: false,
      isLead: false,
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      imageCaption: "",
    });
  };

  // 2. Automated News Ingestion Trigger
  const handleTriggerIngestion = async () => {
    setIngesting(true);
    setIngestLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Querying London sports feeds for Arsenal, Chelsea, Tottenham...`,
      ...prev,
    ]);
    try {
      const res = await fetch("/api/auto-ingest", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        notify(data.message);
        setIngestLog((prev) => [
          `[${new Date().toLocaleTimeString()}] DONE: ${data.message}`,
          ...prev,
        ]);
        fetchData();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error running news ingestion");
    } finally {
      setIngesting(false);
    }
  };

  // 3. Sponsor Update handler
  const handleSaveSponsor = async (slotId: string, slotData: SponsorSlot) => {
    try {
      const res = await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slotData),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Sponsor slot ${slotId} updated!`);
        fetchData();
      }
    } catch (err) {
      alert("Error saving sponsor slot");
    }
  };

  // 4. Ticker Update handler
  const handleSaveTicker = async (updatedList: TickerItem[]) => {
    try {
      const res = await fetch("/api/ticker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: updatedList }),
      });
      const data = await res.json();
      if (data.success) {
        notify("Breaking ticker updated!");
        fetchData();
      }
    } catch (err) {
      alert("Error saving ticker");
    }
  };

  // 5. Data Numbers handler
  const handleSaveDataStat = async (clubKey: string, updates: any) => {
    try {
      const res = await fetch("/api/data-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "dataStat", club: clubKey, updates }),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Stats for ${clubKey} saved!`);
        fetchData();
      }
    } catch (err) {
      alert("Error saving stats");
    }
  };

  // 1. Loading & Authentication Gate
  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-navy border-t-ember rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            Verifying Editor Credentials...
          </span>
        </div>
      </div>
    );
  }

  // 2. Login Screen for Vayam
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-hairline rounded-sm shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Top Brand Banner */}
          <div className="bg-navy p-6 text-white text-center border-b-4 border-b-ember">
            <div className="w-14 h-14 rounded-full bg-ember text-white mx-auto flex items-center justify-center font-display font-black text-2xl shadow-md ring-4 ring-white/10 mb-3">
              V
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/15 px-2.5 py-0.5 rounded-xs text-gray-200">
                EDITOR PORTAL
              </span>
              <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-400" />
                RESTRICTED
              </span>
            </div>
            <h1 className="font-display font-black text-2xl text-white tracking-tight">
              Sign In to Three Points London
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Founder & Editorial Control Center
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-[#E8192C] font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. VayamLahoti"
                  required
                  autoFocus
                  className="w-full bg-surface border border-hairline rounded px-3 py-2.5 text-sm text-ink font-semibold focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-surface border border-hairline rounded px-3 py-2.5 text-sm text-ink font-semibold focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-navy hover:bg-indigo text-white font-display font-extrabold text-sm uppercase tracking-wider py-3 rounded transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-ember" />
                  <span>Authenticate & Enter Portal</span>
                </>
              )}
            </button>

            <div className="pt-3 border-t border-hairline text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-muted hover:text-navy transition-colors"
              >
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8">
      {/* Dynamic Vayam Greeting & V avatar with logout */}
      <VayamGreeting onLogout={handleLogout} />

      {/* Notification Toast */}
      {feedbackMsg && (
        <div className="fixed top-20 right-6 z-50 bg-green-900 text-white px-4 py-3 rounded shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Admin Tabs Bar (Mobile friendly horizontal scroll) */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none items-center gap-2 border-b border-hairline my-6 pb-3 text-xs font-extrabold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "overview" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "articles" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Articles & Exclusives ({articles.length})
        </button>

        <button
          onClick={() => setActiveTab("auto-ingest")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "auto-ingest" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-ember" />
          Auto News Ingestion
        </button>

        <button
          onClick={() => setActiveTab("sponsors")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "sponsors" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Sponsors & Ad Slots
        </button>

        <button
          onClick={() => setActiveTab("ticker")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "ticker" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Breaking Ticker
        </button>

        <button
          onClick={() => setActiveTab("data")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xs transition-colors ${
            activeTab === "data" ? "bg-navy text-white" : "bg-surface hover:bg-gray-200 text-ink"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Numbers Behind Football
        </button>

        <Link
          href="/"
          target="_blank"
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 border border-hairline rounded text-xs text-navy font-bold hover:bg-surface"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Site</span>
          <ExternalLink className="w-3 h-3 text-muted" />
        </Link>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-5 border border-hairline rounded-xs">
              <span className="text-[10px] font-black uppercase text-muted block mb-1">
                PUBLISHED STORIES
              </span>
              <span className="font-display font-black text-3xl text-navy">
                {articles.length}
              </span>
              <span className="text-[11px] text-green-700 font-bold block mt-1">
                All immediately live on homepage
              </span>
            </div>

            <div className="bg-surface p-5 border border-hairline rounded-xs">
              <span className="text-[10px] font-black uppercase text-muted block mb-1">
                EXCLUSIVES BROKEN
              </span>
              <span className="font-display font-black text-3xl text-ember">
                {articles.filter((a) => a.isExclusive).length}
              </span>
              <span className="text-[11px] text-muted font-bold block mt-1">
                Red badge chip enabled
              </span>
            </div>

            <div className="bg-surface p-5 border border-hairline rounded-xs">
              <span className="text-[10px] font-black uppercase text-muted block mb-1">
                AUTOMATED NEWS INGESTION
              </span>
              <span className="font-display font-black text-2xl text-green-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                ACTIVE
              </span>
              <span className="text-[11px] text-muted font-bold block mt-1">
                Filters ARS / CHE / TOT only
              </span>
            </div>

            <div className="bg-surface p-5 border border-hairline rounded-xs">
              <span className="text-[10px] font-black uppercase text-muted block mb-1">
                TOTAL READ ENGAGEMENT
              </span>
              <span className="font-display font-black text-3xl text-navy">
                {articles.reduce((acc, a) => acc + (a.views || 0), 0).toLocaleString()}
              </span>
              <span className="text-[11px] text-muted font-bold block mt-1">
                Feeds "Most Read" algorithm
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-hairline p-6 rounded-xs">
            <h3 className="font-headline font-bold text-base text-navy mb-4">
              Quick Administrative Actions
            </h3>
            <div className="flex flex-wrap gap-4 text-xs font-bold">
              <button
                onClick={() => {
                  resetArticleForm();
                  setActiveTab("articles");
                }}
                className="bg-navy text-white px-4 py-2.5 rounded-xs hover:bg-indigo transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Exclusive / Feature</span>
              </button>

              <button
                onClick={handleTriggerIngestion}
                disabled={ingesting}
                className="bg-ember text-white px-4 py-2.5 rounded-xs hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${ingesting ? "animate-spin" : ""}`} />
                <span>Trigger Live London News Ingestion</span>
              </button>

              <button
                onClick={() => setActiveTab("sponsors")}
                className="bg-surface border border-hairline text-ink px-4 py-2.5 rounded-xs hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Configure Sponsor Images & Links</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARTICLES (CREATE / EDIT / LIST) */}
      {activeTab === "articles" && (
        <div className="space-y-8">
          {/* Article Form */}
          <div className="bg-surface border border-hairline p-6 rounded-xs">
            <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
              <h3 className="font-headline font-bold text-base text-navy">
                {isEditingArticle ? `Edit Article: "${articleForm.title}"` : "Create & Publish New Story"}
              </h3>
              {isEditingArticle && (
                <button
                  onClick={resetArticleForm}
                  className="text-xs text-muted hover:text-navy underline font-bold"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-muted mb-1">Headline</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo text-sm font-bold"
                    placeholder="e.g. Revealed: Why Three Points London will break the media market"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1">Club Focus (Strictly London)</label>
                  <select
                    value={articleForm.club}
                    onChange={(e) => setArticleForm({ ...articleForm, club: e.target.value as Club })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                  >
                    <option value="arsenal">Arsenal Desk</option>
                    <option value="chelsea">Chelsea Desk</option>
                    <option value="tottenham">Tottenham Desk</option>
                    <option value="all">All Three Desks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-muted mb-1">Sub-Desk / Format</label>
                  <select
                    value={articleForm.desk}
                    onChange={(e) => setArticleForm({ ...articleForm, desk: e.target.value as Desk })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                  >
                    <option value="news">News</option>
                    <option value="transfers">Transfers</option>
                    <option value="matchday">Matchday</option>
                    <option value="features">Features</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted mb-1">Sub-Desk Chip Label</label>
                  <input
                    type="text"
                    value={articleForm.subDesk}
                    onChange={(e) => setArticleForm({ ...articleForm, subDesk: e.target.value })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo uppercase"
                    placeholder="e.g. DATA ANALYSIS, INVESTIGATION"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1">Author Byline</label>
                  <select
                    value={articleForm.authorId}
                    onChange={(e) => {
                      const id = e.target.value;
                      const name =
                        id === "vayam-lahoti"
                          ? "Vayam Lahoti"
                          : id === "amelia-hart"
                          ? "Amelia Hart"
                          : id === "nathan-reeves"
                          ? "Nathan Reeves"
                          : "Priya Shah";
                      setArticleForm({ ...articleForm, authorId: id, authorName: name });
                    }}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                  >
                    <option value="vayam-lahoti">Vayam Lahoti (Founder & Editor)</option>
                    <option value="amelia-hart">Amelia Hart (Arsenal)</option>
                    <option value="nathan-reeves">Nathan Reeves (Chelsea & Transfers)</option>
                    <option value="priya-shah">Priya Shah (Tottenham & Academies)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-muted mb-1">Standfirst / Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                  placeholder="One or two sentences summarizing the key finding..."
                ></textarea>
              </div>

              <div>
                <label className="block text-muted mb-1">Article Body (Paragraphs)</label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.body}
                  onChange={(e) => setArticleForm({ ...articleForm, body: e.target.value })}
                  className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo font-body text-sm"
                  placeholder="Full analysis text with paragraphs separated by newlines..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1">Lead Image URL</label>
                  <input
                    type="url"
                    value={articleForm.imageUrl}
                    onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-muted mb-1">Image Caption / Wire Credit</label>
                  <input
                    type="text"
                    value={articleForm.imageCaption}
                    onChange={(e) => setArticleForm({ ...articleForm, imageCaption: e.target.value })}
                    className="w-full bg-white border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                    placeholder="e.g. Mikel Arteta at Villa Park. (IMAGO / Action Plus)"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isExclusive}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, isExclusive: e.target.checked })
                    }
                    className="rounded text-ember"
                  />
                  <span className="text-xs text-navy font-bold">
                    Mark as EXCLUSIVE (Red Chip)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isLead}
                    onChange={(e) => setArticleForm({ ...articleForm, isLead: e.target.checked })}
                    className="rounded text-navy"
                  />
                  <span className="text-xs text-navy font-bold">
                    Pin as Homepage Lead Story
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t border-hairline flex gap-3">
                <button
                  type="submit"
                  className="bg-navy hover:bg-indigo text-white px-6 py-2.5 rounded-xs text-xs font-bold transition-colors"
                >
                  {isEditingArticle ? "Save Changes" : "Publish Immediately to Live Homepage"}
                </button>
                {isEditingArticle && (
                  <button
                    type="button"
                    onClick={resetArticleForm}
                    className="bg-surface text-ink px-4 py-2 rounded-xs text-xs font-bold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Published Articles List */}
          <div className="bg-white border border-hairline p-6 rounded-xs">
            <h3 className="font-headline font-bold text-base text-navy mb-4">
              All Stories on Three Points London ({articles.length})
            </h3>
            <div className="divide-y divide-hairline">
              {articles.map((art) => (
                <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase mb-1">
                      {art.isExclusive && (
                        <span className="bg-ember text-white px-1.5 py-0.2 rounded-xs">
                          EXCLUSIVE
                        </span>
                      )}
                      <span className="text-navy">{art.club}</span>
                      <span>•</span>
                      <span className="text-muted">{art.subDesk || art.desk}</span>
                      <span>•</span>
                      <span className="text-gray-400">{art.views} reads</span>
                    </div>

                    <h4 className="font-headline font-bold text-sm text-navy">{art.title}</h4>
                    <span className="text-xs text-muted block mt-0.5">By {art.authorName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Link
                      href={`/article/${art.slug}`}
                      target="_blank"
                      className="p-1.5 text-muted hover:text-navy border border-hairline rounded"
                      title="View on site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleEditArticle(art)}
                      className="p-1.5 text-indigo hover:text-navy border border-hairline rounded"
                      title="Edit article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.id, art.title)}
                      className="p-1.5 text-red-600 hover:text-red-800 border border-hairline rounded"
                      title="Delete article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUTO NEWS INGESTION */}
      {activeTab === "auto-ingest" && (
        <div className="space-y-6">
          <div className="bg-surface border border-hairline p-6 rounded-xs">
            <div className="flex items-center justify-between pb-4 border-b border-hairline mb-4">
              <div>
                <h3 className="font-headline font-bold text-base text-navy">
                  Autonomous News Ingestion Engine
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Automated background pipeline that continuously fetches, categorizes, and immediately publishes London football stories.
                </p>
              </div>
              <button
                onClick={handleTriggerIngestion}
                disabled={ingesting}
                className="bg-ember hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xs text-xs transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${ingesting ? "animate-spin" : ""}`} />
                <span>{ingesting ? "Fetching & Publishing..." : "Fetch & Ingest Now"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold mb-6">
              <div className="bg-white p-4 border border-hairline rounded-xs">
                <span className="text-[10px] text-muted uppercase block">Target Desks</span>
                <span className="font-bold text-navy text-sm">Arsenal, Chelsea, Tottenham ONLY</span>
              </div>
              <div className="bg-white p-4 border border-hairline rounded-xs">
                <span className="text-[10px] text-muted uppercase block">Publishing Rule</span>
                <span className="font-bold text-green-700 text-sm">Immediate live homepage publishing</span>
              </div>
              <div className="bg-white p-4 border border-hairline rounded-xs">
                <span className="text-[10px] text-muted uppercase block">Scheduled Cron</span>
                <span className="font-bold text-navy text-sm">Every 15-30 minutes</span>
              </div>
            </div>

            {/* Live Ingestion Log */}
            <div>
              <span className="text-[10px] font-black uppercase text-muted tracking-wider block mb-2">
                LIVE INGESTION ACTIVITY LOG
              </span>
              <div className="bg-black text-green-400 font-mono text-xs p-4 rounded-xs h-48 overflow-y-auto space-y-1">
                <div>[SYSTEM] Ingestion daemon active. Ready for automated updates.</div>
                {ingestLog.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPONSORS & AD SLOTS (Image + Target Link) */}
      {activeTab === "sponsors" && (
        <div className="space-y-6">
          <div className="bg-surface border border-hairline p-6 rounded-xs">
            <h3 className="font-headline font-bold text-base text-navy mb-1">
              Sponsors & Advertising Slot Manager
            </h3>
            <p className="text-xs text-muted mb-6">
              Per your requirement: Sponsors remain blank / reserved wireframe by default. Enter an image URL and a target destination link to activate any slot. When a reader clicks the image, it takes them to the sponsor's URL.
            </p>

            <div className="space-y-6">
              {Object.entries(sponsors).map(([slotKey, slot]) => (
                <div key={slotKey} className="bg-white border border-hairline p-5 rounded-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
                    <div>
                      <span className="font-display font-black text-sm text-navy uppercase">
                        {slot.name}
                      </span>
                      <span className="text-xs font-bold text-muted ml-2">
                        ({slot.size} · Reserved Height {slot.height}px)
                      </span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                      slot.imageUrl && slot.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}>
                      {slot.imageUrl && slot.isActive ? "Active Sponsor" : "Blank Placeholder"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                    <div>
                      <label className="block text-muted mb-1">Sponsor Image URL</label>
                      <input
                        type="url"
                        value={slot.imageUrl || ""}
                        onChange={(e) => {
                          const updated = { ...slot, imageUrl: e.target.value || null };
                          setSponsors({ ...sponsors, [slotKey]: updated });
                        }}
                        className="w-full bg-surface border border-hairline p-2 rounded-xs focus:outline-indigo"
                        placeholder="Leave empty to keep blank / reserved wireframe"
                      />
                    </div>

                    <div>
                      <label className="block text-muted mb-1">Target Website Link (Click Destination)</label>
                      <input
                        type="url"
                        value={slot.targetUrl || ""}
                        onChange={(e) => {
                          const updated = { ...slot, targetUrl: e.target.value || null };
                          setSponsors({ ...sponsors, [slotKey]: updated });
                        }}
                        className="w-full bg-surface border border-hairline p-2 rounded-xs focus:outline-indigo"
                        placeholder="https://sponsorbrand.com"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-hairline">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy">
                      <input
                        type="checkbox"
                        checked={slot.isActive}
                        onChange={(e) => {
                          const updated = { ...slot, isActive: e.target.checked };
                          setSponsors({ ...sponsors, [slotKey]: updated });
                        }}
                      />
                      <span>Enable this slot</span>
                    </label>

                    <button
                      onClick={() => handleSaveSponsor(slotKey, slot)}
                      className="bg-navy hover:bg-indigo text-white font-bold px-4 py-1.5 rounded-xs text-xs transition-colors"
                    >
                      Save Slot Settings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BREAKING TICKER */}
      {activeTab === "ticker" && (
        <div className="space-y-6">
          <div className="bg-white border border-hairline p-6 rounded-xs">
            <h3 className="font-headline font-bold text-base text-navy mb-4">
              Breaking News Ticker Headlines
            </h3>

            <div className="space-y-3">
              {ticker.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 bg-surface p-3 border border-hairline rounded-xs">
                  <span className="font-black text-xs text-muted w-5">{idx + 1}</span>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => {
                      const updated = [...ticker];
                      updated[idx].text = e.target.value;
                      setTicker(updated);
                    }}
                    className="flex-1 bg-white border border-hairline p-2 text-xs font-bold rounded-xs focus:outline-indigo"
                  />
                  <select
                    value={item.club}
                    onChange={(e) => {
                      const updated = [...ticker];
                      updated[idx].club = e.target.value as any;
                      setTicker(updated);
                    }}
                    className="bg-white border border-hairline p-2 text-xs font-bold rounded-xs"
                  >
                    <option value="arsenal">Arsenal</option>
                    <option value="chelsea">Chelsea</option>
                    <option value="tottenham">Tottenham</option>
                  </select>
                  <button
                    onClick={() => {
                      const updated = ticker.filter((_, i) => i !== idx);
                      setTicker(updated);
                    }}
                    className="p-2 text-red-600 hover:text-red-800"
                    title="Remove headline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    const newItem: TickerItem = {
                      id: `t-${Date.now()}`,
                      text: "New London football breaking update...",
                      club: "arsenal",
                      active: true,
                      timestamp: new Date().toISOString(),
                    };
                    setTicker([...ticker, newItem]);
                  }}
                  className="bg-surface text-navy font-bold px-4 py-2 rounded-xs text-xs border border-hairline hover:bg-gray-200"
                >
                  + Add Ticker Item
                </button>
                <button
                  onClick={() => handleSaveTicker(ticker)}
                  className="bg-navy hover:bg-indigo text-white font-bold px-6 py-2 rounded-xs text-xs"
                >
                  Save Ticker Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DATA NUMBERS */}
      {activeTab === "data" && (
        <div className="space-y-6">
          <div className="bg-white border border-hairline p-6 rounded-xs">
            <h3 className="font-headline font-bold text-base text-navy mb-4">
              "The Numbers Behind The Football" Homepage Stats
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["arsenal", "chelsea", "tottenham"].map((clubKey) => {
                const stat = dataStats[clubKey];
                if (!stat) return null;

                return (
                  <div key={clubKey} className="border border-hairline p-4 rounded-xs bg-surface space-y-3">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-navy block border-b pb-2">
                      {clubKey} Data Callout
                    </span>
                    <div>
                      <label className="text-[10px] text-muted block mb-1">Headline Stat (Big Number)</label>
                      <input
                        type="text"
                        value={stat.stat}
                        onChange={(e) => {
                          const updated = { ...dataStats, [clubKey]: { ...stat, stat: e.target.value } };
                          setDataStats(updated);
                        }}
                        className="w-full bg-white border border-hairline p-2 text-sm font-black rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted block mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = { ...dataStats, [clubKey]: { ...stat, label: e.target.value } };
                          setDataStats(updated);
                        }}
                        className="w-full bg-white border border-hairline p-2 text-xs font-bold rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted block mb-1">Subtext</label>
                      <input
                        type="text"
                        value={stat.subtext}
                        onChange={(e) => {
                          const updated = { ...dataStats, [clubKey]: { ...stat, subtext: e.target.value } };
                          setDataStats(updated);
                        }}
                        className="w-full bg-white border border-hairline p-2 text-xs font-semibold rounded-xs"
                      />
                    </div>
                    <button
                      onClick={() => handleSaveDataStat(clubKey, stat)}
                      className="w-full bg-navy hover:bg-indigo text-white font-bold py-1.5 rounded-xs text-xs"
                    >
                      Save {clubKey} Stat
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
