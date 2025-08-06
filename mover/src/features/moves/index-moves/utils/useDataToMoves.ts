import React from "react";
import { Page } from "@/api/types/Pagination";
import Move from "@/models/Move/Move.model";

type IData = {
  pages: Page<Move>[];
};

const useDataToMoves = (data: IData | undefined): Move[] => {
  return React.useMemo(
    () =>
      data?.pages?.reduce<Move[]>(
        (prev, curr) => [...prev, ...curr.data],

        []
      ) ?? [],
    [data]
  );
};

export default useDataToMoves;
