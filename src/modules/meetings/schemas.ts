import { z } from "zod";

export const createMeetingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent ID is required" }),
});

export type CreateMeetingSchema = z.infer<typeof createMeetingSchema>;

export const updateMeetingSchema = createMeetingSchema.extend({
  id: z.string().min(1, { message: "Agent ID is required" }),
});

export type UpdateMeetingSchema = z.infer<typeof updateMeetingSchema>;
