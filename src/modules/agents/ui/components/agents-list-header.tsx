"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { AgentsSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [open, setOpen] = useState(false);

  const handleToggleModalVisibility = () => setOpen((prev) => !prev);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => setFilters({ search: "", page: DEFAULT_PAGE });

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={handleToggleModalVisibility} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Agents</h5>
          <Button onClick={handleToggleModalVisibility}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={onClearFilters}
            >
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
