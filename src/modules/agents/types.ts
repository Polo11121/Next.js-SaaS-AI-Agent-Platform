import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type AgentGetByIdOutput =
  inferRouterOutputs<AppRouter>["agents"]["getById"];

export type AgentGetManyOutput =
  inferRouterOutputs<AppRouter>["agents"]["getMany"]["items"];
