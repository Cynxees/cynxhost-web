import { GetPersistentNode } from "@/app/_lib/services/persistentNodeService";
import DashboardNodeContent from "./content";
import { Suspense } from "react";

interface SearchParams {
  id?: string;
}

export default async function DashboardNodeWrapper() {
  return (
    <Suspense>
      <DashboardNodeContent />;
    </Suspense>
  );
}
