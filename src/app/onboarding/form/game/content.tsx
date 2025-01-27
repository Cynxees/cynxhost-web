"use client";

import GameCard from "@/app/_components/onboarding/gameCard";
import { paginateServerCategory } from "@/app/_lib/services/serverTemplateService";
import { ServerTemplateCategory } from "@/types/entity/entity";
import { BreadcrumbItem, Breadcrumbs, Divider, Spinner } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "solar-icon-set";
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
        if (state.selectedCategory == null) {
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
          `/onboarding/form/game-detail?id=${encodeURIComponent(
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
        <div className="flex flex-row gap-2 h-10">
          <ArrowLeft
            className="mt-auto cursor-pointer hover:scale-105"
            size={30}
            onClick={onClickBack}
            color="cyan"
          />
          {<h1 className="my-auto">{"Choose Your Game"}</h1>}
        </div>
        {state.parentHistory.length > 0 && (
          <Breadcrumbs variant="solid" color="secondary">
            {state.parentHistory.map((category) => (
              <BreadcrumbItem
                key={category.Id}
                onClick={() =>
                  onClickBreadcrumb(state.parentHistory.indexOf(category))
                }
                className="cursor-pointer"
              >
                {category.Name}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        )}
      </div>
      <Divider className="w-full h-0.5 my-4"></Divider>
      <div className="h-screen flex flex-col items-start">
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
