import React from "react";
import { useGetAllMoves } from "./api";
import colors from "@/assets/scss/colors.module.scss";
import MovesView from "./MovesView";
import useDataToMoves from "../utils/useDataToMoves";

const IndexMovesUser = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllMoves();
  const moves = useDataToMoves(data);

  return (
    <MovesView
      moves={moves}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
      title={
        <>
          MY <span style={{ color: colors.primary }}>MOVES</span>
        </>
      }
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default IndexMovesUser;
