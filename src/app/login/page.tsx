"use client";

import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Container,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/userService";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

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

  return (
    <Container size={420} my={20}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        required
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        mt="md"
      />
      {authError && (
        <Text color="red" size="sm" mt="sm">
          {authError}
        </Text>
      )}
      <Group justify="center" mt="lg">
        <Button onClick={onClickLogin} color="blue" size="md" fullWidth>
          Login
        </Button>
      </Group>
      <Text size="sm" mt="md">
        Don't have an account?{" "}
        <a
          href="/register"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Register
        </a>
      </Text>
    </Container>
  );
}
