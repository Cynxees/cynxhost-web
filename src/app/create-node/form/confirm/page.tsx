"use client";

import { CreatePersistentNode } from "@/app/_lib/services/persistentNodeService";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function OnboardingConfirmPage() {
  const { state, setState } = useOnboarding();

  const router = useRouter();

  if (
    state.request.instanceTypeId == undefined ||
    state.request.storageSizeMb == undefined ||
    state.request.serverTemplateId === undefined
  ) {
    router.push("/create-node/form/game");
    return;
  }

  const onClickConfirm = async () => {
    const req = state.request;

    if (
      req.instanceTypeId == undefined ||
      req.storageSizeMb == undefined ||
      req.serverTemplateId === undefined ||
      req.name == undefined ||
      req.serverAlias == undefined
    ) {
      return;
    }

    const res = await CreatePersistentNode({
      instanceTypeId: req.instanceTypeId!,
      storageSizeMb: req.storageSizeMb!,
      serverTemplateId: req.serverTemplateId!,
      name: req.name!,
      serverAlias: req.serverAlias!,
      variables: req.variables || [],
    });

    if (res.code !== "SU") {
      console.error("Error creating persistent node");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div>
      <p>instance id: {state.request.instanceTypeId}</p>
      <p>storage : {state.request.storageSizeMb}</p>
      <p>template id :{state.request.serverTemplateId}</p>

      <Input
        value={state.request.name}
        onChange={(e) => {
          setState({
            ...state,
            request: {
              ...state.request,
              name: e.target.value,
            },
          });
        }}
      ></Input>
      <p>name :{state.request.name}</p>

      <Input
        value={state.request.serverAlias}
        onChange={(e) => {
          setState({
            ...state,
            request: {
              ...state.request,
              serverAlias: e.target.value,
            },
          });
        }}
      ></Input>
      <p>server alias : {state.request.serverAlias}</p>

      <br />
      <p>[ Variables ]</p>
      <div>
        {state.request.variables?.map((variable, index) => (
          <p key={index}>
            {variable.name}: {variable.value}
          </p>
        ))}
      </div>

      <Button onPress={onClickConfirm}>Confirm</Button>
    </div>
  );
}
