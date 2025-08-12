import React from "react";
import Select from "react-select";
import { ValidatedField } from "components/input/ValidatedField";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

const SelectField = ({ label, name, options, ...props }) => {
  const formik = useFormikContext();
  // Always use an array for options
  const safeOptions = Array.isArray(options) ? options : [];
  // Pick the selected option object or null
  const selected =
    safeOptions.find((opt) => opt.value === formik.values[name]) ?? null;

  return (
    <ValidatedField
      CustomField={Select}
      label={label}
      name={name}
      className="React"
      classNamePrefix="select"
      options={safeOptions}
      value={selected}
      onChange={(opt) => formik.setFieldValue(name, opt?.value ?? null)}
      onBlur={() => formik.setFieldTouched(name)}
      {...props}
    />
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export { SelectField };
