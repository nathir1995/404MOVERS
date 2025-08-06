import React from "react";
import { MuiStepSliderType, MuiStepSliderControlType } from "./types";

const useMultiStep = ({
  activeStep,
  setActiveStep,
  childrenLength,
}: MuiStepSliderType): MuiStepSliderControlType => {
  const hasNext = activeStep < childrenLength - 1;
  const hasPrev = activeStep > 0;

  const handleNextStep = React.useCallback(() => {
    setActiveStep((prev: number) => Math.min(prev + 1, childrenLength - 1));
  }, [childrenLength, setActiveStep]);
  const handlePrevStep = React.useCallback(() => {
    setActiveStep((prev: number) => Math.max(0, prev - 1));
  }, [setActiveStep]);

  return React.useMemo(
    () => ({
      hasNext,
      hasPrev,
      handleNextStep,
      handlePrevStep,
    }),
    [hasNext, hasPrev, handleNextStep, handlePrevStep]
  );
};

export default useMultiStep;
