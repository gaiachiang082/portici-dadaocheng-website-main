import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const navLinks = [
  { href: "/fondatrici", label: "Fondatrici" },
  { href: "/eventi", label: "Eventi" },
  { href: "/workshop", label: "Workshop" },
  { href: "/magazine", label: "Magazine" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/spazio", label: "Spazio" },
  { href: "/contatti", label: "Contatti" },
];

const navMono =
  "[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] font-medium";

function navItemIsActive(href: string, location: string): boolean {
  if (href === "/magazine") {
    return location === "/magazine" || location.startsWith("/articoli/");
  }
  if (href === "/eventi") {
    return location === "/eventi";
  }
  if (href === "/workshop") {
    return location === "/workshop" || location.startsWith("/workshop/");
  }
  if (href === "/fondatrici") {
    return location === "/fondatrici" || location === "/chi-siamo";
  }
  return location === href;
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-background/95 backdrop-blur-[2px] border-b border-border shadow-[0_1px_8px_rgba(26,23,20,0.06)]"
          : "bg-transparent"
      }`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-12px)",
        transition:
          "opacity 0.6s ease 100ms, transform 0.6s ease 100ms, background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div className="container">
        <nav
          className={`flex flex-nowrap justify-between items-center ${
            scrolled ? "min-h-[4.5rem] md:min-h-[5.25rem] py-1" : "min-h-[5.5rem] md:min-h-[7.25rem] py-1"
          }`}
        >
          <Link
            href="/"
            className="flex items-center shrink-0 group transition-opacity duration-300 hover:opacity-80"
            aria-label="Portici DaDaocheng — Home"
          >
            <BrandMark
              tone={isHome && !scrolled ? "paper" : "ink"}
              emphasis
              className={`w-auto transition-[height,width] duration-400 ease-out opacity-95 ${
                scrolled ? "h-[72px] md:h-[78px]" : "h-[84px] md:h-[108px]"
              }`}
            />
          </Link>

          <div className="flex items-center gap-6 shrink-0">
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }, i) => {
                const active = navItemIsActive(href, location);
                return (
                  <li
                    key={href}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(-8px)",
                      transition: `opacity 0.5s ease ${200 + i * 80}ms, transform 0.5s ease ${200 + i * 80}ms`,
                    }}
                  >
                    <Link
                      href={href}
                      className={`${navMono} transition-colors duration-200 relative group/nav ${
                        active
                          ? "text-foreground"
                          : isHome && !scrolled
                            ? "text-[var(--on-dark)]/90 hover:text-[var(--on-dark)]"
                            : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--riso-red)] origin-left transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/workshop"
              className={`hidden md:inline-flex items-center justify-center px-[18px] py-2 rounded-sm border transition-colors duration-200 ${navMono} ${
                isHome && !scrolled
                  ? "bg-background/90 text-foreground border-[color-mix(in_srgb,var(--ink)_18%,transparent)] hover:bg-muted"
                  : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
              }`}
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.5s ease 700ms, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease`,
              }}
            >
              Prenota Workshop
            </Link>

            <button
              type="button"
              className={`md:hidden p-2 transition-colors duration-200 [font-family:var(--font-mono)] ${
                isHome && !scrolled
                  ? "text-[var(--on-dark)] hover:text-[var(--on-dark)]/80"
                  : "text-foreground hover:text-muted-foreground"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={menuOpen}
            >
              <span
                style={{
                  display: "block",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        className="md:hidden bg-background/98 backdrop-blur-[2px] border-t border-border overflow-hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }, i) => {
            const active = navItemIsActive(href, location);
            return (
              <Link
                key={href}
                href={href}
                className={`${navMono} pl-2 border-l-2 transition-colors duration-200 ${
                  active
                    ? "text-foreground border-[var(--riso-red)]"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-[color-mix(in_srgb,var(--ink)_22%,transparent)]"
                }`}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                  transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/workshops"
            className={`mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-sm border transition-colors duration-200 self-start ${navMono} ${
              isHome && !scrolled
                ? "bg-background text-foreground border-[color-mix(in_srgb,var(--ink)_18%,transparent)] hover:bg-muted"
                : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            Prenota Workshop
          </Link>
        </div>
      </div>
    </header>
  );
}
