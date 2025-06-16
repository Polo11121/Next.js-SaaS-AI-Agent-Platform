"use client";

import { ErrorState } from "@/components/error-state";

const AgentsPageError = () => (
  <ErrorState
    title="Error loading agents"
    description="Please try again later"
  />
);

export default AgentsPageError;
