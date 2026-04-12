import { PageHeader } from "@/components/PageHeader";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function TaiwanItalia() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Taiwan e Italia"
        title="Taiwan e Italia"
      >
        <p>
          Ponti culturali, traduzioni di sapere e piccole storie che attraversano due mondi
          gastronomici e linguistici apparentemente lontani.
        </p>
        <p className="text-page-header-dim mt-4">
          Selezioneremo qui materiali utili a chi studia o racconta questi incroci.
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
