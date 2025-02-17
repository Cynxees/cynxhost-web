"use client";

import GameCard from "@/app/_components/gameCard";
import { useDebounce } from "@/app/_lib/hooks/useDebounce";
import { searchModrinthProjects } from "@/app/_lib/services/modrinth/modrinthService";
import { paginateServerCategory } from "@/app/_lib/services/serverTemplateService";
import Loading from "@/app/loading";
import { ServerTemplateCategoryDisplay, ServerTemplateCategoryModrinth } from "@/types/entity/entity";
import { BreadcrumbItem, Breadcrumbs, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useOnboarding } from "../../../_lib/hooks/useOnboarding";

export default function OnboardingGameContent({
  games,
}: {
  games: ServerTemplateCategoryDisplay[];
}) {
  const [categories, setCategories] = useState<ServerTemplateCategoryDisplay[]>(games);
  const [loading, setLoading] = useState(true);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [modrinthPage, setModrinthPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { state, setState } = useOnboarding();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Fetch initial categories (server + modrinth page 1)
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setModrinthPage(1);
      const finalCategories: ServerTemplateCategoryDisplay[] = [];
      const parentId = typeof state.selectedCategory?.Id === "number" ? state.selectedCategory?.Id : 0;

      // Fetch server categories
      if (!state.selectedCategory || state.selectedCategory.Id === '0') {
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

      // Fetch first page of modrinth categories
      const modrinthResult = await searchModrinthProjects({
        limit: 10,
        facets: { project_type: "modpack" },
        query: debouncedSearch,
        // Assuming the API accepts an offset or page parameter; here we assume page-based pagination.
        offset: 0,
        index: "follows",
      });

      if (modrinthResult.hits && modrinthResult.hits.length > 0) {
        modrinthResult.hits.forEach((category) => {
          const templateCategory: ServerTemplateCategoryDisplay = {
            Id: category.project_id, // unique modrinth id
            Name: category.title,
            ParentId: 0,
            Description: category.description,
            ImageUrl: category.icon_url,
            Type: "MODRINTH",
          };
          finalCategories.push(templateCategory);
        });
        // If fewer than 10 results, assume no more pages.
        if (modrinthResult.hits.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setHasMore(false);
      }

      setCategories(finalCategories);
      setLoading(false);
    };

    fetchCategories();
  }, [state, debouncedSearch]);

  // Lazy load additional modrinth categories when the sentinel is visible
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !lazyLoading) {
          setLazyLoading(true);
          const nextPage = modrinthPage + 1;
          // Calculate offset based on page (assuming 10 per page)
          const offset = (nextPage - 1) * 10;
          const modrinthResult = await searchModrinthProjects({
            limit: 10,
            facets: { project_type: "modpack" },
            query: debouncedSearch,
            offset,
            index: "follows",
          });
          if (modrinthResult.hits && modrinthResult.hits.length > 0) {
            const newCategories: ServerTemplateCategoryModrinth[] = modrinthResult.hits.map((category) => ({
              Id: category.project_id,
              Name: category.title,
              ParentId: 0,
              Description: category.description,
              ImageUrl: category.icon_url,
              Type: "MODRINTH",
            }));
            // Append the new modrinth categories
            setCategories((prev) => [...prev, ...newCategories]);
            setModrinthPage(nextPage);
            if (modrinthResult.hits.length < 10) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
          setLazyLoading(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, modrinthPage, debouncedSearch, lazyLoading, loading]);

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
          `/create-node/form/game-detail?id=${encodeURIComponent(category.ServerTemplateId)}`
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
    state.parentHistory = state.parentHistory.slice(0, state.parentHistory.length - 1);
    changeCategory(lastParent);
  };

  const onClickBreadcrumb = (index: number) => {
    state.parentHistory = state.parentHistory.slice(0, index + 1);
    changeCategory(state.parentHistory[index]);
  };

  if (loading) {
    return <Loading />;
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
                    className="cursor-pointer"
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
              {/* Optional back button or title */}
            </div>
          </div>

          <Input
            isClearable
            placeholder="Search your game"
            className="bg-white w-[20vw] ml-auto drop-shadow-medium rounded-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-start mt-12">
        <div className="grid grid-cols-6 gap-x-4 gap-y-10 w-full pb-[30vh]">
          {categories.map((category, index) => (
            <div key={category.Id || `${category.Name}-${index}`} className="col-span-1">
              <GameCard game={category} onClick={onClickCategory} />
            </div>
          ))}
        </div>
        {/* Sentinel element for lazy loading */}
        {hasMore ? (
          <div ref={sentinelRef} className="w-full h-10 flex justify-center items-center mb-[10vh] bg-red-300">
            {lazyLoading && <div>Loading more...</div>}
          </div>
        ): <div>no more</div>}
      </div>
    </>
  );
}
