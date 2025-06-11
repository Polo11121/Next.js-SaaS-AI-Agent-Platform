import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });

  if (isPending || !data?.user)
    return <Skeleton className="h-[58px] w-full rounded-lg bg-white/10" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-3 hover:cursor-pointer">
        {!data?.user.image ? (
          <Avatar className="size-9">
            <AvatarImage src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS5thLI3fFiUDtrEWsnphZFuxsjO_sKIKicek84NelQPPgXRdgmeOp0_6nH7eYPEgF11WGnVMvEEtcCCKkwY6-koYimCvsOzFRvD_zWzylh" />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p>{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-xs font-normal text-muted-foreground truncate">
              {data.user.email}
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
          onClick={handleLogout}
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
