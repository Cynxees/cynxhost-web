import {
  BaseResponse,
  ConsoleCreateSessionResponse,
  GetContainerStatsResponse,
} from "@/types/model/response";
import { postNodeData } from "../../fetcher";
import {
  NodeCreateSessionRequest,
  SendCommandNodeSessionRequest,
} from "@/types/model/request";

export async function GetContainerStats(
  serverAlias: string
): Promise<GetContainerStatsResponse> {
  const response = await postNodeData<null, GetContainerStatsResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/container-stats",
    }
  );

  return response;
}
