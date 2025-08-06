import React from "react";

import { useFormikContext, ErrorMessage, useField } from "formik";
import styles from "./RadioInput.module.scss";

const RadioInput = ({ name, options, wrapperProps = {}, ...props }) => {
  const formik = useFormikContext();
  const [field] = useField({ name, ...props });

  return (
    <>
      {props.label && (
        <label className={styles.label} htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className={styles.wrapper} {...wrapperProps}>
        {options.map(({ label, value }) => (
          <div key={value}>
            <input
              className={styles.input}
              id={value}
              type="radio"
              label={label}
              name={name}
              defaultChecked={formik.values[name] === value}
              value={formik.values[name]}
              onClick={() => formik.setFieldValue(name, value)}
              {...props}
            />
            <label
              htmlFor={value}
              className={props.disabled ? styles.disabled : ""}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage name={field.name}>
        {(msg) => (
          <div className="field-error text-danger" style={{ display: "block" }}>
            {msg}
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export default RadioInput;
