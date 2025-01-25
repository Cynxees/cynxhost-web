// app/onboarding/layout.tsx
"use client";

import { ReactNode } from "react";
import { OnboardingProvider, useOnboarding } from "./context"; // Import provider and hook
import { Button, Divider, Progress } from "@heroui/react";
import { ArrowLeft } from "solar-icon-set";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProvider>
      <OnboardingLayoutContent>{children}</OnboardingLayoutContent>
    </OnboardingProvider>
  );
}

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state } = useOnboarding(); // Use the context hook to get title or state

  const totalSteps = 3;

  return (
    <div className="flex flex-col gap-4">
      <Progress className="bg-secondary" color="primary" value={(state.step / totalSteps) * 100} />

      <div className="flex flex-row gap-2 h-10">
        <ArrowLeft className="my-auto" size={30} />
        {state.title && <h1 className="my-auto">{state.title}</h1>}
      </div>

      <Divider className="w-full h-0.5"></Divider>
      <div className="">{children}</div>
    </div>
  );
}
