import { paginateServerCategory } from "@/app/_lib/services/serverTemplateService";
import OnboardingGameContent from "./content";
import { Suspense } from "react";
import { ServerTemplateCategoryDisplay } from "@/types/entity/entity";

export default async function GameListPage() {
  const games = await paginateServerCategory({ page: 1, size: 10 })

  if (!games.data?.ServerTemplateCategories) {
    return <div>Failed to load games</div>
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingGameContent games={games.data.ServerTemplateCategories} />
    </Suspense>
  );
}
