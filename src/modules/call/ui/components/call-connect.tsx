"use client";

import { useEffect, useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  Call,
  StreamVideoClient,
  CallingState,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query";
import { CallUI } from "@/modules/call/ui/components/call-ui";
import { Loader } from "@/components/loader";

export type CallConnectProps = {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
};

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: CallConnectProps) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });

    setClient(_client);

    return () => {
      _client.disconnectUser();
      setClient(undefined);
    };
  }, [generateToken, userId, userImage, userName]);

  useEffect(() => {
    if (!client) {
      return;
    }

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();

    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return <Loader />;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
