import { useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { useDocumentSeo } from "@/hooks/useDocumentSeo";
import { useJsonLd } from "@/hooks/useJsonLd";
import { getNewsletterPageCopy } from "@/i18n/newsletterPageLocale";

export default function Newsletter() {
  const lang = useLang();
  const n = getNewsletterPageCopy(lang);
  const localizedHref = useLocalizedHref();
  const newsletterPath = localizedHref("/newsletter");

  useDocumentSeo(n.seoTitle, n.seoDescription);

  const newsletterJsonLd = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const absoluteUrl = origin ? `${origin}${newsletterPath}` : newsletterPath;
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: n.seoTitle,
      description: n.seoDescription,
      url: absoluteUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Portici DaDaocheng",
        url: origin || undefined,
      },
      potentialAction: {
        "@type": "SubscribeAction",
        name: n.jsonLdSubscribeName,
        target: {
          "@type": "EntryPoint",
          urlTemplate: absoluteUrl,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
    };
  }, [newsletterPath, n.seoTitle, n.seoDescription, n.jsonLdSubscribeName]);

  useJsonLd("jsonld-newsletter-page", newsletterJsonLd);

  return (
    <main className="bg-background">
      <PageHeader eyebrow={n.headerEyebrow} meta={n.headerMeta} title={n.headerTitle}>
        <p>{n.headerP1}</p>
        <p className="text-page-header-dim">{n.headerP2}</p>
        <p className="text-page-header-dim mt-4 max-w-2xl">{n.headerOpenQ}</p>
      </PageHeader>

      <section className="py-14 md:py-16 border-b border-border" aria-labelledby="newsletter-form-heading">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2
            id="newsletter-form-heading"
            className="font-medium text-foreground mb-3 text-[1.35rem] [font-family:var(--font-display)]"
          >
            {n.formHeading}
          </h2>
          <p className="text-[15px] text-muted-foreground leading-[1.8] max-w-2xl mb-8 [font-family:var(--font-body)]">
            {n.formIntro}
          </p>
          <NewsletterSubscribeForm
            source="newsletter"
            variant="page"
            showUnsubscribeHint
            editorialSubmitButton
            calmSubscribeErrors
            omitAuxiliaryNewsletterLinks
            submitButtonLabel={n.submitButtonLabel}
          />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-10">
            {n.valueBlocks.map(({ title, text, closing }) => (
              <div
                key={title}
                className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-6"
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
                  {title}
                </p>
                <p className="text-[17px] text-muted-foreground leading-relaxed [font-family:var(--font-body)] mb-4">
                  {text}
                </p>
                <p className="text-[16px] text-foreground/85 leading-relaxed [font-family:var(--font-body)]">{closing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
