"use client";

import { checkUsername, loginUser, registerUser } from "@/services/userService";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Container,
  Text,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(true);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const toggleMode = async () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setUsernameIsInvalid(false);
    setUsernameMessage("");

    setMode(mode === "login" ? "register" : "login");
    setAuthError("");
  };

  async function validateUsername(username: string) {
    const response = await checkUsername({ username: username }).catch(
      (error) => {
        console.error("Username check failed:", error);
        return;
      },
    );
    if (!response) return;

    if (response.code === "SU") {
      setUsernameIsInvalid(true);
      return;
    }

    if (mode !== "register") return;

    if (username.length < 4) {
      setUsernameIsInvalid(false);
      setUsernameMessage("Minimum Length: 4");
      return;
    }

    if (username.length > 20) {
      setUsernameIsInvalid(false);
      setUsernameMessage("Maximum Length: 20");
      return;
    }

    if (mode === "register") {
      setUsernameIsInvalid(false);
      setUsernameMessage("Username is taken");
    }
  }

  const onChangeUsername = async (currentUsername: string) => {
    setUsername(currentUsername);

    if (mode !== "register") return;
    await validateUsername(currentUsername);
  };

  const onClickLogin = async () => {
    const response = await loginUser({ username, password }).catch((error) => {
      console.error("Login failed:", error);
      setAuthError("Login failed, please try again.");
      return null;
    });
    if (!response) return;

    if (
      response.code !== "SU" ||
      !response.data.access_token ||
      !response.data.token_type
    ) {
      setAuthError("Invalid credentials");
      return;
    }

    document.cookie = `accessToken=${response.data.token_type} ${response.data.access_token}; path=/; secure; SameSite=Strict`;
    setAuthError("");
    console.log("Login successful");
    router.push("/dashboard");
  };

  const onClickRegister = async () => {
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    const result = await registerUser({ username, password }).catch((error) => {
      console.error("Registration failed:", error);
      setAuthError("Registration failed, please try again.");
      return null;
    });

    if (!result) return;

    if (result.code != "SU") {
      setAuthError("Registration failed, please try again.");
      return;
    }

    setAuthError("");
  };

  return (
    <Container size={420} my={40}>
      <h1 style={{ textAlign: "center" }}>
        {mode === "login" ? "Sign In" : "Register"}
      </h1>
      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        maxLength={20}
        onChange={(event) => onChangeUsername(event.currentTarget.value)}
        error={!usernameIsInvalid && usernameMessage}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        mt="md"
      />
      {mode === "register" && (
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          required
          mt="md"
        />
      )}
      {authError && (
        <Text color="red" size="sm" mt="sm">
          {authError}
        </Text>
      )}
      <Group mt="xl">
        {mode === "login" ? (
          <Button onClick={onClickLogin} color="blue">
            Sign In
          </Button>
        ) : (
          <Button onClick={onClickRegister} color="green">
            Register
          </Button>
        )}
      </Group>
      <Text size="sm" mt="md">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <Anchor onClick={toggleMode} component="button">
          {mode === "login" ? "Register" : "Sign In"}
        </Anchor>
      </Text>
    </Container>
  );
}
