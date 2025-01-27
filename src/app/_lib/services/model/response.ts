export type BaseResponse<Data = null> = {
  code: string;
  codename: string;
  data?: Data;
};
