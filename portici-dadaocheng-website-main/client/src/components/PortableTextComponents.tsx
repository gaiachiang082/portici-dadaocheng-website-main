import type {
  PortableTextBlock,
  PortableTextReactComponents,
} from "@portabletext/react";
import type { ReactNode } from "react";

/**
 * Custom PortableText renderers for the editorial body.
 *
 * ──────────────────────────────────────────────────────────────────────
 *  Registered block / object types
 * ──────────────────────────────────────────────────────────────────────
 *
 *  block.h2 / block.h3
 *    Heading anchors for the floating TOC drawer. Stable id contract:
 *    `heading-${block._key}`. See `ArticleToc.tsx` — `extractToc` and
 *    the scroll-spy rely on this id shape.
 *
 *  types.pullQuote — "Breakout Block"
 *    A Sanity custom block (see `docs/sanity-pullquote-block.md`) that
 *    breaks out of the reading column with an oversized serif quote
 *    and optional attribution. Centered within its grid column on xl
 *    (where the right gutter is present) and within the viewport on
 *    smaller screens.
 *
 *  types.sidenote — "Marginalia"
 *    Inline magazine sidenote (see `docs/sanity-sidenote-block.md`).
 *    On mobile it is rendered inline inside the prose as a small
 *    accent card. On xl the inline copy is hidden (`xl:hidden`) and
 *    `extractSidenotes` is used to mirror the same content into the
 *    right gutter where it sits alongside the chapter illustration.
 *    This avoids needing a portal or custom renderer teleport while
 *    still meeting the "desktop marginalia / mobile inline" contract.
 */

/* ──────────────────────────────────────────────────────────────────── */
/*  Shared types                                                        */
/* ──────────────────────────────────────────────────────────────────── */

type HeadingBlockValue = { _key?: string };

type PullQuoteValue = {
  _type?: "pullQuote";
  quote?: string;
  text?: string;
  attribution?: string | null;
  cite?: string | null;
};

export type SidenoteItem = {
  /** Sanity block `_key` — doubles as the DOM id for "back to main". */
  key: string;
  /** Optional eyebrow / label (e.g. "NOTA", "MARGIN"). */
  label?: string;
  /** Sidenote body (plain text for now — easy to extend to PT later). */
  body: string;
};

type SidenoteValue = {
  _type?: "sidenote";
  _key?: string;
  label?: string;
  body?: string;
  text?: string;
};

type SanityBlock = PortableTextBlock & {
  _key?: string;
  _type?: string;
};

/* ──────────────────────────────────────────────────────────────────── */
/*  Helpers                                                             */
/* ──────────────────────────────────────────────────────────────────── */

function headingId(key: string | undefined): string | undefined {
  return key ? `heading-${key}` : undefined;
}

/**
 * Collect sidenote blocks from the body in document order. Used by the
 * detail page to mirror the same content into the right gutter on xl+
 * breakpoints where the inline card is hidden.
 */
export function extractSidenotes(
  body: PortableTextBlock[] | null | undefined,
): SidenoteItem[] {
  if (!Array.isArray(body)) return [];
  const items: SidenoteItem[] = [];
  body.forEach((raw, index) => {
    const block = raw as SanityBlock & SidenoteValue;
    if (!block || block._type !== "sidenote") return;
    const body = (block.body ?? block.text ?? "").trim();
    if (!body) return;
    items.push({
      key: block._key ?? `sn-${index}`,
      label: block.label?.trim() || undefined,
      body,
    });
  });
  return items;
}

/* ──────────────────────────────────────────────────────────────────── */
/*  Shared Sidenote visual                                              */
/* ──────────────────────────────────────────────────────────────────── */

/**
 * Sidenote — magazine marginalia.
 *
 * Two contexts, one visual language:
 *   - `variant="inline"` (default on mobile): accent card inside the
 *     prose flow, hidden on xl+ via `xl:hidden`.
 *   - `variant="gutter"` (xl+): stripped-down typography that sits in
 *     the right gutter beside the illustration.
 */
export function Sidenote({
  label,
  children,
  variant = "inline",
}: {
  label?: string;
  children: ReactNode;
  variant?: "inline" | "gutter";
}) {
  if (variant === "gutter") {
    return (
      <aside
        className="not-prose relative pl-4 border-l-2 border-editorial-mark/60"
        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
      >
        {label && (
          <span
            className="block mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-editorial-mark"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {label}
          </span>
        )}
        <p className="text-[0.88rem] leading-[1.6] text-muted-foreground italic">
          {children}
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="
        not-prose xl:hidden
        my-8 rounded-sm
        border-l-2 border-editorial-mark/60
        bg-paper-warm/60
        px-5 py-4
      "
      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
    >
      {label && (
        <span
          className="block mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-editorial-mark"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {label}
        </span>
      )}
      <p className="text-[0.92rem] leading-[1.65] text-muted-foreground italic">
        {children}
      </p>
    </aside>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  PortableText components                                             */
/* ──────────────────────────────────────────────────────────────────── */

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    /*
     * H2 / H3 are promoted to TOC entries. We stamp a stable id on each
     * so both anchor-jumping and the IntersectionObserver scroll-spy
     * work without re-slugifying text on every render. `scroll-mt-32`
     * keeps the heading clear of sticky chrome when anchor-targeted.
     */
    h2: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value: HeadingBlockValue;
    }) => (
      <h2 id={headingId(value?._key)} className="scroll-mt-32">
        {children}
      </h2>
    ),
    h3: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value: HeadingBlockValue;
    }) => (
      <h3 id={headingId(value?._key)} className="scroll-mt-32">
        {children}
      </h3>
    ),
  },
  types: {
    pullQuote: ({ value }: { value: PullQuoteValue }) => {
      const quote = (value?.quote ?? value?.text ?? "").trim();
      const attribution = (value?.attribution ?? value?.cite ?? "").trim();
      if (!quote) return null;

      return (
        <figure
          className="not-prose relative left-1/2 -translate-x-1/2 w-screen max-w-5xl
                     my-16 md:my-24 px-6 md:px-12"
        >
          <div className="relative mx-auto max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute
                         -top-10 md:-top-16 left-1/2 -translate-x-1/2
                         text-[10rem] md:text-[16rem] leading-none
                         text-editorial-mark/25"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;
            </span>
            <blockquote className="relative pt-8 md:pt-14">
              <p
                className="italic font-medium text-foreground
                           text-2xl md:text-4xl leading-[1.25] md:leading-[1.2]
                           tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {quote}
              </p>
              {attribution && (
                <figcaption
                  className="mt-6 md:mt-8 text-xs md:text-sm uppercase
                             tracking-[0.28em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  <span aria-hidden="true">— </span>
                  {attribution}
                </figcaption>
              )}
            </blockquote>
          </div>
        </figure>
      );
    },

    /*
     * Sidenote — inline renderer.
     *
     * Always outputs the card in prose flow. On xl+ the card is hidden
     * by its own `xl:hidden` class; the detail page (ArticoloDetail)
     * mirrors the same sidenotes into the right gutter via
     * `extractSidenotes`, so there is one source of truth in the CMS
     * but two rendering contexts.
     */
    sidenote: ({ value }: { value: SidenoteValue }) => {
      const body = (value?.body ?? value?.text ?? "").trim();
      if (!body) return null;
      return <Sidenote label={value?.label?.trim()}>{body}</Sidenote>;
    },
  },
};

export default portableTextComponents;
