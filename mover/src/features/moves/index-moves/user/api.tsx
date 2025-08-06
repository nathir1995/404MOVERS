import client from "@/api/client";
import { Page } from "@/api/types/Pagination";
import Move from "@/models/Move/Move.model";
import { useInfiniteQuery } from "@tanstack/react-query";

const ENDPOINT = {
  ALL: `/api/user/moves/moves`,
  UPCOMING: `/api/user/moves/upcoming`,
  PAST: `/api/user/moves/past`,
  DRAFT: `/api/user/moves/draft`,
} as const;

type MovePageData = Page<Move>;
type IndexMovesResponseType = {
  data: { moves: MovePageData };
};

const getNextPageParam = (lastPage: MovePageData) => {
  const { current_page, last_page } = lastPage;
  if (current_page === last_page) {
    return undefined;
  }
  return current_page + 1;
};

export const useGetAllMoves = () => {
  return useInfiniteQuery<MovePageData>({
    queryKey: ["USER_MOVES", "ALL"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(ENDPOINT.ALL, {
        page: pageParam,
      });
      return data.data.moves;
    },
    getNextPageParam,
  });
};
export const useGetUpcomingMoves = () => {
  return useInfiniteQuery<MovePageData>({
    queryKey: ["USER_MOVES", "UPCOMING"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.UPCOMING,
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
export const useGetPastMoves = () => {
  return useInfiniteQuery<MovePageData>({
    queryKey: ["USER_MOVES", "PAST"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.PAST,
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
export const useGetDraftMoves = () => {
  return useInfiniteQuery<MovePageData>({
    queryKey: ["USER_MOVES", "DRAFT"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.DRAFT,
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
