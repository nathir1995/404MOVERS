import React from "react";
import classes from "./SelectField.module.scss";

import { useField, useFormikContext } from "formik";

import { AiOutlineCaretDown } from "react-icons/ai";

const SelectField = ({ icon, options, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, errors } = useFormikContext();

  const notValid = meta.touched && errors[props.name];
  return (
    <div>
      {props.label && <label className={classes.label}>{props.label}</label>}
      <div className={classes.wrapper}>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.select_wrapper}>
          <select
            value={field.value}
            className={classes.input}
            {...props}
            {...field}
          >
            <option disabled={true} value="">
              {props.placeholder}
            </option>
            {options.map(({ label, value }) => (
              <option
                key={value}
                value={value}
                onClick={() => setFieldValue(field.name, value)}
              >
                {label}
              </option>
            ))}
          </select>

          <AiOutlineCaretDown className={classes.select_arrow} />
        </div>
      </div>
      {notValid && errors[props.name] && (
        <span className={classes.error_message}>{errors[props.name]}</span>
      )}
    </div>
  );
};

export default SelectField;
