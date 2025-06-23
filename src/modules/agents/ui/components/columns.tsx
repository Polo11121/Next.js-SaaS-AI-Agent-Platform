"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetManyOutput } from "@/modules/agents/types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Agent = AgentGetManyOutput[number];

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar variant="botttsNeutral" seed={row.original.name} />
          <span className="capitalize font-medium">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate capitalize max-w-[200px]">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex items-center gap-x-2">
        <VideoIcon className="text-blue-700 [&>svg]:size-4" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    ),
  },
];
