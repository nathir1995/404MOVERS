import React from "react";
import Radio from "components/@vuexy/radio/RadioVuexy";

import { useFormikContext, ErrorMessage, useField } from "formik";

export const RadioInput = ({ name, options, wrapperProps = {}, ...props }) => {
  const formik = useFormikContext();
  const [field] = useField({ name, ...props });

  return (
    <>
      <div {...wrapperProps}>
        {options.map(({ label, value }) => (
          <Radio
            key={value}
            label={label}
            name={name}
            defaultChecked={formik.values[name] === value}
            value={formik.values[name]}
            onClick={() => formik.setFieldValue(name, value)}
            {...props}
          />
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
