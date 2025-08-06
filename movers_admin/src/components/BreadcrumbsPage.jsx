import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const BreadcrumbsPage = ({ labels }) => {
  return (
    <Breadcrumbs>
      {labels.map((label) => (
        <p className="m-0">{label}</p>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsPage;
