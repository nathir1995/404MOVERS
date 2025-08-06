import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

const PageBreadcrumb = () => {
  return (
    <Breadcrumbs>
      <p className="m-0">Accounts</p>
      <NavLink to={Routes.movers.url}>
        <p className="m-0">Movers</p>
      </NavLink>
      <p className="m-0">Details</p>
    </Breadcrumbs>
  );
};

export default PageBreadcrumb;
