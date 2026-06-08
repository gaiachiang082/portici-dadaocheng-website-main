import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg-dark px-6">
      <h1 className="font-display text-4xl text-ink">Portici DaDaocheng</h1>
      <p className="max-w-md text-center font-body text-lg text-ink-secondary">
        Da Bologna a Taipei, sotto gli stessi tetti.
      </p>
      <Link
        href="/ghost-month"
        className="border border-red-ritual px-8 py-3 font-label text-xs font-light uppercase tracking-[0.25em] text-ink transition-colors hover:bg-red-ritual hover:text-ink"
      >
        Vol. 2 — Il Mese dell&apos;Ospitalità Invisibile
      </Link>
    </main>
  );
}
