import React from "react";

import classes from "./ImageInputWithPreview.module.scss";
import DEFAULT_IMG from "assets/img/default.jpg";
import { MdEdit } from "react-icons/md";

const ImageInputWithPreview = ({
  name,
  preview,
  onChange,
  className = "",
  disabled = false,
  showIcon = true,
  inputProps,
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={`${classes.label} ${className}`}
      {...props}
    >
      <input
        id={name}
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
        {...inputProps}
      />

      <img className={classes.preview} src={preview ?? DEFAULT_IMG} alt="" />

      {showIcon && (
        <div className={classes.layer}>
          <MdEdit size={32} className={classes.pen} />
        </div>
      )}
    </label>
  );
};

export default ImageInputWithPreview;
