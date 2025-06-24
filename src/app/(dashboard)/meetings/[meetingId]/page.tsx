import { SuspenseErrorBoundary } from "@/components/suspense-error-boundry";
import { MeetingIdView } from "@/modules/meetings/ui/views/meeting-id-view";
import { prefetch } from "@/server/prefetch";
import { trpc } from "@/trpc/server";

type MeetingPageProps = {
  params: Promise<{ meetingId: string }>;
};

const MeetingPage = async ({ params }: MeetingPageProps) => {
  const { meetingId } = await params;
  const queryClient = prefetch(
    trpc.meetings.getById.queryOptions({ id: meetingId })
  );

  return (
    <SuspenseErrorBoundary queryClient={queryClient} title="meeting">
      <MeetingIdView meetingId={meetingId} />
    </SuspenseErrorBoundary>
  );
};

export default MeetingPage;
