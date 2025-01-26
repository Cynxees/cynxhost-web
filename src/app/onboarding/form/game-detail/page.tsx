"use client";

import { ServerTemplate } from "@/services/entity/entity";
import { getServerTemplateById } from "@/services/serverTemplateService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboarding } from "../../context";
import {
  Divider,
  Dropdown,
  DropdownItem,
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";

export const pageMetadata = {
  title: "Game Details",
};

export default function OnboardingGameDetailPage() {
  const searchParams = useSearchParams();
  const parentId = parseInt(searchParams.get("id") || "0") || null;

  const { state, setState } = useOnboarding();
  const [selectedGame, setSelectedGame] = useState<ServerTemplate | null>(null);
  const [selectedStorageSize, setSelectedStorageSize] = useState(8);

  useEffect(() => {
    console.log("state:", state);
    setState({
      ...state,
      title: "Game Details",
      step: 2,
    });
  }, [selectedGame]);

  useEffect(() => {
    if (!parentId) {
      return;
    }

    getServerTemplateById({
      Id: parentId,
    }).then((response) => {
      console.log("Selected game:", response);

      if (!response.data?.ServerTemplate) {
        return;
      }

      setState({
        ...state,
        selectedGame: response.data?.ServerTemplate,
      });
      setSelectedGame(response.data?.ServerTemplate);
    });
  }, [parentId]);

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
            key={variable.Name}
            className="w-72"
            label={variable.Name}
            placeholder={"Select " + variable.Name}
          >
            {variable.Content.map((content) => (
              <SelectItem key={content.Name} className="bg-foreground">
                {content.Name}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>

      <Divider className="w-full h-0.5" />

      <div className="flex flex-col gap-6 bg-foreground p-6 rounded-xl">
        <p className="text-xl">Storage Size</p>
        <Slider
          value={selectedStorageSize}
          label="Storage Size"
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
    </div>
  );
}
