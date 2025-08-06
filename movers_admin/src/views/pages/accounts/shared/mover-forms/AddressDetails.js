import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Col, Row } from "reactstrap";

const AddressDetails = ({ editMode = false }) => {
  return (
    <>
      <Row xs={1} sm={2} md={2} lg={2} xl={2}>
        <Col>
          <ValidatedField name="province" label="Province" disabled />
        </Col>
        <Col>
          <ValidatedField name="city" label="City" disabled />
        </Col>
      </Row>
      <Row xs={1} sm={1} md={3} lg={3} xl={3}>
        <Col>
          <ValidatedField name="street" label="Street" disabled />
        </Col>
        <Col>
          <ValidatedField
            name="appartment_or_unit_number"
            label="Appartment or Unit number"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField name="postal_code" label="Postal Code" disabled />
        </Col>
      </Row>
    </>
  );
};

export default AddressDetails;
