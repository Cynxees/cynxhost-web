"use client";

import { Button, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function HomePageContent() {
  const router = useRouter();

  return (
    <main className="font-extrabold text-5xl m-36">
      <div>LANDING PAGE</div>
      <div className="text-2xl">on development</div>
      <Divider className="my-12"></Divider>

      <div className="text-2xl mb-2">Navigation</div>
      <div className="flex flex-row flex-wrap gap-5">
        <Button
          onPress={() => {
            router.push("/login");
          }}
          color="default"
          radius="sm"
          className="shadow-2xl border border-content1 hover:bg-secondary"
        >
          Register/Login
        </Button>
        <Button
          onPress={() => {
            router.push("/create-node/form/game");
          }}
          color="default"
          radius="sm"
          className="shadow-2xl border border-content1 hover:bg-secondary"
        >
          Create new Node
        </Button>
        <Button
          onPress={() => {
            router.push("/dashboard");
          }}
          color="default"
          radius="sm"
          className="shadow-2xl border border-content1 hover:bg-secondary"
        >
          Dashboard
        </Button>
      </div>
    </main>
  );
}
