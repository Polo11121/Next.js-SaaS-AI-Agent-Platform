import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type DashboardCommandProps = {
  open: boolean;
  setOpen: () => void;
};

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => (
  <CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Find a meeting or agent..." />
    <CommandList>
      <CommandItem>Test</CommandItem>
    </CommandList>
  </CommandDialog>
);
