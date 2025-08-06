import { Card, CardBody, CardFooter } from "reactstrap";

import { useGetDriverDetails } from "api/accounts/drivers";
import { Form, Formik } from "formik";

import DriverForm from "../common/DriverForm";
import { getInitialValues, getValidationSchema } from "../common/formUtils";

import { Routes } from "configs/Routes";
import { useParams } from "react-router-dom";

import AccountStatusChip from "components/smart/AccountStatusChip";
import { ACCOUNT_STATUSES } from "enums/Account_Status";
import { ACCOUNT_TYPE } from "enums/Account_Types";
import DetailsPageQueryStatus from "views/components/DetailsPageQueryStatus";
import AccountActions from "../../shared/actions/account-actions";
import CreateChat from "../../shared/actions/CreateChat";
import DocumentsActions from "../../shared/actions/DocumentsActions";
import PageBreadcrumb from "./PageBreadcrumb";

const DriverDetailsPage = () => {
  const { driver_id } = useParams();

  const { data, isLoading, isError, isSuccess } =
    useGetDriverDetails(driver_id);
  const notFound = isSuccess && !data;

  if (isLoading || isError || notFound) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus
          isLoading={isLoading}
          isError={isError}
          notFound={notFound}
          notFoundLabel="Driver Not Found"
          allButtonLink={Routes.drivers.url}
          allButtonText="All Drivers"
        />
      </>
    );
  }
  return <Content driverToEdit={data?.users_data} />;
};

export default DriverDetailsPage;

function Content({ driverToEdit }) {
  const accountStatus = driverToEdit?.mover_account_status?.key;

  return (
    <>
      <PageBreadcrumb />
      <Formik
        onSubmit={console.log}
        initialValues={getInitialValues(driverToEdit)}
        validationSchema={getValidationSchema(true)}
      >
        {(formik) => (
          <Form>
            <Card>
              <CardFooter>
                <div
                  className="d-flex justify-content-between align-items-center flex-wrap"
                  style={{ gap: "1rem" }}
                >
                  <h2 className="m-0">
                    {driverToEdit?.first_name} {driverToEdit?.last_name}
                  </h2>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ gap: "1rem" }}
                  >
                    <AccountStatusChip status={accountStatus} />
                    <CreateChat user_id={driverToEdit.id} />
                  </div>
                </div>
              </CardFooter>
              <CardBody>
                <DriverForm editMode />
              </CardBody>
              <CardFooter>
                <AccountActions
                  mover={driverToEdit}
                  type={ACCOUNT_TYPE.DRIVER}
                />
              </CardFooter>
              {/* TODO: Look into this condition */}
              {accountStatus === ACCOUNT_STATUSES.DOCUMENTS_REVIEW_PENDING && (
                <>
                  <CardBody>
                    <h1>Documents Go Here</h1>
                  </CardBody>
                  <CardFooter>
                    <DocumentsActions mover={driverToEdit} />
                  </CardFooter>
                </>
              )}
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
