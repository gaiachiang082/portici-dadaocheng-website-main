import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, Clock, Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─────────────────────────────────────────────────────────────────
   CDN IMAGE REGISTRY  (calligraphy & ink workshop photos)
   ───────────────────────────────────────────────────────────────── */
const PHOTOS = [
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png",
    alt: "多人圍桌寫春聯",
    label: "書法 · Calligrafia",
    caption: "Gruppo intorno al tavolo — scrivere è un atto collettivo",
    category: "書法",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/dFdjgXVTblMasniP.png",
    alt: "特寫水墨筆",
    label: "筆 · Il Pennello",
    caption: "Il pennello come strumento di meditazione e presenza",
    category: "水墨",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/EizOfazFNGcbaYxm.png",
    alt: "歐洲男子寫水墨",
    label: "水墨 · Inchiostro",
    caption: "Il gesto che non mente — ogni pennellata è definitiva",
    category: "水墨",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/CWqYQNYqpYltaUBn.png",
    alt: "兩女生畫花",
    label: "花鳥 · Fiori e Uccelli",
    caption: "La natura come vocabolario — fiori di susino e bambù",
    category: "花鳥",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/pmoSxbLCOlhTAXWL.png",
    alt: "多人課堂書法",
    label: "課堂 · Aula",
    caption: "Imparare è un atto sociale — insieme si cresce",
    category: "書法",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/PAfFLmeFyGztnQqK.png",
    alt: "手繪梅花水墨",
    label: "梅 · Susino",
    caption: "Bellezza nella semplicità — il fiore di susino come metafora",
    category: "水墨",
  },
];

