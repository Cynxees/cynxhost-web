// app/onboarding/layout.tsx
"use client";

import { ReactNode } from "react";
import { OnboardingProvider } from "./context"; // Import provider and hook
import OnboardingFormLayout from "./form/layout";

export default function RootOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
