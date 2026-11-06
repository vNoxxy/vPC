/**
 * Scroll reveal: the blocks of a page that start below the fold rise into place as they are scrolled
 * to (see `[data-reveal]` in index.css). What is already on screen when it appears is left alone, so
 * nothing above the fold ever blinks. Blocks are picked up as they mount, so no component needs wiring:
 * the direct children of each section's frame, and anything marked `data-reveal`.
 */
const REVEAL = ".site section > .guides > *, [data-reveal]";
// Past this, a block is shown for good even if its transition never reported its end.
const MAX_REVEAL_MS = 1000;
const STAGGER_MS = 70;

function finishReveal(el: HTMLElement) {
  el.removeAttribute("data-reveal");
  el.style.removeProperty("transition-delay");
}

export function installScrollReveal() {
  if (typeof window === "undefined" || typeof MutationObserver === "undefined" || typeof IntersectionObserver === "undefined") return;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");

  const io = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        // Several blocks coming in together follow one another instead of moving as one slab.
        el.style.transitionDelay = `${Math.min(order++, 4) * STAGGER_MS}ms`;
        el.setAttribute("data-reveal", "in");
        const done = () => finishReveal(el);
        el.addEventListener("transitionend", (e) => e.target === el && e.propertyName === "transform" && done());
        window.setTimeout(done, MAX_REVEAL_MS + order * STAGGER_MS);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );

  const consider = (el: HTMLElement) => {
    const state = el.getAttribute("data-reveal");
    if (state === "pending" || state === "in" || el.closest("[data-no-reveal]")) return;
    const rect = el.getBoundingClientRect();
    // On screen already, or not laid out (hidden): shown as it is.
    if (rect.height === 0 || rect.top < window.innerHeight) return;
    const style = getComputedStyle(el);
    if (style.position === "fixed" || style.position === "absolute" || style.position === "sticky" || style.transform !== "none") return;
    el.setAttribute("data-reveal", "pending");
    io.observe(el);
  };

  const observer = new MutationObserver((records) => {
    if (reduced?.matches) return;
    for (const record of records) {
      for (const node of Array.from(record.addedNodes)) {
        if (!(node instanceof HTMLElement) || !node.isConnected) continue;
        if (node.matches(REVEAL)) consider(node);
        for (const el of Array.from(node.querySelectorAll<HTMLElement>(REVEAL))) consider(el);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Printing shows everything at once.
  window.addEventListener("beforeprint", () => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))) {
      io.unobserve(el);
      finishReveal(el);
    }
  });
}
