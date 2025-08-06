import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Col, Row } from "reactstrap";

const UserForm = ({ editMode = false }) => {
  return (
    <>
      <Row xs={1} sm={2} md={2} lg={2} xl={2}>
        <Col>
          <ValidatedField
            name="first_name"
            label="First Name"
            placeholder="First Name"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="email"
            label="Email"
            placeholder="Email"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="created_at"
            label="Date of registeration"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="hear_about"
            label="How did the user hear about 404 Movers?"
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default UserForm;
