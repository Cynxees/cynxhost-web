import { DefaultResponse } from "@/services/userService";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.CYNXHOST_API_URL || "http://47.129.250.117:3000/api/v1",
  withCredentials: true,
});

export type ApiResponse<T> = T;

export const fetchData = async <T>(path: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postData = async <TRequest, TResponse = DefaultResponse>(
  path: string,
  data: TRequest
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await api.post<TResponse>(path, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};