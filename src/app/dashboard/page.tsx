"use client";

import React, { useEffect, useState } from "react";
import { getProfile, GetProfileResponse } from "@/services/userService";
import { PersistentNode } from "@/services/entity/entity";
import { GetPersistentNodes } from "@/services/persistentNodeService";

const Dashboard = () => {
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
      <ul>
        {nodes?.map((node) => (
          <li key={node.Id}>{node.Name} : {node.Status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
