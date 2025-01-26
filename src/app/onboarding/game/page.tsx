"use client";

import { useEffect, useState } from "react";
import { paginateServerCategory } from "@/services/serverTemplateService";
import { ServerTemplateCategory } from "@/services/entity/entity";
import { Spinner, Card, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../context";
import GameCard from "@/app/_components/onboarding/gameCard";
import { ArrowLeft } from "solar-icon-set";

export default function OnboardingGamePage() {
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
        const result = await paginateServerCategory({ page: 1, size: 10 });
        setCategories(result.data?.ServerTemplateCategories || []);
      } catch (error) {
        console.error("Error fetching server template categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onClickCategory = async (category: ServerTemplateCategory) => {
    setLoading(true);

    try {
      if (category.ServerTemplateId != null) {
        // Redirect to the server template page
        console.log(
          "Redirecting to server template page:",
          category.ServerTemplateId
        );
        router.push(
          `/onboarding/game-detail?id=${encodeURIComponent(
            category.ServerTemplateId
          )}`
        );

        return;
      }
      const result = await paginateServerCategory({
        page: 1,
        size: 10,
        Id: category.Id,
      });
      setCategories(result.data?.ServerTemplateCategories || []);
    } catch (error) {
      console.error("Error selecting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickBack = () => {};

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-2 h-10">
        <ArrowLeft className="my-auto" size={30} onClick={onClickBack} />
        {state.title && <h1 className="my-auto">{state.title}</h1>}
      </div>
      <Divider className="w-full h-0.5 my-4"></Divider>
      <div className="h-screen flex flex-col items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <GameCard
              key={category.Id}
              game={category}
              onClick={onClickCategory}
            />
          ))}
        </div>
      </div>
    </>
  );
}
