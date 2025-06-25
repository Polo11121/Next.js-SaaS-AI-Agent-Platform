"use client";

import { ErrorState } from "@/components/error-state";
import { MeetingStatus } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "@/modules/call/ui/components/call-provider";

type CallViewProps = {
  meetingId: string;
};

export const CallView = ({ meetingId }: CallViewProps) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getById.queryOptions({
      id: meetingId,
    })
  );

  if (data.status === MeetingStatus.Completed) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }
  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};
