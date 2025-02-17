import { ModrinthSearchProjectsResponse } from "@/types/model/response";
import { getModrinthData } from "../../fetcher";

export type SearchProjectsRequest = {
  query?: string;
  facets?: SearchProjectsFacets;
  limit?: number;
  index?: "relevance" | "downloads" | "follows" | "newest" | "updated";
  offset?: number;
};

export type SearchProjectsFacets = {
  project_type?: "modpack" | "mod";
};

export async function searchModrinthProjects(
  request: SearchProjectsRequest
): Promise<ModrinthSearchProjectsResponse> {
  const params = new URLSearchParams();

  if (request.query) {
    params.append("query", request.query);
  }

  if (request.facets?.project_type) {
    params.append(
      "facets",
      JSON.stringify([[`project_type:${request.facets.project_type}`]])
    );
  }

  if (request.limit) {
    params.append("limit", request.limit.toString());
  }

  if (request.index) {
    params.append("index", request.index);
  }

  if (request.offset) {
    params.append("offset", request.offset.toString());
  }

  const response = await getModrinthData<ModrinthSearchProjectsResponse>({
    path: "/search?" + params,
  });

  return response;
}
