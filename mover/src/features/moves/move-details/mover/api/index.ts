import client from "@/api/client";
import { ROLE } from "@/constants/roles";
import useAuth from "@/features/auth/utils/useAuth";
import Move from "@/models/Move/Move.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AcceptRequestType,
  FinishMoveRequestType,
  StartMoveRequestType,
} from "./types";
import { MutationType } from "@/api/types/Mutation.types";
import { refetchInterval } from "@/configs/queryClient";

const ENDPOINT = {
  GET_MOVE_DETAILS: (role: ROLE) => `/api/${role}/moves/get-move`,
  ACCEPT_MOVE: (role: ROLE) => `/api/${role}/moves/accept-move`,
  START_MOVE: (role: ROLE) => `/api/${role}/moves/start-move`,
  FINISH_MOVE: (role: ROLE) => `/api/${role}/moves/finish-move`,
} as const;

type MoveDetailsResponseType = {
  data: { "move-details": Move };
};

const keyConstructor = (role: ROLE, move_id: number) => [
  `${role}_MOVES`,
  move_id,
];

export const useGetMoveDetails = (move_id: number) => {
  const { role } = useAuth();
  return useQuery<MoveDetailsResponseType>({
    queryKey: keyConstructor(role!, move_id),
    queryFn: async (): Promise<MoveDetailsResponseType> => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.GET_MOVE_DETAILS(role!),
        {
          move_id,
        }
      );

      return data;
    },
    enabled: !!move_id,
    refetchInterval,
  });
};

type AcceptMutationProps = Omit<
  MutationType<AcceptRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useAcceptMove = (props: AcceptMutationProps = {}) => {
  const { role } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`${role}_MOVES`],
    mutationFn: async ({ move_id }: AcceptRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.ACCEPT_MOVE(role!),
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
        keyConstructor(role!, variables.move_id),
        () => data
      );
    },
  });
};

type StartMutationProps = Omit<
  MutationType<StartMoveRequestType, MoveDetailsResponseType>,
  "mutationFn"
>;
export const useStartMove = (props: StartMutationProps = {}) => {
  const { role } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`${role}_MOVES`],
    mutationFn: async ({ move_id }: StartMoveRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.START_MOVE(role!),
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
        keyConstructor(role!, variables.move_id),
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
  const { role } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`${role}_MOVES`],
    mutationFn: async ({ move_id }: FinishMoveRequestType) => {
      const { data } = await client.post<MoveDetailsResponseType>(
        ENDPOINT.FINISH_MOVE(role!),
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
        keyConstructor(role!, variables.move_id),
        () => data
      );
    },
  });
};
