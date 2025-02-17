export type BaseResponse<Data = null> = {
  code: string;
  codename: string;
  data?: Data;
};

export type RegisterUserRequest = {
  username: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type LoginUserResponse = BaseResponse;

export type GetProfileResponse = BaseResponse<{
  Username: string;
  Coin: number;
}>;

export type CheckUsernameRequest = {
  username: string;
};

export type ConsoleCreateSessionResponse = BaseResponse<{
  SessionId: string;
}>;

export type GetContainerStatsResponse = BaseResponse<{
  CpuPercent: number;
  CpuUsed: number;
  CpuLimit: number;
  RamPercent: number;
  RamUsed: number;
  RamLimit: number;
  StoragePercent: number;
  StorageUsed: number;
  StorageLimit: number;
}>;

export type SendSingleDockerCommandResponse = BaseResponse<{
  Output: string;
}>;

export type File = {
  Filename: string;
  CreatedAt: string;
  UpdatedAt: string;
  Size: number;
};

export type ListDirectoryResponse = BaseResponse<{
  Files: File[];
}>;

export type ModrinthProjectListObject = {
  project_id: string;
  project_type: string;
  slug: string;
  author: string;
  title: string;
  description: string;
  categories: string[];
  display_categories: string[];
  versions: string[];
  downloads: number;
  follows: number;
  icon_url: string;
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  client_side: string;
  server_side: string;
  gallery: string[];
  featured_gallery: string;
  color: number;
};

export type ModrinthSearchProjectsResponse = {
  hits: ModrinthProjectListObject[];
};