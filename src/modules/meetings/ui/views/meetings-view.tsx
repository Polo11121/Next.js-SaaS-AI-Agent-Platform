"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "@/modules/meetings/ui/components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { DataPagination } from "@/modules/agents/ui/components/data-pagination";
import { useRouter } from "next/navigation";

export const MeetingsView = () => {
  const { filters, handlePageChange } = useMeetingsFilters();
  const trpc = useTRPC();
  const router = useRouter();

  const {
    data: { items, totalPages },
  } = useSuspenseQuery(trpc.meetings.getMany.queryOptions(filters));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
      <DataTable
        data={items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};
