import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

const PageBreadcrumb = () => {
  return (
    <Breadcrumbs>
      <NavLink to={Routes.moves.url}>
        <p className="m-0">Moves</p>
      </NavLink>
      <p className="m-0">Details</p>
    </Breadcrumbs>
  );
};

export default PageBreadcrumb;
