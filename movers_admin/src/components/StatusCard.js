import React from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import { useTranslation } from "utility/language";

export const StatusCard = ({
  isLoading,
  isError,
  height = "15rem",
  children,
}) => {
  const t = useTranslation();

  return (
    <Card>
      <CardBody
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height }}
      >
        {isLoading && <Spinner size="lg" color="primary" />}
        {isError && <h4>{t("an_error_occured")}</h4>}
        {children}
      </CardBody>
    </Card>
  );
};
