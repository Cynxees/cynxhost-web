"use client";

import { getPersistentNodeStatusDescription } from "@/app/_lib/helper/getPersistentNodeStatusDescription";
import { PersistentNode } from "@/types/entity/entity";
import { Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";

type Props = {
  persistentNode: PersistentNode;
};

export default function NodeCard({ persistentNode }: Props) {
  const router = useRouter();

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

  return (
    <div className="bg-content2 h-[40vh] w-full mx-auto drop-shadow-heavy flex flex-col p-5">
      <div className="flex flex-row justify-between">
        <div className="text-5xl font-nats">{persistentNode.ServerAlias}</div>
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
    </div>
  );
}
