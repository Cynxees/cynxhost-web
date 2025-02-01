"use client";

import GameCard from "@/app/_components/gameCard";
import { paginateServerCategory } from "@/app/_lib/services/serverTemplateService";
import { ServerTemplateCategory } from "@/types/entity/entity";
import { BreadcrumbItem, Breadcrumbs, Input, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function OnboardingGameContent({
  games,
}: {
  games: ServerTemplateCategory[];
}) {
  const [categories, setCategories] = useState<ServerTemplateCategory[]>(games);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { state, setState } = useOnboarding();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (state.selectedCategory == null || state.selectedCategory.Id == 0) {
          const result = await paginateServerCategory({ page: 1, size: 10 });
          setCategories(result.data?.ServerTemplateCategories || []);
        } else {
          const result = await paginateServerCategory({
            page: 1,
            size: 10,
            Id: state.selectedCategory.Id,
          });
          setCategories(result.data?.ServerTemplateCategories || []);
        }
      } catch (error) {
        console.error("Error fetching server template categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [state]);

  const changeCategory = async (category?: ServerTemplateCategory) => {
    setCategories([]);
    setState({
      ...state,
      selectedCategory: category,
    });
  };

  const onClickCategory = async (category: ServerTemplateCategory) => {
    setLoading(true);

    try {
      if (category.ServerTemplateId != null) {
        router.push(
          `/create-node/form/game-detail?id=${encodeURIComponent(
            category.ServerTemplateId
          )}`
        );
        return;
      }

      changeCategory(category);
      state.parentHistory.push(category);
    } catch (error) {
      console.error("Error selecting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickBack = () => {
    if (state.parentHistory.length === 0) {
      return;
    }

    const lastParent = state.parentHistory[state.parentHistory.length - 2];
    state.parentHistory = state.parentHistory.slice(
      0,
      state.parentHistory.length - 1
    );
    changeCategory(lastParent);
  };

  const onClickBreadcrumb = (index: number) => {
    state.parentHistory = state.parentHistory.slice(0, index + 1);
    changeCategory(state.parentHistory[index]);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-3 justify-between items-center w-full">
          <div>
            {state.parentHistory.length > 0 && (
              <Breadcrumbs variant="solid">
                {state.parentHistory.map((category) => (
                  <BreadcrumbItem
                    key={category.Id}
                    onPress={() =>
                      onClickBreadcrumb(state.parentHistory.indexOf(category))
                    }
                    className={`cursor-pointer `}
                    color="primary"
                  >
                    {category.Name}
                  </BreadcrumbItem>
                ))}
              </Breadcrumbs>
            )}
          </div>

          <div className="relative items-center justify-center flex">
            <div className="relative">
              {/* <AltArrowLeft
                className="my-auto cursor-pointer hover:scale-105 absolute -left-10"
                size={30}
                onClick={onClickBack}
                color="black"
              /> */}
              {/* <h1 className="my-auto text-center justify-center text-5xl font-nats">
                Select Starting Template
              </h1> */}
            </div>
          </div>

          <Input
            isClearable
            placeholder="Search your game"
            className="bg-white w-[20vw] ml-auto drop-shadow-heavy rounded-lg"
          ></Input>
        </div>
      </div>

      <div className="flex flex-col items-start mt-12">
        <div className="grid grid-cols-4 gap-4 w-full">
          {categories.map((category, index) => (
            <div
              key={category.Id}
              className={`col-span-1 ${index >= 4 ? "justify-start" : ""}`}
            >
              <GameCard game={category} onClick={onClickCategory} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
