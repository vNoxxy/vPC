import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "../lib/motion";

/**
 * A paragraph that lights up word by word as it is scrolled through: the scroll position is written to
 * `--p` and each word works out its own brightness in CSS, so nothing re-renders while scrolling.
 * `accent` words (matched without punctuation) stay in Vody's blue once lit.
 */
export default function ScrollText({ text, className = "", accent = [] }: { text: string; className?: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ "--n": words.length } as CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span
            key={i}
            className={`transition-colors duration-300 ${accent.includes(word.replace(/[.,;:!?]/g, "")) ? "serif text-accent" : ""}`}
            style={{ "--i": i, opacity: "clamp(0.14, calc((var(--p, 1) - 0.18) * var(--n) / 0.32 - var(--i)), 1)" } as CSSProperties}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}
