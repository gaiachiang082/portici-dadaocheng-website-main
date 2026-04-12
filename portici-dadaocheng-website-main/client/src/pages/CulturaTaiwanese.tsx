import { PageHeader } from "@/components/PageHeader";
import { FeaturedArticlesPlaceholder } from "@/pages/hub/FeaturedArticlesPlaceholder";

export default function CulturaTaiwanese() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Hub tematico"
        meta="Portici · Cultura taiwanese"
        title="Cultura taiwanese"
      >
        <p>
          Punto di raccolta per rituali, lingue, arti e quotidianità che definiscono l&apos;isola:
          un percorso per chi vuole leggere la Taiwan oltre gli stereotipi.
        </p>
        <p className="text-page-header-dim mt-4">
          Autorità tematica in costruzione — qui troverai guide, schede e articoli collegati.
        </p>
      </PageHeader>
      <FeaturedArticlesPlaceholder />
    </main>
  );
}
