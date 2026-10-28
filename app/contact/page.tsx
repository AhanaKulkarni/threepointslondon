"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "advertise",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
      <div className="pb-6 border-b border-hairline mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted">
          CONTACT & COMMERCIAL
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-navy uppercase mb-2">
          Get In Touch With The Newsroom
        </h1>
        <p className="text-sm text-muted">
          Editorial inquiries, commercial advertising, sponsored placements, and story pitches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div id="advertise" className="bg-surface border border-hairline p-5 rounded-xs">
          <div className="text-xs font-black uppercase tracking-wider text-navy mb-2">
            ADVERTISE & GUEST POSTING
          </div>
          <p className="text-xs text-muted leading-relaxed mb-3">
            Direct £500 sponsored editorial placements, native partnerships, and takeovers across Arsenal, Chelsea, and Tottenham audiences.
          </p>
          <a
            href="mailto:commercial@threepointslondon.com"
            className="text-xs font-bold text-indigo hover:text-ember"
          >
            commercial@threepointslondon.com →
          </a>
        </div>

        <div id="write" className="bg-surface border border-hairline p-5 rounded-xs">
          <div className="text-xs font-black uppercase tracking-wider text-navy mb-2">
            WRITE FOR US / PITCH
          </div>
          <p className="text-xs text-muted leading-relaxed mb-3">
            We commission freelance writers across all three London desks. Paid per piece, named byline, edited rather than rewritten.
          </p>
          <a
            href="mailto:pitches@threepointslondon.com"
            className="text-xs font-bold text-indigo hover:text-ember"
          >
            pitches@threepointslondon.com →
          </a>
        </div>

        <div id="feedback" className="bg-surface border border-hairline p-5 rounded-xs">
          <div className="text-xs font-black uppercase tracking-wider text-navy mb-2">
            REPORT AN ISSUE / CORRECTION
          </div>
          <p className="text-xs text-muted leading-relaxed mb-3">
            Spotted a factual error, broken link, or moderation breach in the community rooms? Reach the desk directly.
          </p>
          <a
            href="mailto:corrections@threepointslondon.com"
            className="text-xs font-bold text-indigo hover:text-ember"
          >
            corrections@threepointslondon.com →
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-hairline p-6 sm:p-8 rounded-xs max-w-2xl">
        <h2 className="font-headline font-bold text-lg text-navy mb-4">
          Send a Direct Message
        </h2>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xs text-center text-green-900">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-bold text-base">Message Received</h3>
            <p className="text-xs text-green-700 mt-1">
              Thank you for contacting Three Points London. Vayam and the editorial team will review your message shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-muted mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                placeholder="e.g. Alex Morgan"
              />
            </div>

            <div>
              <label className="block text-muted mb-1">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                placeholder="alex@domain.com"
              />
            </div>

            <div>
              <label className="block text-muted mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-surface border border-hairline p-2.5 rounded-xs focus:outline-indigo"
              >
                <option value="advertise">Advertising / Sponsored Placement (£500)</option>
                <option value="pitch">Freelance Pitch (Arsenal / Chelsea / Spurs)</option>
                <option value="correction">Report a Factual Correction</option>
                <option value="general">General Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-muted mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface border border-hairline p-2.5 rounded-xs focus:outline-indigo"
                placeholder="Include your pitch or partnership details..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-navy hover:bg-indigo text-white font-bold px-6 py-2.5 rounded-xs text-xs transition-colors"
            >
              Send Message to Three Points London
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
