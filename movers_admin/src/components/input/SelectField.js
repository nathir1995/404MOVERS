import React from "react";
import Select from "react-select";
import { ValidatedField } from "components/input/ValidatedField";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

const SelectField = ({ label, name, options, ...props }) => {
  const formik = useFormikContext();

  return (
    <ValidatedField
      CustomField={Select}
      label={label}
      name={name}
      className="React"
      classNamePrefix="select"
      options={options || []}
      value={options?.find((opt) => opt.value === formik.values[name]) || ""}
      onChange={(opt) => formik.setFieldValue(name, opt.value)}
      onBlur={() => formik.setFieldTouched(name)}
      // menuPortalTarget={document.body}
      {...props}
    />
  );
};

SelectField.propTypes = {
  // label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export { SelectField };
