import { MeetingInfoState } from "@/modules/meetings/ui/components/meeting-info-state";

export const ProcessingState = () => (
  <MeetingInfoState
    image="/processing.svg"
    title="Meeting completed"
    description="This meeting was completed, a summary will appear soon"
  />
);
