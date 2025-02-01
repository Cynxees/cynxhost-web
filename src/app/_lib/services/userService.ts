import { postData } from "@/app/_lib/fetcher";
import {
  BaseResponse,
  CheckUsernameRequest,
  GetProfileResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "@/types/model/response";

export async function registerUser(
  request: RegisterUserRequest
): Promise<BaseResponse> {
  const response = await postData<RegisterUserRequest>(
    {
      path: "/user/register",
    },
    request
  );

  return response;
}

export async function loginUser(
  request: LoginUserRequest
): Promise<LoginUserResponse> {
  const response = await postData<LoginUserRequest, LoginUserResponse>(
    { path: "/user/login" },
    request
  );

  return response;
}

export async function logoutUser(): Promise<BaseResponse> {
  const response = await postData<LoginUserRequest, LoginUserResponse>({
    path: "/user/logout",
  });

  return response;
}

export async function checkUsername(
  request: CheckUsernameRequest
): Promise<BaseResponse> {
  const response = await postData<CheckUsernameRequest>(
    { path: "/user/check-username" },
    request
  );

  return response;
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await postData<null, GetProfileResponse>(
    { path: "/user/profile" },
    null
  );

  return response;
}
