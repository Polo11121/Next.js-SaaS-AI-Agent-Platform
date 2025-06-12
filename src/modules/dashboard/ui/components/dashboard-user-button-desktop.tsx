import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardUserButtonTrigger } from "./dashboard-user-button-trigger";
import { CreditCardIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { User } from "better-auth";

type DashboardUserButtonDesktopProps = {
  user: User;
  onLogout: () => void;
};

export const DashboardUserButtonDesktop = ({
  user,
  onLogout,
}: DashboardUserButtonDesktopProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-3 hover:cursor-pointer">
      <DashboardUserButtonTrigger user={user} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side="right" className="w-72">
      <DropdownMenuLabel>
        <div className="flex flex-col gap-1">
          <span className="font-medium truncate">{user.name}</span>
          <span className="text-xs font-normal text-muted-foreground truncate">
            {user.email}
          </span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="hover:cursor-pointer flex items-center justify-between">
        Billing
        <CreditCardIcon className="size-4" />
      </DropdownMenuItem>
      <DropdownMenuItem
        className="hover:cursor-pointer flex items-center justify-between"
        onClick={onLogout}
      >
        Logout
        <LogOutIcon className="size-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
