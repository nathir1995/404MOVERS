import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getCategoriesWithItems,
  createMove,
  getMovePackages,
} from "./BookMove.services";
import {
  MoveItemsResponseType,
  BookMoveRequestType,
  BookMoveResponseType,
  MovePackagesResponseType,
} from "./BookMove.models";
import { MutationType } from "@/api/types/Mutation.types";

export const useMoveCategoriesWithItems = () => {
  return useQuery<MoveItemsResponseType>({
    queryKey: ["MOVE_CATEGORIES_WITH_ITEMS"],
    queryFn: getCategoriesWithItems,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useMovePackages = () => {
  return useQuery<MovePackagesResponseType>({
    queryKey: ["MOVE_PACKAGES"],
    queryFn: getMovePackages,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

type BookMoveProps = Omit<
  MutationType<BookMoveRequestType, BookMoveResponseType>,
  "mutationFn"
>;
export const useBookMove = (props: BookMoveProps = {}) => {
  const { error, ...mutation } = useMutation({
    mutationFn: createMove,
    ...props,
  });

  return {
    ...mutation,
    error,
    error_message: error?.response?.data?.message,
  };
};
