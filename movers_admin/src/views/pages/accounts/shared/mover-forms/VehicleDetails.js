import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Col, Row } from "reactstrap";

const VehicleDetails = ({ editMode = false }) => {
  return (
    <>
      <Row xs={1} sm={2} md={2} lg={2} xl={2}>
        <Col>
          <ValidatedField name="vehicle_make" label="Make" disabled />
        </Col>
        <Col>
          <ValidatedField name="vehicle_model" label="Model" disabled />
        </Col>
        <Col>
          <ValidatedField name="vehicle_year" label="Year" disabled />
        </Col>
        <Col>
          <ValidatedField name="vehicle_type" label="Type" disabled />
        </Col>
      </Row>
    </>
  );
};

export default VehicleDetails;
