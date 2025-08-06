import { AxiosResponse } from "axios";
import client from "@/api/client";

import { RegisterUserType } from "./registerUser.model";
import { REGISTER_ENDPOINTS } from "../register.endpoints";

export const registerUser = async (
  user: RegisterUserType
): Promise<AxiosResponse> => {
  const response = await client.post(REGISTER_ENDPOINTS.REGISTER_USER, user);
  return response;
};
