import { ValidatedField } from "components/input";
import { useFormikContext } from "formik";
import React from "react";
import { Col, Row } from "reactstrap";

const SettingsForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const { options } = values;

  const handleChange = (optionId, newValue) => {
    const newOptions = options.map((opt) =>
      opt.id === optionId
        ? {
            ...opt,
            option_value: newValue,
          }
        : opt
    );
    setFieldValue("options", newOptions);
  };

  return (
    <Row xs={1} sm={1} md={2} lg={2} xl={2}>
      {options.map((option) => (
        <Col key={option.id}>
          <ValidatedField
            name={option.option_name}
            label={option.option_name}
            placeholder={option.option_name}
            required
            isRequired
            value={option.option_value}
            onChange={(e) => handleChange(option.id, e.target.value)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SettingsForm;
