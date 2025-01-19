import { postData } from "@/lib/fetcher";
import { ServerTemplateCategory } from "./entity/entity";
import { BasePaginateRequest } from "./model/request";
import { BaseResponse } from "./model/response";

type PaginateServerTemplateCategoryRequest = BasePaginateRequest & {
  Id?: number; // ServerTemplateCategoryId
};

type PaginateServerTemplateCategoryResponse = BaseResponse<{
  ServerTemplateCategories: ServerTemplateCategory[];
}>;

export async function paginateServerCategory(
  request: PaginateServerTemplateCategoryRequest
): Promise<PaginateServerTemplateCategoryResponse> {
  const response = await postData<
    PaginateServerTemplateCategoryRequest,
    PaginateServerTemplateCategoryResponse
  >("/server-template/paginate-categories", request);

  console.log("/server-template/paginate-categories", response);
  return response;
}
