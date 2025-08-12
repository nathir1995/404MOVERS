import React from "react";
import QueryStatus from "@/components/QueryStatus";
import Button from "@/components/Button";
import MoveCard from "../../components/MoveCard";

import styles from "../styles.module.scss";
import Move from "@/models/Move/Move.model";
import { safeMap, hasItems, safeLength } from "@/utility/arraySafety";
import { safeMap, hasItems } from "@/utility/arraySafety";
main

const emptyContainerStyles: React.CSSProperties = {
  minHeight: "20rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
};

type IProps = {
  moves: Move[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  title: React.ReactNode;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

const MovesView = ({
  moves,
  isLoading,
  isError,
  refetch,
  title,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: IProps) => {
  if (isLoading || isError) {
    return (
      <QueryStatus isError={isError} isLoading={isLoading} refetch={refetch} />
    );
  }
  if (!hasItems(moves)) {
    return (
      <div style={emptyContainerStyles}>
        <h5 style={{ textAlign: "center" }}>There are no moves to display</h5>
      </div>
    );
  }
  return (
    <>
      <div className={styles.padding_container}>
        <h4 style={{ marginBottom: "1rem" }}>{title}</h4>
        <div className={styles.moves_container}>
          {safeMap(moves, (move) => (
            <MoveCard key={move.id} move={move} />
          ))}
        </div>

        {hasNextPage && (
          <div className={styles.load_more_btn_container}>
            <Button isLoading={isFetchingNextPage} onClick={fetchNextPage}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MovesView;
