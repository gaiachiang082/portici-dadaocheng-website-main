import Stripe from "stripe";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "[Stripe] STRIPE_SECRET_KEY is not configured. Set STRIPE_SECRET_KEY in your .env file."
    );
  }

  return new Stripe(secretKey, {
    apiVersion: "2026-01-28.clover",
  });
}

export interface WorkshopCheckoutParams {
  bookingId: number;
  confirmationCode: string;
  workshopTitle: string;
  workshopTitleZh: string | null;
  sessionDate: Date;
  participants: number;
  depositAmountEur: number;
  guestEmail: string;
  guestName: string;
  origin: string;
}

export async function createWorkshopCheckoutSession(params: WorkshopCheckoutParams) {
  const stripe = getStripeClient();
  const depositCents = Math.round(params.depositAmountEur * 100);
  const sessionDateStr = new Date(params.sessionDate).toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.guestEmail,
    allow_promotion_codes: false,
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: depositCents,
          product_data: {
            name: `Sessione — ${params.workshopTitle} (deposito 50%)`,
            description: `${params.participants} partecipante/i · ${sessionDateStr}${params.workshopTitleZh ? ` · ${params.workshopTitleZh}` : ""} · saldo in loco il giorno dell'incontro`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      booking_id: params.bookingId.toString(),
      confirmation_code: params.confirmationCode,
      workshop_title: params.workshopTitle,
      guest_name: params.guestName,
      guest_email: params.guestEmail,
      participants: params.participants.toString(),
    },
    client_reference_id: params.confirmationCode,
    success_url: `${params.origin}/booking/success?code=${params.confirmationCode}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/workshops?booking=1&booking_cancelled=1`,
  });

  return session;
}
