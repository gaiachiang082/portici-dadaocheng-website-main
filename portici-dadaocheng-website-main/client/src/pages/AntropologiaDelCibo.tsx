import { PageHeader } from "@/components/PageHeader";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function AntropologiaDelCibo() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Antropologia del cibo"
        title="Antropologia del cibo"
      >
        <p>
          L&apos;
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">
            antropologia del cibo
          </strong>{" "}
          parte da un&apos;ovvietà che sposta tutto: ciò che finisce nel piatto è già stato filtrato da magazzini,
          prezzi, confini, norme igieniche e memorie familiari. La{" "}
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">storia del cibo</strong>{" "}
          non è un elenco di piatti da manuale, ma una catena di decisioni — chi coltiva, chi trasporta, chi ha diritto
          al surplus, chi smaltisce gli avanzi — che plasma anche l&apos;
          <strong className="font-medium text-[color-mix(in_srgb,var(--paper)_92%,transparent)]">
            identità culturale
          </strong>{" "}
          quando nessuno pronuncia quella formula.
        </p>
        <p className="text-page-header-dim mt-4">
          In cucina e in sala, gesti apparentemente domestici ricapitolano tensioni più grandi: calendari festivi, diete
          imposte, tabù che migrano con le persone. Taiwan e l&apos;Italia offrono laboratori diversi per seguire queste
          tracce, senza paragoni da tutorial.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          Qui costruiamo un percorso nell&apos;antropologia del cibo con testi che trattano ingredienti e tavole come
          documenti materiali.{" "}
          <span className="text-[color-mix(in_srgb,var(--paper)_95%,transparent)]">
            Quale gesto quotidiano legato al cibo — comprare, cucinare, conservare, rifiutare — ti sembra oggi il più
            chiaro indice di chi sei, senza doverlo dichiarare a parole?
          </span>
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
