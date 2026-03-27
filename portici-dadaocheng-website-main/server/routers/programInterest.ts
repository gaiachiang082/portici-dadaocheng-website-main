import { z } from "zod";
import { getDb } from "../db";
import { programInterests } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";

export const programInterestRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().max(256).optional(),
        topicSlug: z.string().min(1).max(128),
        topicTitle: z.string().min(1).max(256),
        note: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(programInterests).values({
        email: input.email.trim(),
        name: input.name?.trim() || null,
        topicSlug: input.topicSlug.trim(),
        topicTitle: input.topicTitle.trim(),
        note: input.note?.trim() || null,
      });

      return { success: true as const };
    }),
});
