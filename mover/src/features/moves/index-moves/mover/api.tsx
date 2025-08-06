import client from "@/api/client";
import { Page } from "@/api/types/Pagination";
import { ROLE } from "@/constants/roles";
import useAuth from "@/features/auth/utils/useAuth";
import Move from "@/models/Move/Move.model";
import { useInfiniteQuery } from "@tanstack/react-query";

const ENDPOINT = {
  ALL: (role: ROLE) => `/api/${role}/moves/moves`,
  UPCOMING: (role: ROLE) => `/api/${role}/moves/upcoming`,
  PAST: (role: ROLE) => `/api/${role}/moves/past`,
  MY: (role: ROLE) => `/api/${role}/moves/my-moves`,
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
  const { role } = useAuth();
  return useInfiniteQuery<MovePageData>({
    queryKey: [`${role}_MOVES`, "ALL"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.ALL(role!),
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
export const useGetUpcomingMoves = () => {
  const { role } = useAuth();
  return useInfiniteQuery<MovePageData>({
    queryKey: [`${role}_MOVES`, "UPCOMING"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.UPCOMING(role!),
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
  const { role } = useAuth();
  return useInfiniteQuery<MovePageData>({
    queryKey: [`${role}_MOVES`, "PAST"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.PAST(role!),
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
export const useGetMyMoves = () => {
  const { role } = useAuth();
  return useInfiniteQuery<MovePageData>({
    queryKey: [`${role}_MOVES`, "MY"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post<IndexMovesResponseType>(
        ENDPOINT.MY(role!),
        {
          page: pageParam,
        }
      );
      return data.data.moves;
    },
    getNextPageParam,
  });
};
