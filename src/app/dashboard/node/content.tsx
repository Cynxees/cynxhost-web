// content.tsx
"use client";

import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { BaseResponse } from "@/types/model/response";
import { useQuery } from "@tanstack/react-query";

type DashboardNodeContentProps = {
  id: number;
  nodeData: BaseResponse<PersistentNode> | null;
};

const DashboardNodeContent = ({ id, nodeData }: DashboardNodeContentProps) => {
  // Use React Query with initialData from server
  const { data, isLoading, error } = useQuery<BaseResponse<PersistentNode>>({
    queryKey: ["node", { id }],
    queryFn: () => GetPersistentNode({}, { Id: id }),
    initialData: nodeData ?? undefined,
    enabled: !isNaN(id),
  });

  // Use the latest data from query
  const node = data?.data;

  if (isNaN(id)) {
    return <div>Invalid node ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!node) {
    return <div>Node not found</div>;
  }

  return (
    <div>
      <p>{node.Id}</p>
      <h1>{node.Name}</h1>
    </div>
  );
};

export default DashboardNodeContent;
