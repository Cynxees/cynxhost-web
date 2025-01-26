// app/onboarding/layout.tsx
"use client";

import { Divider, Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { ArrowLeft } from "solar-icon-set";
import { OnboardingProvider, useOnboarding } from "../context"; // Import provider and hook

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

type Step = {
  route: string;
  text: string;
  percent: number;
};

const steps: Step[] = [
  {
    route: "/onboarding/form/game",
    text: "Game",
    percent: 10,
  },
  {
    route: "/onboarding/form/game-detail",
    text: "Game Details",
    percent: 50,
  },
  {
    route: "/onboarding/form/confirm",
    text: "Confirm",
    percent: 75,
  },
];

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state, setState } = useOnboarding();

  const router = useRouter();

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
    router.push(steps[currentStep - 1].route);
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      <div className="flex flex-col gap-2 w-full">
        <Progress
          about="Progress bar"
          className="bg-foreground"
          value={steps[state.step - 1].percent}
          classNames={{
            track: "",
            indicator: "bg-gradient-to-r from-secondary to-primary",
          }}
        />
        <div className="relative">
          <div className="absolute top-0 left-0 flex w-full justify-between text-sm text-center text-muted-foreground">
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  left: `${step.percent}%`,
                  transform: index === 0 ? "translateX(0)" : "translateX(-50%)",
                }}
                className="absolute"
              >
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </div>

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