const COURSES = [
  {
    id: "intro",
    title: "Introduzione alla Calligrafia",
    titleZh: "書法入門",
    duration: "3 ore",
    participants: "Max 10 persone",
    schedule: "Ogni sabato, 10:00–13:00",
    level: "Principianti",
    description: "Un primo incontro con il pennello cinese. Imparerai i quattro tesori dello studio (carta, pennello, inchiostro, pietra per inchiostro) e i gesti fondamentali della calligrafia standard (楷書). Nessuna esperienza richiesta.",
    includes: ["Materiali inclusi", "Tè durante la pausa", "Carattere personalizzato da portare a casa"],
    accent: "oklch(55.0% 0.075 55)",
  },
  {
    id: "ink",
    title: "Pittura ad Inchiostro",
    titleZh: "水墨畫",
    duration: "4 ore",
    participants: "Max 8 persone",
    schedule: "Ogni domenica, 14:00–18:00",
    level: "Tutti i livelli",
    description: "La pittura a inchiostro (水墨畫) non ammette correzioni. Ogni pennellata è definitiva — come le parole dette con sincerità. Dipingerai bambù, fiori di susino e paesaggi essenziali, imparando a fidarti del tuo istinto.",
    includes: ["Carta di riso e inchiostro inclusi", "Tè verde durante la sessione", "Opera finita da portare a casa"],
    accent: "oklch(57.5% 0.045 165)",
  },
  {
    id: "advanced",
    title: "Calligrafia Avanzata — Corsivo",
    titleZh: "草書進階",
    duration: "4 ore",
    participants: "Max 6 persone",
    schedule: "Su prenotazione",
    level: "Intermedio / Avanzato",
    description: "Il corsivo cinese (草書) è la forma più libera e espressiva della calligrafia. I caratteri si fondono, il gesto accelera, l'energia fluisce. Per chi ha già familiarità con il pennello e vuole esplorare l'espressione personale.",
    includes: ["Materiali professionali inclusi", "Analisi di opere classiche", "Sessione di feedback individuale"],
    accent: "oklch(70.0% 0.025 220)",
  },
];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────────────────────────── */
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: typeof PHOTOS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const photo = photos[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "oklch(0% 0 0 / 0.92)" }}
      onClick={onClose}>
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt}
          className="w-full max-h-[75vh] object-contain" />
        <div className="mt-4 text-center">
          <p className="text-[13px] tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{photo.label}</p>
          <p className="mt-2 text-[oklch(80%_0.005_85)]"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1rem", fontStyle: "italic" }}>
            {photo.caption}
          </p>
          <p className="mt-3 text-[oklch(55%_0.005_85)] text-sm"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[oklch(70%_0.005_85)] hover:text-white transition-colors">
        <X size={22} />
      </button>

      {/* Prev */}
      <button onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[oklch(50%_0.005_85/0.4)] text-[oklch(80%_0.005_85)] hover:border-[oklch(55.0%_0.075_55)] hover:text-[oklch(55.0%_0.075_55)] transition-all bg-[oklch(0%_0_0/0.3)]">
        <ArrowLeft size={16} />
      </button>

      {/* Next */}
      <button onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[oklch(50%_0.005_85/0.4)] text-[oklch(80%_0.005_85)] hover:border-[oklch(55.0%_0.075_55)] hover:text-[oklch(55.0%_0.075_55)] transition-all bg-[oklch(0%_0_0/0.3)]">
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function CalligraphyWorkshop() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Tutti");

  const filters = ["Tutti", "書法", "水墨", "花鳥"];
  const filtered = activeFilter === "Tutti" ? PHOTOS : PHOTOS.filter(p => p.category === activeFilter);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <main className="bg-[oklch(96.5%_0.006_85)] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[oklch(10%_0_0)]" style={{ minHeight: "52vh" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png"
          alt="Workshop di calligrafia"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, oklch(0% 0 0 / 0.65) 0%, oklch(0% 0 0 / 0.8) 100%)" }} />

        {/* Back link */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.14em] uppercase text-[oklch(70%_0.005_85)] hover:text-[oklch(55.0%_0.075_55)] transition-colors"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <ArrowLeft size={14} /> Home
          </Link>
        </div>

        <div className="relative z-10 container flex flex-col justify-end pb-16 pt-32">
          <p className="text-[13px] tracking-[0.28em] uppercase text-[oklch(55.0%_0.075_55)] mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Workshop</p>
          <h1 className="text-[oklch(96.5%_0.006_85)] mb-3"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 500, lineHeight: 1.1 }}>
            Calligrafia & Pittura ad Inchiostro
          </h1>
          <p className="text-[oklch(55.0%_0.075_55)] text-xl"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontStyle: "italic" }}>
            書法水墨
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-20 bg-[oklch(98.5%_0.003_85)]">
        <div className="container max-w-3xl">
          <Reveal>
            <p className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.9]"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              La calligrafia cinese non è scrittura decorativa — è una disciplina del corpo e della mente. Ogni tratto richiede presenza totale: la respirazione, la postura, la pressione del pennello. Attraverso questi workshop scoprirai come un gesto millenario possa diventare una pratica contemporanea di consapevolezza.
            </p>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-8" />
          </Reveal>
        </div>
      </section>

      {/* ── Course Cards ── */}
      <section className="py-20 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          <Reveal className="mb-14">
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Corsi Disponibili</p>
            <h2 className="text-[oklch(27.5%_0.000_0)]"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.8rem", fontWeight: 500 }}>
              Scegli la tua esperienza
            </h2>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-5" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <Reveal key={course.id} delay={i * 100}>
                <div className="bg-[oklch(98.5%_0.003_85)] overflow-hidden shadow-[0_2px_16px_oklch(0%_0_0/0.06)] flex flex-col h-full">
                  <div className="h-1" style={{ backgroundColor: course.accent }} />
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-2"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", color: course.accent }}>
                      {course.level}
                    </span>
                    <h3 className="text-[oklch(27.5%_0.000_0)] mb-1"
                      style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.2rem", fontWeight: 500, lineHeight: 1.3 }}>
                      {course.title}
                    </h3>
                    <p className="text-[oklch(55.0%_0.075_55)] mb-5 text-sm"
                      style={{ fontFamily: "'Spectral', Georgia, serif", fontStyle: "italic" }}>
                      {course.titleZh}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6 text-[13px] text-[oklch(50%_0.005_60)]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {course.duration}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} /> {course.participants}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} /> {course.schedule}</span>
                    </div>

                    <p className="text-[16px] text-[oklch(45%_0.005_60)] leading-[1.8] mb-6 flex-1"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                      {course.description}
                    </p>

                    <ul className="mb-8 space-y-2">
                      {course.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[14px] text-[oklch(50%_0.005_60)]"
                          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                          <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: course.accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link href="/eventi?interesse=calligraphy-ink"
                      className="inline-flex items-center gap-2 text-[14px] font-semibold hover:gap-3 transition-all duration-300 mt-auto"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", color: course.accent }}>
                      Mi interessa <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ── */}
      <section className="py-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container">
          <Reveal className="mb-10">
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Galleria</p>
            <h2 className="text-[oklch(96.5%_0.006_85)]"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.8rem", fontWeight: 500 }}>
              Momenti dai Workshop
            </h2>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-5" />
          </Reveal>

          {/* Filter tabs */}
          <Reveal className="flex gap-3 mb-10 flex-wrap">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="px-5 py-2 text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: activeFilter === f ? "oklch(55.0% 0.075 55)" : "transparent",
                  color: activeFilter === f ? "oklch(96.5% 0.006 85)" : "oklch(65% 0.005 85)",
                  border: `1px solid ${activeFilter === f ? "oklch(55.0% 0.075 55)" : "oklch(50% 0.005 85 / 0.3)"}`,
                }}>
                {f}
              </button>
            ))}
          </Reveal>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 80}>
                <button
                  onClick={() => openLightbox(i)}
                  className="group relative overflow-hidden w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(55.0%_0.075_55)]"
                  style={{ aspectRatio: i % 3 === 1 ? "3/4" : "4/3" }}>
                  <img src={photo.src} alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "oklch(0% 0 0 / 0.45)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <p className="text-[11px] tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-1"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{photo.label}</p>
                    <p className="text-[oklch(90%_0.005_85)] text-sm leading-snug"
                      style={{ fontFamily: "'Spectral', Georgia, serif", fontStyle: "italic" }}>
                      {photo.caption}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[oklch(89.5%_0.025_80)]">
        <div className="container text-center max-w-xl">
          <Reveal>
            <h2 className="text-[oklch(27.5%_0.000_0)] mb-5"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.8rem", fontWeight: 500 }}>
              Pronto a iniziare?
            </h2>
            <p className="text-[18px] text-[oklch(42%_0.005_60)] leading-[1.8] mb-10"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Le sessioni si aprono in base agli interessi raccolti. Lasciate un contatto sulla pagina Sessioni: vi
              scriviamo quando il calendario prende forma.
            </p>
            <Link href="/eventi?interesse=calligraphy-ink"
              className="inline-flex items-center gap-2 px-10 py-4 text-[16px] font-semibold bg-[oklch(55.0%_0.075_55)] text-[oklch(96.5%_0.006_85)] hover:opacity-85 hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Manifesta interesse <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </main>
  );
}
