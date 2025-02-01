"use client";

import { useOnboarding } from "@/app/_lib/hooks/useOnboarding";
import { Divider, Progress } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeft } from "solar-icon-set";

type Step = {
  route: string;
  text: string;
  percent: number;
  title: string;
};

const steps: Step[] = [
  {
    route: "/create-node/form/game",
    text: "Choose your game",
    percent: 10,
    title: "Choose your game",
  },
  {
    route: "/create-node/form/game-detail",
    text: "",
    percent: 10,
    title: "Game Details",
  },
  {
    route: "/create-node/form/tier",
    text: "Tier",
    percent: 50,
    title: "Choose your tier",
  },
  {
    route: "/create-node/form/confirm",
    text: "Confirm",
    percent: 90,
    title: "Confirm",
  },
];

export default function OnboardingLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { state } = useOnboarding();

  // Get the current route
  const currentRoute = usePathname();

  // Find the current step based on the current route
  const currentStep =
    steps.findIndex((step) => step.route === currentRoute) + 1;

  if (currentStep === 0) {
    return <div>{children};</div>;
  }

  const onClickBack = () => {
    // Go back to the previous step
    const prevStep = currentStep - 1;

    if (prevStep < 1) {
      return;
    }

    let nextRoute = steps[prevStep - 1].route;

    if (prevStep === 2) {
      nextRoute = `${nextRoute}?id=${encodeURIComponent(
        state.selectedGame?.Id || ""
      )}`;
    }

    // Redirect to the previous page
    router.push(nextRoute);
  };

  return (
    <div className="flex flex-col gap-6 pt-12">
      <div className="flex flex-col gap-2 w-[60%] mx-auto drop-shadow-2xl">
        <Progress
          about="Progress bar"
          value={steps[currentStep - 1].percent}
          classNames={{
            track: "bg-foreground drop-shadow-heavy",
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
                  transform: "translateX(-50%)",
                }}
                className={
                  `absolute shadow-black shadow-2xl ` +
                  (index + 1 == currentStep
                    ? "text-primary"
                    : index + 1 < currentStep
                    ? "text-secondary cursor-pointer"
                    : "")
                }
              >
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentStep === 1 ? (
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
            {steps[currentStep - 1].title && (
              <h1 className="my-auto">{steps[currentStep - 1].title}</h1>
            )}
          </div>
          <Divider className="w-full h-0.5" />
        </>
      )}

      <div className="">{children}</div>
    </div>
  );
}
