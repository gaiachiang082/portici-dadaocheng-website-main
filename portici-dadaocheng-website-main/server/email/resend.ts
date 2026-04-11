/**
 * Resend email helper for Portici DaDaocheng
 * Newsletter welcome + magazine PDF delivery + legacy deposit confirmation (Stripe flow).
 */

import { ISSUE_NO1_PDF_PUBLIC_PATH } from "@shared/const";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_ORIGIN = (process.env.PUBLIC_SITE_URL ?? "https://porticidadaocheng.com").replace(/\/$/, "");
const FROM_EMAIL = "Portici DaDaocheng <noreply@porticidadaocheng.com>";
/** Short newsletter confirmation (general subscribe) — branding per product copy. */
const NEWSLETTER_CONFIRM_FROM = "Portici Dadaocheng <noreply@porticidadaocheng.com>";
const REPLY_TO = "info@porticidadaocheng.com";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  /** Overrides default `FROM_EMAIL` when set (e.g. newsletter confirmation). */
  from?: string;
}

export async function sendEmail({ to, subject, html, replyTo, from }: SendEmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set, skipping email send");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from ?? FROM_EMAIL,
        to,
        subject,
        html,
        reply_to: replyTo ?? REPLY_TO,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Email] Resend error:", err);
      return false;
    }

    const data = await res.json() as { id?: string };
    console.log("[Email] Sent successfully:", data.id);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send:", err);
    return false;
  }
}

type NewsletterWelcomeLang = "it" | "zh" | "en";

function normalizeNewsletterLanguage(language?: string | null): NewsletterWelcomeLang {
  const code = (language ?? "it").trim().toLowerCase().slice(0, 2);
  if (code === "zh") return "zh";
  if (code === "en") return "en";
  return "it";
}

const newsletterWelcomeCopy: Record<
  NewsletterWelcomeLang,
  {
    htmlLang: string;
    subject: string;
    greetingNamed: (n: string) => string;
    greetingGeneric: string;
    /** Body paragraphs after the greeting, before the site link. */
    paragraphs: string[];
    footer: string;
  }
> = {
  it: {
    htmlLang: "it",
    subject: "Iscrizione registrata — newsletter Portici Dadaocheng",
    greetingNamed: (n) => `${n},`,
    greetingGeneric: "Salve,",
    paragraphs: [
      "Grazie per aver lasciato il vostro indirizzo: da questa casella scriviamo di rado, e solo quando abbiamo qualcosa da raccontare con calma.",
      "Portici Dadaocheng nasce nel passaggio tra Bologna e Taipei, tra i portici e Dadaocheng: due luoghi che osserviamo da vicino, sapendo che ogni lettura resta parziale.",
      "Quando torneremo con notizie sul trimestrale o sulle sessioni, sarà senza fretta e senza promettere continuità costante.",
      "Quale filo, tra queste due città, vorreste vedere tirato per primo nel prossimo messaggio?",
      "Noi, Portici Dadaocheng",
    ],
    footer: "Avete ricevuto questa email perché avete confermato l'iscrizione alla newsletter.",
  },
  zh: {
    htmlLang: "zh-Hant",
    subject: "訂閱已登記 — Portici Dadaocheng 電子報",
    greetingNamed: (n) => `${n}，`,
    greetingGeneric: "您好，",
    paragraphs: [
      "謝謝您留下地址：我們很少從這個信箱寫信，只有當手邊有值得慢慢說的事才會寄出。",
      "Portici Dadaocheng 從波隆那與台北之間的往返長出來——廊柱與 Dadaocheng 的街廓，我們在近處記錄，也清楚任何詮釋都仍只是片段。",
      "若下次談到季刊或場次，會同樣從容，不預先承諾固定的節奏。",
      "在這兩座城市之間，您最想先被細讀的是哪一條線索？",
      "我們，Portici Dadaocheng",
    ],
    footer: "您收到此信是因為剛完成電子報訂閱。",
  },
  en: {
    htmlLang: "en",
    subject: "Subscription recorded — Portici Dadaocheng newsletter",
    greetingNamed: (n) => `${n},`,
    greetingGeneric: "Hello,",
    paragraphs: [
      "We have recorded your subscription.",
      "We work across Bologna and Taipei on the quarterly and the sessions: two porticos, two tempos, the same human questions with answers that never quite line up.",
      "We will write only when the field notebook has something to add — reading notes, session dates, Magazine materials.",
      "What thread, for you, holds these two cities together today without forcing them into a single picture?",
      "We, Portici Dadaocheng",
    ],
    footer: "You’re receiving this because you subscribed to our newsletter.",
  },
};

