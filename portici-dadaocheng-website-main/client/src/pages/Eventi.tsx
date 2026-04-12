import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ProgramInterestSection } from "@/components/ProgramInterestSection";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { getEventiCopy } from "@/i18n/eventiLocale";

export default function Eventi() {
  const lang = useLang();
  const t = getEventiCopy(lang);
  const localizedHref = useLocalizedHref();
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow={t.headerEyebrow}
        meta={t.headerMeta}
        title={t.headerTitle}
      >
        <p>
          {t.headerP1}
        </p>
        <p className="text-page-header-dim">
          {t.headerP2}
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          {t.headerOpenQ}
        </p>
      </PageHeader>

      <ProgramInterestSection className="py-14 md:py-18 border-b border-border" showLegacyBookingHint />

      <section className="py-14 md:py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-2 text-[1.35rem] [font-family:var(--font-display)]">
            {t.howTitle}
          </h2>
          <p className="text-sm text-muted-foreground mb-10" style={{ fontFamily: "var(--font-ui)" }}>
            {t.howSubtitle}
          </p>
          <ol className="space-y-8 list-none p-0 m-0">
            {t.interestSteps.map(({ n, title, text }) => (
              <li key={n} className="flex gap-5">
                <span
                  className="shrink-0 w-9 h-9 rounded-full border border-border text-foreground flex items-center justify-center text-sm font-semibold"
                  style={{ fontFamily: "var(--font-ui)" }}
                  aria-hidden
                >
                  {n}
                </span>
                <div>
                  <p className="font-medium text-foreground mb-1" style={{ fontFamily: "var(--font-ui)", fontSize: "1rem" }}>
                    {title}
                  </p>
                  <p className="text-[16px] text-muted-foreground leading-relaxed [font-family:var(--font-body)]">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-6 text-[1.35rem] [font-family:var(--font-display)]">
            {t.raccontoTitle}
          </h2>
          <ul className="space-y-8">
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoReadingsK}
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                {t.raccontoReadingsP}
              </p>
              <Link
                href={localizedHref("/magazine")}
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoReadingsLink} <ArrowRight size={14} />
              </Link>
            </li>
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoNewsK}
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                {t.raccontoNewsP}
              </p>
              <Link
                href={localizedHref("/newsletter")}
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoNewsLink} <ArrowRight size={14} />
              </Link>
            </li>
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoImgK}
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                {t.raccontoImgP}
              </p>
              <Link
                href={localizedHref("/workshop")}
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoImgLink1} <ArrowRight size={14} />
              </Link>
              <span className="text-muted-foreground mx-2">·</span>
              <Link
                href={localizedHref("/workshop/calligraphy")}
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {t.raccontoImgLink2} <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/20 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-4 text-[1.25rem] [font-family:var(--font-display)]">{t.whereTitle}</h2>
          <p className="text-[16px] text-muted-foreground leading-[1.75] mb-6 [font-family:var(--font-body)]">
            {t.whereBody}
          </p>
          <Link
            href={localizedHref("/contatti")}
            className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {t.whereLink} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
          <p className="text-sm text-muted-foreground w-full sm:w-auto sm:mr-2" style={{ fontFamily: "var(--font-ui)" }}>
            {t.elsewhereLabel}
          </p>
          <Link
            href={localizedHref("/magazine")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {t.elsewhereMagazine}
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/newsletter")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {t.elsewhereNewsletter}
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/contatti")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {t.elsewhereContact}
          </Link>
        </div>
      </section>
    </main>
  );
}
