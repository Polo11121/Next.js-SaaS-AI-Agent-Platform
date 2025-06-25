"use client";

import { useState } from "react";
import { CallLobby } from "@/modules/call/ui/components/call-lobby";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { CallActive } from "@/modules/call/ui/components/call-active";
import { CallEnded } from "@/modules/call/ui/components/call-ended";

type CallUIProps = {
  meetingName: string;
};

export const CallUI = ({ meetingName }: CallUIProps) => {
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const call = useCall();

  const handleJoin = async () => {
    if (!call) {
      return;
    }

    await call.join();
    setShow("call");
  };

  const handleLeave = async () => setShow("ended");

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
