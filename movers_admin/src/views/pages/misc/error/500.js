import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import errorImg from "../../../../assets/img/pages/500.png";
import { Routes } from "configs/Routes";

class Error500 extends React.Component {
  render() {
    return (
      <Row
        className="m-0 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={errorImg}
                alt="ErrorImg"
                className="img-fluid align-self-center mt-75"
              />
              <h1 className="font-large-2 my-2">Internal Server Error!</h1>
              <Button.Ripple
                href={Routes.home.url}
                tag="a"
                color="primary"
                size="lg"
                className="mt-2"
              >
                Back to Home
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Error500;
