import { Suspense } from "react";
import GameDetailContent from "./content";
import { getServerTemplateById } from "@/app/_lib/services/serverTemplateService";
import Loading from "@/app/loading";
interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function OnboardingGameDetailPage({
  searchParams,
}: PageProps) {
  if (!searchParams) {
    return <div>No search parameters provided</div>;
  }

  // Await the searchParams resolution if needed
  const params = await searchParams;

  // Get the ID from the search params
  const id = params?.id;
  const parsedId = Array.isArray(id) ? id[0] : id; // In case the id is an array

  if (!parsedId) {
    return <div>Invalid or missing ID</div>;
  }

  // Await the API call to get server template
  const serverTemplateResponse = await getServerTemplateById({
    Id: parseInt(parsedId),
  });
  const serverTemplate = serverTemplateResponse?.data?.ServerTemplate;

  if (!serverTemplate) {
    return <div>Server template not found</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <GameDetailContent selectedGame={serverTemplate} />
    </Suspense>
  );
}
