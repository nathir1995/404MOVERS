import React from "react";
import { Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import LOGO from "assets/img/logo/login.png";
import "assets/scss/pages/authentication.scss";
import LoginForm from "./LoginForm";
import LanguageDropdown from "layouts/components/navbar/LanguageDropdown";
import { useTranslation } from "utility/language";
import { websiteURL } from "api/config";

import Copyright from "layouts/components/footer/Copyright";

const Login = () => {
  const t = useTranslation();
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center p-0"
              style={{ height: "100%" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  style={{ width: "60%" }}
                  href={websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img width="100%" src={LOGO} alt="logo" />
                </a>
              </div>
            </Col>
            <Col lg="6" md="12" className="p-0 border">
              <Card
                className="rounded-0 mb-0 px-2 login-tabs-container"
                style={{
                  display: "flex",
                  flexDirection: "columns",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CardHeader className="pb-1">
                  <CardTitle>
                    <h4 className="mb-0">{t("login")}</h4>
                  </CardTitle>
                  <div style={{ float: "right" }} className="mb-0">
                    <LanguageDropdown menuDirection="left" />
                  </div>
                </CardHeader>
                <p className="px-2 auth-title">{t("welcome_login")}</p>
                <LoginForm />
              </Card>
              <p
                className="mb-0 clearfix"
                style={{ textAlign: "center", transform: "translateY(-2.5em)" }}
              >
                <Copyright />
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
