import React from "react";
import { Row, Col } from "reactstrap";

import MoveDetailsCard from "./components/MoveDetailsCard";
import AddressDetailsCard from "./components/AddressDetailsCard";
import MoversCard from "./components/MoversCard";
import ItemsCard from "./components/ItemsCard";
import MapCard from "./components/MapCard";

const MoveContent = ({ move }) => {
  return (
    <>
      <MoveDetailsCard move={move} />

      <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col xs={12} sm={12} md={12} lg={7} xl={7}>
          <AddressDetailsCard move={move} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={5} xl={5}>
          <MapCard move={move} />
        </Col>
      </Row>
      <MoversCard move={move} />
      <ItemsCard move={move} />
    </>
  );
};

export default MoveContent;
