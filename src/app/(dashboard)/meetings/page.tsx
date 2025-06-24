import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { prefetch } from "@/server/prefetch";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { trpc } from "@/trpc/server";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { loadSearchParams } from "@/modules/meetings/params";
import { SearchParams } from "nuqs";

type MeetingsPageProps = {
  searchParams: Promise<SearchParams>;
};

const MeetingPage = async ({ searchParams }: MeetingsPageProps) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = prefetch(trpc.meetings.getMany.queryOptions(filters));

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
