import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const labelMono =
  "[font-family:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em]";

export interface PageHeaderProps {
  eyebrow: string;
  meta?: string;
  /** Shown as `h1`; pass a string or rich content (e.g. line breaks). */
  title: ReactNode;
  /** Intro block: keep as paragraphs for long-form readability (inherits serif body). */
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  titleClassName?: string;
}

/**
 * Shared dark-band masthead for inner pages (ink field, paper type).
 * Overrides global `h1` ink color for this context only.
 */
export function PageHeader({
  eyebrow,
  meta,
  title,
  children,
  className,
  innerClassName,
  titleClassName,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "page-header-masthead pt-32 pb-14 md:pb-16 px-6 md:px-10 bg-foreground text-background",
        className
      )}
    >
      <div className={cn("container max-w-3xl mx-auto", innerClassName)}>
        <div
          className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8 mb-8"
          data-reveal
        >
          <p className={cn(labelMono, "text-[color-mix(in_srgb,var(--paper)_58%,transparent)]")}>
            {eyebrow}
          </p>
          {meta ? (
            <p className={cn(labelMono, "text-[color-mix(in_srgb,var(--paper)_45%,transparent)]")}>
              {meta}
            </p>
          ) : null}
        </div>
        <h1
          className={cn(
            "mb-6 !text-[var(--paper)] [font-family:var(--font-display)] font-normal text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.12] tracking-[-0.02em]",
            titleClassName
          )}
          data-reveal
          data-reveal-delay="80"
        >
          {title}
        </h1>
        {children ? (
          <div
            className="page-header-intro space-y-4 max-w-2xl text-[1.0625rem] leading-[1.75] [font-family:var(--font-body)]"
            data-reveal
            data-reveal-delay="160"
          >
            {children}
          </div>
        ) : null}
        <div className="brand-divider mt-8" role="presentation" aria-hidden data-reveal data-reveal-delay="240" />
      </div>
    </section>
  );
}
