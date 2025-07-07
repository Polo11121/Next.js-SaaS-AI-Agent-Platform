"use client";

import { ChatUI } from "@/modules/meetings/ui/components/chat-ui";
import { LoadingState } from "@/components/loading-state";
import { authClient } from "@/lib/auth-client";

type ChatProviderProps = {
  meetingId: string;
  meetingName: string;
};

export const ChatProvider = ({ meetingId, meetingName }: ChatProviderProps) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <LoadingState
        title="Loading..."
        description="Please wait while we load the chat"
      />
    );
  }

  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ""}
    />
  );
};
