import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents, meetings } from "@/db/schema";
import { db } from "@/db";
import { z } from "zod";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { TRPCError } from "@trpc/server";
import {
  createMeetingSchema,
  updateMeetingSchema,
} from "@/modules/meetings/schemas";

export const meetingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createMeetingSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdMeeting;
    }),
  update: protectedProcedure
    .input(updateMeetingSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();

      if (!updatedMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        });
      }

      return updatedMeeting;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );

      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }

      return existingMeeting;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
      })
    )
    .query(async ({ input, ctx }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select()
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset(page * pageSize);

      const total = await db
        .select({ count: count() })
        .from(meetings)
        .where(eq(meetings.userId, ctx.auth.user.id));

      const totalPages = Math.ceil(total[0].count / pageSize);

      return { items: data, total, totalPages };
    }),
});
