import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { client } from "../SanityClient";
import {
  formatIssueMeta,
  getArchivedIssues,
  getCurrentIssue,
  type MagazineIssue,
} from "@/data/magazineIssues";

interface Article {
  _id: string;
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

function coverPathLooksPdf(url: string): boolean {
  const base = url.split("?")[0]?.split("#")[0] ?? "";
  return /\.pdf$/i.test(base);
}

function IssueCoverImage({ issue }: { issue: MagazineIssue }) {
  const [src, setSrc] = useState(issue.coverUrl);

  if (coverPathLooksPdf(issue.coverUrl)) {
    return (
      <object
        data={`${issue.coverUrl}#view=FitH`}
        type="application/pdf"
        title={issue.coverAlt}
        className="block h-full w-full border-0 bg-[var(--paper-deep)] pointer-events-none"
        aria-label={issue.coverAlt}
      >
        {issue.coverFallbackUrl ? (
          <img
            src={issue.coverFallbackUrl}
            alt={issue.coverAlt}
            className="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        ) : null}
      </object>
    );
  }

  return (
    <img
      src={src}
      alt={issue.coverAlt}
      className="h-full w-full object-cover object-center"
      loading="eager"
      decoding="async"
      sizes="(max-width: 1024px) 100vw, 42vw"
      onError={() => {
        if (issue.coverFallbackUrl && src !== issue.coverFallbackUrl) {
          setSrc(issue.coverFallbackUrl);
        }
      }}
    />
  );
}

function IssueArchiveCard({ issue }: { issue: MagazineIssue }) {
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
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <a
          href={issue.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline underline-offset-4 [font-family:var(--font-ui)]"
        >
          <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
          Apri il PDF
        </a>
        <a
          href={issue.pdfHref}
          download={name}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4 [font-family:var(--font-ui)]"
        >
          <Download size={16} strokeWidth={1.75} aria-hidden />
          Scarica
        </a>
      </div>
    </article>
  );
}

export default function Magazine() {
  const current = getCurrentIssue();
  const archived = getArchivedIssues();
  const pdfFile = pdfDownloadName(current);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch<Article[]>(
          `*[_type == "article"] | order(_createdAt desc) {
            _id,
            _createdAt,
            category,
            "title": title.it,
            excerpt,
            readTime,
            color,
            mainImage {
              asset->{ url }
            }
          }`
        );
        setArticles(data ?? []);
      } catch (err) {
        console.error("Magazine articoli fetch error:", err);
        setArticles([]);
      } finally {
        setArticlesLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Portici Magazine"
        meta="Pubblicazione trimestrale"
        className="pb-16"
        titleClassName="text-[clamp(2.05rem,4.2vw,3.05rem)] leading-[1.12]"
        title={
          <>
            Dove il racconto resta
            <br />
            <em className="text-[var(--riso-peach)] not-italic font-medium">più lungo del feed.</em>
          </>
        }
      >
        <p>
          Il Magazine è il <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">trimestrale</strong> in PDF di Portici DaDaocheng: un numero per stagione, oggetto editoriale completo — stesse domande umane, risposte culturali diverse (同中求異).
        </p>
        <p className="text-page-header-dim">
          In questa pagina: prima l’edizione corrente e cosa contiene, poi l’archivio dei numeri usciti, infine una piccola selezione di testi nati per il web.
        </p>
      </PageHeader>

      {/* Featured current issue */}
      <section
        id="numero-attuale"
        aria-labelledby="magazine-current-heading"
        className="py-14 md:py-16 px-6 md:px-10 bg-background border-b border-border scroll-mt-24"
      >
        <div className="container mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-6 [font-family:var(--font-mono)]">
            Trimestrale · edizione corrente
          </p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 items-start">
            <div className="relative aspect-[3/4] max-h-[min(64vh,520px)] sm:max-h-[min(72vh,560px)] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-2xl border border-border bg-muted shadow-md ring-1 ring-border/40 max-lg:order-2">
              <IssueCoverImage issue={current} />
            </div>
            <div className="min-w-0 flex flex-col gap-6 max-lg:order-1">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {formatIssueMeta(current)}
                </p>
                <h2
                  id="magazine-current-heading"
                  className="text-foreground text-[clamp(1.65rem,3.2vw,2.25rem)] font-semibold leading-tight mb-2 [font-family:var(--font-display)]"
                >
                  {current.themeTitle}
                </h2>
                {current.themeSubtitle ? (
                  <p className="text-base text-muted-foreground [font-family:var(--font-body)] leading-relaxed">
                    {current.themeSubtitle}
                  </p>
                ) : null}
              </div>
              <div className="space-y-4 text-[1.0625rem] text-muted-foreground leading-[1.75] [font-family:var(--font-body)]">
                {current.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
                role="group"
                aria-label="Azioni sul numero attuale"
              >
                <a
                  href={current.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-5 py-3 text-primary-foreground text-[13px] font-medium uppercase tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
                  Apri il PDF
                </a>
                <a
                  href={current.pdfHref}
                  download={pdfFile}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-5 py-3 text-foreground text-[13px] font-medium uppercase tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-muted/80 transition-colors"
                >
                  <Download size={16} strokeWidth={1.75} aria-hidden />
                  Scarica
                </a>
                <Link
                  href="/newsletter"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-5 py-3 text-foreground text-[13px] font-medium uppercase tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-muted/80 transition-colors"
                >
                  Iscriviti al prossimo numero
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
                </Link>
                <Link
                  href="/eventi"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-transparent px-5 py-3 text-primary text-[14px] font-medium [font-family:var(--font-ui)] hover:underline underline-offset-4"
                >
                  Sessioni e laboratori
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Same issue: section map (subordinate to hero — smaller type, tied to PDF) */}
      <section className="py-12 md:py-16 px-6 md:px-10 bg-muted/35 border-b border-border" aria-labelledby="magazine-highlights-heading">
        <div className="container mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
            Stesso numero · sommario
          </p>
          <h2
            id="magazine-highlights-heading"
            className="text-xl md:text-[1.4rem] font-semibold text-foreground mb-6 [font-family:var(--font-display)]"
          >
            Cosa trovate nel PDF
          </h2>
          <p className="text-[15px] text-muted-foreground leading-[1.8] max-w-3xl mb-10 [font-family:var(--font-body)]">
            Anteprima delle sezioni: saggio, tavola, reportage e glossario restano nel file; qui solo la mappa per orientarvi prima di aprire il numero.
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
              Prossimo capitolo
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
            Pubblicazione · archivio
          </p>
          <h2
            id="magazine-archive-heading"
            className="text-2xl md:text-[1.65rem] font-semibold text-foreground mb-4 [font-family:var(--font-display)]"
          >
            Numeri già pubblicati
          </h2>
          <p className="text-base text-muted-foreground leading-[1.85] max-w-3xl mb-10 [font-family:var(--font-body)]">
            L’archivio del trimestrale: ogni stagione resta scaricabile. Quando esce un nuovo numero, quello precedente si sposta qui — stessa pagina, stesso sistema.
          </p>
          {archived.length === 0 ? (
            <p className="text-[16px] text-muted-foreground leading-relaxed [font-family:var(--font-body)] border-l-2 border-[color-mix(in_srgb,var(--riso-red)_35%,transparent)] pl-5">
              È online il primo numero del trimestrale; quando ne uscirà un altro, quello precedente comparirà qui come
              scheda d’archivio — stesso URL, stesso sistema.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {archived.map((issue) => (
                <IssueArchiveCard key={issue.slug} issue={issue} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sanity: tertiary — companion web pieces, not the magazine index */}
      {!articlesLoading && articles.length > 0 ? (
        <section className="py-10 md:py-12 px-6 md:px-10 bg-background border-t border-dashed border-border" aria-labelledby="magazine-web-heading">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
              Sul sito · fuori dal PDF
            </p>
            <h2
              id="magazine-web-heading"
              className="text-lg md:text-[1.25rem] font-semibold text-foreground mb-3 [font-family:var(--font-display)]"
            >
              Speciali e articoli scelti
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8 [font-family:var(--font-body)]">
              Approfondimenti, collaborazioni e pezzi nativi per il web: affiancano il trimestrale, non lo sostituiscono.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl lg:max-w-none">
              {articles.slice(0, 4).map((article) => {
                const img = coverImageUrl(article);
                return (
                  <Link
                    key={article._id}
                    href={`/articoli/${article._id}`}
                    className="group rounded-xl overflow-hidden border border-border/70 bg-card/80 flex flex-col transition-colors hover:border-border hover:bg-card"
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-muted shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt=""
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
                        {article.category ?? "Sul sito"}
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
                        Leggi
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
            Restare nel racconto
          </p>
          <h2 className="text-[1.35rem] font-semibold text-foreground mb-3 [font-family:var(--font-display)]">
            Ricevete il segnale per il prossimo PDF
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 [font-family:var(--font-body)]">
            Una mail al mese, tono editoriale: vi avvisiamo quando un nuovo numero è pronto — senza riportarvi verso
            Linktree come unica porta.
          </p>
          <NewsletterSubscribeForm source="magazine" variant="home" showUnsubscribeHint />
          <p className="mt-6 text-sm text-muted-foreground [font-family:var(--font-body)]">
            <Link href="/newsletter" className="text-primary underline-offset-4 hover:underline">
              Leggi la promessa sulla pagina newsletter
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
