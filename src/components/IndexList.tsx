import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { CATEGORY_BY_KEY } from "../data/competences";
import { monthLabel } from "../data/realisations";
import type { Realisation } from "../data/types";
import { ACCENTS } from "../lib/accents";
import { withBase } from "../lib/site";

const PEEK_WIDTH = 340;

/** Whether the screen has a real pointer (a mouse): the preview that follows it is useless on touch. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(query.matches);
    const onChange = () => setFine(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return fine;
}

/**
 * The index of réalisations: one large line each (month, name, kind, bloc). A line under the pointer
 * fills with Vody's blue and, when the work has a screenshot, the screenshot follows the pointer.
 */
export default function IndexList({ items }: { items: Realisation[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<Realisation | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const box = listRef.current?.getBoundingClientRect();
    if (!box) return;
    // Beside the pointer, kept inside the list.
    const x = Math.min(Math.max(e.clientX - box.left + 28, 0), box.width - PEEK_WIDTH);
    setPos({ x, y: e.clientY - box.top - 110 });
  };

  return (
    <div ref={listRef} className="relative" onMouseMove={fine ? onMove : undefined} onMouseLeave={() => setHovered(null)}>
      <ul>
        {items.map((r) => {
          const category = CATEGORY_BY_KEY[r.category];
          return (
            <li key={r.slug} className="border-b border-rule">
              <Link
                to={`/realisations/${r.slug}`}
                viewTransition
                onMouseEnter={() => setHovered(r)}
                onFocus={() => setHovered(null)}
                className="index-row -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-3 py-4 sm:-mx-[18px] sm:px-[18px] sm:py-5 lg:grid-cols-[120px_minmax(0,1.5fr)_minmax(0,1fr)_150px] lg:gap-x-5"
              >
                <span className="index-soft order-1 text-[13.5px] text-soft lg:order-none lg:text-[14.5px]">{monthLabel(r)}</span>
                <span className="order-3 col-span-2 text-[25px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[30px] lg:order-none lg:col-span-1 lg:text-[34px]">
                  {r.short}
                </span>
                <span className="index-soft order-4 col-span-2 text-[14.5px] text-soft lg:order-none lg:col-span-1 lg:text-[15px]">{r.kind}</span>
                <span className="order-2 flex items-center gap-2 justify-self-end text-[13.5px] font-semibold lg:order-none lg:justify-self-start lg:text-[15px]">
                  <i aria-hidden className="dot" style={{ background: ACCENTS[category.accent] }} />
                  {category.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {fine && hovered?.cover && (
        <div aria-hidden className="index-peek" style={{ width: PEEK_WIDTH, transform: `translate(${pos.x}px, ${pos.y}px) rotate(2deg)` }}>
          <img src={withBase(hovered.cover.src)} alt="" />
        </div>
      )}
    </div>
  );
}
