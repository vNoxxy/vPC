import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useFinePointer } from "../lib/motion";

/**
 * The pointer, redrawn: a dot that eases after the mouse, swells over a link, turns into a caret over
 * text fields, and shows a word (`data-cursor="Voir"`) over the big cards. Only with a mouse; the
 * system pointer stays visible underneath, so nothing is lost if a frame drops.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine) return;
    const reduced = prefersReducedMotion();
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let frame = 0;

    const loop = () => {
      const k = reduced ? 1 : 0.2;
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      const t = `translate3d(${cx}px, ${cy}px, 0)`;
      if (dot.current) dot.current.style.transform = t;
      if (bubble.current) bubble.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(loop);
      const target = e.target as Element | null;
      const el = dot.current;
      if (!el || !target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? "");
      el.classList.toggle("is-hidden", Boolean(labelled));
      el.classList.toggle("is-text", Boolean(target.closest("input:not([type=checkbox]):not([type=radio]), textarea")));
      el.classList.toggle("is-link", !labelled && Boolean(target.closest("a, button, [role=tab], label, summary, [data-hover]")));
    };
    const onLeave = () => dot.current?.classList.add("is-hidden");
    const onEnter = () => dot.current?.classList.remove("is-hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <>
      <div ref={dot} className="cursor is-hidden" aria-hidden>
        <div className="cursor-dot" />
      </div>
      <div ref={bubble} className="cursor" style={{ mixBlendMode: "normal" }} aria-hidden>
        <div className={`cursor-label ${label ? "on" : ""}`}>{label}</div>
      </div>
    </>
  );
}
