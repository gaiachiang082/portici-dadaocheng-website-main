import { Instagram, Mail } from "lucide-react";

const HERO_IMAGE =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/JlGNTUqhPVkwUfEj.png";
const LOGO_TILE =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YOOdRRgvjAwtBHHT.png";

export default function Contatti() {
  return (
    <main className="bg-[oklch(96.5%_0.006_85)]">
      {/* Hero with image background and centered card */}
      <section className="relative pt-32 pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Dadaocheng"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0% 0 0 / 0.55) 0%, oklch(27.5% 0 0 / 0.8) 45%, oklch(27.5% 0 0 / 0.9) 70%, oklch(27.5% 0 0 / 1) 100%)",
            }}
          />
        </div>
        <div className="relative container max-w-4xl">
          <div className="mx-auto bg-[oklch(96.5%_0.006_85)]/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6">
            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Contatti
            </p>
            <h1
              className="font-medium text-gray-900"
              style={{
                fontFamily: "'Spectral', Georgia, serif",
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              La porta è aperta.
              <br />
              <em className="text-[#A67C52] not-italic">Scriveteci.</em>
            </h1>
            <p
              className="text-[18px] text-gray-500 leading-[1.8] max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Per collaborazioni, press, domande sui workshop o semplicemente per dirci
              cosa pensate. Rispondiamo a tutti, di solito entro 48 ore.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10">
              <h2
                className="font-medium text-gray-900 mb-8"
                style={{
                  fontFamily: "'Spectral', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 500,
                }}
              >
                Mandaci un Messaggio
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-gray-500 mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Il tuo nome"
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:outline-none focus:border-[#A67C52] transition-colors"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-gray-500 mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="La tua email"
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:outline-none focus:border-[#A67C52] transition-colors"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-gray-500 mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Oggetto
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-[#A67C52] transition-colors appearance-none"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    <option value="">Seleziona un argomento</option>
                    <option value="workshop">Informazioni sui Workshop</option>
                    <option value="collaboration">Proposta di Collaborazione</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Altro</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-gray-500 mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Messaggio
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Raccontaci cosa hai in mente..."
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:outline-none focus:border-[#A67C52] transition-colors resize-none"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 text-[16px] font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity self-start"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Invia Messaggio
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10">
                <h2
                  className="font-medium text-gray-900 mb-6"
                  style={{
                    fontFamily: "'Spectral', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 500,
                  }}
                >
                  Trovaci Anche Qui
                </h2>
                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:ciao@portici-dadaocheng.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[oklch(89.5%_0.025_80)] flex items-center justify-center shrink-0 group-hover:bg-[#a2482b] transition-colors">
                      <Mail size={16} className="text-[#A67C52] group-hover:text-[oklch(96.5%_0.006_85)] transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-gray-500 mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Email
                      </p>
                      <p
                        className="text-sm text-gray-900 group-hover:text-[#a2482b] transition-colors"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        ciao@portici-dadaocheng.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/portici.dadaocheng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[oklch(89.5%_0.025_80)] flex items-center justify-center shrink-0 group-hover:bg-[#a2482b] transition-colors">
                      <Instagram size={16} className="text-[#A67C52] group-hover:text-[oklch(96.5%_0.006_85)] transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-gray-500 mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Instagram
                      </p>
                      <p
                        className="text-sm text-gray-900 group-hover:text-[#a2482b] transition-colors"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        @portici.dadaocheng
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-[oklch(89.5%_0.025_80)] p-8 rounded-2xl border border-gray-100 shadow-sm">
                <p
                  className="font-medium text-[oklch(27.5%_0.000_0)] italic leading-[1.55] mb-3"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.375rem" }}
                >
                  "Questo è solo l'inizio del nostro dialogo."
                </p>
                <p
                  className="text-sm text-[#A67C52] tracking-widest"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  這只是對話的開始。
                </p>
                <p
                  className="text-xs text-[oklch(60%_0.005_60)] mt-3"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  — Sara Chen & Angie, Co-fondatrici
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dadaocheng strip with logo checkerboard */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Trovarci
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-700" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span>Workshop & Spazio</span>
                <span>Bologna, Italia · su prenotazione</span>
              </div>
            </div>
            <div className="space-y-2 text-right md:text-right">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Contatto Diretto
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-800 items-start md:items-end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span>ciao@portici-dadaocheng.com</span>
                <span>@portici.dadaocheng</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-10">
            <div
              className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold tracking-[0.18em] uppercase text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DADAOCHENG
            </div>

            <div className="mt-6 overflow-hidden border border-gray-200">
              <div className="grid grid-flow-col auto-cols-[32px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center aspect-square ${
                      i % 2 === 0 ? "bg-[oklch(27.5%_0.000_0)]" : "bg-[oklch(96.5%_0.006_85)]"
                    }`}
                  >
                    <img
                      src={LOGO_TILE}
                      alt="Portici DaDaocheng logo"
                      className="w-5 h-5 object-contain"
                      style={{ filter: i % 2 === 0 ? "brightness(0) invert(1)" : "brightness(0) saturate(1.2)" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-4 text-[11px] tracking-[0.22em] uppercase text-gray-400"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              © {new Date().getFullYear()} Portici DaDaocheng · Tutti i diritti riservati
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
