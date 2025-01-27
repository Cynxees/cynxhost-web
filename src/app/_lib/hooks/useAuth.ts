import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/_lib/services/userService";
import { LoginUserRequest, LoginUserResponse } from "@/types/model/response";
import { useRouter } from "next/navigation";

export type AuthState = {
  isAuthenticated: boolean;
  user: LoginUserResponse | null;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const router = useRouter();

  // Login mutation
  const loginMutation = useMutation<LoginUserResponse, Error, LoginUserRequest>(
    {
      mutationFn: loginUser,
      onSuccess: (data) => {
        if (data.code === "SU" && data !== null) {
          setAuthState({ isAuthenticated: true, user: data });
          router.push("/dashboard");
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }
  );

  return {
    authState,
    login: loginMutation.mutate,
    isLoading: loginMutation.status === "pending",
    authError: loginMutation.error,
  };
}
