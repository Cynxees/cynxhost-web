"use client";

import NodeCard from "../_components/nodeCard";
import { PersistentNode } from "@/types/entity/entity";
import { ScrollShadow } from "@heroui/react";

export default function NodesContent({
  nodesData,
}: {
  nodesData: PersistentNode[];
}) {
  return (
    <ScrollShadow className="w-full h-full">
      <div className="grid grid-cols-2 grid-rows-2 gap-x-[5vw] gap-y-12 pt-14 px-[5vw] pb-[30vh]">
        {nodesData.map((node) => (
          <NodeCard key={node.Id} persistentNode={node} />
        ))}
      </div>
    </ScrollShadow>
  );
}
