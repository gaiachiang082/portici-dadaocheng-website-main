import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { MAGAZINE_ISSUE_1_SOURCE } from "@shared/const";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { useDocumentSeo } from "@/hooks/useDocumentSeo";
import { useJsonLd } from "@/hooks/useJsonLd";
import { articlePathSegment } from "@/sanity/articlePath";
import { MAGAZINE_ARTICLES_QUERY } from "@/sanity/articleQueries";
import { client } from "../SanityClient";
import {
  formatIssueMeta,
  getArchivedIssues,
  getCurrentIssue,
  MAGAZINE_ISSUES,
  type MagazineIssue,
} from "@/data/magazineIssues";
import { getMagazinePageCopy } from "@/i18n/magazinePageLocale";

interface Article {
  _id: string;
  slug?: string | null;
  _createdAt?: string;
  category?: string;
  title?: string;
  excerpt?: string;
  readTime?: string;
  color?: string;
  mainImage?: {
    asset?: { url?: string } | null;
  } | null;
}

function coverImageUrl(a: Article): string | undefined {
  const u = a.mainImage?.asset?.url;
  return typeof u === "string" && u.length > 0 ? u : undefined;
}

function pdfDownloadName(issue: MagazineIssue): string {
  if (issue.pdfDownloadFilename) return issue.pdfDownloadFilename;
  const tail = issue.pdfHref.split("/").pop();
  return tail && /\.pdf$/i.test(tail) ? tail : "portici-magazine.pdf";
}

function IssueCoverImage({ issue, alt }: { issue: MagazineIssue; alt: string }) {
  const [src, setSrc] = useState(issue.coverUrl);

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain object-center"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      sizes="(max-width: 1024px) 92vw, 40vw"
      onError={() => {
        if (issue.coverFallbackUrl && src !== issue.coverFallbackUrl) {
          setSrc(issue.coverFallbackUrl);
        }
      }}
    />
  );
}

function IssueArchiveCard({
  issue,
  openPdfInBrowser,
  downloadPdf,
}: {
  issue: MagazineIssue;
  openPdfInBrowser: string;
  downloadPdf: string;
}) {
  const name = pdfDownloadName(issue);
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <p
        className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3 [font-family:var(--font-mono)]"
      >
        N. {issue.issueNumber} · {issue.seasonLabel} {issue.year}
      </p>
      <h3
        className="text-lg font-semibold text-foreground leading-snug mb-3 [font-family:var(--font-display)]"
      >
        {issue.themeTitle}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 [font-family:var(--font-body)]">
        {issue.intro[0]}
      </p>
      <p className="text-[13px] text-muted-foreground [font-family:var(--font-body)] leading-relaxed">
        <a
          href={issue.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/90 underline underline-offset-4 decoration-border hover:text-foreground"
        >
          {openPdfInBrowser}
        </a>
        <span className="text-muted-foreground/60"> · </span>
        <a
          href={issue.pdfHref}
          download={name}
          className="text-muted-foreground/90 underline underline-offset-4 decoration-border hover:text-foreground"
        >
          {downloadPdf}
        </a>
      </p>
    </article>
  );
}

