import React from "react";
import { ErrorMessage, useField, Field } from "formik";
import { CustomInput, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "utility/language";

const ValidatedField = ({
  name,
  label,
  CustomField,
  icon: Icon,
  optional,
  labelIcon = null,
  formProps,
  isRequired,
  isOptional,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });
  const t = useTranslation();

  let Wrapper = Field;
  if (props.type === "file") {
    Wrapper = CustomInput;
  }
  if (CustomField) {
    Wrapper = CustomField;
  }
  const fieldProps = props.type === "file" ? {} : { ...field };

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label} {isRequired ? "*" : ""}{" "}
          {isOptional ? `(${t("optional")})` : ""} {labelIcon}
        </label>
      )}
      <FormGroup
        className={Icon ? "position-relative has-icon-left" : ""}
        {...formProps}
      >
        <Wrapper
          className={
            "form-control " + (meta.touched && meta.error ? "is-invalid" : "")
          }
          {...fieldProps}
          {...props}
        />
        {Icon && (
          <div className="form-control-position">
            <Icon size={15} />
          </div>
        )}
        <ErrorMessage name={field.name}>
          {(msg) => <span className="field-error text-danger">{t(msg)}</span>}
        </ErrorMessage>
      </FormGroup>
    </>
  );
};

ValidatedField.proptype = {
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
};

export { ValidatedField };
