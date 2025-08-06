import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import notAuthImg from "../../../assets/img/pages/not-authorized.png";
import { useTranslation } from "utility/language";

const NotAuthorized = () => {
  const t = useTranslation();

  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <img
              src={notAuthImg}
              alt="notAuthImg"
              className="img-fluid align-self-center mt-75"
            />
            <h1 className="font-large-2 my-2">{t("you_are_not_authorized")}</h1>
            <Button.Ripple
              tag="a"
              href="/"
              color="primary"
              size="lg"
              className="mt-2"
            >
              {t("back")}
            </Button.Ripple>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default NotAuthorized;
