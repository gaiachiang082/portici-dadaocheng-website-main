/**
 * Stripe Webhook Handler
 *
 * Listens for checkout.session.completed events and:
 * 1. Verifies the Stripe signature using STRIPE_WEBHOOK_SECRET
 * 2. Updates booking.paymentStatus → "deposit_paid"
 * 3. Updates booking.status → "confirmed"
 * 4. Updates booking.depositPaidAt timestamp
 * 5. Increments workshopSession.spotsBooked
 * 6. Notifies the owner
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { bookings, workshopSessions, workshops } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import { sendBookingConfirmation } from "../email/resend";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "[Stripe Webhook] STRIPE_SECRET_KEY is not configured. Set STRIPE_SECRET_KEY in your .env file."
    );
  }

  return new Stripe(secretKey, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // If no webhook secret is configured, log a warning but still process in dev mode
  if (!webhookSecret) {
    console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set — skipping signature verification (dev mode only)");
    try {
      const event = req.body as Stripe.Event;
      await processStripeEvent(event);
      return res.json({ verified: true });
    } catch (err) {
      console.error("[Stripe Webhook] Processing error:", err);
      return res.json({ verified: true });
    }
  }

  // Verify Stripe signature
  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      req.body, // raw body (Buffer) — must use express.raw() middleware
      sig as string,
      webhookSecret
    );
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    await processStripeEvent(event);
    res.json({ verified: true });
  } catch (err) {
    console.error("[Stripe Webhook] Processing error:", err);
    res.json({ verified: true });
  }
}

async function processStripeEvent(event: Stripe.Event) {
  console.log(`[Stripe Webhook] Processing event: ${event.type} (${event.id})`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }
  // Future: handle payment_intent.payment_failed, etc.
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const bookingId = session.metadata?.booking_id;
  const confirmationCode = session.metadata?.confirmation_code;

  if (!bookingId || !confirmationCode) {
    console.warn("[Stripe Webhook] Missing booking_id or confirmation_code in metadata", session.metadata);
    return;
  }

  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Fetch the booking
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, parseInt(bookingId)));

  if (!booking) {
    console.warn(`[Stripe Webhook] Booking not found: id=${bookingId}`);
    return;
  }

  // Idempotency check — skip if already processed
  if (booking.paymentStatus === "deposit_paid" || booking.paymentStatus === "fully_paid") {
    console.log(`[Stripe Webhook] Booking ${bookingId} already processed (status: ${booking.paymentStatus}), skipping`);
    return;
  }

  const now = new Date();

  // 1. Update booking: mark deposit paid + confirmed
  await db
    .update(bookings)
    .set({
      paymentStatus: "deposit_paid",
      status: "confirmed",
      depositPaidAt: now,
      stripeCheckoutSessionId: session.id,
    })
    .where(eq(bookings.id, parseInt(bookingId)));

  // 2. Increment spotsBooked in the session
  const [ws] = await db
    .select()
    .from(workshopSessions)
    .where(eq(workshopSessions.id, booking.sessionId));

  if (ws) {
    await db
      .update(workshopSessions)
      .set({ spotsBooked: ws.spotsBooked + booking.participants })
      .where(eq(workshopSessions.id, booking.sessionId));
  }

  console.log(`[Stripe Webhook] Booking ${bookingId} (${confirmationCode}) confirmed. Participants: ${booking.participants}`);

  // 3. Send confirmation email to guest
  try {
    const [workshop] = await db.select().from(workshops).where(eq(workshops.id, booking.workshopId));
    const [session] = await db.select().from(workshopSessions).where(eq(workshopSessions.id, booking.sessionId));
    if (workshop && session) {
      await sendBookingConfirmation({
        to: booking.guestEmail,
        guestName: booking.guestName,
        workshopTitle: workshop.title,
        workshopTitleZh: workshop.titleZh,
        sessionDate: session.sessionDate,
        participants: booking.participants,
        depositAmountEur: parseFloat(booking.depositAmountEur as string),
        balanceAmountEur: parseFloat(booking.balanceAmountEur as string),
        confirmationCode: booking.confirmationCode!,
        location: workshop.location,
      });
      console.log(`[Stripe Webhook] Confirmation email sent to ${booking.guestEmail}`);
    }
  } catch (emailErr) {
    console.warn("[Stripe Webhook] Confirmation email failed:", emailErr);
  }

  // 4. Notify owner
  await notifyOwner({
    title: `Deposito sessione confermato: ${confirmationCode}`,
    content: `Deposito di €${booking.depositAmountEur} ricevuto per la sessione associata al codice ${confirmationCode}. Partecipante: ${booking.guestName} (${booking.guestEmail}). N. partecipanti: ${booking.participants}.`,
  }).catch((err) => {
    console.warn("[Stripe Webhook] Owner notification failed:", err);
  });
}
