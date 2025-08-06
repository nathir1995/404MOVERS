import { Card, CardBody, CardFooter } from "reactstrap";

import { useGetLaborDetails } from "api/accounts/labors";
import { Form, Formik } from "formik";

import { getInitialValues, getValidationSchema } from "../common/formUtils";
import LaborForm from "../common/LaborForm";

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

const LaborDetailsPage = () => {
  const { labor_id } = useParams();

  const { data, isLoading, isError, isSuccess } = useGetLaborDetails(labor_id);
  const notFound = isSuccess && !data;

  if (isLoading || isError || notFound) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus
          isLoading={isLoading}
          isError={isError}
          notFound={notFound}
          notFoundLabel="Labor Not Found"
          allButtonLink={Routes.labors.url}
          allButtonText="All Labors"
        />
      </>
    );
  }
  return <Content laborToEdit={data?.users_data} />;
};

export default LaborDetailsPage;

function Content({ laborToEdit }) {
  const accountStatus = laborToEdit?.mover_account_status?.key;

  return (
    <>
      <PageBreadcrumb />
      <Formik
        onSubmit={console.log}
        initialValues={getInitialValues(laborToEdit)}
        validationSchema={getValidationSchema(true)}
      >
        {(formik) => (
          <Form>
            <Card>
              <CardFooter>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <h2 className="m-0">
                    {laborToEdit?.first_name} {laborToEdit?.last_name}
                  </h2>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ gap: "1rem" }}
                  >
                    <AccountStatusChip status={accountStatus} />
                    <CreateChat user_id={laborToEdit.id} />
                  </div>
                </div>
              </CardFooter>
              <CardBody>
                <LaborForm editMode />
              </CardBody>
              <CardFooter>
                <AccountActions mover={laborToEdit} type={ACCOUNT_TYPE.LABOR} />
              </CardFooter>
              {/* TODO: Look into this condition */}
              {accountStatus === ACCOUNT_STATUSES.DOCUMENTS_REVIEW_PENDING && (
                <>
                  <CardBody>
                    <h1>Documents Go Here</h1>
                  </CardBody>
                  <CardFooter>
                    <DocumentsActions mover={laborToEdit} />
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
