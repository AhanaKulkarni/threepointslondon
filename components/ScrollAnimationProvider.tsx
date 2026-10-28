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
    // 1. Setup IntersectionObserver for smooth scroll reveals
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    });

    const initAnimations = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".reveal-on-scroll, .reveal-fade, .reveal-card, .mobile-reveal"
        )
      );

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // If element is in initial viewport on page load, reveal with a gentle staggered delay
        if (rect.top < window.innerHeight - 20) {
          setTimeout(() => {
            el.classList.add("is-revealed");
          }, 80 + Math.min(index, 6) * 70);
        } else {
          observer.observe(el);
        }
      });
    };

    // Frame delay to ensure DOM is ready
    const timeoutId = setTimeout(initAnimations, 60);

    // 2. Active scroll listener (debounced with requestAnimationFrame)
    let isTicking = false;
    const handleScroll = () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          const unrevealed = document.querySelectorAll<HTMLElement>(
            ".reveal-on-scroll:not(.is-revealed), .reveal-card:not(.is-revealed), .mobile-reveal:not(.is-revealed)"
          );
          unrevealed.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30) {
              el.classList.add("is-revealed");
            }
          });
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return <>{children}</>;
}
