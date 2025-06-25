import { LoaderIcon } from "lucide-react";

type LoadingStateProps = {
  title: string;
  description: string;
};

export const LoadingState = ({ title, description }: LoadingStateProps) => (
  <div className="py-4 px-8 flex flex-1 items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
      <LoaderIcon className="size-6 animate-spin text-primary" />
      <div className="flex flex-col gap-y-2 text-center">
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  </div>
);
