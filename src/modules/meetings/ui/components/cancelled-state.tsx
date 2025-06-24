import { MeetingInfoState } from "@/modules/meetings/ui/components/meeting-info-state";

export const CancelledState = () => (
  <MeetingInfoState
    image="/upcoming.svg"
    title="Meeting canceled"
    description="This meeting was cancelled"
  />
);
