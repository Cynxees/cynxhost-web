import { postData } from "@/app/_lib/fetcher";
import { PersistentNode } from "./entity/entity";
import { CreatePersistentNodeRequest, IdRequest } from "./model/request";
import { BaseResponse } from "./model/response";

type PaginatePersistentNodeResponse = BaseResponse<{
  PersistentNodes: PersistentNode[];
}>;

export async function CreatePersistentNode(
  request: CreatePersistentNodeRequest
): Promise<BaseResponse> {
  const response = await postData<CreatePersistentNodeRequest, BaseResponse>(
    "/persistent-node/create",
    request
  );

  console.log("/persistent-node/create", response);
  return response;
}

export async function GetPersistentNodes(): Promise<PaginatePersistentNodeResponse> {
  const response = await postData<null, PaginatePersistentNodeResponse>(
    "/persistent-node/show-owned",
    null
  );

  console.log("/persistent-node/list", response);
  return response;
}

export async function GetPersistentNode(
  req: IdRequest
): Promise<BaseResponse<PersistentNode>> {
  const response = await postData<IdRequest, BaseResponse<PersistentNode>>(
    "/persistent-node/detail",
    req
  );

  console.log("/persistent-node/get", response);
  return response;
}

export async function ForceShutdownPersistentNode(
  id: string
): Promise<BaseResponse> {
  const response = await postData<{ persistentNodeId: string }, BaseResponse>(
    "/persistent-node/force-shutdown",
    { persistentNodeId: id }
  );

  console.log("/persistent-node/force-shutdown", response);
  return response;
}
