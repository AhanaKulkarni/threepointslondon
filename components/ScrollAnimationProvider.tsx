"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Reveal animation observer with mobile-tuned threshold
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    // Low threshold and small margin so animations trigger smoothly on mobile and desktop
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.04,
      rootMargin: "0px 0px -10px 0px",
    });

    const triggerElements = () => {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-fade, .reveal-card, .mobile-reveal"
      );
      elements.forEach((el) => {
        // If already in initial viewport, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check
    triggerElements();

    // Re-check on scroll for high-frequency mobile touch gestures
    const handleScroll = () => {
      const unrevealed = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-revealed), .reveal-card:not(.is-revealed), .mobile-reveal:not(.is-revealed)"
      );
      unrevealed.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 10) {
          el.classList.add("is-revealed");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return <>{children}</>;
}
