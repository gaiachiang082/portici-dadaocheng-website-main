import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/workshop", label: "Workshop" },
  { href: "/articoli", label: "Articoli" },
  { href: "/spazio", label: "Spazio" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"it" | "en">("it");
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-background border-b border-border shadow-[0_1px_8px_rgba(62,39,35,0.08)]"
          : "bg-transparent"
      }`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms, background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div className="container">
        <nav className="flex flex-nowrap justify-between items-center h-16 md:h-20">
          {/* Logo — 首頁深色底用白色，捲動/其他頁用黑色 */}
          <Link href="/" className="flex items-center shrink-0 group transition-opacity duration-300 hover:opacity-80">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YOOdRRgvjAwtBHHT.png"
              alt="Portici DaDaocheng"
              className={`w-auto object-contain transition-[height] duration-400 ease-out ${
                scrolled ? "h-12 md:h-[52px]" : "h-14 md:h-[72px]"
              }`}
              style={{
                filter: isHome && !scrolled ? "brightness(0) invert(1)" : "brightness(0) saturate(1.2)",
                opacity: 0.95,
              }}
            />
          </Link>

          {/* 右側：桌面選單 + CTA，手機為漢堡鈕（右側不再出現 logo） */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
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
                    className={`text-[15px] tracking-wide transition-all duration-200 relative group ${
                      location === href || (href === "/workshop" && location.startsWith("/workshop"))
                        ? "text-primary"
                        : isHome && !scrolled
                          ? "text-[var(--on-dark)] hover:text-primary"
                          : "text-foreground hover:text-primary"
                    }`}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300"
                      style={{ width: location === href || (href === "/workshop" && location.startsWith("/workshop")) ? "100%" : "0%" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* IT/EN 語言切換 — 首頁深色底用白字，捲動後用深字 */}
            <div className="hidden md:flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setLang("it")}
                className={`px-4 py-2 text-[13px] font-medium rounded-xl transition-all duration-200 ${
                  lang === "it"
                    ? isHome && !scrolled
                      ? "bg-white/20 text-[var(--on-dark)]"
                      : "bg-muted text-foreground"
                    : isHome && !scrolled
                      ? "text-[var(--on-dark)]/80 hover:text-[var(--on-dark)] hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                IT Italiano
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-4 py-2 text-[13px] font-medium rounded-md transition-all duration-200 ${
                  lang === "en"
                    ? isHome && !scrolled
                      ? "bg-white/20 text-[var(--on-dark)]"
                      : "bg-muted text-foreground"
                    : isHome && !scrolled
                      ? "text-[var(--on-dark)]/80 hover:text-[var(--on-dark)] hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                GB English
              </button>
            </div>

            {/* CTA — Desktop：首頁剛顯示時與頁面底色一致（白底深字），捲動後為棕色按鈕 */}
            <Link
              href="/workshop"
              className={`hidden md:inline-flex items-center px-5 py-2 text-[15px] font-semibold rounded-xl transition-all duration-300 hover:opacity-85 hover:px-6 ${
                isHome && !scrolled
                  ? "bg-background text-foreground border border-border shadow-sm hover:bg-muted"
                  : "bg-primary text-primary-foreground"
              }`}
              style={{
                fontFamily: 'var(--font-ui)',
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.5s ease 700ms, padding 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease`,
              }}
            >
              Prenota Workshop
            </Link>

            {/* Hamburger — Mobile 收合選單 */}
            <button
              className={`md:hidden p-2 transition-colors duration-200 ${isHome && !scrolled ? "text-[var(--on-dark)] hover:text-primary" : "text-foreground hover:text-primary"}`}
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

      {/* Mobile Menu — slide down */}
      <div
        className="md:hidden bg-background border-t border-border overflow-hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`text-[16px] transition-colors duration-200 ${
                location === href || (href === "/workshop" && location.startsWith("/workshop"))
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
              style={{
                fontFamily: 'var(--font-ui)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`,
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/workshops"
            className={`mt-2 inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold rounded-xl hover:opacity-85 transition-opacity ${
              isHome && !scrolled ? "bg-background text-foreground border border-border" : "bg-primary text-primary-foreground"
            }`}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Prenota Workshop
          </Link>
        </div>
      </div>
    </header>
  );
}
