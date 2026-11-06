import type { Block } from "../data/types";
import { Inline } from "./ui";

/** The pieces of an answer, drawn with the sheet's own vocabulary (ruled tables, ink code blocks). */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3.5">
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className="text-[15px] leading-relaxed text-[var(--fg-muted)]">
              <Inline text={block} />
            </p>
          );
        }
        if ("list" in block) {
          return (
            <ul key={i} className="space-y-2 text-[15px] leading-relaxed text-[var(--fg-muted)]">
              {block.list.map((item, j) => (
                <li key={j} className="flex gap-2.5">
                  <span aria-hidden className="text-[var(--fg-faint)]">
                    –
                  </span>
                  <span className="min-w-0">
                    <Inline text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if ("steps" in block) {
          return (
            <ol key={i} className="space-y-2.5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
              {block.steps.map((step, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[3px] flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-text)_14%,transparent)] font-tech text-[11px] font-bold text-[var(--accent-text)]">
                    {j + 1}
                  </span>
                  <span className="min-w-0">
                    <Inline text={step} />
                  </span>
                </li>
              ))}
            </ol>
          );
        }
        if ("table" in block) {
          return (
            <div key={i} className="overflow-x-auto rounded-[var(--r-field)] border border-[var(--line-strong)]">
              <table className="data-table">
                <thead>
                  <tr>
                    {block.table.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.table.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td key={c} className={cell.length < 16 ? "whitespace-nowrap" : "min-w-[180px]"}>
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <div key={i} className="relative">
            {block.lang && (
              <span className="absolute right-3 top-2.5 font-tech text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{block.lang}</span>
            )}
            <pre className="code">{block.code}</pre>
          </div>
        );
      })}
    </div>
  );
}
