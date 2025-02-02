import { ServiceOption } from "@/types/service/option";
import { cookies } from "next/headers";

export const withCookie = async <T>(
  serviceFunction:
    | ((req: any, options?: ServiceOption) => Promise<T>)
    | ((options?: ServiceOption) => Promise<T>),
  req?: any
) => {
  try {
    const cookie = await cookies();
    console.log("AuthToken cookie: ", cookie);

    const authToken = cookie.get("AuthToken")?.value;
    if (!authToken) {
      throw new Error("AuthToken cookie is missing");
    }

    if (!req) {
      return serviceFunction({ authToken });
    }

    return serviceFunction(req, { authToken });
  } catch (error) {
    console.error("Error in withCookie:", error);
    throw error;
  }
};
