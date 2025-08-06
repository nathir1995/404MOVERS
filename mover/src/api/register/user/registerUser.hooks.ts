import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./registerUser.services";
import { RegisterUserType } from "./registerUser.model";

import { MutationType } from "@/api/types/Mutation.types";
type RegisterUserProps = Omit<MutationType<RegisterUserType>, "mutationFn">;

export const useRegisterUser = (props: RegisterUserProps = {}) => {
  const { error, ...mutation } = useMutation({
    mutationFn: registerUser,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};
