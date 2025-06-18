import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";
import { AgentGetByIdOutput } from "@/modules/agents/types";

type UpdateAgentDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  agentData: AgentGetByIdOutput;
};

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  agentData,
}: UpdateAgentDialogProps) => (
  <ResponsiveDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Update Agent"
    description="Update the agent"
  >
    <AgentForm
      onSuccess={onOpenChange}
      onCancel={onOpenChange}
      initialValues={agentData}
    />
  </ResponsiveDialog>
);
