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

      const email = input.email.trim();
      const topicSlug = input.topicSlug.trim().slice(0, 128);
      const topicTitle = input.topicTitle.trim().slice(0, 256);
      const name = input.name?.trim() ? input.name.trim().slice(0, 256) : null;
      const note = input.note?.trim() ? input.note.trim().slice(0, 2000) : null;

      await db.insert(programInterests).values({
        email,
        name,
        topicSlug,
        topicTitle,
        note,
      });

      return { success: true as const };
    }),
});
