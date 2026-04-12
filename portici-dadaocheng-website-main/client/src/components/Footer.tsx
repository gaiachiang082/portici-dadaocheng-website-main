import { Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { Instagram, ArrowUp, ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { useUiDict } from "@/i18n/useUiDict";

const footerMono = "[font-family:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em]";

function FooterB2bCta() {
  const localizedHref = useLocalizedHref();
  return (
    <div className="rounded-xl border border-[color-mix(in_srgb,var(--paper)_22%,transparent)] bg-[color-mix(in_srgb,var(--paper)_6%,transparent)] p-6 md:p-7">
      <h3 className="text-[1.25rem] text-[var(--paper)] font-medium leading-snug mb-4 [font-family:var(--font-display)]">
        開啟你的義大利市場佈局
      </h3>
      <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_82%,transparent)] leading-[1.75] mb-6 [font-family:var(--font-body)]">
        無論是初步市場探索，或是實體展會落地，我們都準備好為你的品牌量身打造專屬策略。
      </p>
      <Link
        href={localizedHref("/contatti")}
        className={`inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-5 py-3 text-[13px] font-semibold tracking-wide hover:opacity-90 transition-opacity ${footerMono} !normal-case !tracking-normal`}
      >
        預約 30 分鐘免費諮詢
        <ArrowRight size={16} aria-hidden className="shrink-0" />
      </Link>
    </div>
  );
}

function FooterNewsletter() {
  const localizedHref = useLocalizedHref();
  const t = useUiDict();
  return (
    <div>
      <p className={`${footerMono} text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-4`}>
        {t.footer.newsletter_heading}
      </p>
      <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_82%,transparent)] leading-[1.75] mb-4 [font-family:var(--font-body)]">
        {t.footer.newsletter_body}
      </p>
      <NewsletterSubscribeForm source="footer" variant="footer" />
      <Link
        href={localizedHref("/newsletter")}
        className={`mt-3 inline-block ${footerMono} text-[color-mix(in_srgb,var(--paper)_70%,transparent)] underline-offset-4 hover:underline hover:text-[var(--paper)] decoration-[var(--riso-red)] transition-colors`}
      >
        {t.footer.newsletter_why}
      </Link>
    </div>
  );
}

export default function Footer() {
  const t = useUiDict();
  const lang = useLang();
  const localizedHref = useLocalizedHref();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navItems = useMemo(() => {
    const all = [
      { href: "/fondatrici", label: t.nav.founders },
      { href: "/spazio", label: t.nav.space },
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

  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-[var(--on-dark)] relative border-t border-[color-mix(in_srgb,var(--paper)_12%,transparent)]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[45] w-12 h-12 rounded-full border border-[color-mix(in_srgb,var(--paper)_35%,transparent)] bg-[color-mix(in_srgb,var(--paper)_6%,var(--forest-deep))] text-[var(--paper)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--paper)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forest-deep)] ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label={t.footer.back_to_top}
      >
        <ArrowUp size={20} />
      </button>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BrandMark tone="paper" className="h-16 w-auto" />
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
              {t.footer.tagline}
            </p>
            <p className={`${footerMono} !normal-case !tracking-normal text-[color-mix(in_srgb,var(--paper)_55%,transparent)]`}>
              Bologna, Italia · {year}
            </p>
          </div>

          <div>
            <p className={`${footerMono} text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-5`}>
              {t.footer.explore}
            </p>
            <ul className="flex flex-col gap-3">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={localizedHref(href)}
                    className="group/link relative inline-block text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_78%,transparent)] hover:text-[var(--paper)] transition-colors [font-family:var(--font-body)]"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--riso-red)] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>{lang === "zh" ? <FooterB2bCta /> : <FooterNewsletter />}</div>
        </div>

        <div className="mt-12 pt-6 border-t border-[color-mix(in_srgb,var(--paper)_14%,transparent)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className={`${footerMono} !normal-case !tracking-normal text-[color-mix(in_srgb,var(--paper)_48%,transparent)]`}>
            © {year} Portici DaDaocheng. {t.footer.rights}
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
            <span>{t.footer.instagram}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
