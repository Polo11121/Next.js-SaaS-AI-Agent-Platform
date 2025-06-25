import { LoaderIcon } from "lucide-react";

export const Loader = () => (
  <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
    <LoaderIcon className="size-6 animate-spin text-white" />
  </div>
);
