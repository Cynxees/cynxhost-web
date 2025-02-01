export type ServiceOption = {
  authToken?: string;
};

export interface FetchOption extends ServiceOption {
  path: string;
}
