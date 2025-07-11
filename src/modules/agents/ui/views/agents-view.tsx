"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";
import { InfoState } from "@/components/empty-state";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { DataPagination } from "@/modules/agents/ui/components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
  const { filters, handlePageChange } = useAgentsFilters();
  const trpc = useTRPC();
  const router = useRouter();

  const {
    data: { items, totalPages },
  } = useSuspenseQuery(trpc.agents.getMany.queryOptions(filters));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {items.length === 0 && (
        <InfoState
          image="/empty.svg"
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};
