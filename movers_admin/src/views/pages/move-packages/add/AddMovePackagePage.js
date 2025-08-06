import React from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, Redirect } from "react-router-dom";
import { Routes } from "configs/Routes";

import { Card, CardBody, CardFooter } from "reactstrap";
import { LoadingButton } from "components/input/LoadingButton";

import { useAddMovePackage } from "api/move_packages";
import { Formik, Form } from "formik";
import MovePackageForm from "../common/MovePackageForm";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "../common/formUtils";

const AddMovePackagePage = () => {
  const { mutate: addMovePackage, isSuccess, isLoading } = useAddMovePackage();
  const handleSubmit = (values) => {
    addMovePackage(getDataToSend(values));
  };

  if (isSuccess) {
    return <Redirect to={Routes.move_packages.url} />;
  }

  return (
    <>
      <Breadcrumbs>
        <p className="m-0">Moves</p>
        <NavLink to={Routes.move_packages.url}>
          <p className="m-0">Packages</p>
        </NavLink>
        <p className="m-0">Add</p>
      </Breadcrumbs>

      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <Card>
              <CardFooter>
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  Add
                </LoadingButton>
              </CardFooter>
              <CardBody>
                <MovePackageForm />
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddMovePackagePage;
