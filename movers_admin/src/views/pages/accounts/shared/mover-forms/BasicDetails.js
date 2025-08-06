import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Col, Row } from "reactstrap";

const BasicDetails = ({ editMode = false }) => {
  return (
    <>
      <Row xs={1} sm={2} md={2} lg={2} xl={2}>
        <Col>
          <ValidatedField name="first_name" label="First Name" disabled />
        </Col>
        <Col>
          <ValidatedField name="last_name" label="Last Name" disabled />
        </Col>
        <Col>
          <ValidatedField name="email" label="Email" disabled />
        </Col>
        <Col>
          <ValidatedField name="phone_number" label="Phone Number" disabled />
        </Col>
        <Col>
          <ValidatedField
            name="created_at"
            label="Date of registeration"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField name="dob" label="Date of Birth" disabled />
        </Col>
      </Row>
    </>
  );
};

export default BasicDetails;
