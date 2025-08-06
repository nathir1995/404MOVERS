import { useMutation } from "@tanstack/react-query";
import { verifyEmail, sendVerifictionCode } from "./emailVerification.services";
import {
  VerifyEmailRequestType,
  SendVerifictionCodeRequestType,
} from "./emailVerification.model";

import { MutationType } from "@/api/types/Mutation.types";

type VerifyEmailProps = Omit<
  MutationType<VerifyEmailRequestType>,
  "mutationFn"
>;
export const useVerifyEmail = (props: VerifyEmailProps = {}) => {
  const { error, ...mutation } = useMutation({
    mutationFn: verifyEmail,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};

type SendVerifictionCodeProps = Omit<
  MutationType<SendVerifictionCodeRequestType>,
  "mutationFn"
>;
export const useSendVerificationCode = (
  props: SendVerifictionCodeProps = {}
) => {
  const { error, ...mutation } = useMutation({
    mutationFn: sendVerifictionCode,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};
