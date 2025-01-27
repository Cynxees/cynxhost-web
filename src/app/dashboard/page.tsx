"use client";

import { PersistentNode } from "@/app/_lib/services/entity/entity";
import { GetPersistentNodes } from "@/app/_lib/services/persistentNodeService";
import {
  getProfile,
  GetProfileResponse,
} from "@/app/_lib/services/userService";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<GetProfileResponse["data"]>();
  const [loading, isLoading] = useState(true);

  const [nodes, setNodes] = useState<PersistentNode[]>();

  useEffect(() => {
    getProfile().then((profile) => {
      setProfile(profile.data);
      isLoading(false);
    });
  }, []);

  useEffect(() => {
    // Fetch nodes
    GetPersistentNodes().then((response) => {
      setNodes(response.data?.PersistentNodes);
    });
  }, []);

  if (loading || !profile) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {profile.Username}!</h1>
      <h2>Coin: {profile.Coin}</h2>

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
