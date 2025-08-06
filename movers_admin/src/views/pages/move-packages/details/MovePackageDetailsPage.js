import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { LoadingButton } from "components/input/LoadingButton";

import {
  useGetMovePackageDetails,
  useUpdateMovePackage,
} from "api/move_packages";
import { Formik, Form } from "formik";

import MovePackageForm from "../common/MovePackageForm";
import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "../common/formUtils";

import { useParams } from "react-router-dom";
import { Routes } from "configs/Routes";

import PageBreadcrumb from "./PageBreadcrumb";
import DeleteOption from "./DeleteOption";
import DetailsPageQueryStatus from "views/components/DetailsPageQueryStatus";

const MovePackageDetailsPage = () => {
  const { package_id } = useParams();

  const { data, isLoading, isError, isSuccess } =
    useGetMovePackageDetails(package_id);
  const notFound = isSuccess && !data;

  if (isLoading || isError || notFound) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus
          isLoading={isLoading}
          isError={isError}
          notFound={notFound}
          notFoundLabel="Package Not Found"
          allButtonLink={Routes.move_packages.url}
          allButtonText="All Packages"
        />
      </>
    );
  }
  return <Content movePackageToEdit={data.move_package} />;
};

export default MovePackageDetailsPage;

function Content({ movePackageToEdit }) {
  const { mutate: updateMovePackage, isLoading } = useUpdateMovePackage();

  const handleSubmit = (values) => {
    updateMovePackage(getDataToSend(values));
  };

  return (
    <>
      <PageBreadcrumb />
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues(movePackageToEdit)}
        validationSchema={getValidationSchema(true)}
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
                <DeleteOption package_id={movePackageToEdit.id} />
              </CardFooter>
              <CardBody>
                <MovePackageForm editMode />
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
