"use client";

import GameCard from "@/app/_components/gameCard";
import { useDebounce } from "@/app/_lib/hooks/useDebounce";
import { searchModrinthProjects } from "@/app/_lib/services/modrinth/modrinthService";
import { paginateServerCategory } from "@/app/_lib/services/serverTemplateService";
import Loading from "@/app/loading";
import { ServerTemplateCategory, ServerTemplateCategoryDisplay } from "@/types/entity/entity";
import { BreadcrumbItem, Breadcrumbs, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function OnboardingGameContent({
  games,
}: {
  games: ServerTemplateCategoryDisplay[];
}) {
  const [categories, setCategories] = useState<ServerTemplateCategoryDisplay[]>(games);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { state, setState } = useOnboarding();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);


  useEffect(() => {
    const fetchCategories = async () => {

      setCategories([]);

      const finalCategories: ServerTemplateCategoryDisplay[] = [];
      const parentId = typeof state.selectedCategory?.Id === "number" ? state.selectedCategory?.Id : 0;

      if (state.selectedCategory == null || state.selectedCategory.Id == '0') {
        const result = await paginateServerCategory({ page: 1, size: 10, keyword: debouncedSearch });
        if (result.data?.ServerTemplateCategories) {
          finalCategories.push(...result.data.ServerTemplateCategories);
        }
      } else {
        const result = await paginateServerCategory({
          page: 1,
          size: 10,
          Id: parentId,
          keyword: debouncedSearch,
        });

        if (result.data?.ServerTemplateCategories) {
          finalCategories.push(...result.data.ServerTemplateCategories);
        }
      }

      // add modrinth categories
      const modrinthCategories = await searchModrinthProjects({
        limit: 100,
        facets: { project_type: "modpack" },
        query: debouncedSearch,
        index: "follows",
        
      });
      if (!modrinthCategories.hits) {
        setCategories(finalCategories);
        setLoading(false);
        return
      }

      modrinthCategories.hits.forEach((category) => {
        const templateCategory: ServerTemplateCategoryDisplay = {
          Id: category.project_id,
          Name: category.title,
          ParentId: 0,
          Description: category.versions[0],
          ImageUrl: category.icon_url,
          Type: "MODRINTH",
        };

        console.log("category", templateCategory);
        finalCategories.push(templateCategory);
      })

      setCategories(finalCategories);
      setLoading(false);
    };

    fetchCategories();
  }, [state, debouncedSearch]);

  const changeCategory = async (category?: ServerTemplateCategoryDisplay) => {
    setCategories([]);
    setState({
      ...state,
      selectedCategory: category,
    });
  };

  const onClickCategory = async (category: ServerTemplateCategoryDisplay) => {
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
      <Loading />
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
            className="bg-white w-[20vw] ml-auto drop-shadow-medium rounded-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Input>
        </div>
      </div>

      <div className="flex flex-col items-start mt-12">
        <div className="grid grid-cols-6 gap-x-4 gap-y-10 w-full pb-[30vh]">
          {categories.map((category, index) => (
            <div
              key={category.Name}
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
