export function Footer() {
  return (
    <footer className="bg-bg-dark px-6 pb-10 pt-[60px]">
      <div className="mx-auto max-w-2xl text-center">
        <hr className="mx-auto mb-12 w-[60px] border-0 border-t border-red-ritual" />

        <p className="font-display text-[22px] tracking-[0.15em] text-ink">
          PORTICI DADAOCHENG
        </p>

        <p className="mt-1 font-chinese text-sm text-ink-secondary">
          大稻埕亭仔腳
        </p>

        <p className="mt-4 font-label text-xs font-extralight uppercase tracking-[0.25em] text-ink-secondary">
          Da Bologna a Taipei, sotto gli stessi tetti
        </p>

        <hr className="mx-auto my-8 w-10 border-0 border-t border-[color-mix(in_srgb,var(--ink-secondary)_15%,transparent)]" />

        <nav className="flex flex-wrap items-center justify-center gap-8">
          <a
            href="https://instagram.com/portici.dadaocheng"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs font-extralight text-ink-secondary transition-opacity duration-300 hover:text-ink"
          >
            Instagram
          </a>
          <a
            href="https://porticidadaocheng.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs font-extralight text-ink-secondary transition-opacity duration-300 hover:text-ink"
          >
            Website
          </a>
        </nav>

        <p className="mt-8 font-label text-[11px] font-extralight text-ink-secondary/50">
          Prossimo numero: Autunno 2026
        </p>

        <p className="mt-2 font-label text-[11px] font-extralight text-ink-secondary/50">
          © 2026 Portici DaDaocheng · Bologna
        </p>
      </div>
    </footer>
  );
}
