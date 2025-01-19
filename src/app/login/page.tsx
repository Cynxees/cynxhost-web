"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/userService";
import {
  Alert,
  Button,
  Card,
  Code,
  Divider,
  Form,
  Input,
  Link,
} from "@heroui/react";
import { div } from "framer-motion/client";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in...");
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
    <div className="h-screen flex">
      <Card className="w-96 my-auto justify-center mx-auto p-5">
        <Form
          className="w-full max-w-xs"
          validationBehavior="native"
          onSubmit={onSubmit}
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
