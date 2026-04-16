import { useState } from "react";
import { Instagram, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type ContactSubject = "workshop" | "collaboration" | "press" | "other";

const HERO_IMAGE =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/JlGNTUqhPVkwUfEj.png";

const heroImageScrim =
  "linear-gradient(to bottom, color-mix(in srgb, var(--forest-deep) 38%, transparent) 0%, color-mix(in srgb, var(--forest-deep) 74%, transparent) 45%, color-mix(in srgb, var(--forest-deep) 88%, transparent) 70%, var(--forest-deep) 100%)";

const formFieldClass =
  "w-full px-4 py-3 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-xl resize-none transition-all duration-300 focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20";

export default function ContattiEN() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<ContactSubject | "">("");
  const [message, setMessage] = useState("");

  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Your note reached the desk.", {
        description: "We will write back when we can — not from a script, from a person.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: (err) => {
      toast.error(err.message || "The message did not go through. Try again in a little while.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) {
      toast.error("Please choose a topic.");
      return;
    }
    submit.mutate({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });
  };

  const isSubmitting = submit.isPending;

  return (
    <main className="bg-background">
      <section className="relative pt-32 pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMAGE} alt="Dadaocheng street" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: heroImageScrim }} />
        </div>
        <div className="relative container max-w-4xl">
          <div className="mx-auto bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-sm px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6">
            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-editorial-mark"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Contact
            </p>
            <h1
              className="font-medium text-foreground"
              style={{
                fontFamily: "'Spectral', Georgia, serif",
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Write to the editors.
              <br />
              <em className="text-editorial-mark not-italic">We read every line.</em>
            </h1>
            <p
              className="text-[18px] text-muted-foreground leading-[1.8] max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              For collaborations, press, questions about sessions, or a thought that does not fit a form. This is not a
              sales inbox — it is the desk where we answer by hand.
            </p>
            <p
              className="text-[17px] text-muted-foreground/90 leading-[1.75] max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              What would you want us to leave unanswered in our first reply — even if you still hope we write back?
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-brand-cta/10"
            style={{ animation: "drift-bg 8s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-40 left-[5%] w-24 h-24 rounded-full bg-editorial-mark/12"
            style={{ animation: "drift-bg 10s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute top-1/2 right-[20%] w-16 h-16 rounded-full bg-brand-cta/6"
            style={{ animation: "drift-bg 12s ease-in-out infinite 2s" }}
          />
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10">
              <h2
                className="font-medium text-foreground mb-8"
                style={{
                  fontFamily: "'Spectral', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 500,
                }}
              >
                A note to the desk
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="How we should address you"
                      className={formFieldClass}
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Where we can answer"
                      className={formFieldClass}
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Topic
                  </label>
                  <select
                    required
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject((e.target.value || "") as ContactSubject | "")}
                    className={formFieldClass}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    <option value="">Choose a topic</option>
                    <option value="workshop">Sessions and labs</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Plain words are enough."
                    className={formFieldClass}
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative px-7 py-3.5 text-[16px] font-semibold bg-brand-cta text-brand-cta-foreground rounded-xl hover:opacity-90 transition-all duration-300 self-start disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center bg-brand-cta">
                      <Loader2 size={20} className="animate-spin text-brand-cta-foreground" />
                    </span>
                  )}
                  <span className={isSubmitting ? "invisible" : ""}>Send the note</span>
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10">
                <h2
                  className="font-medium text-foreground mb-6"
                  style={{
                    fontFamily: "'Spectral', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 500,
                  }}
                >
                  Elsewhere
                </h2>
                <div className="flex flex-col gap-5">
                  <a href="mailto:puchia.bologna@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-brand-cta transition-colors">
                      <Mail size={16} className="text-editorial-mark group-hover:text-brand-cta-foreground transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-muted-foreground mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Email
                      </p>
                      <p
                        className="text-sm text-foreground group-hover:text-editorial-mark transition-colors"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        puchia.bologna@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/portici.dadaocheng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-brand-cta transition-colors">
                      <Instagram size={16} className="text-editorial-mark group-hover:text-brand-cta-foreground transition-colors" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold text-muted-foreground mb-0.5"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        Instagram
                      </p>
                      <p
                        className="text-sm text-foreground group-hover:text-editorial-mark transition-colors"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        @portici.dadaocheng
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-surface-section-tint p-8 rounded-2xl border border-border shadow-sm">
                <p
                  className="font-medium text-foreground italic leading-[1.55] mb-3"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.375rem" }}
                >
                  &ldquo;This is only the opening of a correspondence.&rdquo;
                </p>
                <p
                  className="text-sm text-editorial-mark tracking-widest"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  lang="zh-Hant"
                >
                  這只是對話的開始。
                </p>
                <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  — HUA &amp; ANGIE, co-founders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Where we meet
              </p>
              <div
                className="flex flex-col gap-1 text-sm text-foreground/90"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                <span>Sessions and room · Bologna, Italy</span>
                <span>By arrangement — we send the address when a date is set.</span>
              </div>
            </div>
            <div className="space-y-2 text-right md:text-right">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Direct
              </p>
              <div
                className="flex flex-col gap-1 text-sm text-foreground/90 items-start md:items-end"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                <span>puchia.bologna@gmail.com</span>
                <span>@portici.dadaocheng</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-10">
            <div
              className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold tracking-[0.18em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DADAOCHENG
            </div>

            <p
              className="mt-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              © {new Date().getFullYear()} Portici DaDaocheng · All rights reserved
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
