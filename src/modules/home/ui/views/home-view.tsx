"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Logged in as {session.user.name}</p>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};
