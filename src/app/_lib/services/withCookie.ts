import { ServiceOption } from "@/types/service/option";
import { cookies } from "next/headers";

export const withCookie = async <T>(
  serviceFunction: (options: ServiceOption, req: any) => Promise<T>,
  req: any
) => {
  try {
    const cookie = await cookies();
    console.log("AuthToken cookie: ", cookie);

    const authToken = cookie.get("AuthToken")?.value;
    if (!authToken) {
      throw new Error("AuthToken cookie is missing");
    }

    return serviceFunction({ authToken }, req);
  } catch (error) {
    console.error("Error in withCookie:", error);
    throw error;
  }
};
