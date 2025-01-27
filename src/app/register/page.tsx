"use client";

import { checkUsername, registerUser } from "@/app/_lib/services/userService";
import {
  Alert,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Link,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isCheckingUsername, setIsCheckingUsername] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [authError, setAuthError] = useState("");

  const router = useRouter();

  const onUsernameBlur = async () => {
    if (!username) return;

    setIsCheckingUsername(true);
    setIsUsernameAvailable(false);

    try {
      const result = await checkUsername({ username: username });
      if (result.code === "SU") {
        setIsUsernameAvailable(true);
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      setIsUsernameAvailable(false);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUsernameAvailable) {
      setAuthError("Username is already taken");
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
    <div className="h-screen flex">
      <Card className="w-96 my-auto justify-center mx-auto p-5">
        <Form
          className="w-full max-w-xs"
          validationBehavior="native"
          onSubmit={onSubmit}
          autoComplete="on"
          method="post"
        >
          <h2 className="font-bold text-2xl text-center w-full">Register</h2>
          <Divider className="mb-2" />
          <div className="relative w-full">
            <Input
              className="w-full"
              isRequired
              errorMessage="Please enter a valid username"
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
              onChange={(event) => {
                setIsCheckingUsername(true);
                setUsername(event.currentTarget.value);
              }}
              onBlur={onUsernameBlur}
            />
            {isCheckingUsername && (
              <Spinner
                className="absolute right-4 top-1/2 -translate-y-1/2"
                size="sm"
                color="current"
              />
            )}
            {isUsernameAvailable === false && (
              <p className="text-danger text-sm mt-1">
                Username is already taken
              </p>
            )}
            {isUsernameAvailable === true && (
              <p className="text-success text-sm mt-1">Username is available</p>
            )}
          </div>
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
            <Alert color="danger" className="w-full">
              {authError}
            </Alert>
          )}
          <p>
            Already have an account?{" "}
            <Link showAnchorIcon href="/login">
              Login
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
