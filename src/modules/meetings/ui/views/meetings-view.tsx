"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "@/modules/meetings/ui/components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export const MeetingsView = () => {
  const { filters } = useMeetingsFilters();
  const trpc = useTRPC();

  const {
    data: { items },
  } = useSuspenseQuery(trpc.meetings.getMany.queryOptions(filters));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
      <DataTable data={items} columns={columns} onRowClick={() => {}} />
      {items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};
