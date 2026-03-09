import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

function FloatingLantern({ left, top, delay }: { left: string; top: string; delay: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left, top, animation: `lantern-float 4s ease-in-out ${delay}s infinite` }}
    >
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="drop-shadow-[0_0_6px_rgba(245,222,179,0.4)]">
        <ellipse cx="10" cy="6" rx="8" ry="5" fill="rgba(245,222,179,0.85)" stroke="rgba(205,133,63,0.5)" strokeWidth="0.5" />
        <path d="M10 10 L10 22 M8 13 L12 13" stroke="rgba(205,133,63,0.4)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function ChiSiamo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const titleLines = [
    "Da DadaoCheng a Bologna:",
    "Un Viaggio attraverso i Portici del Mondo",
  ];

  return (
    <main>
      {/* Hero — glowing moon, floating lanterns, staggered title */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)] relative overflow-hidden">
        {/* Glowing moon */}
        <div
          className="absolute top-12 right-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none"
          style={{ animation: "moon-glow 3s ease-in-out infinite" }}
        >
          <div className="w-full h-full rounded-full bg-[oklch(92%_0.02_85)] shadow-[0_0_60px_rgba(245,222,179,0.5)]" />
        </div>

        {/* Floating lanterns */}
        {[
          { left: "8%", top: "25%", delay: 0 },
          { left: "85%", top: "35%", delay: 0.8 },
          { left: "15%", top: "60%", delay: 1.2 },
          { left: "78%", top: "55%", delay: 0.4 },
          { left: "92%", top: "75%", delay: 1.6 },
          { left: "5%", top: "80%", delay: 1 },
        ].map((l, i) => (
          <FloatingLantern key={i} left={l.left} top={l.top} delay={l.delay} />
        ))}

        <div className="container max-w-3xl relative z-10">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms",
            }}
          >
            Chi Siamo
          </p>
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-8 overflow-hidden"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            {titleLines.map((line, i) => (
              <span
                key={i}
                className="block"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.7s ease ${200 + i * 150}ms, transform 0.7s ease ${200 + i * 150}ms`,
                  color: i === 1 ? "var(--primary)" : "oklch(96.5%_0.006_85)",
                  fontStyle: i === 1 ? "italic" : "normal",
                }}
              >
                {line}
              </span>
            ))}
          </h1>
          <div
            className="w-10 h-0.5 bg-[#A67C52]"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 600ms",
            }}
          />
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
