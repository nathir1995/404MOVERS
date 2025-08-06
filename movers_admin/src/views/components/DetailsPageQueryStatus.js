import React from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { StatusCard } from "components/StatusCard";

const DetailsPageQueryStatus = ({
  isLoading,
  isError,
  notFound,
  notFoundLabel = "Not Found",
  allButtonLink = "/",
  allButtonText = "All",
}) => {
  return (
    <StatusCard isLoading={isLoading} isError={isError}>
      {notFound && (
        <>
          <h2 className="mb-2">{notFoundLabel}</h2>
          <NavLink to={allButtonLink}>
            <Button color="primary" outline>
              {allButtonText}
            </Button>
          </NavLink>
        </>
      )}
    </StatusCard>
  );
};

export default DetailsPageQueryStatus;
