// context/OnboardingContext.tsx
"use client";

import {
  ServerTemplate,
  ServerTemplateCategory,
} from "@/services/entity/entity";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

// Define the shared state type
interface OnboardingState {
  selectedGame?: ServerTemplate;
  selectedCategory?: ServerTemplateCategory;
  title: string; // Add title field to shared state
  step: number;
}

// Initialize the context with default values
const OnboardingContext = createContext<{
  state: OnboardingState;
  setState: (newState: OnboardingState) => void;
} | null>(null);

// Context Provider component
export function OnboardingProvider({ children }: { children: ReactNode }) {
  console.log("OnboardingProvider");

  const [state, setState] = useState<OnboardingState>({
    title: "",
    step: 1,
  });

  const value = useMemo(() => ({ state, setState }), [state]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}


// Custom hook to use onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
