"use client";

import { getPersistentNodeStatusDescription } from "@/app/_lib/helper/getPersistentNodeStatusDescription";
import { GetContainerStats } from "@/app/_lib/services/node/overviewService";
import { PersistentNode } from "@/types/entity/entity";
import { GetContainerStatsResponse } from "@/types/model/response";
import { Button, Image, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  persistentNode: PersistentNode;
};

export default function NodeCard({ persistentNode }: Props) {
  const router = useRouter();
  const [stats, setStats] = useState<GetContainerStatsResponse>();

  let statusCss =
    "bg-warning-100 text-warning border-warning hover:bg-warning-50";

  switch (persistentNode.Status) {
    case "RUNNING":
      statusCss =
        "bg-success-100 text-success border-success hover:bg-success-50";
      break;
    case "SHUTDOWN":
      statusCss = "bg-danger-100 text-danger border-danger hover:bg-danger-50";
      break;
    case "STOPPED":
      statusCss = "bg-danger-100 text-danger border-danger hover:bg-danger-50";
      break;
  }

  useEffect(() => {
    console.log("NodeCard mounted");
    GetContainerStats(persistentNode.ServerAlias).then((response) => {
      setStats(response);
    });
  }, []);

  return (
    <div className="bg-content2 h-[40vh] w-full mx-auto drop-shadow-heavy flex flex-col p-5 px-10">
      <div className="flex flex-row justify-between">
        <div className="text-5xl font-nats relative">
          <p>{persistentNode.ServerAlias}</p>
          <p className="text-medium absolute -bottom-3">.cynx.buzz</p>
        </div>
        <div className="flex flex-row gap-5">
          <Tooltip
            closeDelay={100}
            content={getPersistentNodeStatusDescription(persistentNode.Status)}
            classNames={{ content: "text-content2" }}
          >
            <Button
              className={
                `my-auto border-2 font-extrabold rounded-sm cursor-help ` +
                statusCss
              }
            >
              {persistentNode.Status}
            </Button>
          </Tooltip>
          <Button
            className="font-extrabold bg-primary text-content2 w-52 my-auto rounded-sm"
            onPress={() => {
              router.push(`/dashboard/node/${persistentNode.Id}`);
            }}
          >
            ENTER
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-5 my-auto">
        <Tooltip
          className="w-full"
          closeDelay={0}
          classNames={{ content: "text-content2" }}
          content={persistentNode.ServerTemplate.Name}
        >
          <Image
            src={persistentNode.ServerTemplate.ImageUrl}
            className="w-full drop-shadow-heavy"
            radius="none"
          />
        </Tooltip>
        <div className="flex flex-col w-full text-2xl">
          <p>{persistentNode.ServerTemplate.Name}</p>
          <p className="text-content3">{persistentNode.InstanceType.Name}</p>
          <div className="text-medium">
            <p>RAM: {persistentNode.InstanceType.MemorySizeGb} GB</p>
            <p>CPU: {persistentNode.InstanceType.VcpuCount} vCPU</p>
            <p>Network: {persistentNode.InstanceType.NetworkSpeedMbps} Mbps</p>
            <p>Price: {persistentNode.InstanceType.SellPrice}</p>
            {stats && stats.data && (
              <div>
                <p>CPU Usage: {stats.data.CpuPercent}%</p>
                <p>CPU Used: {stats.data.CpuUsed} cores</p>
                <p>CPU Limit: {stats.data.CpuLimit} cores</p>
                <p>RAM Usage: {stats.data.RamPercent}%</p>
                <p>RAM Used: {stats.data.RamUsed} GB</p>
                <p>RAM Limit: {stats.data.RamLimit} GB</p>
                <p>Storage Usage: {stats.data.StoragePercent}%</p>
                <p>Storage Used: {stats.data.StorageUsed} GB</p>
                <p>Storage Limit: {stats.data.StorageLimit} GB</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
