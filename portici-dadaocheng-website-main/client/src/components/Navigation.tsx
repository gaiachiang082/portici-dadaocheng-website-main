import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import {
  type Lang,
  switchLangInPath,
  useLang,
  useLocalizedHref,
} from "@/contexts/LangContext";

/** Locales shown in the nav language switcher (EN kept in codebase but not exposed in UI). */
const NAV_LANG_SWITCHER_CODES = ["it", "zh"] as const satisfies readonly Lang[];
import { useUiDict } from "@/i18n/useUiDict";

const navMono =
  "[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] font-medium";

function navItemIsActive(relHref: string, fullLocation: string, lang: Lang): boolean {
  const base = `/${lang}`;
  if (relHref === "/magazine") {
    return fullLocation === `${base}/magazine` || fullLocation.startsWith(`${base}/articoli/`);
  }
  if (relHref === "/eventi") {
    return fullLocation === `${base}/eventi`;
  }
  if (relHref === "/workshop") {
    return fullLocation === `${base}/workshop` || fullLocation.startsWith(`${base}/workshop/`);
  }
  if (relHref === "/fondatrici") {
    return fullLocation === `${base}/fondatrici` || fullLocation === `${base}/chi-siamo`;
  }
  return fullLocation === `${base}${relHref}`;
}

function LangSwitcher({
  isHome,
  scrolled,
  className,
}: {
  isHome: boolean;
  scrolled: boolean;
  className?: string;
}) {
  const [path, navigate] = useLocation();
  const lang = useLang();
  const t = useUiDict();

  const inactiveTone =
    isHome && !scrolled
      ? "text-[var(--on-dark)]/75 hover:text-[var(--on-dark)]"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div
      className={`flex items-center gap-1.5 shrink-0 [font-family:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] ${className ?? ""}`}
      role="group"
      aria-label={t.lang_switcher.aria}
    >
      {NAV_LANG_SWITCHER_CODES.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 ? (
            <span
              className={
                isHome && !scrolled
                  ? "text-[var(--on-dark)]/35 select-none"
                  : "text-border select-none"
              }
              aria-hidden
            >
              |
            </span>
          ) : null}
          {code === lang ? (
            <span
              className={
                isHome && !scrolled
                  ? "text-[var(--on-dark)] min-w-[1.25rem] text-center"
                  : "text-foreground min-w-[1.25rem] text-center"
              }
            >
              {code.toUpperCase()}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => navigate(switchLangInPath(path, code))}
              className={`min-w-[1.25rem] text-center transition-colors duration-200 ${inactiveTone}`}
            >
              {code.toUpperCase()}
            </button>
          )}
        </span>
      ))}
    </div>
  );
}

export default function Navigation() {
  const t = useUiDict();
  const localizedHref = useLocalizedHref();
  const lang = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [location] = useLocation();

  const navItems = useMemo(() => {
    const all = [
      { href: "/fondatrici", label: t.nav.founders },
      { href: "/servizi", label: t.nav.services },
      { href: "/casi-studio", label: t.nav.case_studies },
      { href: "/magazine", label: t.nav.magazine },
      { href: "/articoli", label: t.nav.articles },
      { href: "/newsletter", label: t.nav.newsletter },
      { href: "/eventi", label: t.nav.events },
      { href: "/contatti", label: t.nav.contact },
    ];
    const zhHidden = ["/magazine", "/newsletter", "/eventi"];
    const b2bOnly = ["/servizi", "/casi-studio"];
    return all.filter((item) =>
      lang === "zh" ? !zhHidden.includes(item.href) : !b2bOnly.includes(item.href)
    );
  }, [t, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === `/${lang}` || location === `/${lang}/`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-background/95 backdrop-blur-[2px] border-b border-border shadow-[0_1px_8px_color-mix(in_srgb,var(--foreground)_6%,transparent)]"
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
            href={localizedHref("/")}
            className="flex items-center shrink-0 group transition-opacity duration-300 hover:opacity-80"
            aria-label={t.nav.home_aria}
          >
            <BrandMark
              tone={isHome && !scrolled ? "paper" : "ink"}
              emphasis
              className={`w-auto transition-[height,width] duration-400 ease-out opacity-95 ${
                scrolled ? "h-[72px] md:h-[78px]" : "h-[84px] md:h-[108px]"
              }`}
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map(({ href, label }, i) => {
                const active = navItemIsActive(href, location, lang);
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
                      href={localizedHref(href)}
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
                        className={`absolute -bottom-0.5 left-0 right-0 h-px bg-editorial-mark origin-left transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <LangSwitcher isHome={isHome} scrolled={scrolled} className="hidden md:flex" />

            {lang !== "zh" ? (
              <Link
                href={localizedHref("/magazine")}
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
                {t.nav.open_magazine}
              </Link>
            ) : null}

            <button
              type="button"
              className={`md:hidden p-2 transition-colors duration-200 [font-family:var(--font-mono)] ${
                isHome && !scrolled
                  ? "text-[var(--on-dark)] hover:text-[var(--on-dark)]/80"
                  : "text-foreground hover:text-muted-foreground"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.nav.menu_close : t.nav.menu_open}
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
          maxHeight: menuOpen ? "480px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container py-6 flex flex-col gap-5">
          <LangSwitcher isHome={isHome} scrolled className="pl-2" />
          {navItems.map(({ href, label }, i) => {
            const active = navItemIsActive(href, location, lang);
            return (
              <Link
                key={href}
                href={localizedHref(href)}
                className={`${navMono} pl-2 border-l-2 transition-colors duration-200 ${
                  active
                    ? "text-foreground border-editorial-mark"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-[color-mix(in_srgb,var(--editorial-mark)_42%,transparent)]"
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
          {lang !== "zh" ? (
            <Link
              href={localizedHref("/magazine")}
              className={`mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-sm border transition-colors duration-200 self-start ${navMono} ${
                isHome && !scrolled
                  ? "bg-background text-foreground border-[color-mix(in_srgb,var(--ink)_18%,transparent)] hover:bg-muted"
                  : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {t.nav.open_magazine}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
