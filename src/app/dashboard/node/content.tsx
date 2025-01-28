"use client";

import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { BaseResponse } from "@/types/model/response";
import { useQuery } from "@tanstack/react-query";
import ConsoleView from "./_components/views/console";

type DashboardNodeContentProps = {
  id: number;
  nodeData: BaseResponse<PersistentNode> | null;
};

const DashboardNodeContent = ({ id, nodeData }: DashboardNodeContentProps) => {
  const { data, isLoading, error } = useQuery<BaseResponse<PersistentNode>>({
    queryKey: ["node", { id }],
    queryFn: () => GetPersistentNode({ Id: id }),
    initialData: nodeData ?? undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
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
      <ConsoleView node={node}></ConsoleView>
    </div>
  );
};

export default DashboardNodeContent;
