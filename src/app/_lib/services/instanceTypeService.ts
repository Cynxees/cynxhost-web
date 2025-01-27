import { postData } from "@/app/_lib/fetcher";
import { InstanceType } from "./entity/entity";
import { BasePaginateRequest } from "./model/request";
import { BaseResponse } from "./model/response";

type PaginateInstanceTypeResponse = BaseResponse<{
  InstanceTypes: InstanceType[];
}>;
export async function paginateInstanceTypes(
  request: BasePaginateRequest
): Promise<PaginateInstanceTypeResponse> {
  const response = await postData<
    BasePaginateRequest,
    PaginateInstanceTypeResponse
  >("/instance-type/paginate", request);

  console.log("/instance-type/paginate", response);
  return response;
}
