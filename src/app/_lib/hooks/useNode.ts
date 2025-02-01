import { PersistentNode } from "@/types/entity/entity";
import { createContext, useContext } from "react";

export interface NodeState {
  node: PersistentNode;
}

// Initialize the context with default values
export const NodeContext = createContext<{
  state: NodeState;
  setState: (newState: NodeState) => void;
} | null>(null);

// Custom hook to use onboarding context
export const useNode = () => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNode must be used within an NodeProvider");
  }
  return context;
};
