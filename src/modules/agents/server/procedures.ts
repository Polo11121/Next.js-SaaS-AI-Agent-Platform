import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { db } from "@/db";
import { createAgentSchema } from "@/modules/agents/schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  getMany: protectedProcedure.query(async () => await db.select().from(agents)),
  create: protectedProcedure
    .input(createAgentSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
