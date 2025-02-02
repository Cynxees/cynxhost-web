export interface User {
  Id: number;
  Username: string;
  Coin: number;
  CreatedDate: Date;
  UpdatedDate: Date;
}

export interface Script {
  Id: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  Name: string;
  Variables: string;
  SetupScript: string;
  StartScript: string;
  StopScript: string;
  ShutdownScript: string;
  ConfigPath: string;
}

export interface ServerTemplate {
  Id: number;
  Name: string;
  Description?: string;
  MinimumRam: number;
  MinimumCpu: number;
  MinimumDisk: number;
  ImageUrl?: string;
  Variables?: Array<{
    Name: string;
    Type: string;
    Content: Array<{
      Name: string;
    }>;
  }>;
}

export interface ServerTemplateCategory {
  Id: number;
  Name: string;
  Description?: string;
  ParentId: number;
  ImageUrl?: string;
  ServerTemplateId?: number;
}

export interface InstanceType {
  Id: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  Name: string;
  VcpuCount: number;
  MemorySizeGb: number;
  NetworkSpeedMbps: number;
  ImagePath?: string;
  SpotPrice: number;
  SellPrice: number;
  Status: "ACTIVE" | "INACTIVE" | "HIDDEN";
}

export interface Instance {
  Id: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  Name: string;
  AwsInstanceId: string;
  PublicIp: string;
  PrivateIp: string;
  InstanceTypeId: number;
  Status: string;
  InstanceType: InstanceType;
}

export interface Storage {
  Id: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  Name: string;
  SizeMb: number;
  AwsEbsId: string;
  AwsEbsSnapshotId: string;
  Status: string;
}

export type PersistentNodeStatus =
  | "RUNNING"
  | "STOPPED"
  | "SHUTDOWN"
  | "CREATING"
  | "SETUP"
  | "STARTING"
  | "STOPPING"
  | "SHUTTING_DOWN";

export interface PersistentNode {
  Id: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  Name: string;
  OwnerId: number;
  ServerTemplateId: number;
  InstanceId?: number;
  InstanceTypeId: number;
  StorageId: number;
  ServerAlias: string;
  DnsRecordId?: string;
  Status: PersistentNodeStatus;
  Owner: User;
  ServerTemplate: ServerTemplate;
  Instance?: Instance;
  InstanceType: InstanceType;
  Storage: Storage;
}

export interface Parameter {
  Id: string;
  Value: string;
  Desc: string;
  CreatedDate: Date;
  UpdatedDate: Date;
}
