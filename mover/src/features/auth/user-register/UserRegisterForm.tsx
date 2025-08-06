import React from "react";

import { Formik, Form } from "formik";
import { initialValues, ValuesType, validationSchema } from "./formUtils";

import BasicInfoForm from "./BasicInfoForm";
import { useRegisterUser } from "@/api/register/user/registerUser.hooks";

import MultiStepSliderComponent from "@/components/MultiStepSliderComponent";
import useMultiStep from "@/components/MultiStepSliderComponent/useMultiStep";

import useScrollToTopEffect from "../mover-register/utils/useScrollToTopEffect";
import styles from "../styles/RegisterForm.module.scss";
import ConfirmEmail from "../confirm-email/ConfirmEmail";
import RegisterCompleted from "./RegisterCompleted";

const UserRegisterForm = () => {
  const [emailToConfirm, setEmailToConfirm] = React.useState<string>("");
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { handleNextStep } = useMultiStep({
    activeStep,
    setActiveStep,
    childrenLength: 3,
  });

  useScrollToTopEffect(activeStep);

  const {
    mutate: registerUser,
    isLoading,
    isError,
    error_message,
  } = useRegisterUser({
    onSuccess: (_, user) => {
      setEmailToConfirm(user.email);
      handleNextStep();
    },
  });

  const handleSubmit = (values: ValuesType) => {
    registerUser(values);
  };

  return (
    <MultiStepSliderComponent
      activeStep={activeStep}
      childClassName={styles.child_classname}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form autoComplete="off">
            <BasicInfoForm
              isLoading={isLoading}
              isError={isError}
              error_message={error_message}
            />
          </Form>
        )}
      </Formik>
      <ConfirmEmail
        emailToConfirm={emailToConfirm}
        onConfirmed={handleNextStep}
      />
      <RegisterCompleted />
    </MultiStepSliderComponent>
  );
};

export default UserRegisterForm;
