"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const AgentsListHeader = () => {
  const [open, setOpen] = useState(false);

  const handleToggleModalVisibility = () => setOpen((prev) => !prev);

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
      </div>
    </>
  );
};
