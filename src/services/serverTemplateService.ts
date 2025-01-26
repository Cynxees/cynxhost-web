import { postData } from "@/lib/fetcher";
import { ServerTemplate, ServerTemplateCategory } from "./entity/entity";
import { BasePaginateRequest, IdRequest } from "./model/request";
import { BaseResponse } from "./model/response";

type PaginateServerTemplateCategoryRequest = BasePaginateRequest & {
  Id?: number; // ServerTemplateCategoryId
};

type PaginateServerTemplateCategoryResponse = BaseResponse<{
  ServerTemplateCategories: ServerTemplateCategory[];
}>;

type GetServerTemplateByIdResponse = BaseResponse<{
  ServerTemplate: ServerTemplate;
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

export async function getServerTemplateById(
  req: IdRequest
): Promise<GetServerTemplateByIdResponse> {
  const response = await postData<IdRequest, GetServerTemplateByIdResponse>(
    "/server-template/detail",
    req
  );

  console.log("getServerTemplateById", response);
  return response;
}
