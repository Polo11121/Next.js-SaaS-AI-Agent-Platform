import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { cn } from "@/lib/utils";

type GeneratedAvatarProps = {
  seed: string;
  className?: string;
  variant: "initials" | "botttsNeutral";
};

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  const avatar = () => {
    if (variant === "initials") {
      createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
    }
    return createAvatar(botttsNeutral, { seed });
  };

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar().toDataUri()} alt="Generated avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
