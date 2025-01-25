// app/onboarding/layout.tsx
"use client";

import { ReactNode } from "react";
import { OnboardingProvider, useOnboarding } from "./context"; // Import provider and hook
import { Button, Divider, Progress } from "@heroui/react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProvider>
      {" "}
      {/* Wrap the entire onboarding flow */}
      <OnboardingLayoutContent>{children}</OnboardingLayoutContent>
    </OnboardingProvider>
  );
}

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state } = useOnboarding(); // Use the context hook to get title or state

  const totalSteps = 3;

  return (
    <div className="">
      <Progress className="" value={(state.step / totalSteps) * 100} />

      <div className="flex">
        <Button variant="ghost"></Button>
        {state.title && <h1 className="">{state.title}</h1>}
      </div>
      <Divider className="w-full h-0.5"></Divider>
      <div className="">{children}</div>
    </div>
  );
}
