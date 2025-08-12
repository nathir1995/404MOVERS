import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useFormikContext, useField } from "formik";

const SelectField = ({ label, name, options, ...props }) => {
  const formik = useFormikContext();
  const [field, meta] = useField(name);
  
  // Always use an array for options
  const safeOptions = Array.isArray(options) ? options : [];
  // Pick the selected option object or null
  const selected =
    safeOptions.find((opt) => opt.value === formik.values[name]) ?? null;

  const hasError = meta.touched && meta.error;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Select
        name={name}
        className="React"
        classNamePrefix="select"
        options={safeOptions}
        value={selected}
        onChange={(opt) => formik.setFieldValue(name, opt?.value ?? null)}
        onBlur={() => formik.setFieldTouched(name)}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: hasError ? '#ef4444' : base.borderColor,
            '&:hover': {
              borderColor: hasError ? '#ef4444' : base['&:hover'].borderColor,
            },
          }),
        }}
        {...props}
      />
      {hasError && (
        <div className="mt-1 text-sm text-red-600">
          {meta.error}
        </div>
      )}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export { SelectField };
