import React from "react";
import { useFormikContext } from "formik";
import { ValuesType } from "./formUtils";

import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import StepControls from "../components/StepControls";

import colors from "@/assets/scss/colors.module.scss";
import styles from "./styles.module.scss";
import { TextField } from "@/components/TextField/TextField";
import CounterInput from "../components/CounterInput";

// const today = new Date().toISOString().slice(0, 16);

type IProps = {
  controls: MuiStepSliderControlType;
  isLoading: boolean;
  isError: boolean;
  error_message?: string;
};

const FinalizeForm = ({
  controls,
  isLoading,
  isError,
  error_message,
}: IProps) => {
  const formik = useFormikContext<ValuesType>();
  const { number_of_drivers, number_of_labors } = formik.values;

  const handleIncreaseDrivers = () => {
    const max = 100;
    if (number_of_drivers + 1 <= max) {
      formik.setFieldValue("number_of_drivers", number_of_drivers + 1);
    }
  };
  const handleIncreaseLabors = () => {
    const max = 100;
    if (number_of_labors + 1 <= max) {
      formik.setFieldValue("number_of_labors", number_of_labors + 1);
    }
  };
  const handleDecreaseDrivers = () => {
    const min = number_of_labors > 0 ? 0 : 1;
    if (number_of_drivers - 1 >= min) {
      formik.setFieldValue("number_of_drivers", number_of_drivers - 1);
    }
  };
  const handleDecreaseLabors = () => {
    const min = number_of_drivers > 0 ? 0 : 1;
    if (number_of_labors - 1 >= min) {
      formik.setFieldValue("number_of_labors", number_of_labors - 1);
    }
  };

  return (
    <>
      <div
        className={`${styles.padding_container} ${styles.finalize_container}`}
      >
        <h4>
          <span style={{ color: colors.primary }}>Finalize</span> Booking
        </h4>

        <div className={styles.row}>
          {/* <TextField
            type="datetime-local"
            label="Date & Time"
            name="move_date_time"
            icon={null}
            min={today}
            disabled={isLoading}
          /> */}
{/* 
          <CounterInput
            label="Number of Drivers Needed"
            value={number_of_drivers}
            onIncrease={handleIncreaseDrivers}
            onDecrease={handleDecreaseDrivers}
            disabled={isLoading}
          />
          <CounterInput
            label="Number of Labors Needed"
            value={number_of_labors}
            onIncrease={handleIncreaseLabors}
            onDecrease={handleDecreaseLabors}
            disabled={isLoading}
          /> */}
        </div>

        <TextField
          type="text"
          label="Instructions"
          placeholder="Please write any instructions you want to provide to movers"
          name="instruction"
          icon={null}
          as="textarea"
          rows="6"
          disabled={isLoading}
        />
      </div>

      {isError && (
        <h6 style={{ textAlign: "center", color: "red" }}>
          {error_message || "An error occured please try again."}
        </h6>
      )}

      <StepControls controls={controls} isLoading={isLoading} isLastStep={true} />
    </>
  );
};

export default FinalizeForm;
