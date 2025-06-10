import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

type SocialsButtonsProps = {
  isLoading: boolean;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const SocialsButtons = ({
  isLoading,
  setError,
  setIsLoading,
}: SocialsButtonsProps) => {
  const router = useRouter();

  const handleSignInWithGithub = async () => {
    setError(null);
    setIsLoading(true);
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
          setIsLoading(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Button
      variant="outline"
      className="w-full hover:cursor-pointer"
      type="button"
      disabled={isLoading}
      onClick={handleSignInWithGithub}
    >
      <FaGithub className="h-4 w-4" />
      Github
    </Button>
  );
};
