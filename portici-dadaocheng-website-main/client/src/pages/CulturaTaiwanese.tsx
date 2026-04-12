import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";
import { BREADCRUMB_CULTURA_TAIWANESE } from "@/data/hubBreadcrumbs";
import { useBreadcrumbJsonLd } from "@/hooks/useBreadcrumbJsonLd";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function CulturaTaiwanese() {
  const localizedHref = useLocalizedHref();
  useBreadcrumbJsonLd("breadcrumb-hub-cultura-taiwanese", BREADCRUMB_CULTURA_TAIWANESE, localizedHref);

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Cultura taiwanese"
        title="Cultura taiwanese"
      >
        <p>
          La cultura taiwanese si costruisce nel tempo lungo una{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">storia di Taiwan</strong>{" "}
          segnata da cambi di sovranità, da progetti coloniali e da mobilitazioni civiche: ogni fase ha modificato chi
          poteva votare, quali lingue contavano in tribunale, quali feste pubbliche sembravano scontate. Non è un arco
          morale semplice, ma un cantiere dove l&apos;
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">identità</strong> si
          negozia ogni giorno — nei registri scolastici, nelle famiglie che attraversano lo stretto, nei giornali che
          scelgono un lessico piuttosto che un altro.
        </p>
        <p className="text-page-header-dim mt-4">
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_88%,transparent)]">Dadaocheng</strong>,
          sulle rive del Tamsui a Taipei, è stato per decenni uno di quei punti dove merci, accenti e rituali si
          incontravano senza chiedere un catalogo unico: mercato, templi, case a schiera. Da Bologna osserviamo quel
          quartiere come promemoria che la{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_88%,transparent)]">cultura taiwanese</strong>{" "}
          va letta attraverso commercio, urbanistica e archivi — non ridotta a slogan.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          In questo hub raccogliamo letture per chi vuole tenere aperta la domanda «chi sono io, qui e ora?» mentre
          attraversa strati storici diversi.{" "}
          <span className="text-[color-mix(in_srgb,var(--paper)_95%,transparent)]">
            Quale domanda sulla tua appartenenza si sposta, quando affianci una strada di Dadaocheng a un portico che
            attraversi ogni giorno a Bologna?
          </span>
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
