import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import type { Realisation } from "../data/types";
import { ACCENTS } from "../lib/accents";
import { picture } from "../lib/images";
import { prefersReducedMotion } from "../lib/motion";
import { ArrowRight, Picture } from "./ui";

const TOP = 96;
const STEP = 18;

/**
 * The projects as a stack of large cards: each one sticks near the top while the next slides over it,
 * and the one underneath sinks back (smaller, darker). Each card carries its product's own color.
 */
export default function ProjectStack({ items }: { items: Realisation[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const slots = [...list.querySelectorAll<HTMLElement>("[data-slot]")];
    const cards = slots.map((s) => s.querySelector<HTMLElement>("[data-card]")!);
    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!wide.matches) {
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.filter = "";
        });
        return;
      }
      cards.forEach((card, i) => {
        const next = slots[i + 1];
        if (!next) return;
        const top = TOP + i * STEP;
        const t = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - top) / card.offsetHeight));
        card.style.transform = `scale(${1 - t * 0.07})`;
        card.style.filter = t > 0 ? `brightness(${1 - t * 0.45})` : "";
      });
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
  }, []);

  return (
    <ol ref={listRef} className="relative">
      {items.map((r, i) => {
        const color = ACCENTS[r.accent];
        const info = r.cover ? picture(r.cover.src) : {};
        const wide = (info.width ?? 16) / (info.height ?? 9) > 1.35;
        return (
          <li key={r.slug} data-slot className="pb-5 lg:sticky lg:pb-10" style={{ top: TOP + i * STEP }}>
            <Link
              to={`/vody-studio/${r.slug}`}
              viewTransition
              data-card
              data-cursor="Voir"
              className="spot group relative grid origin-top overflow-hidden rounded-[28px] border border-[var(--line)] bg-surface will-change-transform lg:h-[min(76vh,720px)] lg:grid-cols-[0.95fr_1.05fr]"
              style={{ "--spot-color": color } as CSSProperties}
            >
              {/* The product's color, rising from a corner. */}
              <span aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px] transition-opacity duration-700 group-hover:opacity-40" style={{ background: color }} />

              <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
                <div className="flex items-center justify-between">
                  <span className="num text-[13px] text-soft">
                    <span style={{ color }}>{String(i + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="label flex items-center gap-2 !text-[11px]">
                    <i aria-hidden className="live-dot" /> En production
                  </span>
                </div>
                <p className="label mt-10 lg:mt-auto" style={{ color }}>
                  {r.kind}
                </p>
                <h3 className="mt-4 text-[clamp(40px,5.4vw,84px)] font-semibold leading-[0.92] tracking-[-0.045em]">{r.short}</h3>
                <p className="mt-5 max-w-[460px] text-[16.5px] leading-relaxed text-soft">{r.summary}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {r.tools.slice(0, 5).map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                  {r.tools.length > 5 && <li className="chip text-faint">+{r.tools.length - 5}</li>}
                </ul>
                <span className="mt-9 inline-flex items-center gap-2 text-[15.5px] font-semibold">
                  <span className="link-line">Lire l'étude de cas</span>
                  <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>

              {r.cover && (
                <div className="relative min-h-[260px] overflow-hidden border-t border-[var(--line)] sm:min-h-[340px] lg:border-l lg:border-t-0" style={{ background: `color-mix(in srgb, ${color} 10%, #0a0b0e)` }}>
                  <div aria-hidden className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />
                  {wide ? (
                    <Picture
                      src={r.cover.src}
                      alt={r.cover.caption}
                      sizes="(min-width: 1024px) 720px, 92vw"
                      className="absolute left-8 top-10 h-[calc(100%-40px)] w-[calc(100%+40px)] max-w-none rounded-tl-[16px] border-l border-t border-white/10 object-cover object-left-top shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-3 group-hover:-translate-y-2 sm:left-12 sm:top-14"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-8 sm:p-12">
                      <Picture
                        src={r.cover.src}
                        alt={r.cover.caption}
                        sizes="(min-width: 1024px) 520px, 80vw"
                        className="max-h-full w-auto max-w-[min(100%,440px)] rounded-[18px] border border-white/10 object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-2 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
