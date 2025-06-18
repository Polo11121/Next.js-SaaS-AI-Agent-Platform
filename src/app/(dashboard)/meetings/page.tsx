import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { prefetch } from "@/server/prefetch";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { trpc } from "@/trpc/server";

const MeetingPage = async () => {
  const queryClient = prefetch(trpc.agents.getMany.queryOptions({}));

  return (
    <SuspenseErrorBoundary queryClient={queryClient} title="meetings">
      <MeetingsView />
    </SuspenseErrorBoundary>
  );
};

export default MeetingPage;
