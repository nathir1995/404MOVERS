import { Card, CardBody, CardFooter } from "reactstrap";

import { useGetUserDetails } from "api/accounts/users";
import { Form, Formik } from "formik";

import UserForm from "../common/UserForm";
import { getInitialValues, getValidationSchema } from "../common/formUtils";

import { Routes } from "configs/Routes";
import { useParams } from "react-router-dom";

import AccountStatusChip from "components/smart/AccountStatusChip";
import DetailsPageQueryStatus from "views/components/DetailsPageQueryStatus";
import CreateChat from "../../shared/actions/CreateChat";
import PageBreadcrumb from "./PageBreadcrumb";

const UserDetailsPage = () => {
  const { user_id } = useParams();

  const { data, isLoading, isError, isSuccess } = useGetUserDetails(user_id);
  const notFound = isSuccess && !data;

  if (isLoading || isError || notFound) {
    return (
      <>
        <PageBreadcrumb />
        <DetailsPageQueryStatus
          isLoading={isLoading}
          isError={isError}
          notFound={notFound}
          notFoundLabel="User Not Found"
          allButtonLink={Routes.users.url}
          allButtonText="All Users"
        />
      </>
    );
  }
  return <Content userToEdit={data?.users_data} />;
};

export default UserDetailsPage;

function Content({ userToEdit }) {
  return (
    <>
      <PageBreadcrumb />
      <Formik
        onSubmit={console.log}
        initialValues={getInitialValues(userToEdit)}
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
                    {userToEdit?.first_name} {userToEdit?.last_name}
                  </h2>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ gap: "1rem" }}
                  >
                    <AccountStatusChip
                      status={userToEdit?.mover_account_status?.key}
                    />
                    <CreateChat user_id={userToEdit.id} />
                  </div>
                </div>
              </CardFooter>
              <CardBody>
                <UserForm editMode />
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
