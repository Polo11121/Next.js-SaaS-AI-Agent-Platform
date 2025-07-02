import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenTextIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";

export const CompletedTabList = () => (
  <div className="bg-white rounded-lg border px-3">
    <ScrollArea>
      <TabsList className="p-0 bg-background justify-start rounded-none h-13">
        <TabsTrigger
          value="summary"
          className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
        >
          <BookOpenTextIcon />
          Summary
        </TabsTrigger>
        <TabsTrigger
          value="transcript"
          className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
        >
          <FileTextIcon />
          Transcript
        </TabsTrigger>
        <TabsTrigger
          value="recordings"
          className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
        >
          <FileVideoIcon />
          Recordings
        </TabsTrigger>
        <TabsTrigger
          value="chat"
          className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
        >
          <SparklesIcon />
          Ask AI
        </TabsTrigger>
        <TabsTrigger value="recording">Recording</TabsTrigger>
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);
