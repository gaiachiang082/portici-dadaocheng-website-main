import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Instagram, ArrowUp } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";

const footerMono = "[font-family:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em]";

function FooterNewsletter() {
  return (
    <div>
      <p className={`${footerMono} text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-4`}>Newsletter</p>
      <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_82%,transparent)] leading-[1.75] mb-4 [font-family:var(--font-body)]">
        Una mail al mese. Per il resto, la pagina dedicata.
      </p>
      <NewsletterSubscribeForm source="footer" variant="footer" />
      <Link
        href="/newsletter"
        className={`mt-3 inline-block ${footerMono} text-[color-mix(in_srgb,var(--paper)_70%,transparent)] underline-offset-4 hover:underline hover:text-[var(--paper)] decoration-[var(--riso-red)] transition-colors`}
      >
        Perché iscriversi
      </Link>
    </div>
  );
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "/fondatrici", label: "Fondatrici" },
    { href: "/eventi", label: "Eventi" },
    { href: "/workshop", label: "Workshop" },
    { href: "/magazine", label: "Magazine" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/spazio", label: "Spazio" },
    { href: "/contatti", label: "Contatti" },
  ];

  return (
    <footer className="bg-foreground text-[var(--on-dark)] relative border-t border-[color-mix(in_srgb,var(--paper)_12%,transparent)]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[45] w-12 h-12 rounded-full border border-[color-mix(in_srgb,var(--paper)_35%,transparent)] bg-[color-mix(in_srgb,var(--paper)_6%,var(--ink))] text-[var(--paper)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--paper)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Torna su"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BrandMark tone="paper" className="h-16 w-auto" aria-hidden />
              <div className="flex flex-col leading-none">
                <span className="tracking-[0.12em] text-[var(--paper)] text-[1.05rem] [font-family:var(--font-display)] font-medium">
                  PORTICI
                </span>
                <span className={`${footerMono} text-[color-mix(in_srgb,var(--paper)_48%,transparent)] mt-0.5 !text-[0.62rem] !tracking-[0.18em]`}>
                  DADAOCHENG
                </span>
              </div>
            </div>
            <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_82%,transparent)] leading-[1.75] max-w-xs [font-family:var(--font-body)]">
              Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.
            </p>
            <p className={`${footerMono} !normal-case !tracking-normal text-[color-mix(in_srgb,var(--paper)_55%,transparent)]`}>
              Bologna, Italia · {new Date().getFullYear()}
            </p>
          </div>

          <div>
            <p className={`${footerMono} text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-5`}>Esplora</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group/link relative inline-block text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_78%,transparent)] hover:text-[var(--paper)] transition-colors [font-family:var(--font-body)]"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--riso-red)] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[color-mix(in_srgb,var(--paper)_14%,transparent)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className={`${footerMono} !normal-case !tracking-normal text-[color-mix(in_srgb,var(--paper)_48%,transparent)]`}>
            © {new Date().getFullYear()} Portici DaDaocheng. Tutti i diritti riservati.
          </p>
          <a
            href="https://instagram.com/portici.dadaocheng"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${footerMono} !normal-case !tracking-normal text-[color-mix(in_srgb,var(--paper)_48%,transparent)] hover:text-[var(--paper)] transition-colors group/ig`}
          >
            <span className="inline-flex transition-transform duration-200 group-hover/ig:scale-110 text-[var(--riso-peach)] group-hover/ig:text-[var(--paper)]">
              <Instagram size={18} />
            </span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
