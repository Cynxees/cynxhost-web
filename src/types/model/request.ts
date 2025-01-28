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
  storageSizeMb: number;
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
