import { DashboardUserButtonTrigger } from "@/modules/dashboard/ui/components/dashboard-user-button-trigger";
import { CreditCardIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type DashboardUserButtonMobileProps = {
  user: User;
  onLogout: () => void;
};

export const DashboardUserButtonMobile = ({
  user,
  onLogout,
}: DashboardUserButtonMobileProps) => (
  <Drawer>
    <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-3 hover:cursor-pointer">
      <DashboardUserButtonTrigger user={user} />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{user.name}</DrawerTitle>
        <DrawerDescription>{user.email}</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button variant="outline">
          <CreditCardIcon className="size-4 text-black" />
          Billing
        </Button>
        <Button onClick={onLogout} variant="outline">
          <LogOutIcon className="size-4 text-black" />
          Logout
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
