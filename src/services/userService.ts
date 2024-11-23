import { postData } from "@/lib/fetcher";

export type DefaultResponse = {
  code: string;
  codename: string;
  data?: Record<string, unknown>;
};

type RegisterUserRequest = {
  name: string;
  password: string;
};

type LoginUserRequest = {
  name: string;
  password: string;
};

type LoginUserResponse = DefaultResponse & {

  data: {
    access_token: string;
    token_type: string;
  }
}

type CheckUsernameRequest = {
  username: string;
}


export async function createUser(request: RegisterUserRequest): Promise<DefaultResponse> {

  const response = await postData<RegisterUserRequest>(
    "/register-user",
    request
  );

  console.log("User created:", response);
  return response;
}

export async function loginUser(request: LoginUserRequest): Promise<LoginUserResponse> {

  const response = await postData<LoginUserRequest, LoginUserResponse>(
    "/login-user",
    request
  );

  console.log("User logged in:", response);
  return response;
}

export async function checkUsername(request: CheckUsernameRequest): Promise<DefaultResponse> {

  const response = await postData<CheckUsernameRequest>(
    "/check-username",
    request
  );

  console.log("Username checked:", response);
  return response;
}
