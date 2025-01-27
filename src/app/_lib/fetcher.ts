import { BaseResponse } from "@/app/_lib/services/model/response";
import axios from "axios";
import { snakeCase } from "lodash";
import { cookies } from "next/headers";

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

export const fetchData = async <T>(path: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};

export const postData = async <TRequest, TResponse = BaseResponse>(
  path: string,
  data?: TRequest
): Promise<ApiResponse<TResponse>> => {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("AuthToken");

    const snakeCaseData = data ? convertKeysToSnakeCase(data) : undefined;
    const response = await api.post<TResponse>(path, snakeCaseData, {
      headers: {
        Cookie: `AuthToken=${authCookie?.value}`,
      },
    });
    return response.data;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};
