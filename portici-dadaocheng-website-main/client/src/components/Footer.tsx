import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Instagram, ArrowUp } from "lucide-react";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";

function FooterNewsletter() {
  return (
    <div>
      <p
        className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-4"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        Newsletter
      </p>
      <p
        className="text-[15px] text-[var(--on-dark)]/80 leading-[1.7] mb-4"
        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
      >
        Una mail al mese. Per il resto, la pagina dedicata.
      </p>
      <NewsletterSubscribeForm source="footer" variant="footer" />
      <Link
        href="/newsletter"
        className="mt-3 inline-block text-[13px] text-secondary hover:text-[var(--on-dark)] underline-offset-4 hover:underline transition-colors"
        style={{ fontFamily: "var(--font-ui)" }}
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
    { href: "/workshop", label: "Workshop" },
    { href: "/magazine", label: "Magazine" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/spazio", label: "Spazio" },
    { href: "/contatti", label: "Contatti" },
  ];

  return (
    <footer className="bg-foreground text-[var(--on-dark)] relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-primary hover:scale-110 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Torna su"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/DGnfpAmJtelEAnyF.png"
                alt="Portici DaDaocheng"
                className="h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold tracking-[0.12em] text-[oklch(96.5%_0.006_85)]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: "1.05rem" }}
                >
                  PORTICI
                </span>
                <span
                  className="tracking-[0.2em] uppercase text-secondary mt-0.5"
                  style={{ fontSize: "0.62rem", fontFamily: 'var(--font-ui)' }}
                >
                  DADAOCHENG
                </span>
              </div>
            </div>
            <p
              className="text-[17px] text-[var(--on-dark)]/80 leading-[1.75] max-w-xs"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.
            </p>
            <p
              className="text-xs text-[var(--on-dark)]/70"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Bologna, Italia · 2026
            </p>
          </div>

          {/* Navigation — link underline slide effect */}
          <div>
            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Esplora
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group/link relative inline-block text-[15px] text-[var(--on-dark)]/80 hover:text-[var(--on-dark)] transition-colors"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-secondary scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom bar — social icon bounce */}
        <div className="mt-12 pt-6 border-t border-[var(--on-dark)]/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-[var(--on-dark)]/60"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} Portici DaDaocheng. Tutti i diritti riservati.
          </p>
          <a
            href="https://instagram.com/portici.dadaocheng"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--on-dark)]/60 hover:text-secondary transition-colors group/ig"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            <span className="inline-flex transition-transform duration-200 group-hover/ig:scale-125">
              <Instagram size={18} />
            </span>
            <span className="text-xs">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
