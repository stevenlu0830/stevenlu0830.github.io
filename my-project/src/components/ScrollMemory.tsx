"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const KEY = "home-scroll";
const DETAIL_PATH = /^\/(projects|experience)\//;

export default function ScrollMemory() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Remember the home-page scroll position when a detail-page link is clicked
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (anchor && DETAIL_PATH.test(anchor.getAttribute("href") ?? "")) {
        sessionStorage.setItem(KEY, String(window.scrollY));
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Restore it when navigating from a detail page back to the home page
  useEffect(() => {
    const cameFromDetail = DETAIL_PATH.test(prevPath.current);
    prevPath.current = pathname;
    if (pathname !== "/" || !cameFromDetail) return;

    const saved = sessionStorage.getItem(KEY);
    if (saved === null) return;
    const y = Number(saved);

    // The page re-renders asynchronously after the navigation; wait until it
    // is tall enough to scroll to the saved position (capped at ~1s).
    let tries = 0;
    const restore = () => {
      const maxY =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxY >= y || tries > 60) {
        window.scrollTo({ top: y, behavior: "instant" });
      } else {
        tries += 1;
        requestAnimationFrame(restore);
      }
    };
    restore();
  }, [pathname]);

  return null;
}
