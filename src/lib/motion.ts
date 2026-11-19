import { useEffect, useState, type RefObject } from "react";

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One observer for every element revealed on scroll: it gets the class `in` once, then is forgotten. */
let observer: IntersectionObserver | null = null;
function revealObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );
  return observer;
}

export function useReveal(ref: RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = revealObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}

/** A media query, followed as it changes. */
export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Whether the screen has a real pointer (a mouse): hover effects are useless on touch. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

/**
 * How far an element has travelled through the viewport: 0 when its top enters at the bottom, 1 when
 * its bottom leaves at the top. Written to a CSS variable (`--p`) on every frame it moves, never to
 * React state, so scrolling doesn't re-render anything.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress?: (p: number, el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)));
      el.style.setProperty("--p", p.toFixed(4));
      onProgress?.(p, el);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, onProgress]);
}

/** The time in Chantilly, ticking every minute ("14:32"). */
export function useParisTime() {
  const format = () => new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
