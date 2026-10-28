import React from "react";
import Link from "next/link";
import { getSiteData } from "@/lib/store";

interface AdSlotProps {
  id: string; // e.g. "billboard_970x250", "infeed_728x90", "rail_300x600", "rail_300x250"
  label?: string;
  className?: string;
}

export default function AdSlot({ id, label, className = "" }: AdSlotProps) {
  const data = getSiteData();
  const sponsor = data.sponsors[id];

  // Sizing definitions from PDF page 1 & 13
  let desktopHeight = 90;
  let mobileHeight = 100;
  let maxWidth = "100%";

  if (id.includes("970x250")) {
    desktopHeight = 250;
    mobileHeight = 140; // Responsive mobile billboard
    maxWidth = "970px";
  } else if (id.includes("728x90")) {
    desktopHeight = 90;
    mobileHeight = 90;
    maxWidth = "728px";
  } else if (id.includes("300x600")) {
    desktopHeight = 600;
    mobileHeight = 300;
    maxWidth = "300px";
  } else if (id.includes("300x250")) {
    desktopHeight = 250;
    mobileHeight = 250;
    maxWidth = "300px";
  }

  // If sponsor has configured image and link
  if (sponsor && sponsor.imageUrl && sponsor.isActive) {
    const content = (
      <img
        src={sponsor.imageUrl}
        alt={sponsor.altText || "Sponsor"}
        className="w-full h-full object-cover rounded-xs border border-hairline"
      />
    );

    return (
      <aside
        aria-label="Sponsored placement"
        className={`w-full flex flex-col items-center justify-center my-6 overflow-hidden max-w-full px-2 sm:px-0 ${className}`}
      >
        <span className="text-[10px] uppercase font-bold text-muted/60 mb-1 tracking-wider">
          Sponsored
        </span>
        <div
          className="w-full flex items-center justify-center"
          style={{ maxWidth }}
        >
          {sponsor.targetUrl ? (
            <a
              href={sponsor.targetUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block w-full h-[120px] sm:h-[180px] md:h-[250px] hover:opacity-95 transition-opacity"
            >
              {content}
            </a>
          ) : (
            <div className="w-full h-[120px] sm:h-[180px] md:h-[250px]">
              {content}
            </div>
          )}
        </div>
      </aside>
    );
  }

  // Blank reserved placeholder (clean wireframe styling as shown in PDF)
  return (
    <aside
      aria-label="Advertising slot"
      className={`w-full flex flex-col items-center justify-center my-6 select-none max-w-full px-2 sm:px-0 ${className}`}
    >
      <div
        className="w-full bg-[#F6F7F9] border border-dashed border-[#D2D6DC] rounded-xs flex flex-col items-center justify-center text-center p-3 relative group min-h-[100px] sm:min-h-[140px] md:min-h-[180px]"
        style={{ maxWidth }}
      >
        <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#5C6370]">
          {label || `AD / SPONSOR — ${sponsor?.size || id.split("_")[1] || "RESERVED"}`}
        </div>
        <div className="text-[9px] sm:text-[10px] text-[#8E95A5] mt-1 max-w-xs">
          Height reserved for Core Web Vitals (CLS &lt; 0.05).
        </div>
        <Link
          href={`/admin#sponsors`}
          className="mt-2 text-[10px] font-bold text-indigo hover:text-ember transition-colors py-1 px-2"
        >
          [Configure image & link in Admin →]
        </Link>
      </div>
    </aside>
  );
}
