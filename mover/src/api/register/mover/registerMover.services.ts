import { AxiosResponse } from "axios";
import client from "@/api/client";

import { MoverRegisterRequestType } from "./registerMover.model";
import { REGISTER_ENDPOINTS } from "../register.endpoints";

export const registerDriver = async (
  user: MoverRegisterRequestType
): Promise<AxiosResponse> => {
  const response = await client.post(REGISTER_ENDPOINTS.REGISTER_DRIVER, user);
  return response;
};

export const registerLabor = async (
  user: MoverRegisterRequestType
): Promise<AxiosResponse> => {
  const response = await client.post(REGISTER_ENDPOINTS.REGISTER_LABOR, user);
  return response;
};
