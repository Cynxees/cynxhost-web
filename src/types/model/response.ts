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