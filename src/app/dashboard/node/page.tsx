// page.tsx
import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import DashboardNodeContent from "./content";
import { BaseResponse } from "@/types/model/response";
import { PersistentNode } from "@/types/entity/entity";
import { headers } from "next/headers";
import { withCookie } from "@/app/_lib/services/withCookie";

interface SearchParams {
  id?: string;
}

export default async function DashboardNodeWrapper({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Get ID from URL search params
  const id = parseInt(searchParams.id || "");
  const cookieHeader = (await headers()).get("cookie") || "";

  console.log("Cookie header: ", cookieHeader);

  // Fetch data server-side
  let nodeData: BaseResponse<PersistentNode> | null = null;
  if (!isNaN(id)) {
    nodeData = await withCookie(GetPersistentNode, { Id: id });
  }

  return <DashboardNodeContent id={id} nodeData={nodeData} />;
}
