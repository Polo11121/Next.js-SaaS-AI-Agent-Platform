"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "@/modules/agents/ui/components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "@/modules/agents/ui/components/update-agent-dialog";

type AgentIdViewProps = {
  agentId: string;
};

export const AgentIdView = ({ agentId }: AgentIdViewProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getById.queryOptions({ id: agentId })
  );
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`
  );

  const deleteAgent = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/agents");
        toast.success("Agent deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleDelete = async () => {
    const confirmed = await confirm();

    if (!confirmed) {
      return;
    }

    deleteAgent.mutate({ id: agentId });
  };

  const handleToggleDialogVisibility = () =>
    setIsUpdateDialogOpen((prev) => !prev);

  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onUpdate={handleToggleDialogVisibility}
          onDelete={handleDelete}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&_svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog />
      <UpdateAgentDialog
        open={isUpdateDialogOpen}
        onOpenChange={handleToggleDialogVisibility}
        agentData={data}
      />
    </>
  );
};
