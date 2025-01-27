"use client";

import { Alert, Button, Card, Divider, Form, Input, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/_lib/hooks/useAuth";
import { getProfile, loginUser } from "../_lib/services/userService";

export default function LoginContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({ username, password });

    router.push("/");
  };

  return (
    <div className="h-screen flex">
      <Card className="w-96 my-auto justify-center mx-auto p-5">
        <Form
          className="w-full max-w-xs"
          validationBehavior="native"
          onSubmit={handleSubmit}
          autoComplete="on"
          method="post"
        >
          <h2 className="font-bold text-2xl text-center w-full">Login</h2>
          <Divider className="mb-2" />
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="username"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <Input
            isRequired
            errorMessage="Please enter your password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Divider className="my-3" />
          {authError && (
            <Alert color="danger" className="w-full p-2">
              {authError}
            </Alert>
          )}
          <p>
            Don't have an account?{" "}
            <Link showAnchorIcon href="/register">
              Register
            </Link>
          </p>
          <Button type="submit" variant="ghost" className="mx-auto w-full">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
