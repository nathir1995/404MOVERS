import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ErrorType = {
  message: string;
};
export type MutationType<
  RequestType,
  ResponseType = unknown
> = UseMutationOptions<
  ResponseType,
  AxiosError<ErrorType>,
  RequestType,
  unknown
>;
