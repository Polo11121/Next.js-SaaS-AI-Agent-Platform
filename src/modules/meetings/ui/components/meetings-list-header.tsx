"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meetings-dialog";

export const MeetingsListHeader = () => {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false);

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
        <div className="flex items-center gap-x-2 p-1"></div>
      </div>
    </>
  );
};
