import { PageHeader } from "@/components/PageHeader";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function Dadaocheng() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Dadaocheng"
        title="Dadaocheng"
      >
        <p>
          Il quartiere storico di Taipei come spazio narrativo: portici, mercati e stratificazioni
          urbanistiche da esplorare con calma.
        </p>
        <p className="text-page-header-dim mt-4">
          Da questo hub usciranno percorsi tematici e riferimenti al territorio.
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
