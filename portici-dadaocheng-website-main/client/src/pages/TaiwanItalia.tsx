import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";
import { BREADCRUMB_TAIWAN_ITALIA } from "@/data/hubBreadcrumbs";
import { useBreadcrumbJsonLd } from "@/hooks/useBreadcrumbJsonLd";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function TaiwanItalia() {
  const localizedHref = useLocalizedHref();
  useBreadcrumbJsonLd("breadcrumb-hub-taiwan-italia", BREADCRUMB_TAIWAN_ITALIA, localizedHref);

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Taiwan e Italia"
        title="Taiwan e Italia"
      >
        <p>
          Il{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">
            confronto culturale
          </strong>{" "}
          tra{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">Taiwan e Italia</strong>{" "}
          non è un elenco di somiglianze da brochure: su una costa si intrecciano storie di isola, colonialismo e
          cosmopolitismo portuale; in Emilia-Romagna,{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">Bologna</strong>{" "}
          custodisce memorie di corporazioni, università e migrazioni interne che hanno ridefinito più volte cosa conti
          come radice. In entrambi i contesti, le origini non sono un deposito chiuso: sono una disputa su chi ha diritto
          di raccontarle, e con quale accento.
        </p>
        <p className="text-page-header-dim mt-4">
          I portici — a Bologna struttura quotidiana dello spazio pubblico, a Dadaocheng tettoia che copre botteghe e
          passaggi — restano un simbolo utile: non decorazione, ma luogo dove pioggia, voci e corpi in transito si
          mescolano senza forzare una sola narrazione collettiva.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          Questo hub raccoglie materiali sul rapporto{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_88%,transparent)]">Taiwan Italia</strong>{" "}
          senza tabelline da competizione.{" "}
          <span className="text-[color-mix(in_srgb,var(--paper)_95%,transparent)]">
            Dove senti che la partenza — emigrare, studiare altrove, cambiare cucina — ti ha insegnato di più sulle
            radici di ogni discorso ufficiale sulle origini?
          </span>
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
