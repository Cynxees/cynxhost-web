import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import { withCookie } from "@/app/_lib/services/withCookie";
import { PersistentNode } from "@/types/entity/entity";
import { BaseResponse } from "@/types/model/response";
import { headers } from "next/headers";
import NodeProviders from "./provider";
import { Suspense } from "react";
import Loading from "@/app/loading";

type Params = Promise<{
  id?: string;
}>

export default async function DashboardNodeWrapper({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  // Get ID from URL search params
  const param = await params;
  const id = parseInt(param.id || "");
  const cookieHeader = (await headers()).get("cookie") || "";

  if (!id || Array.isArray(id)) {
    return <div>Node not found</div>;
  }

  // Fetch data server-side
  let nodeData: BaseResponse<PersistentNode> | null = null;
  if (!isNaN(id)) {
    nodeData = await withCookie(GetPersistentNode, { Id: id });
  }

  if (!nodeData || !nodeData.data) {
    return <div>Node not found</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <NodeProviders node={nodeData.data}>
        <div className="bg-foreground p-10 mt-10">{children}</div>
      </NodeProviders>
    </Suspense>
  );
}
