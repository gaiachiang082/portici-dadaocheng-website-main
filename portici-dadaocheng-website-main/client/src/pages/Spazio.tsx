import { Link } from "wouter";
import { ArrowRight, MapPin, Instagram } from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const GALLERY_SLIDES = [
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/noBAAdsQpHVXgrUG.png", label: "大稻埕", caption: "Dove la storia incontra il presente" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/WFoweFZbdbtPoFjX.png", label: "Bologna", caption: "I portici come soglie tra mondi" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/fJQLNNktTOZKWVkY.png", label: "廟宇", caption: "Il sacro come linguaggio universale" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/yHHrSUbnQhNbXYxP.png", label: "建築", caption: "Architettura che racconta storie" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png", label: "書法", caption: "Scrivere è pensare con il corpo" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/EizOfazFNGcbaYxm.png", label: "水墨", caption: "Il gesto che non mente" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/CWqYQNYqpYltaUBn.png", label: "花鳥", caption: "La natura come vocabolario" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/pmoSxbLCOlhTAXWL.png", label: "課堂", caption: "Imparare è un atto sociale" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/PAfFLmeFyGztnQqK.png", label: "梅", caption: "Bellezza nella semplicità" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/VmUsguHFlqXOZXyu.png", label: "茶", caption: "Tre filosofie, una tazza" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/FvnvFYxyZBtkoWGM.png", label: "茶道", caption: "Il rito trasforma l'ordinario" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YMRvdgKpLhmaPWyF.png", label: "餓子", caption: "Cultura che si mangia" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/tIhnZPQxlSeAhdvy.png", label: "茶器", caption: "Gli strumenti del rito quotidiano" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/QlYNHHXFFlKYYNOQ.png", label: "文化", caption: "Scoprire l'altro per scoprire se stessi" },
];

function SpazioCard({ sense, kanji, desc, delay }: { sense: string; kanji: string; desc: string; delay: number }) {
  const { ref, visible } = useScrollReveal(0.12);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative bg-muted p-8 text-center rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 overflow-hidden"
      style={{
        opacity: visible ? undefined : 0,
        transform: visible ? undefined : "scale(0.8) translateY(30px)",
        animation: visible ? `elastic-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards` : "none",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <p
        className="text-[2rem] mb-3 text-foreground relative z-10"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {kanji}
      </p>
      <p
        className="text-[15px] font-semibold text-foreground mb-2 relative z-10"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        {sense}
      </p>
      <p
        className="text-[15px] text-muted-foreground leading-[1.7] relative z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function Spazio() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container max-w-3xl">
          <div className="relative px-8 py-10 md:px-10 md:py-12 bg-card rounded-[2rem] rounded-b-[1.25rem] border border-border shadow-sm">
            <div className="w-10 h-0.5 bg-secondary mb-6" />

            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-muted-foreground mb-6"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Spazio
            </p>
            <h1
              className="mb-8 text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              Un&apos;installazione esperienziale.
              <br />
              <span className="text-[var(--riso-gold)] not-italic">
                Non un negozio.
              </span>
            </h1>
            <p
              className="text-[18px] leading-[1.75] text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Il nostro pop-up store è progettato per attivare tutti e cinque i
              sensi in 15–30 minuti. Ogni elemento è scelto per creare un
              momento di risonanza culturale.
            </p>
          </div>
        </div>
      </section>

      {/* Five senses — elastic entry, hover gradient overlay, rotating decorative ring */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)] relative overflow-hidden">
        {/* Rotating decorative ring in background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-[0.07]"
          style={{ animation: "spin-slow 45s linear infinite" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-foreground/10">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 12" opacity={0.9} />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" transform="rotate(-30 50 50)" opacity={0.55} />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="mb-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Il Concept
            </p>
            <h2
              className="font-medium text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Attraversare il Portale
            </h2>
            <div className="w-10 h-0.5 bg-secondary mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { sense: "Vista", kanji: "視", desc: "40% spazio vuoto. Colori Moon White dominanti. Le copertine come opere d'arte." },
              { sense: "Udito", kanji: "聽", desc: "Playlist curata: Ryuichi Sakamoto, Lim Giong. Volume appena percettibile." },
              { sense: "Olfatto", kanji: "嗅", desc: "Hinoki (cipresso giapponese) e tè verde. Percezione graduale, non immediata." },
              { sense: "Tatto", kanji: "觸", desc: "Una scatola di materiali da toccare: carta, legno, lino, ceramica." },
              { sense: "Gusto", kanji: "味", desc: "All'entrata: 30ml di oolong freddo taiwanese in tazze ceramiche uniche." },
            ].map(({ sense, kanji, desc }, i) => (
              <SpazioCard key={sense} sense={sense} kanji={kanji} desc={desc} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Dove Siamo
            </p>
            <h2
              className="font-medium text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Bologna & Pop-up in Europa
            </h2>
          </div>

            <div className="space-y-6">
            <div className="bg-card p-8 rounded-2xl border border-border transition-colors duration-300 hover:border-secondary/35">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-[var(--riso-gold)] mt-0.5 shrink-0" />
                <div>
                  <p
                    className="font-semibold text-foreground mb-1"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    Bologna — Sede Principale
                  </p>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Il nostro spazio fisso a Bologna. Qui si tengono i workshop regolari
                    e lo spazio è aperto durante gli eventi. Indirizzo esatto comunicato
                    ai partecipanti confermati.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border transition-colors duration-300 hover:border-secondary/35">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-[var(--riso-gold)] mt-0.5 shrink-0" />
                <div>
                  <p
                    className="font-semibold text-foreground mb-1"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    Pop-up — Milano, Berlino, Parigi
                  </p>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Periodicamente portiamo lo spazio in altre città europee. Seguici su
                    Instagram per non perdere le date dei prossimi pop-up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://instagram.com/portici.dadaocheng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold border border-primary text-primary rounded-[12px] hover:bg-primary hover:text-primary-foreground transition-colors"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              <Instagram size={15} />
              Seguici per gli aggiornamenti
            </a>
          </div>
        </div>
      </section>

      {/* Galleria Fotografica */}
      <section className="relative bg-[oklch(10%_0_0)]">
        <div className="absolute top-5 left-6 md:left-12 z-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[oklch(70%_0.005_85/0.6)]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Galleria Fotografica</p>
        </div>
        <PhotoCarousel slides={GALLERY_SLIDES} height="clamp(400px, 58vh, 660px)" interval={4200} />
      </section>

      {/* Benvenuto quote */}
      <section className="py-20 bg-[oklch(27.5%_0.000_0)] text-center">
        <div className="container max-w-xl">
          <p
            className="text-2xl font-medium text-[oklch(96.5%_0.006_85)] mb-3 italic"
            style={{ fontFamily: "'Spectral', Georgia, serif" }}
          >
            "Benvenuti nel nostro spazio di risonanza culturale."
          </p>
          <p
            className="text-sm text-secondary tracking-widest"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            歡迎來到我們的文化共鳴空間
          </p>
        </div>
      </section>
    </main>
  );
}
