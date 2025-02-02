"use client";

import { ForceShutdownPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { Button, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Props = {
  persistentNodes: PersistentNode[];
};

export default function DashboardContent({ persistentNodes }: Props) {
  const router = useRouter();

  const [nodes, setNodes] = useState<PersistentNode[]>(persistentNodes);
  return (
    <div className="h-full">
      <h1>Dashboard</h1>

      <h2>Your Nodes</h2>
      <div className="flex flex-col gap-52">
        <div>hi</div>
      </div>
    </div>
  );
}
