import { Suspense } from "react";
import GameDetailContent from "./content";
import { getServerTemplateById } from "@/app/_lib/services/serverTemplateService";

export default async function OnboardingGameDetailPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Await the searchParams to resolve before using them
  const id = searchParams?.id;
  const parsedId = Array.isArray(id) ? id[0] : id; // In case the id is an array
  const serverTemplateResponse = parsedId
    ? await getServerTemplateById({ Id: parseInt(parsedId) })
    : null;

  const serverTemplate = serverTemplateResponse?.data?.ServerTemplate;
  if (!serverTemplate) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameDetailContent selectedGame={serverTemplate} />
    </Suspense>
  );
}
