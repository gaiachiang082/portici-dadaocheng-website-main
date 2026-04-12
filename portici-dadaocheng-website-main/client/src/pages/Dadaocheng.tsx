import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";
import { BREADCRUMB_DADAOCHENG } from "@/data/hubBreadcrumbs";
import { useBreadcrumbJsonLd } from "@/hooks/useBreadcrumbJsonLd";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function Dadaocheng() {
  const localizedHref = useLocalizedHref();
  useBreadcrumbJsonLd("breadcrumb-hub-dadaocheng", BREADCRUMB_DADAOCHENG, localizedHref);

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Dadaocheng"
        title="Dadaocheng"
      >
        <p>
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">Dadaocheng Taipei</strong>{" "}
          non è solo un nome sulla mappa: per decenni il{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">mercato storico</strong>{" "}
          delle sue vie ha condensato merci dell&apos;entroterra taiwanese, importazioni e manifatture in un intrico di
          odori, teli piegati e contratti verbali. L&apos;odore delle erbe da banco — radici essiccate, cortecce,
          confezioni etichettate a mano — convive con il peso delle stoffe nei negozi di tessuti, dove metro e forbice
          segnano tempi diversi da quelli del grande retail.
        </p>
        <p className="text-page-header-dim mt-4">
          In quella griglia di botteghe, Dadaocheng ha funzionato da tavolo dove culture dell&apos;Asia orientale e
          circuiti commerciali più larghi si sono incrociati: mercanti, stampa locale, associazioni, tempietti di
          quartiere. Leggere il quartiere significa affrontare uno strato concreto della storia urbana di Taipei — vie,
          facciate, prezzi al chilo — invece di una silhouette generica di «centro storico».
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          Da questo hub partono schede e letture sul territorio.{" "}
          <span className="text-[color-mix(in_srgb,var(--paper)_95%,transparent)]">
            Quale dettaglio materiale — un odore, una piega di stoffa, un cartello scritto a mano — ti obbligherebbe oggi
            a riformulare ciò che credi di sapere su Taipei?
          </span>
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
