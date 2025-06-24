import { useState } from "react";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/modules/meetings/ui/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { MAX_PAGE_SIZE } from "@/constants";

export const AgentIdFilter = () => {
  const [agentSearch, setAgentSearch] = useState("");
  const { handleAgentIdChange, filters } = useMeetingsFilters();
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: MAX_PAGE_SIZE,
      search: agentSearch,
    })
  );

  const handleAgentSearch = (searchTerm: string) => setAgentSearch(searchTerm);

  const options = (data?.items ?? []).map((agent) => ({
    id: agent.id,
    value: agent.id,
    children: (
      <div className="flex items-center gap-x-2">
        <GeneratedAvatar
          seed={agent.name}
          variant="botttsNeutral"
          className="size-4"
        />
        {agent.name}
      </div>
    ),
  }));

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={options}
      onSelect={handleAgentIdChange}
      value={filters.agentId}
      onSearch={handleAgentSearch}
    />
  );
};
