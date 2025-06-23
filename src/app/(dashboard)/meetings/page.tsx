import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { prefetch } from "@/server/prefetch";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { trpc } from "@/trpc/server";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";

const MeetingPage = async () => {
  const queryClient = prefetch(trpc.agents.getMany.queryOptions({}));

  return (
    <>
      <MeetingsListHeader />
      <SuspenseErrorBoundary queryClient={queryClient} title="meetings">
        <MeetingsView />
      </SuspenseErrorBoundary>
    </>
  );
};

export default MeetingPage;
