"use client";

import { paginateInstanceTypes } from "@/app/_lib/services/instanceTypeService";
import { InstanceType } from "@/types/entity/entity";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function OnboardingTierContent({
  instanceTypes,
}: {
  instanceTypes: InstanceType[];
}) {
  const router = useRouter();
  const { state } = useOnboarding();

  if (state.selectedGame == null) {
    router.push("/onboarding/form/game");
  }

  const onClickInstanceType = async (instanceType: InstanceType) => {
    state.request.instanceTypeId = instanceType.Id;
    router.push("/onboarding/form/confirm");
  };

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
