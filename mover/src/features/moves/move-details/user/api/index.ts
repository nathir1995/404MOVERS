import client from "@/api/client";
import Move from "@/models/Move/Move.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ConfirmMoverFinishRequestType,
  ConfirmMoverStartRequestType,
  FinishMoveRequestType,
  PayRequestType,
  PayResponseType,
  StartMoveRequestType,
} from "./types";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { MutationType } from "@/api/types/Mutation.types";
import { refetchInterval } from "@/configs/queryClient";

const ENDPOINT = {
  GET_MOVE_DETAILS: `/api/user/moves/get-move`,
  PAY_AND_GET_CLIENT_SECRET: `/api/user/pay`,
  FINALIZE_PAYMENT: `/api/user/process-payment`,
  START_MOVE: `/api/user/moves/start-move`,
  FINISH_MOVE: `/api/user/moves/finish-move`,
  CONFIRM_START_MOVER: `/api/user/moves/confirm-start-move`,
  CONFIRM_FINISH_MOVER: `/api/user/moves/confirm-finish-move`,
} as const;

type MoveDetailsResponseType = {
  data: { "move-details": Move };
};

export const useGetMoveDetails = (move_id: string | number) => {
  return useQuery<MoveDetailsResponseType>({
    queryKey: ["USER_MOVES", move_id],
    queryFn: async (): Promise<MoveDetailsResponseType> =>
      (
        await client.post<MoveDetailsResponseType>(ENDPOINT.GET_MOVE_DETAILS, {
          move_id,
        })
      ).data,
    enabled: !!move_id,
    refetchInterval,
  });
};

type PayMutationProps = Omit<MutationType<PayRequestType>, "mutationFn">;
export const usePayForMove = (props: PayMutationProps = {}) => {
  const elements = useElements();
  const stripe = useStripe();

  return useMutation({
    mutationKey: ["USER_MOVES"],
    mutationFn: async ({ move_id, amount }: PayRequestType) => {
      if (!elements || !stripe) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        return;
      }

      const { data } = await client.post<PayResponseType>(
        ENDPOINT.PAY_AND_GET_CLIENT_SECRET,
        {
          move_id,
          amount,
        }
      );

      const { client_secret } = data.data.payment_intent;
      console.log("client_secret: ", client_secret);

      const confirmedCardPayment = await stripe.confirmCardSetup(
        client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );
      console.log("confirmedCardPayment: ", confirmedCardPayment);

      const { data: checkout_data } = await client.post(
        ENDPOINT.FINALIZE_PAYMENT,
        {
          move_id,
          amount,
          payment_method: confirmedCardPayment?.setupIntent?.payment_method,
        }
      );
      console.log("checkout: ", checkout_data);
    },
    ...props,
  });
};

const keyConstructor = (move_id: number) => [`USER_MOVES`, `${move_id}`];

type StartMutationProps = Omit<
  MutationType<StartMoveRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useStartMove = (props: StartMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`USER_MOVES`],
    mutationFn: async ({ move_id }: StartMoveRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.START_MOVE,
        {
          move_id,
        }
      );
      return data;
    },
    ...props,
    onSuccess(data, variables, context) {
      props?.onSuccess?.(data, variables, context);
      queryClient.setQueryData<MoveDetailsResponseType>(
        keyConstructor(variables.move_id),
        () => data
      );
    },
  });
};

type FinishMutationProps = Omit<
  MutationType<FinishMoveRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useFinishMove = (props: FinishMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`USER_MOVES`],
    mutationFn: async ({ move_id }: FinishMoveRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.FINISH_MOVE,
        {
          move_id,
        }
      );
      return data;
    },
    ...props,
    onSuccess(data, variables, context) {
      props?.onSuccess?.(data, variables, context);
      queryClient.setQueryData<MoveDetailsResponseType>(
        keyConstructor(variables.move_id),
        () => data
      );
    },
  });
};

type ConfirmMoverStartMutationProps = Omit<
  MutationType<ConfirmMoverStartRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useConfirmMoverStart = (
  props: ConfirmMoverStartMutationProps = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`USER_MOVES`],
    mutationFn: async ({ move_id, mover_id }: ConfirmMoverStartRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.CONFIRM_START_MOVER,
        {
          move_id,
          mover_id,
        }
      );
      return data;
    },
    ...props,
    onSuccess(data, variables, context) {
      props?.onSuccess?.(data, variables, context);
      queryClient.setQueryData<MoveDetailsResponseType>(
        keyConstructor(variables.move_id),
        () => data
      );
    },
  });
};

type ConfirmMoverFinishMutationProps = Omit<
  MutationType<ConfirmMoverFinishRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useConfirmMoverFinish = (
  props: ConfirmMoverFinishMutationProps = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`USER_MOVES`],
    mutationFn: async ({
      move_id,
      mover_id,
    }: ConfirmMoverFinishRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.CONFIRM_FINISH_MOVER,
        {
          move_id,
          mover_id,
        }
      );
      return data;
    },
    ...props,
    onSuccess(data, variables, context) {
      props?.onSuccess?.(data, variables, context);
      queryClient.setQueryData<MoveDetailsResponseType>(
        keyConstructor(variables.move_id),
        () => data
      );
    },
  });
};
