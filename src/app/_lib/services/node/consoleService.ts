import {
  BaseResponse,
  ConsoleCreateSessionResponse,
} from "@/types/model/response";
import { postNodeData } from "../../fetcher";
import { SendCommandNodeSessionRequest } from "@/types/model/request";

export async function CreateSession(
  serverAlias: string
): Promise<ConsoleCreateSessionResponse> {
  const response = await postNodeData<null, ConsoleCreateSessionResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/console/create-session",
    }
  );

  return response;
}

export async function SendCommand(
  serverAlias: string,
  req: SendCommandNodeSessionRequest
): Promise<BaseResponse> {
  const response = await postNodeData<SendCommandNodeSessionRequest, BaseResponse>(
    serverAlias,
    { path: "/persistent-node/dashboard/console/send-command" },
    req
  );

  return response;
}
