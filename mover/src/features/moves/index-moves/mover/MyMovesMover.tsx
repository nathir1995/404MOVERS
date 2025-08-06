import React from "react";
import { useGetMyMoves } from "./api";
import colors from "@/assets/scss/colors.module.scss";
import MovesView from "./MovesView";
import useDataToMoves from "../utils/useDataToMoves";

const MyMovesMover = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMyMoves();
  const moves = useDataToMoves(data);

  return (
    <MovesView
      moves={moves}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
      title={
        <>
          <span style={{ color: colors.primary }}>MY</span> MOVES
        </>
      }
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default MyMovesMover;
