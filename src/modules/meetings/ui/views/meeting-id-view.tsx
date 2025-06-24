"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { ViewHeader } from "@/components/view-header";
import { UpdateMeetingDialog } from "@/modules/meetings/ui/components/update-meetings-dialog";
import { MeetingStatus } from "@/modules/meetings/types";
import { UpcomingState } from "@/modules/meetings/ui/components/upcoming-state";
import { ActiveState } from "@/modules/meetings/ui/components/active-state";
import { CancelledState } from "@/modules/meetings/ui/components/cancelled-state";
import { ProcessingState } from "@/modules/meetings/ui/components/processing-state";

type MeetingIdViewProps = {
  meetingId: string;
};

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.meetings.getById.queryOptions({ id: meetingId })
  );
  const [ConfirmDialog, confirm] = useConfirm("Are you sure?", ``);
  const deleteMeeting = useMutation(
    trpc.meetings.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
        toast.success("Meeting deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleToggleDialogVisibility = () =>
    setIsUpdateDialogOpen((prev) => !prev);

  const handleDelete = async () => {
    const confirmed = await confirm();

    if (!confirmed) {
      return;
    }

    deleteMeeting.mutate({ id: meetingId });
  };

  const isActive = data.status === MeetingStatus.Active;
  const isUpcoming = data.status === MeetingStatus.Upcoming;
  const isCancelled = data.status === MeetingStatus.Cancelled;
  const isCompleted = data.status === MeetingStatus.Completed;
  const isProcessing = data.status === MeetingStatus.Processing;

  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <ViewHeader
          page="meetings"
          id={meetingId}
          name={data.name}
          onUpdate={handleToggleDialogVisibility}
          onDelete={handleDelete}
        />

        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            isCancelling={false}
            onCancelMeeting={() => {}}
          />
        )}
      </div>
      <ConfirmDialog />
      <UpdateMeetingDialog
        open={isUpdateDialogOpen}
        onOpenChange={handleToggleDialogVisibility}
        meetingData={data}
      />
    </>
  );
};
