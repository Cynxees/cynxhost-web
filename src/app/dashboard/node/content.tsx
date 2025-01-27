import { PersistentNode } from "@/app/_lib/services/entity/entity";
import { BaseResponse } from "@/app/_lib/services/model/response";

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
