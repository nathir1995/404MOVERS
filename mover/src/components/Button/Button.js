import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import colors from "@/assets/scss/colors.module.scss";

const variantClassName = {
  primary: classes.primary,
  outlined: classes.outlined,
};

const loaderColor = {
  primary: "#fff",
  outlined: colors.primary,
};

const Button = ({
  variant = "primary",
  children,
  isLoading = false,
  isDisabled = false,
  rounded = false,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`${variantClassName[variant]} ${
        rounded ? classes.rounded : ""
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
      {isLoading && (
        <div className={classes.loading}>
          <PulseLoader size={10} color={loaderColor[variant]} />
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "outlined"]),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default Button;
