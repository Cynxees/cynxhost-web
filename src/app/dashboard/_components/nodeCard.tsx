"use client";

import { PersistentNode } from "@/types/entity/entity";

type Props = {
  persistentNode: PersistentNode;
};

export default function NodeCard({ persistentNode }: Props) {
  return (
    <div className="bg-content2 h-[40vh] w-full mx-auto drop-shadow-heavy flex flex-col p-5">
      <div className="text-5xl font-nats">{persistentNode.ServerAlias}</div>
      <div></div>
    </div>
  );
}
