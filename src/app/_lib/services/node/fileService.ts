import { BaseResponse, ListDirectoryResponse } from "@/types/model/response";
import { postNodeData } from "../../fetcher";
import {
  DownloadFileRequest,
  UploadFileRequest,
  RemoveFileRequest,
  ListDirectoryRequest,
  CreateDirectoryRequest,
  RemoveDirectoryRequest,
} from "@/types/model/request";

export async function DownloadFile(
  serverAlias: string,
  req: DownloadFileRequest
): Promise<BaseResponse> {
  const response = await postNodeData<DownloadFileRequest, BaseResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/download-file",
    },
    req
  );

  return response;
}

export async function UploadFile(
  serverAlias: string,
  req: UploadFileRequest
): Promise<BaseResponse> {
  const response = await postNodeData<UploadFileRequest, BaseResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/upload-file",
    },
    req
  );

  return response;
}

export async function RemoveFile(
  serverAlias: string,
  req: RemoveFileRequest
): Promise<BaseResponse> {
  const response = await postNodeData<RemoveFileRequest, BaseResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/remove-file",
    },
    req
  );

  return response;
}

export async function ListDirectory(
  serverAlias: string,
  req: ListDirectoryRequest
): Promise<ListDirectoryResponse> {
  const response = await postNodeData<
    ListDirectoryRequest,
    ListDirectoryResponse
  >(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/list-directory",
    },
    req
  );

  return response;
}

export async function CreateDirectory(
  serverAlias: string,
  req: CreateDirectoryRequest
): Promise<BaseResponse> {
  const response = await postNodeData<CreateDirectoryRequest, BaseResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/create-directory",
    },
    req
  );

  return response;
}

export async function RemoveDirectory(
  serverAlias: string,
  req: RemoveDirectoryRequest
): Promise<BaseResponse> {
  const response = await postNodeData<RemoveDirectoryRequest, BaseResponse>(
    serverAlias,
    {
      path: "/persistent-node/dashboard/files/remove-directory",
    },
    req
  );

  return response;
}
