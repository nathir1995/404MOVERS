import { useMutation } from "@tanstack/react-query";
import { registerDriver, registerLabor } from "./registerMover.services";
import { MoverRegisterRequestType } from "./registerMover.model";

import { MutationType } from "@/api/types/Mutation.types";
type RegisterMoverProps = Omit<
  MutationType<MoverRegisterRequestType>,
  "mutationFn"
>;

export const useRegisterDriver = (props: RegisterMoverProps = {}) => {
  const { error, ...mutation } = useMutation({
    mutationFn: registerDriver,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};

export const useRegisterLabor = (props: RegisterMoverProps = {}) => {
  const { error, ...mutation } = useMutation({
    mutationFn: registerLabor,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};
