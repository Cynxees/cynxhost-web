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
      <Image
        width={100}
        height={100}
        className="w-[100vw] h-[100vh] fixed left-0 top-0 animate-pulse-brightness object-cover"
        src="/blue_aura.webp"
        alt=""
      />

      <div className="relative z-10">{children}</div>
    </OnboardingProviders>
  );
}
