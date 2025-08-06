import React from "react";
import { Button, Spinner } from "reactstrap";
import PropTypes from "prop-types";

const LoadingButton = ({ isLoading = false, isDisabled = false, ...props }) => {
  return (
    <Button disabled={isLoading || isDisabled} {...props}>
      {isLoading ? <Spinner style={{ marginRight: "10px" }} size="sm" /> : null}
      <span>{props.children}</span>
    </Button>
  );
};

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export { LoadingButton };
