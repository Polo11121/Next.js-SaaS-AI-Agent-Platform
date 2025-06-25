import { PropsWithChildren } from "react";

const CallLayout = ({ children }: PropsWithChildren) => (
  <div className="h-screen bg-black">{children}</div>
);

export default CallLayout;
