import { ReactNode, Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/error-state";

type SuspenseErrorBoundaryProps = {
  queryClient: QueryClient;
  children: ReactNode;
  title: string;
};

export const SuspenseErrorBoundary = ({
  queryClient,
  title,
  children,
}: SuspenseErrorBoundaryProps) => (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense
      fallback={
        <LoadingState
          title={`Loading ${title}`}
          description="This may take a few seconds"
        />
      }
    >
      <ErrorBoundary
        fallback={
          <ErrorState
            title={`Error loading ${title}`}
            description="Please try again later"
          />
        }
      >
        {children}
      </ErrorBoundary>
    </Suspense>
  </HydrationBoundary>
);
