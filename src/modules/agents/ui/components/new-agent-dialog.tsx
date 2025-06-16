import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";

type NewAgentDialogProps = {
  open: boolean;
  onOpenChange: () => void;
};

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => (
  <ResponsiveDialog
    open={open}
    onOpenChange={onOpenChange}
    title="New Agent"
    description="Create a new agent"
  >
    <AgentForm onSuccess={onOpenChange} onCancel={onOpenChange} />
  </ResponsiveDialog>
);
