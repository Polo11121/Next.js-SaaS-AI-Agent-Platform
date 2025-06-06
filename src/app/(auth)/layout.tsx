import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="bg-muted flex min-h-svh flex-col justify-center items-center p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
  </div>
);

export default AuthLayout;
