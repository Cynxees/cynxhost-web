"use client";

import { useNode } from "@/app/_lib/hooks/useNode";
import { ForceShutdownPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { Button } from "@heroui/react";
import { useEffect } from "react";

type Props = {};
export default function OverviewPage({}: Props) {
  const node = useNode().state.node;

  return (
    <div>
      <h1>Overview</h1>
      <p>{node.Name}</p>
      <p>status: {node.Status}</p>

      <Button
        onPress={() => {
          console.log("force shutdown");
          ForceShutdownPersistentNode(node.Id);
        }}
        color="primary"
      >
        force shutdown
      </Button>
    </div>
  );
}
