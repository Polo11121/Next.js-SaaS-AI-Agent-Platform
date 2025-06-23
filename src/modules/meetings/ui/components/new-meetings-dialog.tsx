import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";

type NewMeetingDialogProps = {
  open: boolean;
  onOpenChange: () => void;
};

export const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewMeetingDialogProps) => (
  <ResponsiveDialog
    open={open}
    onOpenChange={onOpenChange}
    title="New Meeting"
    description="Create a new meeting"
  >
    <MeetingForm onSuccess={onOpenChange} onCancel={onOpenChange} />
  </ResponsiveDialog>
);
