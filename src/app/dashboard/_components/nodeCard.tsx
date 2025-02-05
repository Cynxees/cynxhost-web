"use client";

import { getPersistentNodeStatusDescription } from "@/app/_lib/helper/getPersistentNodeStatusDescription";
import { GetContainerStats } from "@/app/_lib/services/node/overviewService";
import { PersistentNode } from "@/types/entity/entity";
import { GetContainerStatsResponse } from "@/types/model/response";
import { Button, CircularProgress, Image, Tooltip } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  persistentNode: PersistentNode;
};

type StatCardProps = {
  percent: number;
  label: string;
  value: string;
  limit: string;
};

export default function NodeCard({ persistentNode }: Props) {
  const router = useRouter();

  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch,
  } = useQuery<GetContainerStatsResponse['data']>({
    queryKey: ["stats-" + persistentNode.Id],
    queryFn: async () => {
      try {
        const response = await GetContainerStats(persistentNode.ServerAlias)

        if (!response || !response.data) {
          throw new Error("Fail fetch persistent node stats")
        }

        return response.data;
      } catch (error) {
        console.error("Failed to fetch persistent node", error);
        throw error;
      }
    },
    refetchInterval: 1000
  });

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

  const StatCard: React.FC<StatCardProps> = ({ percent, label, value, limit }) => {

    return (
      <div className="flex flex-row gap-2">
        <CircularProgress value={percent} showValueLabel={true} classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          value: "font-bold text-lg"
        }} />
        <div className="flex flex-col">
          <p className="text-content3 font-bold text-sm">{label}</p>
          <p className="text-sm">{value} / {limit}</p>
        </div>
      </div>
    );
  }

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

            <div className="grid grid-cols-2">
              {stats && (
                <>
                  <StatCard percent={stats.CpuPercent} label="CPU Usage" value={`${stats.CpuUsed.toFixed(0)}%`} limit={`${stats.CpuLimit.toFixed(0)}%`} />
                  <StatCard percent={stats.RamPercent} label="RAM Usage" value={`${stats.RamUsed.toFixed(2)} GB`} limit={`${stats.RamLimit.toFixed(2)} GB`} />
                  <StatCard percent={stats.StoragePercent} label="Storage Usage" value={`${stats.StorageUsed.toFixed(2)} GB`} limit={`${stats.StorageLimit.toFixed(2)} GB`} />
                </>
              )}

              {/* <p>CPU Usage: {stats.CpuPercent}%</p>
                <p>CPU Used: {stats.CpuUsed} cores</p>
                <p>CPU Limit: {stats.CpuLimit} cores</p>
                <p>RAM Usage: {stats.RamPercent}%</p>
                <p>RAM Used: {stats.RamUsed} GB</p>
                <p>RAM Limit: {stats.RamLimit} GB</p>
                <p>Storage Usage: {stats.StoragePercent}%</p>
                <p>Storage Used: {stats.StorageUsed} GB</p>
                <p>Storage Limit: {stats.StorageLimit} GB</p> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
