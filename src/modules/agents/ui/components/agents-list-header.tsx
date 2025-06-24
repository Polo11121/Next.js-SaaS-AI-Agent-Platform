"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { SearchFilter } from "@/components/search-filter";
import { ClearFilters } from "@/components/clear-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const AgentsListHeader = () => {
  const { filters, handleClearFilters, handleSearch, isAnyFilterModified } =
    useAgentsFilters();
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false);

  const handleToggleDialogVisibility = () =>
    setIsNewAgentDialogOpen((prev) => !prev);

  return (
    <>
      <NewAgentDialog
        open={isNewAgentDialogOpen}
        onOpenChange={handleToggleDialogVisibility}
      />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Agents</h5>
          <Button onClick={handleToggleDialogVisibility}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <SearchFilter
              placeholder="Filter by name"
              searchTerm={filters.search}
              onSearch={handleSearch}
            />
            <ClearFilters
              onClearFilters={handleClearFilters}
              isAnyFilterModified={isAnyFilterModified}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
