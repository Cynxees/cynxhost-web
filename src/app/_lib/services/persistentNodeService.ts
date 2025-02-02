import { postData } from "@/app/_lib/fetcher";
import { ServiceOption as ServiceOptions } from "@/types/service/option";
import { PersistentNode } from "../../../types/entity/entity";
import {
  CreatePersistentNodeRequest,
  IdRequest,
} from "../../../types/model/request";
import { BaseResponse } from "../../../types/model/response";

type PaginatePersistentNodeResponse = BaseResponse<{
  PersistentNodes: PersistentNode[];
}>;

export async function CreatePersistentNode(
  request: CreatePersistentNodeRequest
): Promise<BaseResponse> {
  const response = await postData<CreatePersistentNodeRequest, BaseResponse>(
    { path: "/persistent-node/create" },
    request
  );

  return response;
}

export async function GetPersistentNodes(
  options?: ServiceOptions
): Promise<PaginatePersistentNodeResponse> {
  const response = await postData<null, PaginatePersistentNodeResponse>(
    { path: "/persistent-node/show-owned", ...options },
    null
  );

  return response;
}

export async function GetPersistentNode(
  req: IdRequest,
  options?: ServiceOptions
): Promise<BaseResponse<PersistentNode>> {
  const response = await postData<IdRequest, BaseResponse<PersistentNode>>(
    { path: "/persistent-node/detail", ...options },
    req
  );

  return response;
}

export async function ForceShutdownPersistentNode(
  id: number
): Promise<BaseResponse> {
  const response = await postData<{ persistentNodeId: number }, BaseResponse>(
    { path: "/persistent-node/force-shutdown" },
    { persistentNodeId: id }
  );

  return response;
}
