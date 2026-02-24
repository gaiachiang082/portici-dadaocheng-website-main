import { Link } from "wouter";
import { ArrowRight, MapPin, Instagram } from "lucide-react";
import PhotoCarousel from "@/components/PhotoCarousel";

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

export default function Spazio() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Spazio
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
            Un'installazione esperienziale.
            <br />
            <em className="text-[#A67C52] not-italic">Non un negozio.</em>
          </h1>
          <p
            className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Il nostro pop-up store è progettato per attivare tutti e cinque i sensi in
            15–30 minuti. Ogni elemento è scelto per creare un momento di risonanza culturale.
          </p>
          <div className="w-10 h-0.5 bg-[#A67C52] mt-8" />
        </div>
      </section>

      {/* Five senses */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          <div className="mb-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A67C52] mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Il Concept
            </p>
            <h2
              className="font-display font-medium text-[oklch(27.5%_0.000_0)]"
              style={{ fontFamily: "'Spectral', Georgia, serif" }}
            >
              Attraversare il Portale
            </h2>
            <div className="w-10 h-0.5 bg-[#A67C52] mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { sense: "Vista", kanji: "視", desc: "40% spazio vuoto. Colori Moon White dominanti. Le copertine come opere d'arte." },
              { sense: "Udito", kanji: "聽", desc: "Playlist curata: Ryuichi Sakamoto, Lim Giong. Volume appena percettibile." },
              { sense: "Olfatto", kanji: "嗅", desc: "Hinoki (cipresso giapponese) e tè verde. Percezione graduale, non immediata." },
              { sense: "Tatto", kanji: "觸", desc: "Una scatola di materiali da toccare: carta, legno, lino, ceramica." },
              { sense: "Gusto", kanji: "味", desc: "All'entrata: 30ml di oolong freddo taiwanese in tazze ceramiche uniche." },
            ].map(({ sense, kanji, desc }) => (
              <div key={sense} className="bg-[oklch(89.5%_0.025_80)] p-6 text-center">
                {/* §9: No emoji — use CJK characters as visual elements */}
                <p
                  className="text-[2rem] mb-3 text-[#A67C52]"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontWeight: 500 }}
                >
                  {kanji}
                </p>
                <p
                  className="text-[15px] font-semibold text-[oklch(27.5%_0.000_0)] mb-2"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {sense}
                </p>
                <p
                  className="text-[15px] text-[oklch(50%_0.005_60)] leading-[1.7]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-[oklch(89.5%_0.025_80)]">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A67C52] mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Dove Siamo
            </p>
            <h2
              className="font-medium text-[oklch(27.5%_0.000_0)]"
              style={{
                fontFamily: "'Spectral', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Bologna & Pop-up in Europa
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[oklch(96.5%_0.006_85)] p-8 rounded-sm">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-[#A67C52] mt-0.5 shrink-0" />
                <div>
                  <p
                    className="font-semibold text-[oklch(27.5%_0.000_0)] mb-1"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Bologna — Sede Principale
                  </p>
                  <p
                    className="text-sm text-[oklch(50%_0.005_60)] leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    Il nostro spazio fisso a Bologna. Qui si tengono i workshop regolari
                    e lo spazio è aperto durante gli eventi. Indirizzo esatto comunicato
                    ai partecipanti confermati.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[oklch(96.5%_0.006_85)] p-8 rounded-sm">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-[#A67C52] mt-0.5 shrink-0" />
                <div>
                  <p
                    className="font-semibold text-[oklch(27.5%_0.000_0)] mb-1"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Pop-up — Milano, Berlino, Parigi
                  </p>
                  <p
                    className="text-sm text-[oklch(50%_0.005_60)] leading-relaxed"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
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
              className="inline-flex items-center gap-2 px-6 py-3 text-[16px] font-semibold border border-[#a2482b] text-[#a2482b] hover:bg-[#a2482b] hover:text-[#F5F3EE] transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
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
            className="text-sm text-[#A67C52] tracking-widest"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            歡迎來到我們的文化共鳴空間
          </p>
        </div>
      </section>
    </main>
  );
}
