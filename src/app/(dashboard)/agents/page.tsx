import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";
import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { trpc } from "@/trpc/server";
import { prefetch } from "@/server/prefetch";

type AgentsPageProps = {
  searchParams: Promise<SearchParams>;
};

const AgentsPage = async ({ searchParams }: AgentsPageProps) => {
  const filters = await loadSearchParams(searchParams);

  const queryClient = prefetch(trpc.agents.getMany.queryOptions(filters));

  return (
    <>
      <AgentsListHeader />
      <SuspenseErrorBoundary queryClient={queryClient} title="agents">
        <AgentsView />
      </SuspenseErrorBoundary>
    </>
  );
};

export default AgentsPage;
