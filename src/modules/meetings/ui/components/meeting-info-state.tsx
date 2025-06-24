import { ReactNode } from "react";
import { InfoState } from "@/components/empty-state";

type MeetingInfoStateProps = {
  image: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export const MeetingInfoState = ({
  image,
  title,
  description,
  children,
}: MeetingInfoStateProps) => (
  <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
    <InfoState description={description} image={image} title={title} />
    {children && (
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        {children}
      </div>
    )}
  </div>
);
