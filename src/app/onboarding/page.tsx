"use client";

import { useEffect, useState } from "react";
import { paginateServerCategory } from "@/services/serverTemplateService";
import { ServerTemplateCategory } from "@/services/entity/entity";
import { Spinner, Card, Divider } from "@heroui/react";

export default function OnboardingPage() {
  const [categories, setCategories] = useState<ServerTemplateCategory[]>([]);
  const [loading, setLoading] = useState(true);

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
      if (category.ServerTemplateId == null) {
        const result = await paginateServerCategory({
          page: 1,
          size: 10,
          Id: category.Id,
        });
        setCategories(result.data?.ServerTemplateCategories || []);
      }
    } catch (error) {
      console.error("Error selecting category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Server Template Categories</h1>
      <Divider className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            isPressable
            key={category.Id}
            className="p-4 cursor-pointer"
            onPress={() => {
              console.log("Category clicked:", category);
              onClickCategory(category);
            }}
          >
            <h2 className="text-xl font-semibold">{category.Name}</h2>
            <p>{category.Description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
