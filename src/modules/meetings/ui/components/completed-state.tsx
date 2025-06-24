import { MeetingInfoState } from "@/modules/meetings/ui/components/meeting-info-state";

export const CompletedState = () => (
  <MeetingInfoState
    image="/completed.svg"
    title="Meeting completed"
    description="This meeting has ended. You can review the summary or recording below."
  />
);
