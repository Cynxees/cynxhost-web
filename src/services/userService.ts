import { postData } from "@/lib/fetcher";
import { BaseResponse } from "./model/response";

type RegisterUserRequest = {
  username: string;
  password: string;
};

type LoginUserRequest = {
  username: string;
  password: string;
};

type LoginUserResponse = BaseResponse;

export type GetProfileResponse = BaseResponse<{
  Username: string;
  Coin: number;
}>;

type CheckUsernameRequest = {
  username: string;
};

export async function registerUser(
  request: RegisterUserRequest
): Promise<BaseResponse> {
  const response = await postData<RegisterUserRequest>(
    "/user/register",
    request
  );

  console.log("User created:", response);
  return response;
}

export async function loginUser(
  request: LoginUserRequest
): Promise<LoginUserResponse> {
  const response = await postData<LoginUserRequest, LoginUserResponse>(
    "/user/login",
    request
  );

  console.log("Login response:", response);
  return response;
}

export async function logoutUser(): Promise<BaseResponse> {
  const response = await postData<LoginUserRequest, LoginUserResponse>(
    "/user/logout"
  );

  console.log("Logout response:", response);
  return response;
}

export async function checkUsername(
  request: CheckUsernameRequest
): Promise<BaseResponse> {
  const response = await postData<CheckUsernameRequest>(
    "/user/check-username",
    request
  );

  console.log("Username checked:", response);
  return response;
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await postData<null, GetProfileResponse>(
    "/user/profile",
    null
  );

  console.log("Profile:", response);
  return response;
}
