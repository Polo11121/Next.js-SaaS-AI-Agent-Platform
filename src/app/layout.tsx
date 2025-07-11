import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>
      <Toaster />
      <NuqsAdapter>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
