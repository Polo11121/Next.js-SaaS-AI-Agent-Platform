import Image from "next/image";

type InfoStateProps = {
  title: string;
  description: string;
  image: string;
};

export const InfoState = ({ title, description, image }: InfoStateProps) => (
  <div className="flex flex-col items-center justify-center">
    <Image src={image} alt="Empty state" width={240} height={240} />
    <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  </div>
);
