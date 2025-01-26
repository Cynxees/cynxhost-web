"use client";

import { ServerTemplate } from "@/services/entity/entity";
import {
  getServerTemplateById,
  validateServerTemplateVariables,
} from "@/services/serverTemplateService";
import { Button, Divider, Select, SelectItem, Slider } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useOnboarding } from "../../context";
import {
  CreatePersistentNodeRequest,
  ServerTemplateScriptVariable,
  ValidateServerTemplateVariablesRequest,
} from "@/services/model/request";

export default function OnboardingGameDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameDetailContent />
    </Suspense>
  );
}

function GameDetailContent() {
  const searchParams = useSearchParams();
  const parentId = parseInt(searchParams.get("id") || "0") || null;
  const router = useRouter();

  const { state, setState } = useOnboarding();
  const [selectedGame, setSelectedGame] = useState<ServerTemplate | null>(null);
  const [selectedStorageSize, setSelectedStorageSize] = useState(8);
  const [selectedVariables, setSelectedVariables] = useState<
    ServerTemplateScriptVariable[]
  >([]);

  useEffect(() => {
    console.log("state:", state);
    setState({
      ...state,
      title: "Game Details",
      step: 2,
    });
  }, [selectedGame]);

  useEffect(() => {
    if (!parentId) return;
    getServerTemplateById({ Id: parentId }).then((response) => {
      if (response.data?.ServerTemplate) {
        setSelectedGame(response.data?.ServerTemplate);
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

  const onClickSubmit = async () => {
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
      step: 3,
      request: request,
    });

    router.push(`/onboarding/form/tier`);
  };

  if (selectedGame == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xl font-bold">{selectedGame.Name}</p>
        <p>{selectedGame.Description}</p>
      </div>

      <div>
        {selectedGame?.Variables?.map((variable) => (
          <Select
            isRequired
            key={variable.Name}
            className="w-72"
            label={variable.Name}
            placeholder={"Select " + variable.Name}
            aria-label={`Select ${variable.Name}`}
            items={variable.Content}
            onChange={(value) => handleVariableChange(variable.Name, value)}
          >
            {(content) => (
              <SelectItem
                key={content.Name}
                className="bg-foreground"
                value={content.Name}
              >
                {content.Name}
              </SelectItem>
            )}
          </Select>
        ))}
      </div>

      <Divider className="w-full h-0.5" />

      <div className="flex flex-col gap-6 bg-foreground p-6 rounded-xl">
        <p className="text-xl">Storage Size</p>
        <Slider
          value={selectedStorageSize}
          label="Storage Size"
          aria-label="Storage Size"
          onChange={(value) =>
            setSelectedStorageSize(Array.isArray(value) ? value[0] : value)
          }
          maxValue={32}
          minValue={0}
          step={1}
          showSteps={true}
          formatOptions={{ style: "unit", unit: "gigabyte" }}
          showTooltip={true}
          color="primary"
          classNames={{
            track: "bg-overlay",
          }}
        ></Slider>
      </div>

      <Button color="primary" onPress={onClickSubmit}>
        Continue
      </Button>
    </div>
  );
}
