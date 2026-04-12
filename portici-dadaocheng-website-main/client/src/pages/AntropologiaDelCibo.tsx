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
          Ingredienti, tavola e memoria: un angolo per esplorare cosa significa mangiare in contesti
          diversi, tra Taiwan, Italia e incontri possibili.
        </p>
        <p className="text-page-header-dim mt-4">
          Glossario, schede e letture approfondite saranno collegate da questo hub.
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
