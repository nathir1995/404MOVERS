import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const StatusBadge = ({ status }) => {
  const t = useTranslation();

  return (
    <Badge color={status ? "success" : "danger"}>
      {status ? t("active") : t("inactive")}
    </Badge>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default StatusBadge;
