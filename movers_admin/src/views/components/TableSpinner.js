import React from "react";
import { Spinner } from "reactstrap";

export const TableSpinner = (props) => {
  return <Spinner color="primary" size="lg" className="my-4" {...props} />;
};
