import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { agents } from "@/db/schema";
import { db } from "@/db";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => await db.select().from(agents)),
});
