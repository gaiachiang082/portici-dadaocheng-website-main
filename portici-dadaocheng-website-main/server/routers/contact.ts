import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { contactMessages } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import { sendContactFormToAdmin } from "../email/resend";

const SUBJECT_LABELS: Record<string, string> = {
  workshop: "Informazioni sui Workshop",
  collaboration: "Proposta di Collaborazione",
  press: "Press & Media",
  other: "Altro",
};

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(256),
        email: z.string().email(),
        subject: z.enum(["workshop", "collaboration", "press", "other"]),
        message: z.string().min(1).max(8000),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.name.trim().slice(0, 256);
      const email = input.email.trim().toLowerCase();
      const message = input.message.trim();
      if (!name || !message) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Compila tutti i campi obbligatori." });
      }

      const db = await getDb();
      const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());

      if (!db && !hasResend) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Servizio temporaneamente non disponibile. Riprovate più tardi.",
        });
      }

      let savedDb = false;
      if (db) {
        try {
          await db.insert(contactMessages).values({
            name,
            email: email.slice(0, 320),
            subject: input.subject,
            message: message.slice(0, 8000),
          });
          savedDb = true;
        } catch (e) {
          console.error("[contact] DB insert failed:", e);
        }
      }

      const subjectLabel = SUBJECT_LABELS[input.subject] ?? input.subject;
      const emailed = await sendContactFormToAdmin({
        name,
        email,
        subjectLabel,
        message: message.slice(0, 8000),
      });

      if (!savedDb && !emailed) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invio non riuscito. Riprovate tra poco.",
        });
      }

      return { success: true as const };
    }),
});
