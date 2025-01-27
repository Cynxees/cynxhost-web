import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import DashboardNodeContent from "./content";

interface SearchParams {
  id?: string;
}

export default async function DashboardNodeWrapper() {
  const nodeData = await GetPersistentNode({ Id: 70 });

  return <DashboardNodeContent nodeData={nodeData?.data} />;
}
