import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";
import { MeetingGetByIdOutput } from "@/modules/meetings/types";

type UpdateMeetingDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  meetingData: MeetingGetByIdOutput;
};

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  meetingData,
}: UpdateMeetingDialogProps) => (
  <ResponsiveDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Update Meeting"
    description="Update a new meeting"
  >
    <MeetingForm
      onSuccess={onOpenChange}
      onCancel={onOpenChange}
      initialValues={meetingData}
    />
  </ResponsiveDialog>
);
