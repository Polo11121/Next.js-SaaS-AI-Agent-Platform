import { MeetingInfoState } from "@/modules/meetings/ui/components/meeting-info-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

type UpcomingStateProps = {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
};

export const UpcomingState = ({
  isCancelling,
  meetingId,
  onCancelMeeting,
}: UpcomingStateProps) => (
  <MeetingInfoState
    image="/upcoming.svg"
    title="Not started yet"
    description="Once you start this meeting, a summary will appear here"
  >
    <Button
      variant="secondary"
      className="w-full lg:w-auto"
      onClick={onCancelMeeting}
      disabled={isCancelling}
    >
      <BanIcon />
      Cancel meeting
    </Button>
    <Button asChild className="w-full lg:w-auto">
      <Link href={`/call/${meetingId}`}>
        <VideoIcon />
        Start meeting
      </Link>
    </Button>
  </MeetingInfoState>
);
