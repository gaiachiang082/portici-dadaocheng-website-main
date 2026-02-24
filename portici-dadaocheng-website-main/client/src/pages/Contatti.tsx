import { Instagram, Mail } from "lucide-react";

export default function Contatti() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Contatti
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
            La porta è aperta.
            <br />
            <em className="text-[#A67C52] not-italic">Scriveteci.</em>
          </h1>
          <p
            className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Per collaborazioni, press, domande sui workshop o semplicemente per dirci
            cosa pensate. Rispondiamo a tutti, di solito entro 48 ore.
          </p>
          <div className="w-10 h-0.5 bg-[#A67C52] mt-8" />
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-8"
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
                      className="block text-xs font-semibold text-[oklch(40%_0.005_60)] mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Il tuo nome"
                      className="w-full px-4 py-3 text-sm bg-white border border-[oklch(88%_0.010_80)] text-[oklch(27.5%_0.000_0)] placeholder:text-[oklch(70%_0.005_60)] rounded-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[oklch(40%_0.005_60)] mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="La tua email"
                      className="w-full px-4 py-3 text-sm bg-white border border-[oklch(88%_0.010_80)] text-[oklch(27.5%_0.000_0)] placeholder:text-[oklch(70%_0.005_60)] rounded-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-[oklch(40%_0.005_60)] mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Oggetto
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm bg-white border border-[oklch(88%_0.010_80)] text-[oklch(27.5%_0.000_0)] rounded-sm focus:outline-none focus:border-[#A67C52] transition-colors appearance-none"
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
                    className="block text-xs font-semibold text-[oklch(40%_0.005_60)] mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Messaggio
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Raccontaci cosa hai in mente..."
                    className="w-full px-4 py-3 text-sm bg-white border border-[oklch(88%_0.010_80)] text-[oklch(27.5%_0.000_0)] placeholder:text-[oklch(70%_0.005_60)] rounded-sm focus:outline-none focus:border-[#A67C52] transition-colors resize-none"
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
              <div>
                <h2
                  className="font-medium text-[oklch(27.5%_0.000_0)] mb-6"
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
                    <div className="w-10 h-10 rounded-sm bg-[oklch(89.5%_0.025_80)] flex items-center justify-center shrink-0 group-hover:bg-[#a2482b] transition-colors">
                      <Mail size={16} className="text-[#A67C52] group-hover:text-[oklch(96.5%_0.006_85)] transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-[oklch(60%_0.005_60)] mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Email
                      </p>
                      <p
                        className="text-sm text-[oklch(27.5%_0.000_0)] group-hover:text-[#a2482b] transition-colors"
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
                    <div className="w-10 h-10 rounded-sm bg-[oklch(89.5%_0.025_80)] flex items-center justify-center shrink-0 group-hover:bg-[#a2482b] transition-colors">
                      <Instagram size={16} className="text-[#A67C52] group-hover:text-[oklch(96.5%_0.006_85)] transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-[oklch(60%_0.005_60)] mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Instagram
                      </p>
                      <p
                        className="text-sm text-[oklch(27.5%_0.000_0)] group-hover:text-[#a2482b] transition-colors"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        @portici.dadaocheng
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-[oklch(89.5%_0.025_80)] p-8 rounded-sm">
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
    </main>
  );
}
