import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon } from "lucide-react";

type DashboardUserButtonTriggerProps = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  };
};

export const DashboardUserButtonTrigger = ({
  user: { name, email, image },
}: DashboardUserButtonTriggerProps) => (
  <>
    {image ? (
      <Avatar className="size-9">
        <AvatarImage src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS5thLI3fFiUDtrEWsnphZFuxsjO_sKIKicek84NelQPPgXRdgmeOp0_6nH7eYPEgF11WGnVMvEEtcCCKkwY6-koYimCvsOzFRvD_zWzylh" />
      </Avatar>
    ) : (
      <GeneratedAvatar seed={name} variant="initials" className="size-9" />
    )}
    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
      <p className="text-sm truncate w-full">{name}</p>
      <p>{email}</p>
    </div>
    <ChevronDownIcon className="size-4 shrink-0" />
  </>
);
