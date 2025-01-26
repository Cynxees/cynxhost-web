"use client";

import GameCard from "@/app/_components/onboarding/gameCard";
import { InstanceType } from "@/services/entity/entity";
import { paginateInstanceTypes } from "@/services/instanceTypeService";
import { BreadcrumbItem, Breadcrumbs, Divider, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "solar-icon-set";
import { useOnboarding } from "../../context";

export default function OnboardingTierPage() {
  const [instanceTypes, setInstanceTypes] = useState<InstanceType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { state, setState } = useOnboarding();

  useEffect(() => {
    setState({
      ...state,
      title: "Choose your tier",
      step: 3,
    });
  }, []);

  useEffect(() => {
    const fetchInstanceTypes = async () => {
      try {
        const result = await paginateInstanceTypes({ page: 1, size: 10 });
        setInstanceTypes(result.data?.InstanceTypes || []);
      } catch (error) {
        console.error("Error fetching instance types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstanceTypes();
  }, []);

  const onClickInstanceType = async (instanceType: InstanceType) => {
    state.request.instanceTypeId = instanceType.Id;
    router.push("/onboarding/form/confirm");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col items-start">
        <div className="grid grid-cols-4 gap-4 w-full">
          {instanceTypes.map((instanceType, index) => (
            <div
              key={instanceType.Id}
              className={`col-span-1 ${index >= 4 ? "justify-start" : ""}`}
              onClick={() => onClickInstanceType(instanceType)}
            >
              {instanceType.Name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