export default function Magazine() {
  const lang = useLang();
  const m = getMagazinePageCopy(lang);
  const localizedHref = useLocalizedHref();
  const current = getCurrentIssue();
  const archived = getArchivedIssues();
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("準備打 Sanity API，使用的 lang 變數是:", lang);
        console.log("Sanity Config:", {
          projectId: client.config().projectId,
          dataset: client.config().dataset,
        });
        const data = await client.fetch<Article[]>(MAGAZINE_ARTICLES_QUERY, { lang });
        const list = data ?? [];
        if (import.meta.env.DEV) {
          for (const item of list) {
            const slugOk =
              typeof item.slug === "string" && item.slug.trim().length > 0;
            if (!slugOk) {
              console.error(
                "[Magazine] Sanity article is missing slug.current (add slug in Studio). _id:",
                item._id,
                "title:",
                item.title ?? "(no title)",
              );
            }
          }
        }
        console.log("Sanity 回傳的文章列表:", list);
        setArticles(list);
      } catch (err) {
        console.error("Magazine articoli fetch error:", err);
        setArticles([]);
      } finally {
        setArticlesLoading(false);
      }
    };
    fetchArticles();
  }, [lang]);

  const magazinePagePath = localizedHref("/magazine");

  useDocumentSeo(m.seoTitle, m.seoDescription, magazinePagePath);

  const magazineJsonLd = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const pageUrl = origin ? `${origin}${magazinePagePath}` : magazinePagePath;
    const allIssues = [...MAGAZINE_ISSUES];

    const itemListElement = allIssues.map((issue, index) => {
      const pdfUrl =
        issue.pdfHref.startsWith("http://") || issue.pdfHref.startsWith("https://")
          ? issue.pdfHref
          : `${origin}${issue.pdfHref}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "PublicationIssue",
          issueNumber: issue.issueNumber,
          name: `${issue.themeTitle} (N. ${issue.issueNumber} · ${issue.seasonLabel} ${issue.year})`,
          description: issue.intro[0],
          url: pdfUrl,
        },
      };
    });

    return {
      "@context": "https://schema.org",
      "@type": ["CollectionPage", "WebPage"],
      name: m.seoTitle,
      description: m.seoDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Portici DaDaocheng",
        url: origin || undefined,
      },
      about: {
        "@type": "Periodical",
        name: "Portici Magazine",
        description: m.jsonLdPeriodicalDescription,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allIssues.length,
        itemListElement,
      },
    };
  }, [magazinePagePath, m.seoTitle, m.seoDescription, m.jsonLdPeriodicalDescription]);

  useJsonLd("jsonld-magazine-page", magazineJsonLd);

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow={m.headerEyebrow}
        meta={m.headerMeta}
        className="pb-16"
        titleClassName="text-[clamp(2.05rem,4.2vw,3.05rem)] leading-[1.12]"
        title={
          <>
            {m.titleLine1}
            <br />
            <em className="text-[var(--riso-peach)] not-italic font-medium">{m.titleLine2Em}</em>
          </>
        }
      >
        <p>
          {m.headerP1Before}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">
            {m.headerP1Strong}
          </strong>
          {m.headerP1After}
        </p>
        <p className="text-page-header-dim">{m.headerP2}</p>
        <p className="text-page-header-dim mt-4 max-w-2xl">{m.headerOpenQ}</p>
      </PageHeader>

      {/* Featured current issue */}
      <section
        id="numero-attuale"
        aria-labelledby="magazine-current-heading"
        className="py-14 md:py-16 px-6 md:px-10 bg-background border-b border-border scroll-mt-24"
      >
        <div className="container mx-auto max-w-7xl">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-8 [font-family:var(--font-mono)]">
            {m.currentKicker}
          </p>
          {/* Cover track capped so text gets 1fr — spread, not sidebar */}
          <div className="grid gap-10 lg:grid-cols-[minmax(17.5rem,min(36vw,26rem))_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-10 lg:gap-y-10 items-start">
            <figure className="max-lg:order-2 m-0 mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-[min(100%,26rem)] lg:mx-0 lg:max-w-full lg:justify-self-stretch">
              <div className="relative aspect-[3/4] max-h-[min(72vh,600px)] w-full overflow-hidden rounded-[2px] bg-[var(--paper-deep)] shadow-[0_32px_64px_-28px_rgba(28,25,23,0.22)]">
                <IssueCoverImage issue={current} alt={m.coverAlt(current.issueNumber)} />
              </div>
            </figure>
            <div className="min-w-0 w-full flex flex-col gap-8 max-lg:order-1 lg:pt-1">
              <header className="space-y-4">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground [font-family:var(--font-ui)]"
                >
                  {formatIssueMeta(current)}
                </p>
                <h2
                  id="magazine-current-heading"
                  className="text-foreground text-[clamp(1.65rem,3.2vw,2.25rem)] font-semibold leading-[1.15] [font-family:var(--font-display)]"
                >
                  {current.themeTitle}
                </h2>
                {current.themeSubtitle ? (
                  <p className="text-[1.0625rem] text-muted-foreground [font-family:var(--font-body)] leading-relaxed">
                    {current.themeSubtitle}
                  </p>
                ) : null}
              </header>
              <div className="space-y-5 text-[1.0625rem] text-muted-foreground leading-[1.75] [font-family:var(--font-body)] max-w-[min(100%,72ch)]">
                {current.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="space-y-6 lg:space-y-7 pt-1 border-t border-border/35" role="group" aria-label={m.receiveCurrentAria}>
                <p className="text-[14px] text-muted-foreground/90 leading-[1.7] [font-family:var(--font-body)] max-w-[min(100%,72ch)]">
                  {m.pdfByEmailLead}
                </p>
                <div className="w-full min-w-0 max-w-[min(100%,72ch)]">
                  <NewsletterSubscribeForm
                    source={MAGAZINE_ISSUE_1_SOURCE}
                    variant="home"
                    showUnsubscribeHint
                    editorialSubmitButton
                    calmSubscribeErrors
                    quietSuccess
                    submitButtonLabel={m.newsletterSubmit}
                    successTitle={m.newsletterSuccessTitle}
                    successBody={m.newsletterSuccessBody}
                    successTitleWhenAlreadySubscribed={m.newsletterAlreadyTitle}
                    successBodyWhenAlreadySubscribed={m.newsletterAlreadyBody}
                    successSupplementWhenEmailNotSent={m.newsletterEmailFailSupplement}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4 sm:gap-8">
                  <Link
                    href={localizedHref("/eventi")}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-5 py-3 text-foreground text-[13px] font-medium uppercase tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-muted/80 transition-colors w-fit"
                  >
                    {m.sessionsLink}
                    <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
                  </Link>
                  <p className="text-[13px] text-muted-foreground/80 [font-family:var(--font-body)] leading-relaxed">
                    <a
                      href={current.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 decoration-border/70 hover:text-foreground"
                    >
                      {m.samePdfInBrowser}
                    </a>
                    <span className="text-muted-foreground/45"> — </span>
                    <span className="text-muted-foreground/65">{m.samePdfNote}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Same issue: section map (subordinate to hero — smaller type, tied to PDF) */}
      <section className="py-12 md:py-16 px-6 md:px-10 bg-muted/35 border-b border-border" aria-labelledby="magazine-highlights-heading">
        <div className="container mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
            {m.highlightsKicker}
          </p>
          <h2
            id="magazine-highlights-heading"
            className="text-xl md:text-[1.4rem] font-semibold text-foreground mb-6 [font-family:var(--font-display)]"
          >
            {m.highlightsTitle}
          </h2>
          <p className="text-[15px] text-muted-foreground leading-[1.8] max-w-3xl mb-10 [font-family:var(--font-body)]">
            {m.highlightsIntro}
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {current.sectionPreviews.map((block) => (
              <article
                key={block.id}
                className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm flex flex-col gap-3"
              >
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {block.rubric}
                </span>
                <h3 className="text-lg font-semibold text-foreground leading-snug [font-family:var(--font-display)]">
                  {block.title}
                </h3>
                {block.asideZh ? (
                  <p className="text-[15px] text-foreground/85 leading-snug" lang="zh-Hant" style={{ fontFamily: "var(--font-body)" }}>
                    {block.asideZh}
                  </p>
                ) : null}
                <p className="text-[16px] text-muted-foreground leading-[1.75] flex-1 [font-family:var(--font-body)]">
                  {block.dek}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 md:mt-16 rounded-2xl border border-border bg-card px-6 py-8 md:px-10 md:py-10">
            <p
              className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3 [font-family:var(--font-mono)]"
            >
              {m.nextChapterKicker}
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-3 [font-family:var(--font-display)]">
              {current.nextIssueTeaser.title}
            </h3>
            <p className="text-[16px] text-muted-foreground leading-[1.75] max-w-2xl [font-family:var(--font-body)]">
              {current.nextIssueTeaser.body}
            </p>
          </div>
        </div>
      </section>

      {/* Archive — second pillar of the publication system */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-background border-t-2 border-border/80" aria-labelledby="magazine-archive-heading">
        <div className="container mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3 [font-family:var(--font-mono)]">
            {m.archiveKicker}
          </p>
          <h2
            id="magazine-archive-heading"
            className="text-2xl md:text-[1.65rem] font-semibold text-foreground mb-4 [font-family:var(--font-display)]"
          >
            {m.archiveTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-[1.85] max-w-3xl mb-10 [font-family:var(--font-body)]">
            {m.archiveIntro}
          </p>
          {archived.length === 0 ? (
            <p className="text-[16px] text-muted-foreground leading-relaxed [font-family:var(--font-body)] border-l-2 border-[color-mix(in_srgb,var(--riso-red)_35%,transparent)] pl-5">
              {m.archiveEmpty}
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-8 list-none p-0 m-0">
              {archived.map((issue) => (
                <li key={issue.slug} className="min-w-0">
                  <IssueArchiveCard
                    issue={issue}
                    openPdfInBrowser={m.openPdfInBrowser}
                    downloadPdf={m.downloadPdf}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Sanity: tertiary — companion web pieces, not the magazine index */}
      {!articlesLoading && articles.length > 0 ? (
        <section className="py-10 md:py-12 px-6 md:px-10 bg-background border-t border-dashed border-border" aria-labelledby="magazine-web-heading">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
              {m.webKicker}
            </p>
            <h2
              id="magazine-web-heading"
              className="text-lg md:text-[1.25rem] font-semibold text-foreground mb-3 [font-family:var(--font-display)]"
            >
              {m.webTitle}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8 [font-family:var(--font-body)]">
              {m.webIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl lg:max-w-none">
              {articles.slice(0, 4).map((article) => {
                const img = coverImageUrl(article);
                return (
                  <Link
                    key={article._id}
                    href={localizedHref(`/articoli/${articlePathSegment(article)}`)}
                    className="group rounded-xl overflow-hidden border border-border/70 bg-card/80 flex flex-col transition-colors hover:border-border hover:bg-card"
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-muted shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt={
                            article.title?.trim()
                              ? m.imageAltArticle(article.title.trim())
                              : m.imageAltGeneric
                          }
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{ backgroundColor: article.color ?? "var(--secondary)" }}
                        />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-2">
                      <span
                        className="text-[9px] font-semibold tracking-[0.14em] uppercase text-muted-foreground"
                        style={{ fontFamily: "var(--font-ui)" }}
                      >
                        {article.category ?? m.webCategoryFallback}
                      </span>
                      <h3 className="text-foreground font-semibold text-[0.9375rem] leading-snug group-hover:text-[var(--riso-red)] transition-colors [font-family:var(--font-display)]">
                        {article.title ?? ""}
                      </h3>
                      {article.excerpt ? (
                        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 [font-family:var(--font-body)]">
                          {article.excerpt}
                        </p>
                      ) : null}
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-primary/90 mt-auto pt-1 [font-family:var(--font-ui)]">
                        {m.readMore}
                        <ArrowRight size={12} className="opacity-75" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Newsletter CTA */}
      <section className="py-16 px-6 md:px-10 bg-muted border-t border-border">
        <div className="container mx-auto max-w-lg text-center">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3 [font-family:var(--font-mono)]">
            {m.bottomKicker}
          </p>
          <h2 className="text-[1.35rem] font-semibold text-foreground mb-3 [font-family:var(--font-display)]">
            {m.bottomTitle}
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 [font-family:var(--font-body)]">
            {m.bottomBody}
          </p>
          <NewsletterSubscribeForm source="magazine" variant="home" showUnsubscribeHint />
          <p className="mt-6 text-sm text-muted-foreground [font-family:var(--font-body)]">
            <Link href={localizedHref("/newsletter")} className="text-primary underline-offset-4 hover:underline">
              {m.bottomLink}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
