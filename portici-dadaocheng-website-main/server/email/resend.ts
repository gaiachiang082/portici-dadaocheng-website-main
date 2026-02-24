/**
 * Resend email helper for Portici DaDaocheng
 * Handles newsletter welcome emails and booking confirmation emails.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "Portici DaDaocheng <noreply@portici-dadaocheng.com>";
const REPLY_TO = "info@portici-dadaocheng.com";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<boolean> {
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
        from: FROM_EMAIL,
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

/* ── Newsletter Welcome Email ── */
export async function sendNewsletterWelcome(to: string, name?: string | null): Promise<boolean> {
  const greeting = name ? `Caro/a ${name},` : "Caro/a amico/a,";
  return sendEmail({
    to,
    subject: "Benvenuto/a nella comunità Portici DaDaocheng 🏮",
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
        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 40px;">
            <p style="margin:0 0 24px;font-size:14px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Newsletter</p>
            <h1 style="margin:0 0 24px;font-size:28px;font-weight:500;color:#1C1917;line-height:1.3;">${greeting}<br>Benvenuto/a!</h1>
            <div style="width:40px;height:2px;background:#a2482b;margin-bottom:32px;"></div>
            <p style="margin:0 0 20px;font-size:17px;color:#57534E;line-height:1.8;">
              Grazie per esserti iscritto/a alla nostra newsletter. Sei ora parte di una comunità che esplora come culture diverse — dall'Asia orientale all'Europa — rispondono alle stesse domande umane in modi sorprendentemente diversi.
            </p>
            <p style="margin:0 0 32px;font-size:17px;color:#57534E;line-height:1.8;">
              Ogni mese riceverai aggiornamenti sui nostri workshop, articoli di approfondimento culturale e inviti agli eventi speciali a Bologna e nelle principali città europee.
            </p>
            <a href="https://portici-dadaocheng.com/workshop" style="display:inline-block;padding:14px 28px;background:#a2482b;color:#F5F3EE;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:600;">
              Scopri i Workshop →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #E5E0D8;">
            <p style="margin:0;font-size:12px;color:#A67C52;font-family:Arial,sans-serif;">
              Bologna, Italia · 2026<br>
              <a href="https://portici-dadaocheng.com" style="color:#A67C52;">portici-dadaocheng.com</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#C4B9AD;font-family:Arial,sans-serif;">
              Hai ricevuto questa email perché ti sei iscritto/a alla newsletter di Portici DaDaocheng.
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

/* ── Booking Confirmation Email ── */
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
    subject: `Conferma prenotazione: ${opts.workshopTitle} · ${opts.confirmationCode}`,
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
            <p style="margin:0;font-size:13px;color:#F5F3EE;font-family:Arial,sans-serif;letter-spacing:0.15em;text-transform:uppercase;">
              ✓ Prenotazione Confermata
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 40px;">
            <p style="margin:0 0 24px;font-size:17px;color:#57534E;line-height:1.8;">
              Caro/a <strong style="color:#1C1917;">${opts.guestName}</strong>,<br>
              il tuo deposito è stato ricevuto. Il tuo posto è confermato!
            </p>

            <!-- Booking details box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F2;border:1px solid #E5D9C8;margin-bottom:32px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Codice di Conferma</p>
                  <p style="margin:0 0 20px;font-size:22px;font-weight:700;color:#1C1917;font-family:'Courier New',monospace;letter-spacing:0.1em;">${opts.confirmationCode}</p>

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Workshop</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.workshopTitle}${opts.workshopTitleZh ? ` · ${opts.workshopTitleZh}` : ""}</p>

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Data e Ora</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${dateStr} · ${timeStr}</p>

                  ${opts.location ? `
                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Luogo</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.location}</p>
                  ` : ""}

                  <p style="margin:0 0 4px;font-size:11px;color:#A67C52;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Partecipanti</p>
                  <p style="margin:0 0 20px;font-size:17px;color:#1C1917;">${opts.participants} persona/e</p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E5D9C8;padding-top:16px;margin-top:4px;">
                    <tr>
                      <td style="font-size:14px;color:#78716C;font-family:Arial,sans-serif;">Deposito pagato (50%)</td>
                      <td align="right" style="font-size:14px;color:#166534;font-weight:600;font-family:Arial,sans-serif;">€${opts.depositAmountEur.toFixed(2)} ✓</td>
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
              <strong>Ricorda:</strong> il saldo restante (€${opts.balanceAmountEur.toFixed(2)}) verrà pagato in loco il giorno dell'evento, dopo aver vissuto l'esperienza.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#57534E;line-height:1.8;font-family:Arial,sans-serif;">
              Per qualsiasi domanda, rispondi a questa email o contattaci su Instagram <a href="https://instagram.com/portici.dadaocheng" style="color:#a2482b;">@portici.dadaocheng</a>.
            </p>
            <p style="margin:0;font-size:17px;color:#1C1917;line-height:1.8;">
              A presto,<br>
              <em>Il team di Portici DaDaocheng</em>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #E5E0D8;">
            <p style="margin:0;font-size:12px;color:#A67C52;font-family:Arial,sans-serif;">
              Bologna, Italia · 2026 · <a href="https://portici-dadaocheng.com" style="color:#A67C52;">portici-dadaocheng.com</a>
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
