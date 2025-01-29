"use client";

import {
  ForceShutdownPersistentNode,
  GetPersistentNodes,
} from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { Button, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../_lib/hooks/useAuth";

const Dashboard = () => {
  const router = useRouter();
  const [loading, isLoading] = useState(true);

  const [nodes, setNodes] = useState<PersistentNode[]>();
  const { profileData } = useAuth();

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
      <h1>Dashboard</h1>
      <h2>Profile</h2>
      <div>
        {profileData?.data?.Username} : {profileData?.data?.Coin}
      </div>

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
                  router.push(`/dashboard/node?id=${node.Id}`);
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
};

export default Dashboard;
