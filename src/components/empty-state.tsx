import Image from "next/image";

type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center">
    <Image src="/empty.svg" alt="Empty state" width={240} height={240} />
    <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  </div>
);
