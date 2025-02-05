"use client";

import { NodeProvider } from "@/app/_lib/providers/nodeProvider";
import { PersistentNode } from "@/types/entity/entity";

export default function NodeProviders({
  children,
  node,
}: {
  children: React.ReactNode;
  node: PersistentNode;
}) {
  return <NodeProvider node={node}>{children}</NodeProvider>;
}
