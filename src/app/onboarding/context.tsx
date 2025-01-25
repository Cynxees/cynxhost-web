// context/OnboardingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shared state type
interface OnboardingState {
  selectedGame: string | null;
  selectedCategory: string | null;
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
  const [state, setState] = useState<OnboardingState>({
    selectedGame: null,
    selectedCategory: null,
    title: "",
    step: 1,
  });

  return (
    <OnboardingContext.Provider value={{ state, setState }}>
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
