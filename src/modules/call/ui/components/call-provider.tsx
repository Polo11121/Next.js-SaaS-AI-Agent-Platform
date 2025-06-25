"use client";

import { authClient } from "@/lib/auth-client";
import { CallConnect } from "@/modules/call/ui/components/call-connect";
import { generateAvatarUri } from "@/lib/avatar";
import { Loader } from "@/components/loader";

type CallProviderProps = {
  meetingId: string;
  meetingName: string;
};

export const CallProvider = ({ meetingId, meetingName }: CallProviderProps) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return <Loader />;
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};