/**
 * Short confirmation email for general (non-magazine) newsletter subscribers.
 */
export async function sendNewsletterWelcomeEmail(
  email: string,
  name?: string | null,
  language: string = "it"
): Promise<boolean> {
  const lang = normalizeNewsletterLanguage(language);
  const copy = newsletterWelcomeCopy[lang];
  const greeting = name?.trim() ? copy.greetingNamed(name.trim()) : copy.greetingGeneric;
  const bodyParagraphStyle = "margin:0 0 16px;font-size:16px;color:#44403C;line-height:1.75;";
  const lastBodyIdx = copy.paragraphs.length - 1;
  const bodyHtml = copy.paragraphs
    .map(
      (text, i) =>
        `<p style="${bodyParagraphStyle}${i === lastBodyIdx ? "margin-bottom:24px;" : ""}">${text}</p>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="${copy.htmlLang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0EB;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EB;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;max-width:560px;width:100%;border-radius:2px;">
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 20px;font-size:15px;color:#1C1917;line-height:1.6;">${greeting}</p>
            ${bodyHtml}
            <p style="margin:0;font-size:13px;color:#78716C;line-height:1.6;font-family:Arial,sans-serif;">
              <a href="${SITE_ORIGIN}" style="color:#a2482b;">portici-dadaocheng.com</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px 28px;border-top:1px solid #E7E5E4;">
            <p style="margin:0;font-size:11px;color:#A8A29E;font-family:Arial,sans-serif;line-height:1.5;">${copy.footer}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return sendEmail({
    to: email,
    from: NEWSLETTER_CONFIRM_FROM,
    subject: copy.subject,
    html,
  });
}

/** @deprecated Use {@link sendNewsletterWelcomeEmail} for language-aware copy; still maps to Italian. */
export async function sendNewsletterWelcome(to: string, name?: string | null): Promise<boolean> {
  return sendNewsletterWelcomeEmail(to, name, "it");
}

/** Absolute URL to Issue No.1 PDF for email clients. */
function issueNo1PdfAbsoluteUrl(): string {
  return `${SITE_ORIGIN}${ISSUE_NO1_PDF_PUBLIC_PATH}`;
}

/**
 * Single email for new (or reactivated) subscribers from `magazine_issue_1`:
 * welcome tone + PDF link — lighter than two separate messages.
 */
export async function sendNewsletterWelcomeWithMagazineIssue1(to: string, name?: string | null): Promise<boolean> {
  const greeting = name?.trim() ? `${name.trim()},` : "Salve,";
  const pdfUrl = issueNo1PdfAbsoluteUrl();
  return sendEmail({
    to,
    subject: "Newsletter e Magazine N.1 — PDF registrato",
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0EB;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EB;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1C1917;padding:40px 48px 32px;">
            <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:18px;font-weight:500;color:#F5F3EE;letter-spacing:0.08em;">PORTICI</p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:11px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase;">大稻埕</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 48px 36px;">
            <p style="margin:0 0 24px;font-size:14px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Newsletter · Magazine N.1</p>
            <h1 style="margin:0 0 24px;font-size:26px;font-weight:500;color:#1C1917;line-height:1.35;">${greeting}<br>abbiamo registrato l&apos;iscrizione e il primo numero in PDF.</h1>
            <div style="width:40px;height:2px;background:#a2482b;margin-bottom:28px;"></div>
            <p style="margin:0 0 20px;font-size:17px;color:#57534E;line-height:1.8;">
              Da Bologna e da Taipei annotiamo incroci tra portici, Dadaocheng e testi del trimestrale: niente sintesi netta, solo materiali che teniamo sul tavolo mentre lavoriamo.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#78716C;line-height:1.75;font-family:Arial,sans-serif;">
              Il file del <strong style="color:#1C1917;">numero 1</strong> è nel link qui sotto; potete aprirlo o salvarlo quando vi è comodo.
            </p>
            <a href="${pdfUrl}" style="display:inline-block;padding:14px 28px;background:#a2482b;color:#F5F3EE;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:600;">
              Apri o scarica il PDF del N.1
            </a>
            <p style="margin:28px 0 20px;font-size:17px;color:#57534E;line-height:1.8;">
              Torneremo da questa casella quando il taccuino ha letture dal Magazine, note di sessione o date che possiamo indicare senza promettere un ritmo fisso: il trimestrale non è un flusso mensile.
            </p>
            <a href="${SITE_ORIGIN}/magazine" style="display:inline-block;padding:12px 24px;border:1px solid #D6D0C8;color:#1C1917;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:600;">
              Pagina Magazine
            </a>
            <p style="margin:20px 0 0;font-size:15px;color:#78716C;line-height:1.7;font-family:Arial,sans-serif;">
              Sessioni e manifestazione d&apos;interesse: <a href="${SITE_ORIGIN}/eventi" style="color:#a2482b;">${SITE_ORIGIN.replace(/^https?:\/\//, "")}/eventi</a>
            </p>
            <p style="margin:20px 0 0;font-size:17px;color:#57534E;line-height:1.8;">
              Quale pagina di questo primo PDF vorreste che restasse fuori dall&apos;immagine che vi siete fatti del progetto — e perché?
            </p>
            <p style="margin:16px 0 0;font-size:15px;color:#1C1917;line-height:1.75;">
              Noi, Portici Dadaocheng
            </p>
            <p style="margin:16px 0 0;font-size:14px;color:#78716C;line-height:1.7;font-family:Arial,sans-serif;">
              Se non trovate subito questa mail, controllate anche la cartella spam.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #E5E0D8;">
            <p style="margin:0;font-size:12px;color:#A67C52;font-family:Arial,sans-serif;">
              Bologna, Italia · 2026<br>
              <a href="${SITE_ORIGIN}" style="color:#A67C52;">portici-dadaocheng.com</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#C4B9AD;font-family:Arial,sans-serif;">
              Avete ricevuto questa email perché vi siete iscritti/e dalla pagina del Magazine.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

/**
 * Second touch only: subscriber already active — resend PDF link, calm editorial tone.
 */
export async function sendMagazineIssue1Delivery(
  to: string,
  name?: string | null,
  _options?: { repeatDelivery?: boolean }
): Promise<boolean> {
  const greeting = name?.trim() ? `${name.trim()},` : "Salve,";
  const pdfUrl = issueNo1PdfAbsoluteUrl();

  return sendEmail({
    to,
    subject: "Magazine N.1 — stesso PDF, stesso link",
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0EB;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EB;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1C1917;padding:40px 48px 32px;">
            <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:18px;font-weight:500;color:#F5F3EE;letter-spacing:0.08em;">PORTICI</p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:11px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase;">Magazine · N.1</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 48px 40px;">
            <p style="margin:0 0 24px;font-size:14px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">PDF del numero</p>
            <p style="margin:0 0 20px;font-size:17px;color:#57534E;line-height:1.8;">
              ${greeting}<br>
              il vostro indirizzo era già in elenco; qui sotto trovate di nuovo il <strong style="color:#1C1917;">PDF del numero 1</strong>, come dalla pagina Magazine.
            </p>
            <a href="${pdfUrl}" style="display:inline-block;padding:14px 28px;background:#a2482b;color:#F5F3EE;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:600;">
              Apri o scarica il PDF del N.1
            </a>
            <p style="margin:24px 0 0;font-size:15px;color:#78716C;line-height:1.7;font-family:Arial,sans-serif;">
              Se non si apre, copiate l&apos;URL del pulsante nel browser. Pagina del trimestrale: <a href="${SITE_ORIGIN}/magazine" style="color:#a2482b;">/magazine</a>
            </p>
            <p style="margin:20px 0 0;font-size:17px;color:#57534E;line-height:1.8;">
              Cosa vi ha spinto a richiedere di nuovo lo stesso file — mancanza, dubbio, o semplicemente un passaggio tra due dispositivi?
            </p>
            <p style="margin:12px 0 0;font-size:15px;color:#1C1917;line-height:1.75;">
              Noi, Portici Dadaocheng
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #E5E0D8;">
            <p style="margin:0;font-size:12px;color:#A67C52;font-family:Arial,sans-serif;">
              Bologna, Italia · <a href="${SITE_ORIGIN}" style="color:#A67C52;">portici-dadaocheng.com</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#C4B9AD;font-family:Arial,sans-serif;">
              Avete ricevuto questa email perché avete richiesto il Magazine dalla pagina del trimestrale.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

/* ── Legacy deposit confirmation (guest completed Stripe deposit for a scheduled session) ── */
export async function sendBookingConfirmation(opts: {
  to: string;
  guestName: string;
  workshopTitle: string;
  workshopTitleZh?: string | null;
  sessionDate: Date;
  participants: number;
  depositAmountEur: number;
  balanceAmountEur: number;
  confirmationCode: string;
  location?: string | null;
}): Promise<boolean> {
  const dateStr = new Date(opts.sessionDate).toLocaleDateString("it-IT", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const timeStr = new Date(opts.sessionDate).toLocaleTimeString("it-IT", {
    hour: "2-digit", minute: "2-digit",
  });

  return sendEmail({
    to: opts.to,
    subject: `Deposito registrato — ${opts.workshopTitle} · ${opts.confirmationCode}`,
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0EB;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EB;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#1C1917;padding:40px 48px 32px;">
            <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:18px;font-weight:500;color:#F5F3EE;letter-spacing:0.08em;">PORTICI</p>
            <p style="margin:0;font-family:'Georgia',serif;font-size:11px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase;">大稻埕</p>
          </td>
        </tr>
        <!-- Confirmation badge -->
        <tr>
          <td style="background:#a2482b;padding:16px 48px;">
            <p style="margin:0;font-size:13px;color:#F5F3EE;font-family:Arial,sans-serif;letter-spacing:0.12em;text-transform:uppercase;line-height:1.5;">
              Deposito annotato — teniamo il tuo posto per la data qui sotto
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 40px;">
            <p style="margin:0 0 24px;font-size:17px;color:#57534E;line-height:1.8;">
              <strong style="color:#1C1917;">${opts.guestName}</strong>,<br>
              abbiamo registrato il deposito per la sessione che hai prenotato; il posto resta tenuto per te alla data e all&apos;orario nel riquadro qui sotto.
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#78716C;line-height:1.7;font-family:Arial,sans-serif;">
              Questa mail riguarda il percorso con acconto dopo che hai scelto una data. Se cerchi altre linee o vuoi segnalare interesse collettivo, torna sul sito (sezione Sessioni).
            </p>

            <!-- Booking details box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F2;border:1px solid #E5D9C8;margin-bottom:32px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Codice di Conferma</p>
                  <p style="margin:0 0 20px;font-size:22px;font-weight:700;color:#1C1917;font-family:'Courier New',monospace;letter-spacing:0.1em;">${opts.confirmationCode}</p>

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Sessione / laboratorio</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.workshopTitle}${opts.workshopTitleZh ? ` · ${opts.workshopTitleZh}` : ""}</p>

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Data e Ora</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${dateStr} · ${timeStr}</p>

                  ${opts.location ? `
                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Luogo</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.location}</p>
                  ` : ""}

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Partecipanti</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.participants === 1 ? "1 persona" : `${opts.participants} persone`}</p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E5D9C8;padding-top:16px;margin-top:4px;">
                    <tr>
                      <td style="font-size:14px;color:#78716C;font-family:Arial,sans-serif;">Deposito pagato (50%)</td>
                      <td align="right" style="font-size:14px;color:#166534;font-weight:600;font-family:Arial,sans-serif;">€${opts.depositAmountEur.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="font-size:14px;color:#78716C;font-family:Arial,sans-serif;padding-top:8px;">Saldo da pagare in loco</td>
                      <td align="right" style="font-size:14px;color:#1C1917;font-weight:600;font-family:Arial,sans-serif;padding-top:8px;">€${opts.balanceAmountEur.toFixed(2)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 20px;font-size:15px;color:#57534E;line-height:1.8;font-family:Arial,sans-serif;">
              Il saldo restante (€${opts.balanceAmountEur.toFixed(2)}) lo riscuotiamo in loco il giorno della sessione, al termine dell&apos;incontro.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#57534E;line-height:1.8;font-family:Arial,sans-serif;">
              Per una domanda, rispondi a questa email; su Instagram siamo <a href="https://instagram.com/portici.dadaocheng" style="color:#a2482b;">@portici.dadaocheng</a>.
            </p>
            <p style="margin:0 0 16px;font-size:17px;color:#57534E;line-height:1.8;">
              Cosa ti aspetti che resti fuori stanza, quel giorno — e cosa vorresti invece che entrasse senza essere annunciato?
            </p>
            <p style="margin:0;font-size:17px;color:#1C1917;line-height:1.8;">
              Noi, Portici DaDaocheng
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #E5E0D8;">
            <p style="margin:0;font-size:12px;color:#A67C52;font-family:Arial,sans-serif;">
              Bologna, Italia · 2026 · <a href="https://portici-dadaocheng.com" style="color:#A67C52;">portici-dadaocheng.com</a>
              · <a href="https://portici-dadaocheng.com/eventi" style="color:#A67C52;">Sessioni</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

const DEFAULT_CONTACT_INBOX = "puchia.bologna@gmail.com";

function escapeHtmlForEmail(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Notify site owner when someone submits the Contatti form. */
export async function sendContactFormToAdmin(opts: {
  name: string;
  email: string;
  subjectLabel: string;
  message: string;
}): Promise<boolean> {
  const to = (process.env.CONTACT_NOTIFICATION_EMAIL ?? "").trim() || DEFAULT_CONTACT_INBOX;
  return sendEmail({
    to,
    subject: `[Contatti sito] ${opts.subjectLabel} — ${opts.name}`,
    html: `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#F5F0EB;font-family:Georgia,serif;">
  <p style="margin:0 0 12px;font-size:14px;color:#57534E;"><strong>Da:</strong> ${escapeHtmlForEmail(opts.name)} &lt;${escapeHtmlForEmail(opts.email)}&gt;</p>
  <p style="margin:0 0 12px;font-size:14px;color:#57534E;"><strong>Oggetto:</strong> ${escapeHtmlForEmail(opts.subjectLabel)}</p>
  <div style="margin-top:20px;padding:16px;background:#fff;border:1px solid #E5E0D8;border-radius:8px;">
    <p style="margin:0;font-size:15px;color:#1C1917;white-space:pre-wrap;">${escapeHtmlForEmail(opts.message)}</p>
  </div>
</body>
</html>`,
    replyTo: opts.email,
  });
}
