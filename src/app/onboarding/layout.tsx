// app/onboarding/layout.tsx
"use client";

import { ReactNode } from "react";
import { OnboardingProvider, useOnboarding } from "./context"; // Import provider and hook
import { Button, Divider, Progress } from "@heroui/react";
import { ArrowLeft } from "solar-icon-set";
import { useRouter } from "next/navigation";

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

const stepRoutes: { [key: number]: string } = {
  1: "/onboarding/game",
  2: "/onboarding/game-detail",
  3: "/onboarding/confirm",
};

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state, setState } = useOnboarding(); // Use the context hook to get title or state
  const router = useRouter();

  const totalSteps = 3;

  const handleBack = () => {
    // Go back to the previous step

    const currentStep = state.step - 1;

    if (currentStep < 1) {
      return;
    }

    setState({
      ...state,
      step: currentStep,
    });

    // Redirect to the previous page
    router.push(stepRoutes[currentStep]);
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      <Progress
        className="bg-secondary"
        color="primary"
        value={(state.step / totalSteps) * 100}
      />

      {state.step === 1 ? (
        ""
      ) : (
        <>
          <div className="flex flex-row gap-2 h-10">
            <ArrowLeft className="my-auto" size={30} onClick={handleBack} />
            {state.title && <h1 className="my-auto">{state.title}</h1>}
          </div>
          <Divider className="w-full h-0.5"></Divider>
        </>
      )}

      <div className="">{children}</div>
    </div>
  );
}
