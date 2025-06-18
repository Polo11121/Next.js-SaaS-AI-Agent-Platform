import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { trpc } from "@/trpc/server";
import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { prefetch } from "@/server/prefetch";

type AgentPageProps = {
  params: Promise<{ agentId: string }>;
};

const AgentPage = async ({ params }: AgentPageProps) => {
  const { agentId } = await params;
  const queryClient = prefetch(
    trpc.agents.getById.queryOptions({ id: agentId })
  );

  return (
    <SuspenseErrorBoundary queryClient={queryClient} title="agent">
      <AgentIdView agentId={agentId} />
    </SuspenseErrorBoundary>
  );
};

export default AgentPage;
