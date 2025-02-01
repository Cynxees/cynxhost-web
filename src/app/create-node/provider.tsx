"use client";

import { OnboardingProvider } from "../_lib/providers/onboardingProvider";

export default function OnboardingProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
