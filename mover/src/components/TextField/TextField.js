import React from "react";
import classes from "./TextField.module.scss";

import { useField, Field, useFormikContext } from "formik";

export const TextField = ({ icon, ...props }) => {
  const [field, meta] = useField(props);
  const { errors } = useFormikContext();

  const notValid = meta.touched && errors[props.name];
  // const FieldComponent = CustomField ?? Field;
  const FieldComponent = Field;
  return (
    <div>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <div
        className={classes.wrapper}
        data-no-icon={icon === null || icon === undefined}
      >
        <div className={classes.icon} data-textarea={props.as === "textarea"}>
          {icon}
        </div>
        <FieldComponent className={classes.input} {...field} {...props} />
        {/* {suffix && <div className={classes.suffix}>{suffix}</div>} */}
      </div>
      {notValid && errors[props.name] && (
        <span className={classes.error_message}>{errors[props.name]}</span>
      )}
    </div>
  );
};
