import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const categories = ["Tutti", "Rituali", "Cibo", "Spazio", "Filosofia"];

const articles = [
  {
    id: 1,
    category: "Rituali",
    title: "Il Silenzio Condiviso: Perché i Giapponesi Non Abbracciano",
    excerpt: "Un'esplorazione di come culture diverse esprimono affetto, vicinanza e rispetto attraverso gesti che sembrano opposti ma nascondono la stessa radice.",
    readTime: "8 min",
    color: "oklch(57.5% 0.045 165)",
  },
  {
    id: 2,
    category: "Cibo",
    title: "Le Cinque Vite della Soia: Da Taipei a Tokyo a Seoul",
    excerpt: "Uno stesso ingrediente, cinque trasformazioni culturali. Come il tofu, il miso, il doenjang e il tempeh raccontano storie di civiltà.",
    readTime: "6 min",
    color: "#A67C52",
  },
  {
    id: 3,
    category: "Spazio",
    title: "Anatomia di una Casa da Tè: Kyoto vs. Taipei",
    excerpt: "Due spazi, due filosofie dell'ospitalità. Cosa ci insegna l'architettura del tè sulla differenza tra wabi-sabi e calore taiwanese.",
    readTime: "10 min",
    color: "oklch(70.0% 0.025 220)",
  },
  {
    id: 4,
    category: "Filosofia",
    title: "La Nostalgia ha un Sapore: in Cina è Dolce, in Corea è Piccante",
    excerpt: "Come culture diverse codificano il rimpianto, la memoria e il desiderio del passato attraverso il gusto. Un viaggio nell'emozione più universale.",
    readTime: "7 min",
    color: "#A67C52",
  },
  {
    id: 5,
    category: "Rituali",
    title: "Capodanno × 5: Sotto la Stessa Luna, Cinque Celebrazioni",
    excerpt: "Cina, Giappone, Corea, Taiwan, Hong Kong. Lo stesso momento astronomico, cinque filosofie della gioia. Cosa ci dice questo sulla natura del festeggiare?",
    readTime: "12 min",
    color: "oklch(57.5% 0.045 165)",
  },
  {
    id: 6,
    category: "Cibo",
    title: "Riso: Non Solo Riso. Una Grammatica Culturale",
    excerpt: "Il riso è la parola più comune dell'Asia orientale. Ma ogni cultura la pronuncia in modo diverso — e quella differenza racconta tutto.",
    readTime: "9 min",
    color: "#A67C52",
  },
];

export default function Articoli() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Articoli
          </p>
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Letture che cambiano
            <br />
            <em className="text-[#A67C52] not-italic">come vedi il mondo.</em>
          </h1>
          <p
            className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Ogni articolo segue il metodo 同中求異 — trovare le differenze nell'unità.
            Non informazioni, ma trasformazioni.
          </p>
          <div className="w-10 h-0.5 bg-[#A67C52] mt-8" />
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8 bg-[oklch(96.5%_0.006_85)] border-b border-[oklch(88%_0.010_80)]">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-sm transition-colors ${
                  cat === "Tutti"
                    ? "bg-[#a2482b] text-[#F5F3EE]"
                    : "bg-[oklch(89.5%_0.025_80)] text-[oklch(40%_0.005_60)] hover:bg-[#a2482b] hover:text-[#F5F3EE]"
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articoli/${article.id}`}
                className="group bg-white rounded-sm overflow-hidden shadow-[0_2px_12px_oklch(0%_0_0/0.06)] hover:shadow-[0_4px_24px_oklch(0%_0_0/0.10)] transition-shadow flex flex-col"
              >
                <div className="h-1.5" style={{ backgroundColor: article.color }} />
                <div className="p-7 flex flex-col flex-1">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-4"
                    style={{ fontFamily: 'var(--font-ui)', color: article.color }}
                  >
                    {article.category}
                  </span>
                  {/* §11: H3 — Inter 24px SemiBold (using 1.125rem for card context) */}
                  <h3
                    className="text-[oklch(27.5%_0.000_0)] mb-3 group-hover:text-[#A67C52] transition-colors"
                    style={{ fontFamily: 'var(--font-ui)', fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="text-[17px] text-[oklch(50%_0.005_60)] leading-[1.75] flex-1"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span
                      className="text-xs text-[oklch(60%_0.005_60)]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {article.readTime} di lettura
                    </span>
                    <ArrowRight size={14} className="text-[#A67C52] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
