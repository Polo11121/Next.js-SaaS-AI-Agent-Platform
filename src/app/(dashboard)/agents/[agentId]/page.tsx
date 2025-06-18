import { Suspense } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type AgentPageProps = {
  params: Promise<{ agentId: string }>;
};

const AgentPage = async ({ params }: AgentPageProps) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getById.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading agent"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error loading agent"
              description="Please try again later"
            />
          }
        >
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentPage;
