import React from "react";

import { Formik, Form } from "formik";
import { initialValues, validationSchema, ValuesType } from "../formUtils";

import TextField from "@/components/TextField";
import Button from "@/components/Button";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import colors from "@/assets/scss/colors.module.scss";

import styles from "./LoginForm.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import Link from "next/link";
import useMultiStep from "@/components/MultiStepSliderComponent/useMultiStep";
import { ACCOUNT_STATUS } from "@/constants/account_status";
import MultiStepSliderComponent from "@/components/MultiStepSliderComponent";
import ConfirmEmail from "../../confirm-email/ConfirmEmail";
import RegisterCompleted from "../../user-register/RegisterCompleted";

const LoginForm = () => {
  const [emailToConfirm, setEmailToConfirm] = React.useState<string>("");
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { handleNextStep } = useMultiStep({
    activeStep,
    setActiveStep,
    childrenLength: 3,
  });

  const {
    loginViaEmail,
    error,
    isLoading,
    clearError,
    accountStatus,
    setAccountStatus,
  } = useAuth();
  const isError = error !== null;

  //eslint-disable-next-line
  React.useEffect(clearError, []);

  React.useEffect(() => {
    if (accountStatus === ACCOUNT_STATUS.EMAIL_VERIFICATION_PENDING) {
      handleNextStep();
    }
  }, [accountStatus]);

  const handleSubmit = (values: ValuesType) => {
    setEmailToConfirm(values.email);
    loginViaEmail(values);
  };

  return (
    <div className={styles.container}>
      <MultiStepSliderComponent activeStep={activeStep}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h1>
                Log<span style={{ color: colors.primary }}>in</span>
              </h1>

              <TextField
                name="email"
                label="Email"
                placeholder="Your Email"
                type="text"
                icon={<MdEmail color={colors.primary} size={22} />}
                disabled={isLoading}
              />
              <TextField
                name="password"
                label="Password"
                placeholder="Your Password"
                type="password"
                icon={<RiLockPasswordFill color={colors.primary} size={22} />}
                disabled={isLoading}
              />

              {isError && (
                <h6
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBlock: "1.5rem 1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {error ?? "An Error occured, Please try again later"}
                </h6>
              )}

              <div className={styles.btn_wrapper}>
                <Button isLoading={isLoading} type="submit">
                  Login
                </Button>
              </div>

              <p className={styles.register_text}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Register Here</Link>
                <br />
                Or <Link href="/more-info/movers">Become a mover</Link>
              </p>
            </Form>
          )}
        </Formik>
        {accountStatus === ACCOUNT_STATUS.EMAIL_VERIFICATION_PENDING && (
          <ConfirmEmail
            emailToConfirm={emailToConfirm}
            onConfirmed={handleNextStep}
          />
        )}
        {accountStatus === ACCOUNT_STATUS.EMAIL_VERIFICATION_PENDING && (
          <RegisterCompleted
            onClick={() => {
              setActiveStep(0);
              setAccountStatus(null);
            }}
          />
        )}
      </MultiStepSliderComponent>
    </div>
  );
};

export default LoginForm;
