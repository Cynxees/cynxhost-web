"use client";

import { InstanceType } from "@/types/entity/entity";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
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

  const [selectedInstanceType, setSelectedInstanceType] =
    useState<InstanceType>(instanceTypes[0]);

  useEffect(() => {
    if (!state.selectedGame) {
      router.push("/create-node/form/game");
    }
  }, []);

  const onClickInstanceType = (instanceType: InstanceType) => {
    setSelectedInstanceType(instanceType);
  };

  return (
    <div className="h-screen flex flex-col items-start">
      <div className="flex flex-row w-full h-[50vh]">
        <Table
          classNames={{
            base: "bg-content2 !h-[50vh]",
            table: "bg-content2 rounded-lg",
            wrapper: "bg-content2 rounded-sm drop-shadow-heavy",
          }}
          radius="sm"
          className="!h-[50vh] "
        >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>RAM</TableColumn>
            <TableColumn>CPU</TableColumn>
            <TableColumn>NETWORK</TableColumn>
            <TableColumn>PRICE</TableColumn>
          </TableHeader>
          <TableBody>
            {instanceTypes.map((instanceType) => (
              <TableRow
                key={instanceType.Id}
                className={
                  `cursor-pointer ` +
                  (selectedInstanceType.Id === instanceType.Id
                    ? "!bg-content3-50 !bg-opacity-50 !rounded-2xl"
                    : "")
                }
                onClick={() => onClickInstanceType(instanceType)}
              >
                <TableCell>{instanceType.Name}</TableCell>
                <TableCell>{instanceType.MemorySizeGb} GB</TableCell>
                <TableCell>{instanceType.VcpuCount} vCPU</TableCell>
                <TableCell>{instanceType.NetworkSpeedMbps} Mbps</TableCell>
                <TableCell>{instanceType.SellPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Selected Instance Details */}
        <div className="flex flex-col ml-5 w-[30vw] bg-foreground rounded-sm drop-shadow-heavy h-full p-4">
          <h2 className="text-xl font-bold">{selectedInstanceType.Name}</h2>
          <p>ID: {selectedInstanceType.Id}</p>
          <p>RAM: {selectedInstanceType.MemorySizeGb} GB</p>
          <p>CPU: {selectedInstanceType.VcpuCount} vCPU</p>
          <p>Network: {selectedInstanceType.NetworkSpeedMbps} Mbps</p>
          <p>Price: {selectedInstanceType.SellPrice}</p>

          <div className="absolute w-[80%] bottom-5 left-1/2 -translate-x-1/2">
            <Button
              onPress={() => {
                state.request.instanceTypeId = selectedInstanceType.Id;
                router.push("/create-node/form/confirm");
              }}
              className="bg-primary text-content2 font-extrabold rounded-lg w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
