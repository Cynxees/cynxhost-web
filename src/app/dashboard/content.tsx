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
      <div className="flex flex-col gap-4">
        {nodes?.map((node) => (
          <div key={node.Id}>
            <div className="grid grid-cols-3 gap-4 w-[50%]">
              <li>
                {node.Name} : {node.Status}
              </li>
              <Button
                onPress={() => {
                  console.log("Node ID: ", node.Id);
                  router.push(`/dashboard/node/${node.Id}/overview`);
                }}
                color="secondary"
              >
                Go to detail
              </Button>

              <Button
                onPress={() => {
                  console.log("Node ID: ", node.Id);
                  ForceShutdownPersistentNode(node.Id);
                }}
                color="danger"
              >
                Force Shutdown
              </Button>
            </div>
            <Divider className="mt-4"></Divider>
          </div>
        ))}
      </div>
    </div>
  );
}
