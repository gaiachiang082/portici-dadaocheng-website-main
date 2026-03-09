import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ChiSiamo() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Chi Siamo
          </p>
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-8"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Da DadaoCheng a Bologna:
            <br />
            <em className="text-[#A67C52] not-italic">Un Viaggio attraverso i Portici del Mondo</em>
          </h1>
          <div className="w-10 h-0.5 bg-[#A67C52]" />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-7"
                style={{
                  fontFamily: "'Spectral', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 500,
                }}
              >
                Il Nostro Brand Nasce
                <br />dall'Incontro di Due Luoghi
              </h2>
              <div className="w-10 h-0.5 bg-[#A67C52] mb-6" />
              <div className="space-y-4">
                <p
                  className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.8]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  <strong className="text-[oklch(27.5%_0.000_0)] font-medium">大稻埕 (DadaoCheng)</strong> è un
                  quartiere storico di Taipei dove dal XIX secolo commercianti da Cina, Giappone e
                  Occidente si incontravano per scambiare tè, tessuti e idee. Un luogo dove antico
                  e nuovo convivono, dove la tradizione e la modernità non sono in conflitto ma in
                  conversazione.
                </p>
                <p
                  className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.8]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  <strong className="text-[oklch(27.5%_0.000_0)] font-medium">Bologna</strong> — città di
                  portici, la più lunga rete di passaggi coperti al mondo (38 km), dichiarata
                  patrimonio UNESCO. Una città che, come DadaoCheng, sa come accogliere lo straniero
                  senza perdere la propria identità.
                </p>
                <p
                  className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.8]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  Il nostro brand nasce dall'incontro di questi due luoghi. I portici sono spazi
                  intermedi — né dentro né fuori. Sono la metafora perfetta per ciò che vogliamo
                  essere: uno spazio dove culture diverse possono incontrarsi e scoprire che fanno
                  domande simili.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "Missione",
                  text: "Creare esperienze culturali che rivelano come culture diverse dell'Asia orientale rispondono alle stesse domande umane in modi sorprendentemente diversi.",
                },
                {
                  label: "Visione",
                  text: "Un mondo dove 'diverso' non significa 'estraneo', ma 'affascinante'. Dove Bologna diventa un modello di come una città europea può essere allo stesso tempo profondamente locale e genuinamente cosmopolita.",
                },
                {
                  label: "Metodo",
                  text: "同中求異 — Trovare le differenze nell'unità. Partiamo sempre dalla stessa domanda: come rispondono culture diverse allo stesso bisogno umano?",
                },
              ].map(({ label, text }) => (
                <div key={label} className="border-l-2 border-[#A67C52] pl-6">
                  <p
                    className="text-xs font-semibold tracking-widest uppercase text-[#A67C52] mb-2"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[oklch(40%_0.005_60)] leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[oklch(89.5%_0.025_80)]">
        <div className="container">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A67C52] mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              I Nostri Valori
            </p>
              <h2
              className="font-medium text-[oklch(27.5%_0.000_0)]"
              style={{
                fontFamily: "'Spectral', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Cinque Principi, Una Direzione
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { it: "Curiosità", zh: "好奇心", desc: "Non accettiamo 'così è sempre stato' come risposta finale." },
              { it: "Rispetto", zh: "尊重", desc: "Esploriamo culture diverse come studenti rispettosi, non come turisti." },
              { it: "Autenticità", zh: "真實性", desc: "Preferiamo una tazza scheggiata fatta a mano a una perfetta prodotta in massa." },
              { it: "Trasformazione", zh: "轉化", desc: "Non ci interessa solo informare, ma trasformare." },
              { it: "Inclusività", zh: "包容", desc: "Un progetto per chiunque abbia curiosità, indipendentemente dal background." },
            ].map(({ it, zh, desc }) => (
              <div key={it} className="bg-[oklch(96.5%_0.006_85)] p-6 rounded-xl border border-gray-100 shadow-sm">
                <p
                  className="text-2xl text-[#A67C52] mb-1"
                  style={{ fontFamily: "'Spectral', Georgia, serif" }}
                >
                  {zh}
                </p>
                <p
                  className="text-sm font-semibold text-[oklch(27.5%_0.000_0)] mb-3"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {it}
                </p>
                <p
                  className="text-xs text-[oklch(50%_0.005_60)] leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[oklch(96.5%_0.006_85)] text-center">
        <div className="container">
          <h2
            className="font-medium text-[oklch(27.5%_0.000_0)] mb-6"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "2rem",
              fontWeight: 500,
            }}
          >
            Attraversa il Portale
          </h2>
          {/* §7: Explorer tone — "Se questo ti incuriosisce..." not "ISCRIVITI ORA!" */}
          <p
            className="text-[18px] text-[oklch(50%_0.005_60)] leading-[1.8] mb-10 max-w-[480px] mx-auto"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Se questo ti incuriosisce, il prossimo workshop esplora questi temi più in
            profondità. I dettagli sono qui.
          </p>
          <Link
            href="/workshop"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-[#a2482b] text-[#F5F3EE] rounded-xl hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Scopri i Workshop
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Due Città, Un'Idea ── */}
      <section className="py-0 bg-[oklch(27.5%_0.000_0)]">
        <div className="container" style={{paddingTop: '32px', paddingBottom: '0px'}}>
          <div className="text-center mb-14">
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Due Città, Un'Idea</p>
            <h2 className="font-medium text-[oklch(96.5%_0.006_85)]"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
              I portici come linguaggio universale
            </h2>
            <div className="w-10 h-0.5 bg-[#A67C52] mt-5 mx-auto" />
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          {[
            {
              name: "大稻埕", subtitle: "Taipei, Taiwan",
              src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/noBAAdsQpHVXgrUG.png",
              alt: "大稻埕亭仔腳 紅磚拱廊",
              description: "Il quartiere storico di Taipei dove i portici in mattoni rossi ospitano ancora profumerie di erbe, negozi di tè e botteghe artigiane. La memoria viva di un'Asia che non vuole dimenticare.",
              tag: "亭仔腳",
            },
            {
              name: "Bologna", subtitle: "Emilia-Romagna, Italia",
              src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/Bv0aTKJqGJxOsxSi.png",
              alt: "Bologna Portici affrescati",
              description: "La città dei portici — 38 km di gallerie coperte che dal Medioevo proteggono i bolognesi dalla pioggia e dal sole. Un patrimonio UNESCO che è anche filosofia di vita: camminare insieme, al riparo.",
              tag: "Portici",
            },
          ].map((city, i) => (
            <div key={city.name} className="group relative overflow-hidden" style={{ minHeight: "520px" }}>
              <img src={city.src} alt={city.alt}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, oklch(0% 0 0 / 0.85) 0%, oklch(0% 0 0 / 0.3) 50%, transparent 100%)" }} />
              {i === 0 && <div className="absolute top-0 bottom-0 right-0 w-px bg-[oklch(55.0%_0.075_55/0.5)]" />}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="inline-block text-[11px] tracking-[0.24em] uppercase text-[#A67C52] bg-[oklch(0%_0_0/0.4)] px-3 py-1 mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.tag}</span>
                <h3 className="text-[oklch(96.5%_0.006_85)] mb-1"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 500 }}>
                  {city.name}
                </h3>
                <p className="text-[13px] tracking-[0.14em] text-[#A67C52] mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.subtitle}</p>
                <p className="text-[16px] text-[oklch(82%_0.005_85)] leading-[1.75] max-w-[400px]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {city.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
