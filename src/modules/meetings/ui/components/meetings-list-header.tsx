"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meetings-dialog";
import { SearchFilter } from "@/components/search-filter";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export const MeetingsListHeader = () => {
  const { filters, handleSearch, handleClearFilters } = useMeetingsFilters();
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const handleToggleDialogVisibility = () =>
    setIsNewMeetingDialogOpen((prev) => !prev);

  return (
    <>
      <NewMeetingDialog
        open={isNewMeetingDialogOpen}
        onOpenChange={handleToggleDialogVisibility}
      />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Meetings</h5>
          <Button onClick={handleToggleDialogVisibility}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <SearchFilter
          isAnyFilterModified={isAnyFilterModified}
          onClearFilters={handleClearFilters}
          placeholder="Filter by name"
          searchTerm={filters.search}
          onSearch={handleSearch}
        />
      </div>
    </>
  );
};
