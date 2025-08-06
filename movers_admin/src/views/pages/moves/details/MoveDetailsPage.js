import React from "react";

import { useGetMoveDetails } from "api/moves";

import { useParams } from "react-router-dom";
import { Routes } from "configs/Routes";

import PageBreadcrumb from "./PageBreadcrumb";
import DetailsPageQueryStatus from "views/components/DetailsPageQueryStatus";
import MoveContent from "./MoveContent";

const MoveDetails = () => {
  const { move_id } = useParams();

  const { data, isLoading, isError, isSuccess } = useGetMoveDetails(move_id);
  const notFound = isSuccess && !data;

  if (isLoading || isError || notFound) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus
          isLoading={isLoading}
          isError={isError}
          notFound={notFound}
          notFoundLabel="Move Not Found"
          allButtonLink={Routes.moves.url}
          allButtonText="All Moves"
        />
      </>
    );
  }
  return <Content move={data["move-details"]} />;
};

export default MoveDetails;

function Content({ move }) {
  return (
    <>
      <PageBreadcrumb />
      <MoveContent move={move} />
    </>
  );
}
