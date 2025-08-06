import React from "react";
import {
  MAP_FORM_STEP_TO_VALIDATION,
  TOTAL_FORMS,
  ValuesType,
  initialValues,
} from "./forms/formUtils";
import useMultiStep from "@/components/MultiStepSliderComponent/useMultiStep";
import { Formik, Form, useFormikContext } from "formik";
import MultiStepSliderComponent from "@/components/MultiStepSliderComponent";
import PackagesForm from "./forms/MovePackageForm";
import ItemsForm from "./forms/ItemsForm";

import styles from "./forms/styles.module.scss";
import FinalizeForm from "./forms/FinalizeForm";
import { useBookMove } from "./api/BookMove.hooks";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import { toast } from "react-toastify";
import LocationForm from "./forms/LocationForm";
import DateTimeForm from "./forms/DateTimeForm";

const AutoValidateOnStepChange = ({ step }: { step: number }) => {
  const formik = useFormikContext();
  React.useEffect(() => {
    formik.validateForm();
    formik.setTouched({});
  }, [step]);
  return null;
};

const BookMove = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const controls = useMultiStep({
    activeStep,
    setActiveStep,
    childrenLength: TOTAL_FORMS,
  });
  const validationSchema = MAP_FORM_STEP_TO_VALIDATION?.[activeStep];

  const router = useRouter();
  const {
    mutate: bookMove,
    isLoading,
    isError,
    error_message,
  } = useBookMove({
    onSuccess(data) {
      toast.success("A new move has been booked successfully");
      const move_id = data.data.move_data.id;
      router.push(sm.portal.user.moves.details.navLink(move_id));
    },
  });
  const handleSubmit = (values: ValuesType) => {
    if (activeStep + 1 !== TOTAL_FORMS) {
      controls.handleNextStep();
      return;
    }
    bookMove(values);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(formik) => {
        // console.log(formik.values, formik.errors);
        return (
          <Form autoComplete="off">
            <AutoValidateOnStepChange step={activeStep} />
            <MultiStepSliderComponent
              activeStep={activeStep}
              childClassName={styles.childClassName}
            >
              {/* <PickupLocationForm controls={controls} /> */}
              <LocationForm controls={controls} />
              {/* <DropoffLocationForm controls={controls} /> */}
              <PackagesForm controls={controls} />
              <ItemsForm controls={controls} />
              <DateTimeForm controls={controls} />
              <FinalizeForm
                controls={controls}
                isLoading={isLoading}
                isError={isError}
                error_message={error_message}
              />
            </MultiStepSliderComponent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookMove;
