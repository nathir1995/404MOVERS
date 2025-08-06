import { AxiosResponse } from "axios";
import client from "@/api/client";

import {
  SendVerifictionCodeRequestType,
  VerifyEmailRequestType,
} from "./emailVerification.model";
import { EMAIL_VERIFICATION_ENDPOINTS } from "./emailVerification.endpoints";

export const verifyEmail = async (
  data: VerifyEmailRequestType
): Promise<AxiosResponse> => {
  const response = await client.post(
    EMAIL_VERIFICATION_ENDPOINTS.VERIFY_EMAIL,
    data
  );
  return response;
};

export const sendVerifictionCode = async (
  data: SendVerifictionCodeRequestType
): Promise<AxiosResponse> => {
  const response = await client.post(
    EMAIL_VERIFICATION_ENDPOINTS.SEND_VERIFICATION_CODE,
    data
  );
  return response;
};
