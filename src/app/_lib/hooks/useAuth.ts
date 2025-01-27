import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  getProfile,
} from "@/app/_lib/services/userService";
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  BaseResponse,
  GetProfileResponse,
} from "@/types/model/response";
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
          setAuthState({ isAuthenticated: true, user: null });
          router.push("/dashboard");
        } else {
          throw new Error("Invalid credentials");
        }
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    }
  );

  // Register mutation
  const registerMutation = useMutation<
    BaseResponse,
    Error,
    RegisterUserRequest
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.code === "SU" && data !== null) {
        setAuthState({ isAuthenticated: true, user: null });
        router.push("/dashboard");
      } else {
        throw new Error("Registration failed");
      }
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  // Get profile query
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch,
  } = useQuery<GetProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const profile = await getProfile();
        if (!profile) {
          throw new Error("Failed to fetch profile");
        }
        return profile;
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setAuthState({ isAuthenticated: false, user: null });
        throw error;
      }
    },
    enabled: authState.isAuthenticated,
  });

  // Logout function
  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    router.push("/login");
  };

  const refetchProfile = () => {
    refetch();
  };

  // Ensure profile is fetched after login
  React.useEffect(() => {
    refetchProfile();
  }, []);

  return {
    authState,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    profileData,
    isLoading:
      loginMutation.status === "pending" ||
      registerMutation.status === "pending" ||
      isProfileLoading,
    authError: loginMutation.error || registerMutation.error,
  };
}
