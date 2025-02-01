import { ReactNode, useMemo, useState } from "react";
import { OnboardingContext, OnboardingState } from "../hooks/useOnboarding";

// Context Provider component
export function OnboardingProvider({ children }: { children: ReactNode }) {
  console.log("OnboardingProvider");

  const [state, setState] = useState<OnboardingState>({
    request: {},
    parentHistory: [
      {
        Id: 0,
        Name: "Home",
        ParentId: 0,
      },
    ],
  });

  console.log("OnboardingProvider state", state);

  const value = useMemo(() => ({ state, setState }), [state]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
