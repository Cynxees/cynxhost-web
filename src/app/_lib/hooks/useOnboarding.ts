import { ServerTemplate, ServerTemplateCategory } from "@/types/entity/entity";
import { CreatePersistentNodeRequest } from "@/types/model/request";
import { createContext, useContext } from "react";

// Define the shared state type
export interface OnboardingState {
  parentHistory: ServerTemplateCategory[];
  selectedGame?: ServerTemplate;
  selectedCategory?: ServerTemplateCategory;

  request: Partial<CreatePersistentNodeRequest>;
}

// Initialize the context with default values
export const OnboardingContext = createContext<{
  state: OnboardingState;
  setState: (newState: OnboardingState) => void;
} | null>(null);

// Custom hook to use onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
