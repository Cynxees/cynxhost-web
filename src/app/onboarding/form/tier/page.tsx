import { paginateInstanceTypes } from "@/app/_lib/services/instanceTypeService";
import OnboardingTierContent from "./content";

export default async function OnboardingTierPage() {
  const instanceTypeResponse = await paginateInstanceTypes({
    page: 1,
    size: 10,
  });
  const instanceTypes = instanceTypeResponse.data?.InstanceTypes || [];

  return (
    <OnboardingTierContent
      instanceTypes={instanceTypes}
    ></OnboardingTierContent>
  );
}
