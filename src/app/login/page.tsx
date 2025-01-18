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

    const { code } = response;
    if (code !== "SU") {
      setAuthError("Invalid credentials");
      console.debug("Invalid credentials", response);
      return;
    }

    setAuthError("");
    console.log("Login successful");
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container
        size={420}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
          mt="lg"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="lg"
        />
        {authError && (
          <Text color="red" size="sm" mt="sm">
            {authError}
          </Text>
        )}
        <Group justify="center" mt="xl">
          <Button onClick={onClickLogin} color="blue" size="md" fullWidth>
            Login
          </Button>
        </Group>
        <Text size="sm" mt="lg">
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register
          </a>
        </Text>
      </Container>
    </div>
  );
}
