import React from "react";
import { Progress } from "reactstrap";
import PropTypes from "prop-types";

const ProgressBar = ({ isLoading, isSuccess, isError, value }) => {
  let color = "";
  if (!isLoading && isSuccess) {
    color = "success";
  }
  if (!isLoading && isError) {
    color = "danger";
  }
  return (
    <div className="my-1">
      <Progress color={color} style={{ height: "1rem" }} value={value}>
        {value}%
      </Progress>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
};

export default ProgressBar;
