"use client";

import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { PersistentNode } from "@/types/entity/entity";
import { BaseResponse } from "@/types/model/response";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type GetNodeQueryKey = {
  id: number;
};

const DashboardNodeContent = () => {
  const param = useSearchParams();
  const id = parseInt(param.get("id") ?? "");

  const { data, isLoading, error } = useQuery<BaseResponse<PersistentNode>>({
    queryKey: ["node", { id: id }],
    queryFn: ({ queryKey }) => {
      const { id } = queryKey[1] as GetNodeQueryKey;
      return GetPersistentNode({ Id: id });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data and nodeData are available
  const nodeData = data?.data; // Assuming 'data' contains the 'data' property inside BaseResponse

  if (!nodeData) {
    return <div>Node not found</div>;
  }

  return (
    <div>
      <p>{nodeData.Id}</p>
      <h1>{nodeData.Name}</h1>
    </div>
  );
};

export default DashboardNodeContent;
