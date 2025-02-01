"use client";

import {
  getServerTemplateById,
  validateServerTemplateVariables,
} from "@/app/_lib/services/serverTemplateService";
import { ServerTemplate } from "@/types/entity/entity";
import {
  CreatePersistentNodeRequest,
  ServerTemplateScriptVariable,
} from "@/types/model/request";
import {
  Button,
  Divider,
  Form,
  Image,
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function GameDetailContent({
  selectedGame,
}: {
  selectedGame: ServerTemplate;
}) {
  const searchParams = useSearchParams();
  const parentId = parseInt(searchParams.get("id") || "0") || null;
  const router = useRouter();

  const { state, setState } = useOnboarding();
  const [selectedStorageSize, setSelectedStorageSize] = useState(8);
  const [selectedVariables, setSelectedVariables] = useState<
    ServerTemplateScriptVariable[]
  >([]);

  useEffect(() => {
    if (!parentId) return;
    getServerTemplateById({ Id: parentId }).then((response) => {
      if (response.data?.ServerTemplate) {
        setState({ ...state, selectedGame: response.data?.ServerTemplate });
      }
    });
  }, [parentId]);

  const handleVariableChange = (
    variableName: string,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const variable = selectedVariables.find(
      (variable) => variable.name === variableName
    );

    if (variable) {
      variable.value = e.target.value;
      return;
    }

    setSelectedVariables((prev) => [
      ...prev,
      { name: variableName, value: e.target.value },
    ]);
  };

  const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate server template variables
    const request: Partial<CreatePersistentNodeRequest> = {
      ...state.request,
      serverTemplateId: state.selectedGame?.Id,
      variables: selectedVariables,
      storageSizeMb: selectedStorageSize,
    };

    if (
      request.serverTemplateId === undefined ||
      request.variables === undefined
    ) {
      return;
    }

    const result = await validateServerTemplateVariables({
      serverTemplateId: request.serverTemplateId,
      variables: request.variables,
    });

    if (result.code !== "SU") {
      console.error("Error validating server template variables");
      return;
    }

    setState({
      ...state,
      request: request,
    });

    router.push(`/create-node/form/tier`);
  };

  if (selectedGame == null) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      onSubmit={onClickSubmit}
      validationBehavior="native"
      className="flex flex-col gap-6 relative"
    >
      <div className="flex flex-row gap-12">
        <Image
          src={selectedGame.ImageUrl}
          radius="none"
          className="w-[20vw] drop-shadow-heavy"
        />

        <div className="flex flex-col gap-20">
          <div>
            <p className="text-xl">{selectedGame.Name}</p>
            <p className="text-content3 font-semibold">
              {selectedGame.Description}
            </p>
          </div>

          <div>
            {selectedGame?.Variables?.map((variable) => (
              <Select
                isRequired
                key={variable.Name}
                className="w-72 drop-shadow-medium"
                label={variable.Name}
                placeholder={"Select " + variable.Name}
                aria-label={`Select ${variable.Name}`}
                labelPlacement="outside"
                items={variable.Content}
                value={
                  selectedVariables.find((v) => v.name === variable.Name)?.value
                }
                errorMessage={
                  !selectedVariables.some(
                    (v) => v.name === variable.Name && v.value
                  )
                    ? "This field is required"
                    : undefined
                }
                onChange={(value) => handleVariableChange(variable.Name, value)}
                radius="lg"
                classNames={{
                  base: "bg-content2",
                  label: "!text-black",
                  listbox: "bg-content2",
                  popoverContent: "bg-content2",
                }}
              >
                {(content) => (
                  <SelectItem
                    key={content.Name}
                    className=""
                    value={content.Name}
                  >
                    {content.Name}
                  </SelectItem>
                )}
              </Select>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 -z-10">
        <Image
          src="/images/decors/minecraft_pigs_bottom_left.png"
          height={"40vh"}
        ></Image>
      </div>

      <Image src="/images/decors/grey_mesh_corner.png" className="fixed bottom-0 right-0 -z-10 h-[70vh]">

      </Image>

      <div className="fixed bottom-0 flex flex-row w-full pr-40 justify-between">
        <div></div>

        <Button
          color="primary"
          type="submit"
          className="text-content2 font-extrabold text-lg w-72 mb-20 hover:border-primary-500 hover:brightness-125 hover:motion-reduce:animate-pulse border-medium border-transparent drop-shadow-medium"
          radius="sm"
        >
          Continue
        </Button>
      </div>
    </Form>
  );
}
