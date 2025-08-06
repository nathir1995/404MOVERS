import React from "react";
import { useGetUpcomingMoves } from "./api";
import colors from "@/assets/scss/colors.module.scss";
import MovesView from "./MovesView";
import useDataToMoves from "../utils/useDataToMoves";

const UpcomingMovesMover = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUpcomingMoves();
  const moves = useDataToMoves(data);

  return (
    <MovesView
      moves={moves}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
      title={
        <>
          <span style={{ color: colors.primary }}>UPCOMING</span> MOVES
        </>
      }
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default UpcomingMovesMover;
