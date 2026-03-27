import { z } from "zod";
import { eq, desc, count, max } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { bookings, workshops, workshopSessions, programInterests } from "../../drizzle/schema";
import { protectedProcedure, router } from "../_core/trpc";

/* ── Admin guard middleware ── */
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  /* ─────────────────────────────────────────────
     BOOKINGS
     ───────────────────────────────────────────── */

  /** List all bookings with workshop + session info, newest first */
  listBookings: adminProcedure
    .input(
      z.object({
        paymentStatus: z.enum(["all", "pending", "deposit_paid", "fully_paid", "refunded", "cancelled"]).default("all"),
        status: z.enum(["all", "pending", "confirmed", "cancelled"]).default("all"),
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { bookings: [], total: 0 };

      const allBookings = await db
        .select()
        .from(bookings)
        .orderBy(desc(bookings.createdAt));

      // Filter in JS (simple enough for admin use)
      const filtered = allBookings.filter((b) => {
        const payOk = input.paymentStatus === "all" || b.paymentStatus === input.paymentStatus;
        const statusOk = input.status === "all" || b.status === input.status;
        return payOk && statusOk;
      });

      const total = filtered.length;
      const page = filtered.slice(input.offset, input.offset + input.limit);

      // Enrich with workshop + session
      const enriched = await Promise.all(
        page.map(async (b) => {
          const [workshop] = await db.select().from(workshops).where(eq(workshops.id, b.workshopId));
          const [session] = await db.select().from(workshopSessions).where(eq(workshopSessions.id, b.sessionId));
          return { booking: b, workshop: workshop ?? null, session: session ?? null };
        })
      );

      return { bookings: enriched, total };
    }),

  /** Mark balance as paid on-site (fully_paid) */
  markBalancePaid: adminProcedure
    .input(z.object({ bookingId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [booking] = await db.select().from(bookings).where(eq(bookings.id, input.bookingId));
      if (!booking) throw new TRPCError({ code: "NOT_FOUND", message: "Booking not found" });
      if (booking.paymentStatus === "fully_paid") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Already marked as fully paid" });
      }

      await db
        .update(bookings)
        .set({
          paymentStatus: "fully_paid",
          balancePaidAt: new Date(),
          status: "confirmed",
        })
        .where(eq(bookings.id, input.bookingId));

      return { success: true };
    }),

  /** Cancel a booking */
  cancelBooking: adminProcedure
    .input(z.object({ bookingId: z.number(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [booking] = await db.select().from(bookings).where(eq(bookings.id, input.bookingId));
      if (!booking) throw new TRPCError({ code: "NOT_FOUND" });

      await db
        .update(bookings)
        .set({
          status: "cancelled",
          paymentStatus: "cancelled",
          cancelledAt: new Date(),
          cancellationReason: input.reason ?? "Cancelled by admin",
        })
        .where(eq(bookings.id, input.bookingId));

      // Free up spots
      await db
        .update(workshopSessions)
        .set({
          spotsBooked: Math.max(0, (booking.participants ?? 1)),
        })
        .where(eq(workshopSessions.id, booking.sessionId));

      return { success: true };
    }),

  /* ─────────────────────────────────────────────
     WORKSHOPS
     ───────────────────────────────────────────── */

  /** List all workshops (including inactive) */
  listAllWorkshops: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(workshops).orderBy(desc(workshops.createdAt));
  }),

  /** Toggle workshop active/inactive */
  toggleWorkshopActive: adminProcedure
    .input(z.object({ workshopId: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(workshops)
        .set({ isActive: input.isActive })
        .where(eq(workshops.id, input.workshopId));
      return { success: true };
    }),

  /** Create a new workshop session */
  createSession: adminProcedure
    .input(
      z.object({
        workshopId: z.number(),
        sessionDate: z.string(), // ISO string from frontend
        spotsTotal: z.number().min(1).max(100),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [workshop] = await db.select().from(workshops).where(eq(workshops.id, input.workshopId));
      if (!workshop) throw new TRPCError({ code: "NOT_FOUND", message: "Workshop not found" });

      const [result] = await db.insert(workshopSessions).values({
        workshopId: input.workshopId,
        sessionDate: new Date(input.sessionDate),
        spotsTotal: input.spotsTotal,
        spotsBooked: 0,
        isActive: true,
      });

      return { sessionId: (result as any).insertId as number };
    }),

  /** Toggle session active/inactive */
  toggleSessionActive: adminProcedure
    .input(z.object({ sessionId: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(workshopSessions)
        .set({ isActive: input.isActive })
        .where(eq(workshopSessions.id, input.sessionId));
      return { success: true };
    }),

  /** List all sessions for a workshop */
  listSessions: adminProcedure
    .input(z.object({ workshopId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(workshopSessions)
        .where(eq(workshopSessions.workshopId, input.workshopId))
        .orderBy(desc(workshopSessions.sessionDate));
    }),

  /* ─────────────────────────────────────────────
     PROGRAM INTERESTS (demand-led leads)
     ───────────────────────────────────────────── */

  /** Paginated list, newest first; topic summary for operational grouping */
  listProgramInterests: adminProcedure
    .input(
      z.object({
        topicSlug: z.string().min(1).max(128).optional(),
        limit: z.number().min(1).max(2500).default(100),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        return {
          rows: [] as (typeof programInterests.$inferSelect)[],
          total: 0,
          topicSummary: [] as {
            topicSlug: string;
            topicTitle: string;
            count: number;
            latestAt: Date | null;
          }[],
        };
      }

      const topicSummaryRaw = await db
        .select({
          topicSlug: programInterests.topicSlug,
          topicTitle: programInterests.topicTitle,
          n: count(),
          latestAt: max(programInterests.createdAt),
        })
        .from(programInterests)
        .groupBy(programInterests.topicSlug, programInterests.topicTitle);

      const topicSummary = topicSummaryRaw
        .map((r) => ({
          topicSlug: r.topicSlug,
          topicTitle: r.topicTitle,
          count: Number(r.n),
          latestAt: r.latestAt ?? null,
        }))
        .sort((a, b) => b.count - a.count);

      const filter = input.topicSlug ? eq(programInterests.topicSlug, input.topicSlug) : undefined;

      const rows = filter
        ? await db
            .select()
            .from(programInterests)
            .where(filter)
            .orderBy(desc(programInterests.createdAt))
            .limit(input.limit)
            .offset(input.offset)
        : await db
            .select()
            .from(programInterests)
            .orderBy(desc(programInterests.createdAt))
            .limit(input.limit)
            .offset(input.offset);

      const [countRow] = filter
        ? await db.select({ n: count() }).from(programInterests).where(filter)
        : await db.select({ n: count() }).from(programInterests);

      const total = Number(countRow?.n ?? 0);

      return { rows, total, topicSummary };
    }),

  /* ─────────────────────────────────────────────
     STATS
     ───────────────────────────────────────────── */

  /** Quick dashboard stats */
  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalBookings: 0, pendingPayment: 0, depositPaid: 0, fullyPaid: 0, totalRevenue: 0 };

    const all = await db.select().from(bookings);
    const totalBookings = all.length;
    const pendingPayment = all.filter((b) => b.paymentStatus === "pending").length;
    const depositPaid = all.filter((b) => b.paymentStatus === "deposit_paid").length;
    const fullyPaid = all.filter((b) => b.paymentStatus === "fully_paid").length;
    const totalRevenue = all
      .filter((b) => b.paymentStatus === "deposit_paid" || b.paymentStatus === "fully_paid")
      .reduce((sum, b) => sum + parseFloat(b.depositAmountEur as string), 0);

    return { totalBookings, pendingPayment, depositPaid, fullyPaid, totalRevenue };
  }),
});
