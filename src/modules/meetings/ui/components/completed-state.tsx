import { MeetingGetByIdOutput } from "@/modules/meetings/types";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CompletedRecordings } from "@/modules/meetings/ui/components/completed-recordings";
import { CompletedSummary } from "@/modules/meetings/ui/components/completed-summary";
import { CompletedTabList } from "@/modules/meetings/ui/components/completed-tablist";

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
      <TabsContent value="summary">
        <CompletedSummary data={data} />
      </TabsContent>
    </Tabs>
  </div>
);
