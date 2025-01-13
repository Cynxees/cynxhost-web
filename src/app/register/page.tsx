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
import { registerUser } from "@/services/userService";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

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

    if (result.code !== "SU") {
      setAuthError("Registration failed, please try again.");
      return;
    }

    setAuthError("");
    router.push("/login");
  };

  return (
    <Container size={420} my={20}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
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
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        required
        mt="md"
      />
      {authError && (
        <Text color="red" size="sm" mt="sm">
          {authError}
        </Text>
      )}
      <Group justify="center" mt="lg">
        <Button onClick={onClickRegister} color="blue" size="md" fullWidth>
          Register
        </Button>
      </Group>
      <Text size="sm" mt="md">
        Already have an account?{" "}
        <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </a>
      </Text>
    </Container>
  );
}
