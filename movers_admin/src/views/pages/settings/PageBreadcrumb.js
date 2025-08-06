import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { Routes } from "configs/Routes";

const PageBreadcrumb = () => {
  return (
    <Breadcrumbs>
      <NavLink to={Routes.settings.url}>
        <p className="m-0">Settings</p>
      </NavLink>
    </Breadcrumbs>
  );
};

export default PageBreadcrumb;
