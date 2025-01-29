import { ReactNode, useMemo, useState } from "react";
import { NodeContext, NodeState } from "../hooks/useNode";
import { PersistentNode } from "@/types/entity/entity";

// Context Provider component
export function NodeProvider({
  children,
  node,
}: {
  children: ReactNode;
  node: PersistentNode;
}) {
  console.log("NodeProvider");

  const [state, setState] = useState<NodeState>({
    node: node,
  });

  console.log("NodeProvider state", state);

  const value = useMemo(() => ({ state, setState }), [state]);

  return <NodeContext.Provider value={value}>{children}</NodeContext.Provider>;
}
