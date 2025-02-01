import { GetPersistentNodes } from "@/app/_lib/services/persistentNodeService";
import DashboardContent from "./content";
import { headers } from "next/headers";
import { PersistentNode } from "@/types/entity/entity";
import { withCookie } from "../_lib/services/withCookie";

export default async function Dashboard() {
  const cookieHeader = (await headers()).get("cookie") || "";

  // Fetch data server-side
  let nodesData: PersistentNode[] = [];
  const response = await withCookie(GetPersistentNodes);

  if (response && response.data) {
    nodesData = response.data.PersistentNodes;
  }

  return <DashboardContent persistentNodes={nodesData}></DashboardContent>;
}
