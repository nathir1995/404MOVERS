import React from "react";
import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import { useFormikContext } from "formik";

import Button from "@/components/Button";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import styles from "./styles.module.scss";

const btnStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5rem",
  fontWeight: "bold",
  paddingInline: "1.5em",
};

const StepControls = ({
  controls,
  disableSubmit = false,
  isLoading = false,
  isLastStep = false,
}: {
  controls: MuiStepSliderControlType;
  disableSubmit?: boolean;
  isLoading?: boolean;
  isLastStep?: boolean;
}) => {
  const formik = useFormikContext();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
      className={styles.padding}
    >
      <Button
        isDisabled={!controls.hasPrev || isLoading}
        type="button"
        onClick={controls.handlePrevStep}
        variant="outlined"
        style={btnStyles}
      >
        <AiOutlineCaretLeft /> <span>PREV</span>
      </Button>
      <Button
        key={`${formik.isValid}`}
        isLoading={isLoading}
        isDisabled={!formik.isValid || disableSubmit}
        type="submit"
        style={{
          ...btnStyles,
          ...(isLastStep && {
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }),
        }}
      >
        <span>{isLastStep ? "SUBMIT" : "NEXT"}</span> {!isLastStep && <AiOutlineCaretRight />}
      </Button>
    </div>
  );
};

export default StepControls;
