"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const KEY = "home-scroll";
const DETAIL_PATH = /^\/(projects|experience|certifications|volunteering)\//;

// useLayoutEffect would warn during SSR, so fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

  // Restore it when navigating from a detail page back to the home page.
  // Runs before paint (useLayoutEffect) so the page never flashes at the top,
  // and forces non-smooth scrolling so the jump is never animated.
  useIsomorphicLayoutEffect(() => {
    const cameFromDetail = DETAIL_PATH.test(prevPath.current);
    prevPath.current = pathname;
    if (pathname !== "/" || !cameFromDetail) return;

    const saved = sessionStorage.getItem(KEY);
    if (saved === null) return;
    const y = Number(saved);

    // The code-box outputs (pip / About / Experience) restore from
    // sessionStorage a few frames after mount, which grows the page height
    // above the saved position. So we re-assert the scroll position every
    // frame and only stop once the height has held steady for a few frames
    // (i.e. all outputs are back) — that final scroll lands on exactly the
    // layout the user left, not a shorter intermediate one.
    let tries = 0;
    let prevHeight = -1;
    let stableFrames = 0;
    let cancelled = false;

    const stop = () => {
      cancelled = true;
    };
    // If the user starts scrolling themselves, stop fighting them.
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    const step = () => {
      if (cancelled) return;
      window.scrollTo(0, y);
      const h = document.documentElement.scrollHeight;
      if (h === prevHeight) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        prevHeight = h;
      }
      // Keep re-asserting for a minimum window (outputs restore a few frames
      // in and grow the page) and only stop once the height has then settled.
      // Without the tries>=12 floor we'd stop during the brief "stably short"
      // window before the outputs load and land too low.
      if ((tries >= 12 && stableFrames >= 4) || tries > 40) return;
      tries += 1;
      requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname]);

  return null;
}
