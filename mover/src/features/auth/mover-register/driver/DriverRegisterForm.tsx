import React from "react";

import { Formik, Form } from "formik";
import {
  initialValues,
  ValuesType,
  MAP_DRIVER_FORM_TO_VALIDATION,
  DRIVER_TOTAL_FORMS,
} from "../utils/formUtils";

import BasicInfoForm from "../components/BasicInfoForm";
import AddressForm from "../components/AddressForm";
import VehicleForm from "../components/VehicleForm";
import JobInfoForm from "../components/JobInfoForm";
// import OneMoreStepForm from "../components/OneMoreStepForm";

import MultiStepSliderComponent from "@/components/MultiStepSliderComponent";
import useMultiStep from "@/components/MultiStepSliderComponent/useMultiStep";
import FormResetTouched from "../components/FormResetTouched";
import useScrollToTopEffect from "../utils/useScrollToTopEffect";

import { ROLE } from "@/constants/roles";
import styles from "../../styles/RegisterForm.module.scss";
import { useRegisterDriver } from "@/api/register/mover/registerMover.hooks";
import ConfirmEmail from "../../confirm-email/ConfirmEmail";
import RegisterCompleted from "../components/RegisterCompleted";

const DriverRegsiterForm = () => {
  const [emailToConfirm, setEmailToConfirm] = React.useState<string>("");

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { handleNextStep, handlePrevStep } = useMultiStep({
    activeStep,
    setActiveStep,
    childrenLength: DRIVER_TOTAL_FORMS + 2,
  });

  useScrollToTopEffect(activeStep);

  const validationSchema = MAP_DRIVER_FORM_TO_VALIDATION?.[activeStep];

  const {
    mutate: registerDriver,
    isLoading,
    isError,
    error_message,
  } = useRegisterDriver({
    onSuccess: (_, user) => {
      setEmailToConfirm(user.email);
      handleNextStep();
    },
  });

  const handleSubmit = (values: ValuesType) => {
    if (activeStep + 1 !== DRIVER_TOTAL_FORMS) {
      handleNextStep();
      return;
    }
    registerDriver(values);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form autoComplete="off">
            <FormResetTouched activeStep={activeStep} />
            <MultiStepSliderComponent
              activeStep={activeStep}
              childClassName={styles.child_classname}
            >
              <BasicInfoForm role={ROLE.DRIVER} isLoading={isLoading} />
              <AddressForm isLoading={isLoading} onPrevClick={handlePrevStep} />
              <VehicleForm isLoading={isLoading} onPrevClick={handlePrevStep} />
              <JobInfoForm
                role={ROLE.DRIVER}
                isLoading={isLoading}
                onPrevClick={handlePrevStep}
                isError={isError}
                error_message={error_message}
              />
              {/* <OneMoreStepForm
                isLoading={isLoading}
                onPrevClick={handlePrevStep}
              /> */}
              <ConfirmEmail
                emailToConfirm={emailToConfirm}
                onConfirmed={handleNextStep}
              />
              <RegisterCompleted />
            </MultiStepSliderComponent>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DriverRegsiterForm;
