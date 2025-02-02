import { PersistentNodeStatus } from "@/types/entity/entity";

export function getPersistentNodeStatusDescription(
  status: PersistentNodeStatus
) {
  switch (status) {
    case "RUNNING":
      return "The node is currently running.";
    case "STOPPED":
      return "The node is currently stopped.";
    case "SHUTDOWN":
      return "The node has been shut down.";
    case "CREATING":
      return "The node is being created.";
    case "SETUP":
      return "The node is being set up.";
    case "STARTING":
      return "The node is starting.";
    case "STOPPING":
      return "The node is stopping.";
    case "SHUTTING_DOWN":
      return "The node is shutting down.";
    default:
      return "Unknown status.";
  }
}
