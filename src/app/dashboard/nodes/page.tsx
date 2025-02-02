import { GetPersistentNodes } from "@/app/_lib/services/persistentNodeService";
import { withCookie } from "@/app/_lib/services/withCookie";
import { PersistentNode } from "@/types/entity/entity";
import { headers } from "next/headers";
import NodeCard from "../_components/nodeCard";
import NodesContent from "./content";

export default async function NodesPage() {
  const cookieHeader = (await headers()).get("cookie") || "";

  // Fetch data server-side
  let nodesData: PersistentNode[] = [];
  const response = await withCookie(GetPersistentNodes);

  if (response && response.data) {
    nodesData = response.data.PersistentNodes;
  }

  return <NodesContent nodesData={nodesData}></NodesContent>;
}
