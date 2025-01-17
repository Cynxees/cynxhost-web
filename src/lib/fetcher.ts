import { DefaultResponse } from "@/services/userService";
import axios from "axios";

const api = axios.create({
  baseURL: "https://cynx.buzz/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
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