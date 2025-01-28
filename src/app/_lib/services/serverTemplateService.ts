import {
  ServerTemplate,
  ServerTemplateCategory,
} from "../../../types/entity/entity";
import {
  BasePaginateRequest,
  IdRequest,
  ValidateServerTemplateVariablesRequest,
} from "../../../types/model/request";
import { BaseResponse } from "../../../types/model/response";
import { postData } from "../fetcher";

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
  >({ path: "/server-template/paginate-categories" }, request);

  console.log("/server-template/paginate-categories", response);
  return response;
}

export async function getServerTemplateById(
  req: IdRequest
): Promise<GetServerTemplateByIdResponse> {
  const response = await postData<IdRequest, GetServerTemplateByIdResponse>(
    { path: "/server-template/detail" },
    req
  );

  console.log("getServerTemplateById", response);
  return response;
}

export async function validateServerTemplateVariables(
  request: ValidateServerTemplateVariablesRequest
): Promise<BaseResponse> {
  const response = await postData<
    ValidateServerTemplateVariablesRequest,
    BaseResponse
  >({ path: "/server-template/validate-variables" }, request);

  console.log("/server-template/validate-variables", response);
  return response;
}
