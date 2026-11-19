import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal } from "../lib/motion";

type Variant = "up" | "fade" | "scale";

/** Fades and rises into view the first time it is scrolled to. `delay` in milliseconds. */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <Tag ref={ref} data-reveal={variant} className={className} style={{ ...style, "--d": delay } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * A title whose lines rise one after the other from behind a mask. Each item of `lines` is a line, as
 * the designer breaks it; on a narrow screen a line may still wrap inside its own mask.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  delay = 0,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <Tag ref={ref} id={id} className={`lines ${className}`} style={{ "--d": delay } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** A screenshot (or anything) that opens like a curtain when it comes into view. */
export function Curtain({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div ref={ref} data-curtain className={className}>
      {children}
    </div>
  );
}
