import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/react";
import { useLang } from "@/contexts/LangContext";

/**
 * ArticleToc — Floating Index Drawer
 * ──────────────────────────────────────────────────────────────────────
 * The reading column and the right gutter (illustration + sidenotes)
 * already claim the visible whitespace. Rather than compete for a
 * third column, the chapter guide is kept *out of sight* behind a
 * minimal "Indice" pill anchored to the left edge.
 *
 * Click → an unobtrusive drawer slides in from the left with:
 *   - a frosted backdrop,
 *   - the H2 / H3 list, indented by level,
 *   - live scroll-spy highlighting (IntersectionObserver).
 *
 * Keyboard: closes on Escape; clicking an item smooth-scrolls to the
 * heading and dismisses the drawer.
 *
 * The anchor ids are in a stable contract with
 * `PortableTextComponents.tsx`: `heading-${block._key}`.
 */

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type SanityBlock = PortableTextBlock & {
  _key?: string;
  style?: string;
  children?: Array<{ _type?: string; text?: string }>;
};

/**
 * Walk the body in document order and pull out every H2 / H3. Spans
 * are concatenated so mixed inline formatting inside a heading still
 * produces clean plain text for the drawer.
 */
export function extractToc(
  body: PortableTextBlock[] | null | undefined,
): TocItem[] {
  if (!Array.isArray(body)) return [];
  const items: TocItem[] = [];

  body.forEach((raw, index) => {
    const block = raw as SanityBlock;
    if (!block || block._type !== "block") return;

    const level: 2 | 3 | null =
      block.style === "h2" ? 2 : block.style === "h3" ? 3 : null;
    if (level === null) return;

    const text = (block.children ?? [])
      .filter((c) => c?._type === "span" && typeof c.text === "string")
      .map((c) => c.text as string)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return;

    const key = block._key ?? `idx-${index}`;
    items.push({ id: `heading-${key}`, text, level });
  });

  return items;
}

const DRAWER_COPY = {
  it: {
    trigger: "Indice",
    heading: "In questo articolo",
    close: "Chiudi indice",
    aria: "Indice dei capitoli",
  },
  en: {
    trigger: "Index",
    heading: "In this article",
    close: "Close index",
    aria: "Table of contents",
  },
} as const;

export function TocDrawer({ items }: { items: TocItem[] }) {
  const lang = useLang();
  const copy = DRAWER_COPY[lang] ?? DRAWER_COPY.it;
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const visibleRef = useRef<Set<string>>(new Set());
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* Scroll-spy: same logic regardless of drawer open/closed state —
     the active indicator stays fresh so opening the drawer always
     reveals the *current* reading position. */
  useEffect(() => {
    if (items.length === 0) return;
    setActiveId((prev) =>
      prev && items.some((i) => i.id === prev) ? prev : items[0]?.id ?? null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = visibleRef.current;
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        const first = items.find((i) => visible.has(i.id));
        if (first) setActiveId(first.id);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      visibleRef.current.clear();
    };
  }, [items]);

  /* Escape closes. Body scroll lock is intentionally skipped — the
     drawer is narrow and the reading column stays usable behind it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleJump = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      }
      setActiveId(id);
      setOpen(false);
    },
    [],
  );

  if (items.length === 0) return null;

  return (
    <>
      {/* Fixed trigger — bottom-left on mobile, anchored to the left
          edge mid-screen on md+ so it doesn't fight the reading
          rhythm. Earth-tone minimal pill. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="article-toc-drawer"
        className="
          group fixed z-40 select-none
          bottom-4 left-4
          md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2
          flex items-center gap-2
          rounded-full md:rounded-r-full md:rounded-l-none
          border border-border/60
          bg-paper/90 backdrop-blur
          text-foreground
          px-4 py-2.5 md:pl-3 md:pr-4 md:py-3
          text-[11px] font-semibold uppercase tracking-[0.24em]
          shadow-[0_4px_18px_color-mix(in_srgb,var(--forest-deep)_12%,transparent)]
          hover:bg-paper-warm/90 hover:border-editorial-mark/60
          focus:outline-none focus-visible:ring-2 focus-visible:ring-editorial-mark/50
          transition-colors
        "
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <List
          size={14}
          className="text-editorial-mark transition-transform duration-300 group-hover:rotate-6"
          aria-hidden="true"
        />
        <span>{copy.trigger}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="toc-root"
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label={copy.aria}
            id="article-toc-drawer"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label={copy.close}
              tabIndex={-1}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="absolute inset-0 w-full h-full bg-forest-deep/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />

            {/* Drawer panel */}
            <motion.aside
              className="
                absolute top-0 left-0 h-full
                w-[min(22rem,86vw)]
                bg-paper
                border-r border-border/60
                shadow-[8px_0_30px_color-mix(in_srgb,var(--forest-deep)_14%,transparent)]
                flex flex-col
              "
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 0.8, 0.36, 1] }}
            >
              <header className="flex items-center justify-between px-6 pt-8 pb-5 border-b border-border/50">
                <h2
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {copy.heading}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label={copy.close}
                  className="
                    -mr-2 p-1.5 rounded-full text-muted-foreground
                    hover:text-foreground hover:bg-paper-warm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-editorial-mark/50
                    transition-colors
                  "
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </header>

              <nav
                aria-label={copy.aria}
                className="flex-1 overflow-y-auto px-6 py-6"
              >
                <ul className="relative border-l border-border/50">
                  {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleJump(e, item.id)}
                          aria-current={isActive ? "true" : undefined}
                          className={[
                            "block -ml-px border-l-2 py-2 text-[0.92rem] leading-snug transition-colors duration-200",
                            item.level === 3 ? "pl-8 text-[0.82rem]" : "pl-5",
                            isActive
                              ? "border-editorial-mark text-foreground font-medium"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                          ].join(" ")}
                          style={{
                            fontFamily: "'Source Serif 4', Georgia, serif",
                          }}
                        >
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TocDrawer;
