import client from "@/api/client";

import BOOK_MOVE_ENDPOINTS from "./BookMove.endpoints";
import {
  BookMoveRequestType,
  BookMoveResponseType,
  MoveItemsResponseType,
  MovePackagesResponseType,
} from "./BookMove.models";

export const getCategoriesWithItems =
  async (): Promise<MoveItemsResponseType> => {
    const response = await client.get<MoveItemsResponseType>(
      BOOK_MOVE_ENDPOINTS.GET_CATEGORIES_WITH_ITEMS
    );
    return response.data;
  };

export const getMovePackages = async (): Promise<MovePackagesResponseType> => {
  const response = await client.get<MovePackagesResponseType>(
    BOOK_MOVE_ENDPOINTS.GET_MOVE_PACKAGES
  );
  return response.data;
};

export const createMove = async (
  move: BookMoveRequestType
): Promise<BookMoveResponseType> => {
  const response = await client.post(BOOK_MOVE_ENDPOINTS.CREATE_MOVE, move);
  return response.data;
};
