import { postData } from "@/lib/fetcher";

export type DefaultResponse = {
  code: string;
  codename: string;
  data?: Record<string, unknown>;
};

type RegisterUserRequest = {
  username: string;
  password: string;
};

type LoginUserRequest = {
  username: string;
  password: string;
};

type LoginUserResponse = DefaultResponse;

export type GetProfileResponse = DefaultResponse & {
  data: {
    Username: string;
    Coin: number;
  };
};

type CheckUsernameRequest = {
  username: string;
}

export async function registerUser(request: RegisterUserRequest): Promise<DefaultResponse> {

  const response = await postData<RegisterUserRequest>(
    "/user/register",
    request
  );

  console.log("User created:", response);
  return response;
}

export async function loginUser(request: LoginUserRequest): Promise<LoginUserResponse> {

  const response = await postData<LoginUserRequest, LoginUserResponse>(
    "/user/login",
    request
  );

  console.log("Login response:", response);
  return response;
}

export async function checkUsername(request: CheckUsernameRequest): Promise<DefaultResponse> {

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
