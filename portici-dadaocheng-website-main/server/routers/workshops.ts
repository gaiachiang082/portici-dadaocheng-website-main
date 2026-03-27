import { z } from "zod";
import { eq, and, gt } from "drizzle-orm";
import { getDb } from "../db";
import { workshops, workshopSessions, bookings } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { createWorkshopCheckoutSession } from "../stripe/workshopCheckout";

// Helper: generate a short confirmation code
function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PD-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export const workshopsRouter = router({
  // List all active workshops with their upcoming sessions (for Calendario page)
  listAllWithSessions: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const activeWorkshops = await db
      .select()
      .from(workshops)
      .where(eq(workshops.isActive, true));

    const now = new Date();
    const results = await Promise.all(
      activeWorkshops.map(async (w) => {
        const sessions = await db
          .select()
          .from(workshopSessions)
          .where(
            and(
              eq(workshopSessions.workshopId, w.id),
              eq(workshopSessions.isActive, true),
              gt(workshopSessions.sessionDate, now)
            )
          );
        return { workshop: w, sessions };
      })
    );
    return results;
  }),

  // List all active workshops
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db.select().from(workshops).where(eq(workshops.isActive, true));
    return rows;
  }),

  // Get single workshop with upcoming sessions
  getWithSessions: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const [workshop] = await db
        .select()
        .from(workshops)
        .where(eq(workshops.slug, input.slug));
      if (!workshop) return null;

      const now = new Date();
      const sessions = await db
        .select()
        .from(workshopSessions)
        .where(
          and(
            eq(workshopSessions.workshopId, workshop.id),
            eq(workshopSessions.isActive, true),
            gt(workshopSessions.sessionDate, now)
          )
        );

      return { workshop, sessions };
    }),

  // Create a booking (without payment — returns booking id for Stripe redirect)
  createBooking: publicProcedure
    .input(
      z.object({
        sessionId: z.number(),
        guestName: z.string().min(2).max(256),
        guestEmail: z.string().email(),
        guestPhone: z.string().optional(),
        guestCountry: z.string().optional(),
        participants: z.number().min(1).max(20),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      // Fetch session and workshop
      const [session] = await db
        .select()
        .from(workshopSessions)
        .where(eq(workshopSessions.id, input.sessionId));
      if (!session) throw new Error("Session not found");
      if (!session.isActive) throw new Error("Session is no longer available");

      const spotsLeft = session.spotsTotal - session.spotsBooked;
      if (spotsLeft < input.participants) {
        throw new Error(`Only ${spotsLeft} spots remaining`);
      }

      const [workshop] = await db
        .select()
        .from(workshops)
        .where(eq(workshops.id, session.workshopId));
      if (!workshop) throw new Error("Workshop not found");

      const pricePerPerson = parseFloat(workshop.priceEur as string);
      const totalAmount = pricePerPerson * input.participants;
      const depositPercent = workshop.depositPercent ?? 50;
      const depositAmount = Math.round((totalAmount * depositPercent) / 100 * 100) / 100;
      const balanceAmount = Math.round((totalAmount - depositAmount) * 100) / 100;

      const confirmationCode = generateConfirmationCode();

      // Insert booking
      const [result] = await db.insert(bookings).values({
        sessionId: input.sessionId,
        workshopId: workshop.id,
        guestName: input.guestName,
        guestEmail: input.guestEmail,
        guestPhone: input.guestPhone,
        guestCountry: input.guestCountry,
        participants: input.participants,
        notes: input.notes,
        totalAmountEur: totalAmount.toFixed(2),
        depositAmountEur: depositAmount.toFixed(2),
        balanceAmountEur: balanceAmount.toFixed(2),
        paymentStatus: "pending",
        status: "pending",
        confirmationCode,
      });

      const bookingId = (result as any).insertId as number;

      // Notify owner
      await notifyOwner({
        title: `Richiesta sessione (deposito da completare): ${workshop.title}`,
        content: `${input.guestName} (${input.guestEmail}) ha avviato una richiesta per ${input.participants} partecipante/i — ${workshop.title}, ${new Date(session.sessionDate).toLocaleDateString("it-IT")}. Codice: ${confirmationCode}. Deposito previsto: \u20ac${depositAmount} (pagamento ancora da confermare).`,
      }).catch(() => {});

      return {
        bookingId,
        confirmationCode,
        workshopTitle: workshop.title,
        sessionDate: session.sessionDate,
        participants: input.participants,
        totalAmountEur: totalAmount,
        depositAmountEur: depositAmount,
        balanceAmountEur: balanceAmount,
      };
    }),

  // Create Stripe checkout session for deposit payment
  createCheckoutSession: publicProcedure
    .input(z.object({
      bookingId: z.number(),
      confirmationCode: z.string(),
      origin: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, input.bookingId));
      if (!booking) throw new Error("Booking not found");
      if (booking.confirmationCode !== input.confirmationCode) throw new Error("Invalid confirmation code");

      const [workshop] = await db
        .select()
        .from(workshops)
        .where(eq(workshops.id, booking.workshopId));
      if (!workshop) throw new Error("Workshop not found");

      const [session] = await db
        .select()
        .from(workshopSessions)
        .where(eq(workshopSessions.id, booking.sessionId));
      if (!session) throw new Error("Session not found");

      const checkoutSession = await createWorkshopCheckoutSession({
        bookingId: booking.id,
        confirmationCode: booking.confirmationCode!,
        workshopTitle: workshop.title,
        workshopTitleZh: workshop.titleZh ?? null,
        sessionDate: session.sessionDate,
        participants: booking.participants,
        depositAmountEur: parseFloat(booking.depositAmountEur as string),
        guestEmail: booking.guestEmail,
        guestName: booking.guestName,
        origin: input.origin,
      });

      // Save Stripe session ID to booking
      await db.update(bookings)
        .set({ stripeCheckoutSessionId: checkoutSession.id })
        .where(eq(bookings.id, booking.id));

      return { checkoutUrl: checkoutSession.url };
    }),

  // Get booking by confirmation code
  getBooking: publicProcedure
    .input(z.object({ confirmationCode: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.confirmationCode, input.confirmationCode));
      if (!booking) return null;

      const [workshop] = await db
        .select()
        .from(workshops)
        .where(eq(workshops.id, booking.workshopId));

      const [session] = await db
        .select()
        .from(workshopSessions)
        .where(eq(workshopSessions.id, booking.sessionId));

      return { booking, workshop, session };
    }),
});
