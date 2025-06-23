import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type MeetingGetByIdOutput =
  inferRouterOutputs<AppRouter>["meetings"]["getById"];

export type MeetingGetManyOutput =
  inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
