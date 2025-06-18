import { getQueryClient } from "@/trpc/server";
import { SafeAny } from "@/types";
import { FetchQueryOptions } from "@tanstack/react-query";

export const prefetch = (
  prefetchQueryOptions: FetchQueryOptions<SafeAny, SafeAny, SafeAny, SafeAny>
) => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(prefetchQueryOptions);

  return queryClient;
};
