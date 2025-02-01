import { ReactNode } from "react";
import OnboardingLayoutContent from "./layoutContent";

export default function OnboardingFormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <OnboardingLayoutContent>{children}</OnboardingLayoutContent>
  );
}

