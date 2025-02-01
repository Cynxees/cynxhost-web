"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { LoadingProvider } from "./_lib/providers/loadingProvider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
