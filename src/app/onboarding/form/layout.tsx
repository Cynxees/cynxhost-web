// app/onboarding/layout.tsx
"use client";

import { ReactNode } from "react";
import { OnboardingProvider, useOnboarding } from "../context"; // Import provider and hook
import { Divider, Progress } from "@heroui/react";
import { ArrowLeft } from "solar-icon-set";
import { useRouter } from "next/navigation";

export default function OnboardingFormLayout({
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
  1: "/onboarding/form/game",
  2: "/onboarding/form/game-detail",
  3: "/onboarding/form/confirm",
};

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state, setState } = useOnboarding(); // Use the context hook to get title or state
  const router = useRouter();

  const totalSteps = 3;

  const onClickBack = () => {
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
        className="bg-foreground"
        color="primary"
        value={(state.step / totalSteps) * 100}
        classNames={{
          track: "",
        }}
      />

      {state.step === 1 ? (
        ""
      ) : (
        <>
          <div className="flex flex-row gap-2 h-10">
            <ArrowLeft
              className="mt-auto cursor-pointer hover:scale-105"
              size={30}
              onClick={onClickBack}
              color="cyan"
            />
            {state.title && <h1 className="my-auto">{state.title}</h1>}
          </div>
          <Divider className="w-full h-0.5" />
        </>
      )}

      <div className="">{children}</div>
    </div>
  );
}
