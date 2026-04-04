import { z } from "zod";
import { eq } from "drizzle-orm";
import { MAGAZINE_ISSUE_1_SOURCE } from "@shared/const";
import { getDb } from "../db";
import { newsletterSubscribers } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import {
  sendMagazineIssue1Delivery,
  sendNewsletterWelcomeEmail,
  sendNewsletterWelcomeWithMagazineIssue1,
} from "../email/resend";

function isMagazineIssue1Subscribe(source?: string) {
  return source === MAGAZINE_ISSUE_1_SOURCE;
}

/** Log-friendly; keeps domain for debugging deliverability. */
function logEmailHint(email: string): string {
  const at = email.indexOf("@");
  if (at <= 0) return "(invalid)";
  return `***${email.slice(at)}`;
}

export const newsletterRouter = router({
  /** Subscribe to newsletter */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().max(256).optional(),
        source: z.string().max(64).optional(),
        language: z.enum(["it", "zh", "en"]).default("it"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const magazineIssue1 = isMagazineIssue1Subscribe(input.source);
      /** Set when an outbound email was attempted; false = Resend returned failure or key missing. */
      let emailSent: boolean | undefined;

      // Check if already subscribed
      const [existing] = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, input.email));

      if (existing) {
        if (existing.isActive) {
          if (magazineIssue1) {
            // Await so send finishes in this request, `emailSent` is accurate, and DB `welcomeSentAt` stays in sync
            emailSent = await sendMagazineIssue1Delivery(input.email, input.name, { repeatDelivery: true });
            if (!emailSent) {
              console.error("[Newsletter] sendMagazineIssue1Delivery failed after subscribe", {
                hint: logEmailHint(input.email),
                source: input.source,
                branch: "already_active",
              });
            }
          }
          return { success: true, alreadySubscribed: true, emailSent };
        }
        // Re-activate
        await db
          .update(newsletterSubscribers)
          .set({
            isActive: true,
            unsubscribedAt: null,
            language: input.language,
          })
          .where(eq(newsletterSubscribers.id, existing.id));
        if (magazineIssue1) {
          emailSent = await sendNewsletterWelcomeWithMagazineIssue1(input.email, input.name);
          if (emailSent) {
            await db
              .update(newsletterSubscribers)
              .set({ welcomeSentAt: new Date() })
              .where(eq(newsletterSubscribers.email, input.email));
          } else {
            console.error("[Newsletter] sendNewsletterWelcomeWithMagazineIssue1 failed after reactivate", {
              hint: logEmailHint(input.email),
              source: input.source,
              branch: "reactivate",
            });
          }
        } else {
          emailSent = await sendNewsletterWelcomeEmail(input.email, input.name, input.language);
          if (emailSent) {
            await db
              .update(newsletterSubscribers)
              .set({ welcomeSentAt: new Date() })
              .where(eq(newsletterSubscribers.email, input.email));
          } else {
            console.error("[Newsletter] sendNewsletterWelcomeEmail failed after reactivate", {
              hint: logEmailHint(input.email),
              source: input.source ?? "website",
              branch: "reactivate_general",
            });
          }
        }
        return { success: true, alreadySubscribed: false, emailSent };
      }

      // Insert new subscriber
      await db.insert(newsletterSubscribers).values({
        email: input.email,
        name: input.name,
        source: input.source ?? "website",
        language: input.language,
        isActive: true,
      });

      if (magazineIssue1) {
        emailSent = await sendNewsletterWelcomeWithMagazineIssue1(input.email, input.name);
        if (emailSent) {
          await db
            .update(newsletterSubscribers)
            .set({ welcomeSentAt: new Date() })
            .where(eq(newsletterSubscribers.email, input.email));
        } else {
          console.error("[Newsletter] sendNewsletterWelcomeWithMagazineIssue1 failed after insert", {
            hint: logEmailHint(input.email),
            source: input.source,
            branch: "new_magazine",
          });
        }
      } else {
        emailSent = await sendNewsletterWelcomeEmail(input.email, input.name, input.language);
        if (emailSent) {
          await db
            .update(newsletterSubscribers)
            .set({ welcomeSentAt: new Date() })
            .where(eq(newsletterSubscribers.email, input.email));
        } else {
          console.error("[Newsletter] sendNewsletterWelcomeEmail failed after insert", {
            hint: logEmailHint(input.email),
            source: input.source ?? "website",
            branch: "new_default",
          });
        }
      }

      return { success: true, alreadySubscribed: false, emailSent };
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
