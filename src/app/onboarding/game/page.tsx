"use client";

import { useEffect, useState } from "react";
import { paginateServerCategory } from "@/services/serverTemplateService";
import { ServerTemplateCategory } from "@/services/entity/entity";
import {
  Spinner,
  Card,
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../context";
import GameCard from "@/app/_components/onboarding/gameCard";
import { ArrowLeft } from "solar-icon-set";

export default function OnboardingGamePage() {
  const [parentHistory, setParentHistory] = useState<ServerTemplateCategory[]>(
    []
  );

  const [categories, setCategories] = useState<ServerTemplateCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { state, setState } = useOnboarding();

  useEffect(() => {
    setState({
      ...state,
      title: "Choose your game",
      step: 1,
    });
  }, []);

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
    setState({
      ...state,
      selectedCategory: category,
    });
  };

  const onClickCategory = async (category: ServerTemplateCategory) => {
    setLoading(true);

    try {
      if (category.ServerTemplateId != null) {
        // Redirect to the server template page
        console.log(
          "Redirecting to server template page:",
          category.ServerTemplateId
        );
        changeCategory(category);

        router.push(
          `/onboarding/game-detail?id=${encodeURIComponent(
            category.ServerTemplateId
          )}`
        );
        return;
      }

      changeCategory(category);
      setParentHistory([...parentHistory, category]);
    } catch (error) {
      console.error("Error selecting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickBack = () => {
    if (parentHistory.length === 0) {
      changeCategory();
      return;
    }

    const lastParent = parentHistory[parentHistory.length - 2];
    setParentHistory(parentHistory.slice(0, parentHistory.length - 1));
    changeCategory(lastParent);
  };

  const onClickBreadcrumb = (index: number) => {
    setParentHistory(parentHistory.slice(0, index + 1));
    changeCategory(parentHistory[index]);
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
          <ArrowLeft className="my-auto" size={30} onClick={onClickBack} />
          {state.title && <h1 className="my-auto">{state.title}</h1>}
        </div>
        {parentHistory.length > 0 && (
          <Breadcrumbs variant="solid" className="" color="secondary">
            {parentHistory.map((category) => (
              <BreadcrumbItem
                key={category.Id}
                onClick={() => onClickBreadcrumb(parentHistory.indexOf(category))}
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
