import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Col, Row } from "reactstrap";
import BasicDetails from "../../shared/mover-forms/BasicDetails";
import AddressDetails from "../../shared/mover-forms/AddressDetails";
import VehicleDetails from "../../shared/mover-forms/VehicleDetails";

const DriverForm = ({ editMode = false }) => {
  return (
    <>
      <h4>Basic Info</h4>
      <BasicDetails />
      <hr />
      <h4>Address Info</h4>
      <AddressDetails />
      <hr />
      <h4>Vehicle Info</h4>
      <VehicleDetails />
      <hr />
      <h4>Job Info</h4>
      <Row xs={1} sm={1} md={2} lg={2} xl={2}>
        <Col>
          <ValidatedField
            name="metropolitan_area"
            label="Metropolitan Area"
            disabled
          />
        </Col>
        <Col>
          <ValidatedField
            name="moves_each_week"
            label="Number of 404Moves each week"
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default DriverForm;
