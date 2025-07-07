import { MeetingGetByIdOutput } from "@/modules/meetings/types";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CompletedRecordings } from "@/modules/meetings/ui/components/completed-recordings";
import { CompletedSummary } from "@/modules/meetings/ui/components/completed-summary";
import { CompletedTabList } from "@/modules/meetings/ui/components/completed-tablist";
import { Transcript } from "@/modules/meetings/ui/components/transcript";
import { ChatProvider } from "@/modules/meetings/ui/components/chat-provider";

type CompletedStateProps = {
  data: MeetingGetByIdOutput;
};

export const CompletedState = ({ data }: CompletedStateProps) => (
  <div className="flex flex-col gap-y-4">
    <Tabs defaultValue="summary">
      <CompletedTabList />
      <TabsContent value="recordings">
        <CompletedRecordings url={data.recordingUrl!} />
      </TabsContent>
      <TabsContent value="chat">
        <ChatProvider meetingId={data.id} meetingName={data.name} />
      </TabsContent>
      <TabsContent value="transcript">
        <Transcript meetingId={data.id} />
      </TabsContent>
      <TabsContent value="summary">
        <CompletedSummary data={data} />
      </TabsContent>
    </Tabs>
  </div>
);
