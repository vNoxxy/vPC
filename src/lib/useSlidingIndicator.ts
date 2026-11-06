import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * The filled segment of a segmented control, as one element that slides from the old choice to the
 * new one (.seg-indicator in index.css) instead of each button switching its fill.
 *
 * Put `containerRef` on the control (position: relative) and `data-seg-key` on each button; draw an
 * element with the `seg-indicator` class and the returned `style` first inside the control.
 */
export function useSlidingIndicator<T extends HTMLElement>(activeKey: string) {
  const [container, containerRef] = useState<T | null>(null);
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });
  const placed = useRef(false);

  useLayoutEffect(() => {
    if (!container) {
      placed.current = false;
      return;
    }

    function place() {
      const button = container!.querySelector<HTMLElement>(`[data-seg-key="${CSS.escape(activeKey)}"]`);
      if (!button) {
        setStyle({ opacity: 0 });
        return;
      }
      setStyle({
        width: button.offsetWidth,
        height: button.offsetHeight,
        transform: `translate(${button.offsetLeft}px, ${button.offsetTop}px)`,
        // The first placement lands without sliding in.
        transition: placed.current ? undefined : "none",
      });
      placed.current = true;
    }

    place();
    const observer = new ResizeObserver(place);
    observer.observe(container);
    container.querySelectorAll<HTMLElement>("[data-seg-key]").forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, [activeKey, container]);

  return { containerRef, style };
}
