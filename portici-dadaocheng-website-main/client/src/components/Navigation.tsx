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
          ? "bg-[oklch(96.5%_0.006_85)] border-b border-[oklch(88%_0.010_80)] shadow-[0_1px_8px_oklch(0%_0_0/0.06)]"
          : "bg-transparent"
      }`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms, background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group transition-opacity duration-300 hover:opacity-80">
            {/* Full logo image - white version for dark background, Rengairo for light */}
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YOOdRRgvjAwtBHHT.png"
              alt="Portici DaDaocheng"
              className="h-12 md:h-14 w-auto object-contain transition-all duration-300"
              style={{
                filter: scrolled || !isHome ? 'brightness(0.4) saturate(1.2)' : 'brightness(0) invert(1)',
                opacity: 0.95
              }}
            />
          </Link>

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
                      ? "text-[#a2482b]"
                      : scrolled || !isHome
                      ? "text-[oklch(27.5%_0.000_0)] hover:text-[#a2482b]"
                      : "text-[oklch(90%_0.005_85)] hover:text-[#a2482b]"
                  }`}
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {label}
                  {/* Underline indicator */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-[#a2482b] transition-all duration-300"
                    style={{ width: location === href || (href === "/workshop" && location.startsWith("/workshop")) ? "100%" : "0%" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button — Desktop */}
          <Link
            href="/workshop"
            className="hidden md:inline-flex items-center px-5 py-2 text-[15px] font-semibold transition-all duration-300 bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 hover:px-6"
            style={{
              fontFamily: 'var(--font-ui)',
              opacity: mounted ? 1 : 0,
              transition: `opacity 0.5s ease 700ms, padding 0.3s ease, background-color 0.3s ease`,
            }}
          >
            Prenota Workshop
          </Link>

          {/* Hamburger — Mobile */}
          <button
            className="md:hidden p-2 text-[oklch(27.5%_0.000_0)] hover:text-[oklch(55.0%_0.075_55)] transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
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
        </nav>
      </div>

      {/* Mobile Menu — slide down */}
      <div
        className="md:hidden bg-[oklch(96.5%_0.006_85)] border-t border-[oklch(88%_0.010_80)] overflow-hidden"
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
                  ? "text-[#a2482b]"
                  : "text-[oklch(27.5%_0.000_0)] hover:text-[#a2482b]"
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
            className="mt-2 inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Prenota Workshop
          </Link>
        </div>
      </div>
    </header>
  );
}
