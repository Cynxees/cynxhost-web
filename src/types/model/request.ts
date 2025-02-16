export type BasePaginateRequest = {
  page: number;
  size: number;
  keyword?: string;
};

export type IdRequest = {
  Id: number;
};

export type ServerTemplateScriptVariable = {
  name: string;
  value: string;
};

export type CreatePersistentNodeRequest = {
  serverTemplateId: number;
  storageSizeGb: number;
  instanceTypeId: number;
  serverAlias: string;
  name: string;
  variables: ServerTemplateScriptVariable[];
};

export type ValidateServerTemplateVariablesRequest = {
  serverTemplateId: number;
  variables: ServerTemplateScriptVariable[];
};

export type SendCommandNodeSessionRequest = {
  sessionId: string;
  command: string;
  isBase64Encoded: boolean;
};

export type NodeCreateSessionRequest = {
  shell: string;
};

export type DownloadFileRequest = {
  filePath: string;
};

export type RemoveFileRequest = {
  filePath: string;
};

export type UploadFileRequest = {
  destinationPath: string;
  fileName: string;
};

export type ListDirectoryRequest = {
  directoryPath: string;
};

export type CreateDirectoryRequest = {
  directoryPath: string;
};

export type RemoveDirectoryRequest = {
  directoryPath: string;
};
