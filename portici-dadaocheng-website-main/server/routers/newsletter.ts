import { z } from "zod";
import { eq } from "drizzle-orm";
import { MAGAZINE_ISSUE_1_SOURCE } from "@shared/const";
import { getDb } from "../db";
import { newsletterSubscribers } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import {
  sendMagazineIssue1Delivery,
  sendNewsletterWelcome,
  sendNewsletterWelcomeWithMagazineIssue1,
} from "../email/resend";

function isMagazineIssue1Subscribe(source?: string) {
  return source === MAGAZINE_ISSUE_1_SOURCE;
}

export const newsletterRouter = router({
  /** Subscribe to newsletter */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().max(256).optional(),
        source: z.string().max(64).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const magazineIssue1 = isMagazineIssue1Subscribe(input.source);

      // Check if already subscribed
      const [existing] = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, input.email));

      if (existing) {
        if (existing.isActive) {
          if (magazineIssue1) {
            sendMagazineIssue1Delivery(input.email, input.name, { repeatDelivery: true }).catch(() => {});
          }
          return { success: true, alreadySubscribed: true };
        }
        // Re-activate
        await db
          .update(newsletterSubscribers)
          .set({ isActive: true, unsubscribedAt: null })
          .where(eq(newsletterSubscribers.id, existing.id));
        if (magazineIssue1) {
          sendNewsletterWelcomeWithMagazineIssue1(input.email, input.name).then((sent) => {
            if (sent) {
              db.update(newsletterSubscribers)
                .set({ welcomeSentAt: new Date() })
                .where(eq(newsletterSubscribers.email, input.email))
                .catch(() => {});
            }
          }).catch(() => {});
        }
        return { success: true, alreadySubscribed: false };
      }

      // Insert new subscriber
      await db.insert(newsletterSubscribers).values({
        email: input.email,
        name: input.name,
        source: input.source ?? "website",
        isActive: true,
      });

      // Send welcome email (non-blocking) — single combined message for magazine_issue_1
      if (magazineIssue1) {
        sendNewsletterWelcomeWithMagazineIssue1(input.email, input.name).then((sent) => {
          if (sent) {
            db.update(newsletterSubscribers)
              .set({ welcomeSentAt: new Date() })
              .where(eq(newsletterSubscribers.email, input.email))
              .catch(() => {});
          }
        }).catch(() => {});
      } else {
        sendNewsletterWelcome(input.email, input.name).then((sent) => {
          if (sent) {
            db.update(newsletterSubscribers)
              .set({ welcomeSentAt: new Date() })
              .where(eq(newsletterSubscribers.email, input.email))
              .catch(() => {});
          }
        }).catch(() => {});
      }

      return { success: true, alreadySubscribed: false };
    }),

  /** Unsubscribe */
  unsubscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(newsletterSubscribers)
        .set({ isActive: false, unsubscribedAt: new Date() })
        .where(eq(newsletterSubscribers.email, input.email));

      return { success: true };
    }),
});
