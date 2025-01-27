import { PersistentNode } from "@/types/entity/entity";
import { BaseResponse } from "@/types/model/response";

const DashboardNodeContent = ({
  nodeData,
}: {
  nodeData: BaseResponse<PersistentNode>["data"];
}) => {
  if (!nodeData) {
    return <div>Node not found</div>;
  }

  return (
    <div>
      <p>{nodeData.Id}</p>
      <h1>{nodeData.Name}</h1>
    </div>
  );
};

export default DashboardNodeContent;
