import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import DashboardNodeContent from "./content";

interface SearchParams {
  id?: string;
}

export default async function DashboardNodeWrapper() {
  return <DashboardNodeContent />;
}
