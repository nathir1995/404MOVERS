import React from "react";
import { useFormikContext } from "formik";

interface IProps {
  activeStep: number;
}

const FormResetTouched = ({ activeStep }: IProps) => {
  const formik = useFormikContext();

  React.useEffect(() => {
    formik.setTouched({});
    // formik.validateForm();

    //eslint-disable-next-line
  }, [activeStep]);

  return null;
};

export default FormResetTouched;
