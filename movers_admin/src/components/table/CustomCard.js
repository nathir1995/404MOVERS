import React from "react";
import { Card, CardBody } from "reactstrap";

const CustomCard = (props) => {
  return (
    <Card>
      <CardBody>
        <div
          style={{ height: "10rem" }}
          className="d-flex justify-content-center align-items-center"
        >
          {props.children}
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
