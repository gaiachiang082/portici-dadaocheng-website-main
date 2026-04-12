import type { ReactNode } from "react";
import { Link } from "wouter";
import type { GlossarySegment } from "@/data/glossaryData";

function renderSegments(
  segments: GlossarySegment[],
  localizedHref: (path: string) => string
): ReactNode[] {
  return segments.map((s, i) => {
    if (s.type === "text") {
      return <span key={i}>{s.text}</span>;
    }
    return (
      <Link
        key={i}
        href={localizedHref(s.to)}
        className="text-[color-mix(in_srgb,var(--riso-red)_88%,var(--foreground))] underline underline-offset-4 decoration-border/80 hover:opacity-90 transition-opacity font-medium"
      >
        {s.label}
      </Link>
    );
  });
}

export function GlossaryEntryBody({
  body,
  localizedHref,
}: {
  body: GlossarySegment[][];
  localizedHref: (path: string) => string;
}) {
  return (
    <div className="space-y-5 text-[1.0625rem] text-muted-foreground leading-[1.8] [font-family:var(--font-body)] max-w-[min(100%,72ch)]">
      {body.map((paragraph, pi) => (
        <p key={pi}>{renderSegments(paragraph, localizedHref)}</p>
      ))}
    </div>
  );
}
