export type MuiStepSliderType = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  childrenLength: number;
};

export type MuiStepSliderControlType = {
  hasNext: boolean;
  hasPrev: boolean;
  handleNextStep: () => void;
  handlePrevStep: () => void;
};
