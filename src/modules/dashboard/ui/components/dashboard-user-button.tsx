import { DashboardUserButtonDesktop } from "@/modules/dashboard/ui/components/dashboard-user-button-desktop";
import { DashboardUserButtonMobile } from "@/modules/dashboard/ui/components/dashboard-user-button-mobile";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });

  if (isPending || !data?.user) {
    return <Skeleton className="h-[58px] w-full rounded-lg bg-white/10" />;
  }

  if (isMobile) {
    return (
      <DashboardUserButtonMobile onLogout={handleLogout} user={data.user} />
    );
  }

  return (
    <DashboardUserButtonDesktop onLogout={handleLogout} user={data.user} />
  );
};
