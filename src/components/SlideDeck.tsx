import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import deck from "../data/veille-deck/deck.json";
import "../data/veille-deck/deck.css";
// The slides are set in Plus Jakarta Sans, as they were designed; loaded only with the watch's page.
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/jetbrains-mono/500.css";

/**
 * The slides of the watch's presentation, the same files as the deck made in Claude (src/data/veille-deck):
 * one <section> of 1920×1080 per slide, scaled to the page. Arrows, a swipe or a click on the sides turn the
 * pages; full screen fills the screen for presenting. The speaker notes (the slide's <aside>) show on demand.
 */
const FILES = import.meta.glob("../data/veille-deck/slides/*.html", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const byId = Object.fromEntries(Object.entries(FILES).map(([path, html]) => [path.split("/").pop()!.replace(/\.html$/, ""), html]));

const SLIDES = deck.order
  .filter((id) => byId[id])
  .map((id) => {
    const html = byId[id];
    const notes = html.match(/<aside>([\s\S]*?)<\/aside>/)?.[1].trim() ?? "";
    // The slide's id would also be an anchor on the page: kept as data only.
    return { id, html: html.replace(/<aside>[\s\S]*?<\/aside>/, "").replace(/<section id="/, '<section data-slide="'), notes };
  });

const WIDTH = 1920;
const HEIGHT = 1080;

export const SLIDE_COUNT = SLIDES.length;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SlideDeck({ pdf }: { pdf?: { url: string; downloadName: string } }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(0);
  const [full, setFull] = useState(false);
  const [notes, setNotes] = useState(false);
  const swipe = useRef<number | null>(null);

  const go = useCallback((delta: number) => setIndex((i) => Math.min(SLIDES.length - 1, Math.max(0, i + delta))), []);

  // The slide keeps its 1920×1080 layout and is scaled to the room it has: the page's width, or the whole screen.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => setScale(Math.min(stage.clientWidth / WIDTH, (full ? stage.clientHeight : Infinity) / HEIGHT));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [full]);

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // In full screen the keys work anywhere; on the page, once the deck has the focus.
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) go(1);
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) go(-1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full, go]);

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  };

  const onPointerDown = (e: PointerEvent) => {
    swipe.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (start === null) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    // A plain click: the right two thirds go on, the left third goes back.
    else if (Math.abs(dx) < 6) {
      const box = stageRef.current!.getBoundingClientRect();
      go(e.clientX - box.left > box.width / 3 ? 1 : -1);
    }
  };

  // The slide is only drawn once its scale is known.
  const ready = scale > 0;

  // What the deck's CSS can't do in a browser: a number that counts up (`.n`, the Slides recipe), and, for
  // visitors who asked for less motion, the drawings' animations shown at their end.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (reducedMotion()) {
      canvas.querySelectorAll("svg").forEach((svg) => {
        svg.setCurrentTime(60);
        svg.pauseAnimations();
      });
      return;
    }
    const frames: number[] = [];
    canvas.querySelectorAll<HTMLElement>(".n").forEach((el) => {
      const target = Number.parseInt(el.textContent ?? "", 10);
      if (!Number.isFinite(target)) return;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        el.textContent = String(Math.round(target * (1 - (1 - t) ** 3)));
        if (t < 1) frames.push(requestAnimationFrame(step));
      };
      el.textContent = "0";
      frames.push(requestAnimationFrame(step));
    });
    return () => frames.forEach(cancelAnimationFrame);
  }, [index, ready]);

  const slide = SLIDES[index];

  return (
    <div>
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="diaporama"
        aria-label={`Diapositive ${index + 1} sur ${SLIDES.length}`}
        data-cursor={full ? undefined : "Suivant"}
        onKeyDown={(e) => {
          if (full) return;
          if (e.key === "ArrowRight") go(1);
          else if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className={`deck-stage relative cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent ${full ? "flex items-center justify-center bg-[#0b0c10]" : "rounded-[24px] border border-[var(--line-strong)] shadow-[0_60px_160px_-50px_rgba(61,149,242,0.4)]"}`}
        style={full ? undefined : { height: Math.round(HEIGHT * scale) || undefined, aspectRatio: scale ? undefined : "16 / 9" }}
      >
        {scale > 0 && (
          <div style={{ width: WIDTH * scale, height: HEIGHT * scale }} className="relative shrink-0 overflow-hidden">
            <div key={slide.id} ref={canvasRef} data-anim="fade" className="deck-canvas" style={{ transform: `scale(${scale})` }} dangerouslySetInnerHTML={{ __html: slide.html }} />
          </div>
        )}
      </div>

      {/* Where we are: a segment per slide, clickable. */}
      <div className="mt-5 flex gap-1" role="group" aria-label="Aller à une diapositive">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Diapositive ${i + 1}`}
            aria-current={i === index ? "step" : undefined}
            className="group flex h-5 flex-1 items-center"
          >
            <span className={`h-[3px] w-full rounded-full transition-colors duration-300 ${i === index ? "bg-accent" : i < index ? "bg-white/40" : "bg-white/10 group-hover:bg-white/30"}`} />
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-fg disabled:opacity-30" aria-label="Diapositive précédente">
            ←
          </button>
          <span className="num min-w-[72px] text-center text-[14px] text-soft">
            <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {SLIDES.length}
          </span>
          <button type="button" onClick={() => go(1)} disabled={index === SLIDES.length - 1} className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-fg disabled:opacity-30" aria-label="Diapositive suivante">
            →
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setNotes((n) => !n)} aria-expanded={notes} className={`btn btn-sm ${notes ? "" : "btn-ghost"}`}>
            {notes ? "Masquer mes notes" : "Ce que je dis"}
          </button>
          {typeof document !== "undefined" && document.fullscreenEnabled && (
            <button type="button" onClick={toggleFull} className="btn btn-ghost btn-sm">
              Plein écran
            </button>
          )}
          {pdf && (
            <a href={pdf.url} download={pdf.downloadName} className="btn btn-sm">
              Télécharger en PDF ↓
            </a>
          )}
        </div>
      </div>

      {notes && slide.notes && (
        <p data-anim="rise" className="mt-6 max-w-[860px] border-l-2 border-accent pl-6 text-[17px] leading-relaxed text-[#c3c8d1]">
          <span className="label mb-2 block !text-[11px] text-accent">Notes · diapo {index + 1}</span>
          {slide.notes}
        </p>
      )}
    </div>
  );
}
