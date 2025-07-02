import { MeetingGetByIdOutput } from "@/modules/meetings/types";
import { SparklesIcon, ClockFadingIcon } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import Markdown from "react-markdown";
import Link from "next/link";

export const CompletedSummary = ({ data }: { data: MeetingGetByIdOutput }) => (
  <div className="bg-white rounded-lg border">
    <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
      <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
      <div className="flex gap-x-2 items-center">
        <Link
          href={`/agents/${data.agent.id}`}
          className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
        >
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={data.agent.id}
            className="size-5"
          />
          {data.agent.name}
        </Link>
        <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
        <div className="flex gap-x-2 items-center">
          <SparklesIcon className="size-4" />
          <p>General summary</p>
        </div>
        <Badge
          variant="outline"
          className="flex gap-x-2 items-center [&>svg]:size-4"
        >
          <ClockFadingIcon className="text-blue-700" />
          {data.duration ? formatDuration(data.duration) : "No duration"}
        </Badge>
      </div>
      <div>
        <Markdown
          components={{
            h1: (props) => (
              <h1 className="text-2xl font-medium mb-6" {...props} />
            ),
            h2: (props) => (
              <h2 className="text-xl font-medium mb-6" {...props} />
            ),
            h3: (props) => (
              <h3 className="text-lg font-medium mb-6" {...props} />
            ),
            h4: (props) => (
              <h4 className="text-base font-medium mb-6" {...props} />
            ),
            p: (props) => <p className="mb-6 leading-relaxed" {...props} />,
            ul: (props) => (
              <ul className="list-disc list-inside mb-6" {...props} />
            ),
            ol: (props) => (
              <ol className="list-decimal list-inside mb-6" {...props} />
            ),
            li: (props) => <li className="mb-1" {...props} />,
            strong: (props) => <strong className="font-semibold" {...props} />,
            code: (props) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />
            ),
            blockquote: (props) => (
              <blockquote className="border-l-4 pl-4 italic my-4" {...props} />
            ),
          }}
        >
          {data.summary}
        </Markdown>
      </div>
    </div>
  </div>
);
