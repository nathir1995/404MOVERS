import React from "react";
import { CardBody } from "reactstrap";
import { Mail, Lock } from "react-feather";
import { useAuth } from "store/auth/useAuth";
import { Formik, Form } from "formik";
import { ValidatedField } from "components/input/ValidatedField";
import * as Yup from "yup";
import { Redirect } from "react-router";
import { LoadingButton } from "components/input/LoadingButton";
import { useTranslation } from "utility/language";
import { Routes } from "configs/Routes";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("_validation.invalid_email")
    .required("_required.email"),
  password: Yup.string().required("_required.password"),
});

const LoginForm = (props) => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const t = useTranslation();

  const handleLogin = (values) => {
    login(values);
  };

  if (isAuthenticated) {
    return <Redirect to={Routes.home.url} />;
  }

  return (
    <React.Fragment>
      <CardBody className="pt-0" style={{ flexGrow: 0 }}>
        <Formik
          onSubmit={handleLogin}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <ValidatedField
                name="email"
                type="email"
                label={t("email")}
                placeholder={t("email")}
                formProps={{
                  style: { marginBottom: "2px" },
                }}
                icon={Mail}
              />
              <ValidatedField
                name="password"
                type="password"
                label={t("password")}
                placeholder={t("password")}
                icon={Lock}
              />
              <div className="d-flex justify-content-center">
                <LoadingButton
                  isLoading={isLoading}
                  color="primary"
                  type="submit"
                >
                  {t("login")}
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </React.Fragment>
  );
};

export default LoginForm;
