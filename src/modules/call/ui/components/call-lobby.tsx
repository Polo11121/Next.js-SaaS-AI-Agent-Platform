"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "Unknown",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "Unknown",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => (
  <p className="text-sm text-center">
    Please grant your browser permissions to access your camera and microphone.
  </p>
);

type CallLobbyProps = {
  onJoin: () => void;
};

export const CallLobby = ({ onJoin }: CallLobbyProps) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasCameraPermissions } = useCameraState();
  const { hasBrowserPermission: hasMicrophonePermissions } =
    useMicrophoneState();

  const hasPermissions = hasCameraPermissions && hasMicrophonePermissions;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasPermissions ? AllowBrowserPermissions : DisabledVideoPreview
            }
          />
          <div className="flex gap-x-2">
            <ToggleVideoPreviewButton />
            <ToggleAudioPreviewButton />
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button variant="ghost" asChild>
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin} disabled={!hasPermissions}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
