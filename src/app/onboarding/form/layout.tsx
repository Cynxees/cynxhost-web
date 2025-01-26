// app/onboarding/layout.tsx
"use client";

import { Divider, Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
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

type Route = {
  route: string;
  text: string;
}

const stepRoutes: Route[] = [
  {
    route: "/onboarding/form/game",
    text: "Game",
  },
  {
    route: "/onboarding/form/game-detail",
    text: "Game Details",
  },
  {
    route: "/onboarding/form/confirm",
    text: "Confirm",
  },
];

function OnboardingLayoutContent({ children }: { children: ReactNode }) {
  const { state, setState } = useOnboarding(); // Use the context hook to get title or state
  const router = useRouter();

  const totalSteps = stepRoutes.length;

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
    router.push(stepRoutes[currentStep - 1].route);
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      

      <div>
        <Progress
          about="Progress bar"
          className="bg-foreground"
          value={(state.step / totalSteps) * 100}
          classNames={{
            track: "",
            indicator: "bg-gradient-to-r from-secondary to-primary",
          }}
        />
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
