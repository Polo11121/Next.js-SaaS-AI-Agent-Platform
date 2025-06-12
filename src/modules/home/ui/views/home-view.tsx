"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.hello.queryOptions({ text: "Antonio" }));

  console.log(data);

  return <div>HomeView</div>;
};
