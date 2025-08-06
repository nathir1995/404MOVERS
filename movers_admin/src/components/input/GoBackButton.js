import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { useDirection } from "utility/context/Layout";
import { history } from "../../history";
import "./index.css";

export const GoBackButton = (props) => {
  const t = useTranslation();
  const dir = useDirection();

  return (
    <Button.Ripple
      className="back-btn"
      onClick={() => history.goBack()}
      color="primary"
      {...props}
    >
      {dir === "ltr" && <ArrowBackIcon className="back-icon" />}
      {dir === "rtl" && <ArrowForward className="back-icon" />}
      {t("back")}
    </Button.Ripple>
  );
};
