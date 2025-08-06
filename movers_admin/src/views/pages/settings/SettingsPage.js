import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { LoadingButton } from "components/input/LoadingButton";

import { useGetSettings, useUpdateSettings } from "api/settings";
import { Formik, Form } from "formik";

import SettingsForm from "./SettingsForm";

import PageBreadcrumb from "./PageBreadcrumb";
import DetailsPageQueryStatus from "views/components/DetailsPageQueryStatus";
import { getInitialValues } from "./formUtils";

const SettingsPage = () => {
  const { data, isLoading, isError } = useGetSettings();

  if (isLoading || isError) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus isLoading={isLoading} isError={isError} />
      </>
    );
  }
  return <Content settings={data.settings} />;
};

export default SettingsPage;

function Content({ settings }) {
  const { mutate: updateSettings, isLoading } = useUpdateSettings();

  const handleSubmit = (values) => {
    updateSettings(values);
  };

  return (
    <>
      <PageBreadcrumb />
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues(settings)}
      >
        {(formik) => (
          <Form>
            <Card>
              <CardFooter className="d-flex justify-content-between align-items-center">
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  Save
                </LoadingButton>
              </CardFooter>
              <CardBody>
                <SettingsForm />
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
