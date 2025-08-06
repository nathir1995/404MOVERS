import React from "react";
import { StatusCard } from "components/StatusCard";
import { useTranslation } from "utility/language";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

/**
 * the main usage is with pages which contain a form that needs
 * the data to fill it and perform edit (update) operations
 */
const PageStructure = ({ title, isLoading, isError, data, children }) => {
  const t = useTranslation();

  /**
   * 'StatusCard' handles (isLoading, isError) actions
   * meanwhile the data will be undefined
   * so the actual page will not show
   */
  if (!data) return <StatusCard isLoading={isLoading} isError={isError} />;
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{t(title)}</CardTitle>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </Card>
  );
};

PageStructure.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.any,
};

export default PageStructure;
