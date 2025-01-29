import { BaseResponse } from "@/types/model/response";
import { FetchOption } from "@/types/service/option";
import axios from "axios";
import { snakeCase } from "lodash";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false, // Disables SSL verification
});

const api = axios.create({
  baseURL: "https://cynx.buzz/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export type ApiResponse<T> = T;

const convertKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeCase(key)] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

export const postData = async <TRequest, TResponse = BaseResponse>(
  options: FetchOption,
  data?: TRequest
): Promise<ApiResponse<TResponse>> => {
  console.log("fetching: ", options.path);
  const snakeCaseData = data ? convertKeysToSnakeCase(data) : undefined;

  if (options.authToken) {
    api.defaults.headers.Cookie = `AuthToken=${options.authToken}`;
  }

  const response = await api.post<TResponse>(options.path, snakeCaseData);
  console.log(options.path, " : ", response.data);
  return response.data;
};

export const postNodeData = async <TRequest, TResponse = BaseResponse>(
  serverAlias: string,
  options: FetchOption,
  data?: TRequest
): Promise<ApiResponse<TResponse>> => {
  console.log("fetching: ", options.path);
  const snakeCaseData = data ? convertKeysToSnakeCase(data) : undefined;

  if (options.authToken) {
    api.defaults.headers.Cookie = `AuthToken=${options.authToken}`;
  }

  const baseURL = `https://${serverAlias}.cynx.buzz/api/v1`;

  const response = await axios.post<TResponse>(
    `${baseURL}${options.path}`,
    snakeCaseData,
    {
      httpsAgent: agent,
    }
  );

  console.log(options.path, " : ", response.data);
  return response.data;
};
