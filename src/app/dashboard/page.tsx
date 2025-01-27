"use client";

import { GetPersistentNodes } from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [loading, isLoading] = useState(true);

  const [nodes, setNodes] = useState<PersistentNode[]>();

  useEffect(() => {
    // Fetch nodes
    GetPersistentNodes().then((response) => {
      setNodes(response.data?.PersistentNodes);
    });
    isLoading(false);
  }, []);

  if (loading) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <div>
      <h2>Your Nodes</h2>
      <div>
        {nodes?.map((node) => (
          <div key={node.Id} className="flex flex-row">
            <li>
              {node.Name} : {node.Status}
            </li>
            <Button
              onPress={() => {
                console.log("Node ID: ", node.Id);
                router.push(`/dashboard/node?id=${node.Id}`);
              }}
            ></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
