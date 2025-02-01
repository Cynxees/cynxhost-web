import Image from "next/image";
import { ReactNode } from "react";
import OnboardingProviders from "./provider";

export default function RootOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProviders>
      <div className="relative z-10">{children}</div>
    </OnboardingProviders>
  );
}
